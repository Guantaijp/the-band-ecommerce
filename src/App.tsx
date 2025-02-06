import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './store/store';

// Layout Components
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
// import ErrorBoundary from './components/layout/ErrorBoundary';

// Pages
import LandingPage from './pages/LandingPage/LandingPage';
import ProductPage from './components/products/ProductDetail/ProductDetail.tsx';
import Products from './pages/ProductPage/ProductPage.tsx';

import CartPage from './pages/Cart/CartPage';
import CategoryPage from './components/layout/category/CategoryPage.tsx';

// import LoginPage from './pages/Auth/LoginPage';
// import Dashboard from './pages/AdminDashboard/Dashboard';

// Protected Route Component
// import ProtectedRoute from './components/auth/ProtectedRoute';

const App = () => {
    return (
        // <Provider store={store}>
            <BrowserRouter>
                {/*<ErrorBoundary>*/}
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <main className="flex-grow">
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/products" element={<Products />} />
                                <Route path="/products/:id" element={<ProductPage />} />
                                <Route path="/cart" element={<CartPage />} />
                                <Route path="/categories" element={<CategoryPage />} />
                                {/*<Route path="/login" element={<LoginPage />} />*/}

                                {/* Protected Admin Routes */}
                                {/*<Route*/}
                                {/*    path="/admin/*"*/}
                                {/*    element={*/}
                                {/*        <ProtectedRoute>*/}
                                {/*            <Routes>*/}
                                {/*                <Route path="dashboard" element={<Dashboard />} />*/}
                                {/*                <Route path="products" element={<Dashboard />} />*/}
                                {/*                <Route path="analytics" element={<Dashboard />} />*/}
                                {/*                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />*/}
                                {/*            </Routes>*/}
                                {/*        </ProtectedRoute>*/}
                                {/*    }*/}
                                {/*/>*/}

                                {/* 404 Route */}
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                {/*</ErrorBoundary>*/}
            </BrowserRouter>
        // </Provider>
    );
};

export default App;