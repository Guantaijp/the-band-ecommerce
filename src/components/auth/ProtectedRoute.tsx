import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated } from '../../store/auth/authSlice';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const location = useLocation();
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        // Simulate checking token validity
        const checkAuth = async () => {
            try {
                // Add your token validation logic here if needed
                await new Promise(resolve => setTimeout(resolve, 500));
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            checkAuth();
        } else {
            setIsLoading(false);
        }
    }, [token]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    if (!isAuthenticated && !token) {
        // Redirect to login while saving the attempted URL
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;