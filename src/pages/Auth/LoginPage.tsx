import  { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, selectIsAuthenticated, selectAuthError } from '../../store/auth/authSlice';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Alert, AlertDescription } from '../../components/ui/alert';
import {LockKeyhole, Mail, ShoppingBag} from 'lucide-react';
import { AppDispatch,  } from '../../store/index.ts';

const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const authError = useSelector(selectAuthError);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const validateForm = () => {
        const newErrors = {
            email: '',
            password: ''
        };
        let isValid = true;

        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await dispatch(login(formData));
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                {/* Brand Logo and Title */}
                <div className="text-center flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <ShoppingBag className="h-6 w-6 text-purple-600"/>
                        <span
                            className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
            The Band
        </span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
                    <p className="mt-2 text-gray-600">Sign in to your admin account</p>
                </div>


                <Card className="shadow-xl border-0">
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400"/>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Email address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`pl-10 h-12 ${errors.email ? 'border-red-500' : ''}`}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-gray-400"/>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={`pl-10 h-12 ${errors.password ? 'border-red-500' : ''}`}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-purple-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            {authError && (
                                <Alert variant="destructive">
                                    <AlertDescription>{authError}</AlertDescription>
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-12 bg-purple-600 hover:bg-indigo-700"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign in'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="text-center text-sm text-gray-600">
                    Need help? Contact{' '}
                    <a href="mailto:info@theband.co.ke" className="font-medium text-purple-600 hover:text-indigo-500">
                        info@theband.co.ke
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;