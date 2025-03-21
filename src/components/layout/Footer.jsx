import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const linkVariants = {
        hover: { x: 5 },
        tap: { scale: 0.95 }
    };

    const socialVariants = {
        hover: { scale: 1.1, y: -2 },
        tap: { scale: 0.9 }
    };

    return (
        <motion.footer
            className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 py-8 md:py-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={footerVariants}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Version Mobile */}
                <div className="md:hidden">
                    <div className="space-y-8">
                        {/* Logo et Description */}
                        <div>
                            <Link to="/" className="inline-block">
                                <motion.h1
                                    className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    OpenMat France
                                </motion.h1>
                            </Link>
                            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                                La plateforme qui connecte la communauté du grappling en France.
                            </p>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
                            <div className="flex flex-col space-y-3">
                                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                                    <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                                        Accueil
                                    </Link>
                                </motion.div>
                                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                                    <Link to="/add" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                                        Ajouter un Open Mat
                                    </Link>
                                </motion.div>
                                <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                                    <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                                        À propos
                                    </Link>
                                </motion.div>
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact</h2>
                            <div className="space-y-3">
                                <motion.a
                                    href="mailto:adelloukal2@gmail.com"
                                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300"
                                    whileHover={{ x: 5 }}
                                >
                                    <FaEnvelope className="w-4 h-4 mr-2" />
                                    <span>adelloukal2@gmail.com</span>
                                </motion.a>
                                <div className="flex items-center text-gray-600">
                                    <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                                    <span>Paris, France</span>
                                </div>
                            </div>
                            <div className="flex space-x-6 mt-6">
                                <motion.a
                                    href="https://github.com/adellkl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                                    variants={socialVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <FaGithub className="w-5 h-5" />
                                </motion.a>
                                <motion.a
                                    href="https://www.linkedin.com/in/adel-loukal-257541221/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                                    variants={socialVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <FaLinkedin className="w-5 h-5" />
                                </motion.a>
                                <motion.a
                                    href="https://www.instagram.com/adel._lkl/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                                    variants={socialVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <FaInstagram className="w-5 h-5" />
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Version Desktop */}
                <div className="hidden md:grid md:grid-cols-4 gap-8">
                    {/* Logo et Description */}
                    <div className="space-y-4 md:col-span-2">
                        <Link to="/" className="inline-block">
                            <motion.h1
                                className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                OpenMat France
                            </motion.h1>
                        </Link>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            La plateforme qui connecte la communauté du grappling en France.
                            Trouvez et partagez des Open Mats, rencontrez d'autres pratiquants
                            et développez votre réseau dans le monde du grappling.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
                        <div className="flex flex-col space-y-3">
                            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                                <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                                    Accueil
                                </Link>
                            </motion.div>
                            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                                <Link to="/add" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                                    Ajouter un Open Mat
                                </Link>
                            </motion.div>
                            <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                                <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                                    À propos
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900">Contact</h2>
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <motion.a
                                    href="mailto:adelloukal2@gmail.com"
                                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300"
                                    whileHover={{ x: 5 }}
                                >
                                    <FaEnvelope className="w-4 h-4 mr-2" />
                                    <span>adelloukal2@gmail.com</span>
                                </motion.a>
                                <div className="flex items-center text-gray-600">
                                    <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                                    <span>Paris, France</span>
                                </div>
                            </div>
                            <div className="flex space-x-4 pt-2">
                                <motion.a
                                    href="https://github.com/adellkl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                                    variants={socialVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <FaGithub className="w-5 h-5" />
                                </motion.a>
                                <motion.a
                                    href="https://www.linkedin.com/in/adel-loukal-257541221/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                                    variants={socialVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <FaLinkedin className="w-5 h-5" />
                                </motion.a>
                                <motion.a
                                    href="https://www.instagram.com/adel._lkl/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                                    variants={socialVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <FaInstagram className="w-5 h-5" />
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-600 text-center md:text-left">
                            © {currentYear} OpenMat France. Tous droits réservés.
                        </p>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;