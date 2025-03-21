import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { IconButton, Drawer, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { supabase } from '../../services/api'; // Assurez-vous d'importer supabase

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
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

        return () => {
            authListener.subscription.unsubscribe();
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
        navigate('/'); // Redirige vers la page principale après la déconnexion
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
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-primary-600">
                        OpenMat France
                    </Link>

                    {/* Navigation Desktop */}
                    <div className="hidden sm:flex space-x-4">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className={`text-sm font-medium ${location.pathname === item.path ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-700 '} mt-2`}
                            >
                                {item.text}
                            </Link>
                        ))}
                        {user ? (
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleLogout}
                            >
                                Déconnexion
                            </Button>
                        ) : (
                            <Button
                                component={Link}
                                to="/login"
                                variant="outlined"
                                color="primary"
                            >
                                Connexion
                            </Button>
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
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '20px',
                        }
                    }}
                >
                    <div className="flex justify-between items-center mb-8">
                        <Link
                            to="/"
                            className="text-xl font-bold text-primary-600"
                            onClick={toggleDrawer(false)}
                        >
                            OpenMat France
                        </Link>
                        <IconButton onClick={toggleDrawer(false)}>
                            <XMarkIcon className="h-6 w-6" />
                        </IconButton>
                    </div>

                    <div className="flex flex-col space-y-4">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                onClick={toggleDrawer(false)}
                                className={`text-lg font-medium ${location.pathname === item.path ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-700 '} py-2 border-b border-gray-200`}
                            >
                                {item.text}
                            </Link>
                        ))}
                        {user ? (
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleLogout}
                            >
                                Déconnexion
                            </Button>
                        ) : (
                            <Button
                                component={Link}
                                to="/login"
                                variant="outlined"
                                color="primary"
                                onClick={toggleDrawer(false)}
                            >
                                Connexion
                            </Button>
                        )}
                    </div>
                </Drawer>
            </div>


            <Dialog
                open={confirmOpen}
                onClose={cancelLogout}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmer la déconnexion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Êtes-vous sûr de vouloir vous déconnecter ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelLogout} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={confirmLogout} color="primary" autoFocus>
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>
        </nav>
    );
};

export default Navbar;
