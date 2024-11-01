import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const withAuthentication = (WrappedComponent) => {
    return function AuthComponent(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [isLoading, setIsLoading] = useState(true);
        const location = useLocation();

        useEffect(() => {
            // Check for token in cookies
            const checkAuth = () => {
                const token = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('token='));
                
                if (token) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
                setIsLoading(false);
            };

            checkAuth();
        }, []);

        if (isLoading) {
            return <div>Loading...</div>; // Or your loading component
        }

        if (!isAuthenticated) {
            // Save the attempted URL
            return <Navigate to="/login" state={{ from: location }} replace />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuthentication;