// src/services/authentication/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthAPI from './api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); 

    // Load token & user from sessionStorage on mount
    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        const storedUser = sessionStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            setAuthenticated(true);
        }
        setLoading(false); 
    }, []);

    // Login
    const login = async (username, password, rememberMe = false) => {
        try {
            const data = await AuthAPI.login(username, password);

            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('user', JSON.stringify(data.user));

            if (rememberMe) {
                localStorage.setItem('rememberedUsername', username);
                localStorage.setItem('rememberedPassword', password);
            } else {
                localStorage.removeItem('rememberedUsername');
                localStorage.removeItem('rememberedPassword');
            }

            setToken(data.token);
            setUser(data.user);
            setAuthenticated(true);

            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Register 
    const register = async (username, email, password, fullName) => {
        try {
            const data = await AuthAPI.register(username, email, password, fullName);
            return { success: true, message: data.message, user: data.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Logout
    const logout = async () => {
        try {
            if (token) {
                await AuthAPI.logout(token);
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setToken(null);
            setUser(null);
            setAuthenticated(false);
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
        }
    };

    // Verify email
    const verifyEmail = async (verificationToken) => {
        try {
            const data = await AuthAPI.verifyEmail(verificationToken);
            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Resend verification
    const resendVerification = async (email) => {
        try {
            const data = await AuthAPI.resendVerification(email);
            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Forgot password
    const forgotPassword = async (email) => {
        try {
            const data = await AuthAPI.forgotPassword(email);
            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Reset password
    const resetPassword = async (resetToken, newPassword) => {
        try {
            const data = await AuthAPI.resetPassword(resetToken, newPassword);
            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Delete account
    const deleteAccount = async (password) => {
        try {
            await AuthAPI.deleteAccount(token, password);

            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            localStorage.removeItem('rememberedUsername');
            localStorage.removeItem('rememberedPassword');

            setToken(null);
            setUser(null);
            setAuthenticated(false);

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Get remembered credentials
    const getRememberedCredentials = () => {
        return {
            username: localStorage.getItem('rememberedUsername') || '',
            password: localStorage.getItem('rememberedPassword') || '',
            hasRemembered: !!localStorage.getItem('rememberedUsername')
        };
    };

    // Update profile
    const updateProfile = async (updates) => {
        try {
            const data = await AuthAPI.updateProfile(token, updates);
            const updatedUser = { ...user, ...data.user };
            setUser(updatedUser);
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Update avatar
    const updateAvatar = async (avatarUrl) => {
        try {
            const data = await AuthAPI.updateAvatar(token, avatarUrl);
            const updatedUser = { ...user, avatarUrl: data.avatarUrl };
            setUser(updatedUser);
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
            return { success: true, avatarUrl: data.avatarUrl };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const value = {
        authenticated,
        user,
        token,
        loading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        verifyEmail,
        resendVerification,
        deleteAccount,
        getRememberedCredentials,
        updateProfile,
        updateAvatar,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
