import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { IconButton, Drawer, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { supabase } from '../services/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const session = supabase.auth.getSession();
        if (session) {
            setUser(session.user);
        }

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                setUser(null);
            } else if (event === 'SIGNED_IN') {
                setUser(session.user);
            }
        });

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            authListener.subscription.unsubscribe();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };

    const handleLogout = async () => {
        setConfirmOpen(true);
    };

    const confirmLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setConfirmOpen(false);
        navigate('/');
    };

    const cancelLogout = () => {
        setConfirmOpen(false);
    };

    const navItems = [
        { text: 'Accueil', path: '/' },
        ...(user ? [{ text: 'Ajouter un Open Mat', path: '/add' }] : []),
        { text: 'À propos', path: '/about' }
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors duration-300">
                        OpenMat France
                    </Link>

                    {/* Navigation Desktop */}
                    <div className="hidden sm:flex space-x-8">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    to={item.path}
                                    className={`relative text-sm font-medium ${location.pathname === item.path
                                            ? 'text-primary-600'
                                            : 'text-gray-700 hover:text-primary-600'
                                        } transition-colors duration-300`}
                                >
                                    {item.text}
                                    {location.pathname === item.path && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"
                                            layoutId="navbar-indicator"
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                        {user ? (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleLogout}
                                    className="transition-all duration-300 hover:bg-primary-50"
                                >
                                    Déconnexion
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    component={Link}
                                    to="/login"
                                    variant="outlined"
                                    color="primary"
                                    className="transition-all duration-300 hover:bg-primary-50"
                                >
                                    Connexion
                                </Button>
                            </motion.div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="sm:hidden">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            className="transition-colors duration-300 hover:bg-gray-100"
                        >
                            <Bars3Icon className="h-6 w-6" />
                        </IconButton>
                    </div>
                </div>

                {/* Mobile Menu */}
                <Drawer
                    anchor="right"
                    open={isOpen}
                    onClose={toggleDrawer(false)}
                    PaperProps={{
                        sx: {
                            width: '70%',
                            height: '100%',
                            right: 0,
                            left: 'auto',
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '20px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        }
                    }}
                >
                    <div className="flex justify-between items-center mb-8">
                        <Link
                            to="/"
                            className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors duration-300"
                            onClick={toggleDrawer(false)}
                        >
                            OpenMat France
                        </Link>
                        <IconButton
                            onClick={toggleDrawer(false)}
                            className="transition-colors duration-300 hover:bg-gray-100"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </IconButton>
                    </div>

                    <div className="flex flex-col space-y-4">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ x: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Link
                                    to={item.path}
                                    onClick={toggleDrawer(false)}
                                    className={`text-lg font-medium ${location.pathname === item.path
                                            ? 'text-primary-600 border-b-2 border-primary-600'
                                            : 'text-gray-700 hover:text-primary-600'
                                        } py-2 border-b border-gray-200 transition-colors duration-300`}
                                >
                                    {item.text}
                                </Link>
                            </motion.div>
                        ))}
                        {user ? (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleLogout}
                                    className="w-full transition-all duration-300 hover:bg-primary-50"
                                >
                                    Déconnexion
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    component={Link}
                                    to="/login"
                                    variant="outlined"
                                    color="primary"
                                    onClick={toggleDrawer(false)}
                                    className="w-full transition-all duration-300 hover:bg-primary-50"
                                >
                                    Connexion
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </Drawer>
            </div>

            <Dialog
                open={confirmOpen}
                onClose={cancelLogout}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    sx: {
                        borderRadius: '12px',
                        padding: '20px',
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title" className="text-xl font-bold text-gray-900">
                    Confirmer la déconnexion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className="text-gray-600">
                        Êtes-vous sûr de vouloir vous déconnecter ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={cancelLogout}
                        color="primary"
                        className="hover:bg-gray-100"
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={confirmLogout}
                        color="primary"
                        autoFocus
                        className="hover:bg-primary-50"
                    >
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>
        </motion.nav>
    );
};

export default Navbar; 