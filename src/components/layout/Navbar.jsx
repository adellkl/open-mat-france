import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaHome, FaInfoCircle, FaPlus } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, signOut } = useAuth();
    const location = useLocation();

    const navItems = [
        { name: 'Accueil', path: '/', icon: <FaHome className="w-5 h-5" /> },
        { name: 'À Propos', path: '/about', icon: <FaInfoCircle className="w-5 h-5" /> },
        { name: 'Ajouter', path: '/add', icon: <FaPlus className="w-5 h-5" /> },
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-black">
                            OpenMat France
                        </Link>
                    </div>

                    {/* Menu Desktop */}
                    <div className="hidden md:flex md:items-center md:space-x-8 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`text-sm font-medium transition-colors duration-200 ${location.pathname === item.path
                                    ? 'text-black'
                                    : 'text-gray-500 hover:text-black'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Bouton Menu Mobile */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-black focus:outline-none"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Ouvrir le menu</span>
                            {isOpen ? (
                                <FaTimes className="block h-6 w-6" />
                            ) : (
                                <FaBars className="block h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* User Menu Desktop */}
                    <div className="hidden md:flex md:items-center">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500">{user.email}</span>
                                <button
                                    onClick={signOut}
                                    className="text-sm font-medium text-gray-500 hover:text-black transition-colors duration-200"
                                >
                                    <FaSignOutAlt className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="text-sm font-medium text-gray-500 hover:text-black transition-colors duration-200"
                            >
                                <FaUser className="w-5 h-5" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Menu Mobile */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 bg-white z-50 flex flex-col">
                    {/* En-tête avec croix */}
                    <div className="flex justify-end p-4">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-500 hover:text-black focus:outline-none"
                        >
                            <FaTimes className="h-8 w-8" />
                        </button>
                    </div>

                    {/* Contenu aligné à gauche */}
                    <div className="flex-1 flex flex-col px-6 space-y-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center py-3 text-lg font-medium ${location.pathname === item.path
                                        ? 'text-black bg-gray-50'
                                        : 'text-gray-500 hover:text-black hover:bg-gray-50'
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                            </Link>
                        ))}
                        {user ? (
                            <div className="py-3 border-t border-gray-200">
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <FaUser className="w-5 h-5 mr-3" />
                                    {user.email}
                                </div>
                                <button
                                    onClick={() => {
                                        signOut();
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center text-sm font-medium text-gray-500 hover:text-black"
                                >
                                    <FaSignOutAlt className="w-5 h-5 mr-3" />
                                    Se déconnecter
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center py-3 text-lg font-medium text-gray-500 hover:text-black hover:bg-gray-50"
                                onClick={() => setIsOpen(false)}
                            >
                                <FaUser className="w-5 h-5 mr-3" />
                                Se connecter
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
