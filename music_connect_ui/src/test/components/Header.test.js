import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/authentication/AuthContext';
import './Header.css';
import musicConnectLogo from '../files/music-connect-logo.png';
import { Button, Menu, MenuItem, Avatar, ListItemIcon, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import HelpIcon from '@mui/icons-material/Help';
import LogoutDialog from './LogoutDialog';

const Header = () => {
    const navigate = useNavigate();
    const { logout, deleteAccount, user } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleAccountClick = () => {
        handleMenuClose();
        navigate('/account');
    };

    const handleOpenLogoutDialog = () => {
        console.log('Opening logout dialog...');
        handleMenuClose();
        setLogoutDialogOpen(true);
    };

    const handleDialogClose = () => {
        console.log('Closing logout dialog...');
        setLogoutDialogOpen(false);
    };

    // Option 1: Logout to home page (Dashboard)
    const handleLogoutToHome = async () => {
        console.log('🏠 Logout to home clicked');
        try {
            await logout();
            sessionStorage.clear();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            setLogoutDialogOpen(false);
            // Redirect to home/dashboard
            window.location.href = '/';
        } catch (error) {
            console.error('🔴 Logout error:', error);
            sessionStorage.clear();
            setLogoutDialogOpen(false);
            window.location.href = '/';
        }
    };

    // Option 2: Logout to login page
    const handleLogoutToLogin = async () => {
        console.log('🔴 Logout to login clicked');
        try {
            await logout();
            sessionStorage.clear();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            setLogoutDialogOpen(false);
            // Redirect to login
            window.location.href = '/music-connect/login';
        } catch (error) {
            console.error('🔴 Logout error:', error);
            sessionStorage.clear();
            setLogoutDialogOpen(false);
            window.location.href = '/music-connect/login';
        }
    };

    // Option 3: Delete account
    const handleDeleteAccount = async (password) => {
        console.log('🗑️ Delete account clicked');
        try {
            const result = await deleteAccount(password);
            
            if (result.success) {
                // Clear all storage
                sessionStorage.clear();
                localStorage.clear();
                
                setLogoutDialogOpen(false);
                // Redirect to login page
                window.location.href = '/music-connect/login';
                return { success: true };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('🔴 Delete account error:', error);
            return { success: false, error: 'Failed to delete account' };
        }
    };

    const handleHelp = () => {
        console.log('Help button clicked');
        // navigate('/help'); // Uncomment if you have a help page
    };

    return (
        <>
            <header className="header">
                <div className="header-logo">
                    <img 
                        src={musicConnectLogo} 
                        alt="MusicConnect Logo" 
                        className="logo"
                        onClick={() => navigate('/')}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <div className="header-actions">
                    <Button 
                        variant="outlined" 
                        startIcon={<HelpIcon />}
                        onClick={handleHelp}
                        sx={{ marginRight: '10px' }}
                    >
                        Help
                    </Button>
                    
                    <Button
                        variant="outlined"
                        startIcon={<AccountCircleIcon />}
                        onClick={handleMenuOpen}
                        sx={{ marginRight: '10px' }}
                    >
                        Account
                    </Button>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem disabled sx={{ opacity: '1 !important' }}>
                            <ListItemIcon>
                                <Avatar sx={{ width: 32, height: 32, bgcolor: '#20B654' }}>
                                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText 
                                primary={user?.username || 'User'} 
                                secondary={user?.email || ''}
                            />
                        </MenuItem>
                        
                        <MenuItem onClick={handleAccountClick}>
                            <ListItemIcon>
                                <PersonIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>My Account</ListItemText>
                        </MenuItem>

                        <MenuItem onClick={handleOpenLogoutDialog} sx={{ color: 'error.main' }}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" color="error" />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </MenuItem>
                    </Menu>

                    <Button 
                        variant="contained" 
                        color="error"
                        startIcon={<LogoutIcon />}
                        onClick={handleOpenLogoutDialog}
                    >
                        Logout
                    </Button>
                </div>
            </header>

            <LogoutDialog
                open={logoutDialogOpen}
                onClose={handleDialogClose}
                onLogout={handleLogoutToLogin}
                onLogoutToHome={handleLogoutToHome}
                onDeleteAccount={handleDeleteAccount}
            />
        </>
    );
};

export default Header;