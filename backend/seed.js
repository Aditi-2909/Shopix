require("dotenv").config();

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Order = require("./model/Order");
const Product = require("./model/Product");
const User = require("./model/User");

const products = [
	{
		name: "Everyday Canvas Backpack",
		description: "A lightweight canvas backpack with a padded laptop sleeve and roomy main compartment.",
		price: 49.99,
		category: "Accessories",
		stock: 28,
		imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
		rating: 4.6,
		numReviews: 18
	},
	{
		name: "Wireless Studio Headphones",
		description: "Comfortable over-ear headphones with clear sound and long-lasting battery life.",
		price: 89.99,
		category: "Electronics",
		stock: 16,
		imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
		rating: 4.8,
		numReviews: 32
	},
	{
		name: "Ceramic Pour-Over Set",
		description: "A handmade-style ceramic dripper and matching cup for a slower morning brew.",
		price: 34.5,
		category: "Home",
		stock: 22,
		imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
		rating: 4.5,
		numReviews: 11
	},
	{
		name: "Classic White Sneakers",
		description: "Versatile low-top sneakers with a clean profile and cushioned footbed.",
		price: 64.0,
		category: "Fashion",
		stock: 35,
		imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
		rating: 4.4,
		numReviews: 24
	},
	{
		name: "Minimal Desk Lamp",
		description: "An adjustable metal desk lamp with a warm, focused light for workspaces.",
		price: 42.0,
		category: "Home",
		stock: 14,
		imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
		rating: 4.7,
		numReviews: 9
	},
	{
		name: "Insulated Travel Bottle",
		description: "A stainless steel bottle that keeps drinks cold or hot while you are on the move.",
		price: 26.99,
		category: "Accessories",
		stock: 40,
		imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
		rating: 4.3,
		numReviews: 15
	},
	{
		name: "Pocket Bluetooth Speaker",
		description: "A compact portable speaker with a durable fabric finish and rich, balanced audio.",
		price: 59.0,
		category: "Electronics",
		stock: 19,
		imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",
		rating: 4.6,
		numReviews: 21
	},
	{
		name: "Soft Knit Throw Blanket",
		description: "A soft woven throw blanket that adds a comfortable layer to a sofa or bed.",
		price: 55.0,
		category: "Home",
		stock: 12,
		imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
		rating: 4.9,
		numReviews: 7
	}
];

const seed = async () => {
	await connectDB();

	// --- NOTUN ADD KORA HOLO: Ager sob data delete ---
	console.log("Deleting old data...");
	await Order.deleteMany();
	await Product.deleteMany();
	await User.deleteMany();
	console.log("Old data deleted.");

	const passwordHash = await bcrypt.hash("ShopixDemo123!", 10);
	
	const admin = await User.create({ name: "Shopix Demo Admin", email: "admin@shopix.test", role: "admin", verified: true, password: passwordHash });
	const customer = await User.create({ name: "Jordan Lee", email: "jordan@shopix.test", role: "user", verified: true, password: passwordHash });

	const seededProducts = await Product.insertMany(products);
	const productByName = new Map(seededProducts.map((product) => [product.name, product]));

	const orderFixtures = [
		{ paymentId: "SHOPIX-DEMO-ORDER-001", user: customer._id, products: [["Wireless Studio Headphones", 1], ["Insulated Travel Bottle", 2]], status: "delivered", daysAgo: 12 },
		{ paymentId: "SHOPIX-DEMO-ORDER-002", user: customer._id, products: [["Everyday Canvas Backpack", 1], ["Classic White Sneakers", 1]], status: "shipped", daysAgo: 4 },
		{ paymentId: "SHOPIX-DEMO-ORDER-003", user: admin._id, products: [["Ceramic Pour-Over Set", 1], ["Soft Knit Throw Blanket", 1]], status: "pending", daysAgo: 1 }
	];

	for (const fixture of orderFixtures) {
		const items = fixture.products.map(([name, qty]) => {
			const product = productByName.get(name);
			return { productId: product._id, qty, price: product.price };
		});
		const totalAmount = items.reduce((total, item) => total + item.price * item.qty, 0);
		const createdAt = new Date(Date.now() - fixture.daysAgo * 24 * 60 * 60 * 1000);

		await Order.create({
			paymentId: fixture.paymentId,
			user: fixture.user,
			items,
			totalAmount,
			address: { fullName: "Shopix Demo Customer", street: "42 Market Street", city: "Bengaluru", postalCode: "560001", country: "India" },
			status: fixture.status,
			createdAt,
			updatedAt: createdAt
		});
	}

	console.log(`Seed complete: ${seededProducts.length} products, 2 users, ${orderFixtures.length} orders.`);
};

seed()
	.catch((error) => {
		console.error("Seed failed:", error);
		process.exitCode = 1;
	})
	.finally(async () => {
		await mongoose.disconnect();
	});