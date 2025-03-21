import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FaSun, FaMoon, FaGlobe, FaFont, FaDesktop } from 'react-icons/fa';

const AccessibilitySettings = () => {
    const { isDarkMode, toggleTheme, language, changeLanguage } = useTheme();
    const [fontSize, setFontSize] = React.useState(100);
    const [highContrast, setHighContrast] = React.useState(false);

    const handleFontSizeChange = (delta) => {
        const newSize = Math.max(80, Math.min(200, fontSize + delta));
        setFontSize(newSize);
        document.documentElement.style.fontSize = `${newSize}%`;
    };

    const toggleHighContrast = () => {
        setHighContrast(!highContrast);
        document.documentElement.classList.toggle('high-contrast');
    };

    return (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50">
            <div className="space-y-4">
                {/* Thème */}
                <div className="flex items-center space-x-2">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label={isDarkMode ? "Passer au mode clair" : "Passer au mode sombre"}
                    >
                        {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                    </button>
                </div>

                {/* Langue */}
                <div className="flex items-center space-x-2">
                    <FaGlobe className="w-5 h-5" />
                    <select
                        value={language}
                        onChange={(e) => changeLanguage(e.target.value)}
                        className="bg-transparent border rounded px-2 py-1"
                    >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                    </select>
                </div>

                {/* Taille de police */}
                <div className="flex items-center space-x-2">
                    <FaFont className="w-5 h-5" />
                    <button
                        onClick={() => handleFontSizeChange(-10)}
                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Réduire la taille du texte"
                    >
                        A-
                    </button>
                    <span className="text-sm">{fontSize}%</span>
                    <button
                        onClick={() => handleFontSizeChange(10)}
                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Augmenter la taille du texte"
                    >
                        A+
                    </button>
                </div>

                {/* Contraste élevé */}
                <div className="flex items-center space-x-2">
                    <FaDesktop className="w-5 h-5" />
                    <button
                        onClick={toggleHighContrast}
                        className={`px-3 py-1 rounded ${highContrast
                                ? 'bg-yellow-500 text-black'
                                : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                        aria-label={highContrast ? "Désactiver le contraste élevé" : "Activer le contraste élevé"}
                    >
                        Contraste élevé
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccessibilitySettings; 