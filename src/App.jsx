import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { OfflineProvider } from './contexts/OfflineContext';
import { AccessibilitySettings } from './components/AccessibilitySettings';
import { offlineService } from './services/offlineService';
import theme from './theme';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AddOpenMatPage from './pages/AddOpenMatPage';
import FavoritesPage from './pages/FavoritesPage';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';

const AppLayout = ({ children }) => (
    <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
            {children}
        </main>
        <Footer />
        <AccessibilitySettings />
    </div>
);

const App = () => {
    React.useEffect(() => {
        offlineService.init();
        const handleConnectionChange = (online) => {
            console.log(online ? 'Application en ligne' : 'Application hors ligne');
            if (online) {
                offlineService.sync();
            }
        };

        window.addEventListener('online', () => handleConnectionChange(true));
        window.addEventListener('offline', () => handleConnectionChange(false));

        return () => {
            window.removeEventListener('online', () => handleConnectionChange(true));
            window.removeEventListener('offline', () => handleConnectionChange(false));
        };
    }, []);

    return (
        <HelmetProvider>
            <AuthProvider>
                <CustomThemeProvider>
                    <LanguageProvider>
                        <AccessibilityProvider>
                            <OfflineProvider>
                                <ThemeProvider theme={theme}>
                                    <CssBaseline />
                                    <Router>
                                        <AppLayout>
                                            <Routes>
                                                <Route path="/" element={<HomePage />} />
                                                <Route path="/about" element={<AboutPage />} />
                                                <Route path="/login" element={<LoginPage />} />
                                                <Route path="/signup" element={<SignUpPage />} />
                                                <Route
                                                    path="/add"
                                                    element={
                                                        <PrivateRoute>
                                                            <AddOpenMatPage />
                                                        </PrivateRoute>
                                                    }
                                                />
                                                <Route
                                                    path="/favorites"
                                                    element={
                                                        <PrivateRoute>
                                                            <FavoritesPage />
                                                        </PrivateRoute>
                                                    }
                                                />
                                            </Routes>
                                        </AppLayout>
                                    </Router>
                                </ThemeProvider>
                            </OfflineProvider>
                        </AccessibilityProvider>
                    </LanguageProvider>
                </CustomThemeProvider>
            </AuthProvider>
        </HelmetProvider>
    );
};

export default App; 