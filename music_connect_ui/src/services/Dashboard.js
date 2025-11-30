import './Dashboard.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/authentication/AuthContext';
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ServiceButton from "../components/ServiceButton";
import { faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faArrowRightArrowLeft, faDownload, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, TextField, Alert } from '@mui/material';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { logout, deleteAccount } = useAuth();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogoutClick = () => {
        setShowLogoutDialog(true);
    };

    const handleDialogClose = () => {
        setShowLogoutDialog(false);
        setShowDeleteConfirm(false);
        setPassword('');
        setError('');
    };

    const handleCancel = () => {
        handleDialogClose();
    };

    const handleLogout = async () => {
        console.log('Logging out...');
        try {
            await logout();
            sessionStorage.clear();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/music-connect/login';
        } catch (error) {
            console.error('Logout error:', error);
            sessionStorage.clear();
            window.location.href = '/music-connect/login';
        }
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
        setError('');
    };

    const handleBackToOptions = () => {
        setShowDeleteConfirm(false);
        setPassword('');
        setError('');
    };

    const handleDeleteConfirm = async () => {
        if (!password) {
            setError('Password is required');
            return;
        }

        console.log('Deleting account...');
        const result = await deleteAccount(password);
        
        if (result.success) {
            sessionStorage.clear();
            localStorage.clear();
            window.location.href = '/music-connect/login';
        } else {
            setError(result.error || 'Failed to delete account');
        }
    };

    return (
        <div className="dashboard-page">
            <Header />
            <div className="dashboard-page-content">
                <SearchBar />
                <div className="service-cards">
                    <ServiceButton 
                        className={"service"} 
                        service="YouTube Music" 
                        serviceURL="/youtube-music" 
                        icon={faYoutube} 
                        colour="red"
                    />
                    <ServiceButton 
                        className={"service"} 
                        service="Spotify" 
                        serviceURL="/spotify" 
                        icon={faSpotify} 
                        colour="#1ED760"
                    />
                    <ServiceButton 
                        className={"service"} 
                        service="Migrate Playlists" 
                        serviceURL="/playlist-migration" 
                        icon={faArrowRightArrowLeft} 
                        colour="orange"
                    />
                    <ServiceButton 
                        className={"service"} 
                        service="Export Data" 
                        serviceURL="/export" 
                        icon={faDownload} 
                        colour="blue"
                    />
                    <ServiceButton 
                        className={"service"} 
                        service="Logout" 
                        serviceURL="#"
                        icon={faRightFromBracket} 
                        colour="#d32f2f"
                        onClick={handleLogoutClick}
                    />
                </div>
            </div>

            {/* Logout Dialog */}
            <Dialog open={showLogoutDialog && !showDeleteConfirm} onClose={handleDialogClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Typography variant="h6" fontWeight="600">
                        What would you like to do?
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={handleCancel}
                            sx={{
                                py: 1.5,
                                textTransform: 'none',
                                justifyContent: 'flex-start'
                            }}
                        >
                            <Typography variant="body1" fontWeight="600">
                                Cancel
                            </Typography>
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            color="error"
                            onClick={handleLogout}
                            sx={{
                                py: 1.5,
                                textTransform: 'none',
                                justifyContent: 'flex-start'
                            }}
                        >
                            <Typography variant="body1" fontWeight="600">
                                Logout
                            </Typography>
                        </Button>

                        <Button
                            variant="contained"
                            size="large"
                            color="error"
                            onClick={handleDeleteClick}
                            sx={{
                                py: 1.5,
                                textTransform: 'none',
                                justifyContent: 'flex-start'
                            }}
                        >
                            <Typography variant="body1" fontWeight="600">
                                Delete Account
                            </Typography>
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteConfirm} onClose={handleBackToOptions} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <Typography variant="h6" fontWeight="600" color="error">
                        Delete Account
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        <Typography variant="body2" fontWeight="600">
                            This action cannot be undone!
                        </Typography>
                        <Typography variant="caption">
                            All your data will be permanently deleted.
                        </Typography>
                    </Alert>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Please enter your password to confirm:
                    </Typography>
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!error}
                        helperText={error}
                        autoFocus
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleDeleteConfirm();
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBackToOptions}>Back</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete Account
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DashboardPage;