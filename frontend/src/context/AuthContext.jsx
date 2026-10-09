import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // ✅ Refresh e localStorage theke load korbe
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("userInfo");
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("userInfo", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("userInfo");
        localStorage.removeItem("user");
        localStorage.removeItem("shopix_avatar");
    };

    // ✅ Profile theke naam change er event sunbe - Navbar instant update hobe
    useEffect(() => {
        const syncUser = () => {
            try {
                const stored = localStorage.getItem("userInfo");
                if (stored) {
                    setUser(JSON.parse(stored));
                }
            } catch {}
        };

        window.addEventListener('userUpdated', syncUser);
        window.addEventListener('avatarUpdated', syncUser);
        
        return () => {
            window.removeEventListener('userUpdated', syncUser);
            window.removeEventListener('avatarUpdated', syncUser);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}