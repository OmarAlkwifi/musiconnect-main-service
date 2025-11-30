import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/authentication/AuthContext';
import Header from '../components/Header';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemText,
    Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';

const AccountPage = () => {
    const navigate = useNavigate();
    const { user, deleteAccount, getActivityLogs } = useAuth();

    // Delete Account State
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletePassword, setDeletePassword] = useState("");
    const [deleteConfirmation, setDeleteConfirmation] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    // Activity Logs State
    const [activityLogs, setActivityLogs] = useState([]);
    const [logsLoading, setLogsLoading] = useState(false);

    useEffect(() => {
        loadActivityLogs();
    }, []);

    const loadActivityLogs = async () => {
        setLogsLoading(true);
        const result = await getActivityLogs();
        if (result.success) {
            setActivityLogs(result.logs);
        }
        setLogsLoading(false);
    };

    const handleDeleteAccount = async () => {
        setDeleteError("");

        if (!deletePassword) {
            setDeleteError("Password is required");
            return;
        }

        if (deleteConfirmation !== "DELETE") {
            setDeleteError("Please type DELETE to confirm");
            return;
        }

        setDeleteLoading(true);

        const result = await deleteAccount(deletePassword);

        if (result.success) {
            // Account deleted, redirect to home
            navigate('/music-connect/login');
        } else {
            setDeleteError(result.error || "Failed to delete account");
            setDeleteLoading(false);
        }
    };

    const getActivityIcon = (activity) => {
        switch (activity) {
            case 'LOGIN_SUCCESS': return '✅';
            case 'LOGIN_FAILED': return '❌';
            case 'ACCOUNT_LOCKED': return '🔒';
            case 'SECURITY_ALERT': return '⚠️';
            case 'LOGOUT': return '🚪';
            case 'PASSWORD_RESET_REQUESTED': return '🔑';
            case 'PASSWORD_RESET_SUCCESS': return '✔️';
            case 'ACCOUNT_CREATED': return '🎉';
            default: return '📝';
        }
    };

    const getActivityColor = (activity) => {
        switch (activity) {
            case 'LOGIN_SUCCESS': return 'success';
            case 'LOGIN_FAILED': return 'error';
            case 'ACCOUNT_LOCKED': return 'error';
            case 'SECURITY_ALERT': return 'warning';
            case 'LOGOUT': return 'default';
            case 'PASSWORD_RESET_REQUESTED': return 'info';
            case 'PASSWORD_RESET_SUCCESS': return 'success';
            case 'ACCOUNT_CREATED': return 'success';
            default: return 'default';
        }
    };

    return (
        <div>
            <Header />
            <Box sx={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <Typography variant="h4" sx={{ marginBottom: '2rem', color: '#20B654' }}>
                    My Account
                </Typography>

                {/* User Profile Card */}
                <Card sx={{ marginBottom: '2rem' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                            <Avatar sx={{ width: 64, height: 64, marginRight: '1rem', bgcolor: '#20B654' }}>
                                <PersonIcon sx={{ fontSize: 40 }} />
                            </Avatar>
                            <Box>
                                <Typography variant="h5">{user?.fullName || user?.username}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    @{user?.username}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {user?.email}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider sx={{ marginY: '1rem' }} />
                        <Typography variant="body2" color="text.secondary">
                            Account created: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </Typography>
                    </CardContent>
                </Card>

                {/* Activity Logs Card */}
                <Card sx={{ marginBottom: '2rem' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                            <HistoryIcon sx={{ marginRight: '0.5rem', color: '#20B654' }} />
                            <Typography variant="h6">Recent Activity</Typography>
                        </Box>
                        
                        {logsLoading ? (
                            <Typography>Loading activity logs...</Typography>
                        ) : activityLogs.length > 0 ? (
                            <List>
                                {activityLogs.map((log, index) => (
                                    <ListItem key={log.id} divider={index !== activityLogs.length - 1}>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <span>{getActivityIcon(log.activity)}</span>
                                                    <Typography variant="body1">
                                                        {log.activity.replace(/_/g, ' ')}
                                                    </Typography>
                                                    <Chip 
                                                        label={log.activity} 
                                                        size="small" 
                                                        color={getActivityColor(log.activity)}
                                                        sx={{ marginLeft: 'auto' }}
                                                    />
                                                </Box>
                                            }
                                            secondary={
                                                <Box>
                                                    <Typography variant="caption" display="block">
                                                        {new Date(log.timestamp).toLocaleString()}
                                                    </Typography>
                                                    {log.details && Object.keys(log.details).length > 0 && (
                                                        <Typography variant="caption" display="block" color="text.secondary">
                                                            {JSON.stringify(log.details)}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography color="text.secondary">No activity logs available</Typography>
                        )}
                    </CardContent>
                </Card>

                {/* Security Actions Card */}
                <Card sx={{ marginBottom: '2rem' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                            <SecurityIcon sx={{ marginRight: '0.5rem', color: '#20B654' }} />
                            <Typography variant="h6">Security</Typography>
                        </Box>
                        
                        <Button
                            variant="outlined"
                            sx={{ marginRight: '1rem' }}
                            onClick={() => navigate('/forgot-password')}
                        >
                            Change Password
                        </Button>
                    </CardContent>
                </Card>

                {/* Danger Zone Card */}
                <Card sx={{ borderColor: '#f44336', border: '1px solid' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                            <DeleteIcon sx={{ marginRight: '0.5rem', color: '#f44336' }} />
                            <Typography variant="h6" color="error">Danger Zone</Typography>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '1rem' }}>
                            Once you delete your account, there is no going back. Please be certain.
                        </Typography>

                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => setDeleteDialogOpen(true)}
                        >
                            Delete Account
                        </Button>
                    </CardContent>
                </Card>

                {/* Delete Account Dialog */}
                <Dialog open={deleteDialogOpen} onClose={() => !deleteLoading && setDeleteDialogOpen(false)}>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogContent>
                        <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                            This action cannot be undone. This will permanently delete your account and remove all your data.
                        </Typography>

                        {deleteError && (
                            <Alert severity="error" sx={{ marginBottom: '1rem' }}>
                                {deleteError}
                            </Alert>
                        )}

                        <TextField
                            fullWidth
                            type="password"
                            label="Enter your password"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                            sx={{ marginBottom: '1rem' }}
                            disabled={deleteLoading}
                        />

                        <TextField
                            fullWidth
                            label='Type "DELETE" to confirm'
                            value={deleteConfirmation}
                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                            sx={{ marginBottom: '1rem' }}
                            disabled={deleteLoading}
                            helperText='Please type DELETE in capital letters'
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)} disabled={deleteLoading}>
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleDeleteAccount} 
                            color="error" 
                            variant="contained"
                            disabled={deleteLoading}
                        >
                            {deleteLoading ? 'Deleting...' : 'Delete Account'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
};

export default AccountPage;