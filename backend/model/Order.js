// const moongose = require('mongoose');

// const orderSchema = moongose.Schema(
//     {
//         user:{type:moongose.Schema.Types.ObjectId,ref:'User',required:true},
//         items:[
//             {
//                 product:{type:moongose.Schema.Types.ObjectId,ref:'Product',required:true},
//                 quantity:{type:Number,required:true,min:1},
//                 price:{type:Number,required:true}
//             }
//         ],
//         totalAmount:{type:Number,required:true},

//         address:{
//          fullName: {type:String,required:true},
//          street :{type:String,required:true},
//          city:{type:String,required:true},
//          postalCode:{type:String,required:true},
//          country:{type:String,required:true}
//         },  
//         paymentId:{type:String, required:true},
//         status:{type:String,enum:['pending','paid','shipped','delivered','cancelled'],default:'pending'}

//     },{timestamps:true});

//     module.exports = moongose.model('order',orderSchema);











const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            qty: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    address: {
        fullName: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    paymentId: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending'
    }
},{timestamps: true});

module.exports = mongoose.model('Order', orderSchema);