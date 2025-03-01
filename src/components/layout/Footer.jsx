import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-200 py-12 border-t border-gray-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    <Link to="/" className="text-2xl font-bold text-indigo-600">
                        OpenMat France
                    </Link>

                    <div className="flex space-x-6">
                        <Link to="/" className="text-sm text-black hover:text-indigo-600 transition-colors">
                            Accueil
                        </Link>
                        <Link to="/add" className="text-sm text-black hover:text-indigo-600 transition-colors">
                            Ajouter un Open Mat
                        </Link>
                        <Link to="/about" className="text-sm text-black hover:text-indigo-600 transition-colors">
                            À propos
                        </Link>
                    </div>

                    <div className="text-sm text-black space-y-2">
                        <p>© {new Date().getFullYear()} OpenMat France. All rights reserved.</p>
                        <p>Developed by <a href="https://portfolio-loukal.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Adel Loukal</a></p>
                        <div className="flex space-x-4">
                            <a href="https://github.com/adellkl" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-black hover:text-gray-500 ">
                                <FaGithub className="w-5 h-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/adel-loukal-257541221/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-black hover:text-gray-500">
                                <FaLinkedin className="w-5 h-5" />
                            </a>
                            <a href="https://www.instagram.com/adel._lkl/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-black hover:text-gray-500">
                                <FaInstagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;