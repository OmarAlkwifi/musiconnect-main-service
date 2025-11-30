    import React from "react";
    import { Navigate, Outlet } from "react-router-dom";
    import { useAuth } from "./AuthContext";

    const PrivateRoute = () => {
        const { authenticated, loading } = useAuth();

      
        if (loading) {
            return (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100vh' 
                }}>
                    <p>Loading...</p>
                </div>
            );
        }

        if (!authenticated) {
            return <Navigate to="/music-connect/login" replace />;
        }

        return <Outlet />;
    };

    export default PrivateRoute;