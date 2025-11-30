// src/components/LogoutDialog.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Alert,
  CircularProgress
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';

const LogoutDialog = ({ open, onClose, onLogout, onLogoutToHome, onDeleteAccount }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShowDeleteConfirm(false);
    setPassword('');
    setError('');
    setLoading(false);
    onClose();
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
    setError('');
  };

  const handleDeleteConfirm = async () => {
    if (!password) {
      setError('Password is required to delete your account');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await onDeleteAccount(password);
      
      if (result.success) {
        handleClose();
      } else {
        setError(result.error || 'Failed to delete account');
        setLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleBackToOptions = () => {
    setShowDeleteConfirm(false);
    setPassword('');
    setError('');
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 24
        }
      }}
    >
      {!showDeleteConfirm ? (
        <>
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h6" component="div" fontWeight="600">
              What would you like to do?
            </Typography>
          </DialogTitle>
          
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Choose an option below:
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Go to Home */}
              <Button
                variant="outlined"
                size="large"
                startIcon={<HomeIcon />}
                onClick={onLogoutToHome}
                sx={{
                  justifyContent: 'flex-start',
                  py: 1.5,
                  textTransform: 'none',
                  borderColor: '#20B654',
                  color: '#20B654',
                  '&:hover': {
                    borderColor: '#1a9444',
                    backgroundColor: 'rgba(32, 182, 84, 0.04)'
                  }
                }}
              >
                <Box sx={{ textAlign: 'left', ml: 1 }}>
                  <Typography variant="body1" fontWeight="600">
                    Go to Home
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Logout and return to dashboard
                  </Typography>
                </Box>
              </Button>

              {/* Logout to Login Page */}
              <Button
                variant="outlined"
                size="large"
                startIcon={<LogoutIcon />}
                onClick={onLogout}
                sx={{
                  justifyContent: 'flex-start',
                  py: 1.5,
                  textTransform: 'none',
                  borderColor: '#1976d2',
                  color: '#1976d2',
                  '&:hover': {
                    borderColor: '#1565c0',
                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                  }
                }}
              >
                <Box sx={{ textAlign: 'left', ml: 1 }}>
                  <Typography variant="body1" fontWeight="600">
                    Logout
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Sign out and go to login page
                  </Typography>
                </Box>
              </Button>

              {/* Delete Account */}
              <Button
                variant="outlined"
                size="large"
                startIcon={<DeleteForeverIcon />}
                onClick={handleDeleteClick}
                color="error"
                sx={{
                  justifyContent: 'flex-start',
                  py: 1.5,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(211, 47, 47, 0.04)'
                  }
                }}
              >
                <Box sx={{ textAlign: 'left', ml: 1 }}>
                  <Typography variant="body1" fontWeight="600">
                    Delete Account
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Permanently delete your account
                  </Typography>
                </Box>
              </Button>
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button 
              onClick={handleClose}
              startIcon={<CancelIcon />}
              sx={{ textTransform: 'none' }}
            >
              Cancel
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h6" component="div" fontWeight="600" color="error">
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
              Please enter your password to confirm account deletion:
            </Typography>

            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              error={!!error}
              helperText={error}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !loading) {
                  handleDeleteConfirm();
                }
              }}
              autoFocus
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
            <Button 
              onClick={handleBackToOptions}
              disabled={loading}
              sx={{ textTransform: 'none' }}
            >
              Back
            </Button>
            <Button 
              onClick={handleDeleteConfirm}
              variant="contained"
              color="error"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={16} /> : <DeleteForeverIcon />}
              sx={{ textTransform: 'none' }}
            >
              {loading ? 'Deleting...' : 'Delete Account'}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default LogoutDialog;