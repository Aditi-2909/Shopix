import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
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
        // Admin login hole instant event
        window.dispatchEvent(new Event("userUpdated"));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("userInfo");
        localStorage.removeItem("user");
        localStorage.removeItem("shopix_avatar");
    };

    // Admin check
    const isAdmin = user?.role === 'admin';


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
        <AuthContext.Provider value={{ user, setUser, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}