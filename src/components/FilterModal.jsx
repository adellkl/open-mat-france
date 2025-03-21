import React, { useState } from 'react';
import { FaTimes, FaMapMarkerAlt, FaGraduationCap, FaCalendarAlt, FaFilter } from 'react-icons/fa';

const FilterModal = ({ isOpen, onClose, onApplyFilters, filters }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleApply = () => {
        onApplyFilters(localFilters);
        onClose();
    };

    const handleReset = () => {
        setLocalFilters({
            city: '',
            level: '',
            date: '',
            discipline: ''
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
                {/* En-tête */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        <FaFilter className="inline-block mr-2" />
                        Filtres
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                        <FaTimes className="h-6 w-6" />
                    </button>
                </div>

                {/* Contenu */}
                <div className="space-y-6">
                    {/* Ville */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <FaMapMarkerAlt className="inline-block mr-1" />
                            Ville
                        </label>
                        <input
                            type="text"
                            value={localFilters.city}
                            onChange={(e) => setLocalFilters({ ...localFilters, city: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            placeholder="Toutes les villes"
                        />
                    </div>

                    {/* Niveau */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <FaGraduationCap className="inline-block mr-1" />
                            Niveau
                        </label>
                        <select
                            value={localFilters.level}
                            onChange={(e) => setLocalFilters({ ...localFilters, level: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                            <option value="">Tous les niveaux</option>
                            <option value="Débutant">Débutant</option>
                            <option value="Intermédiaire">Intermédiaire</option>
                            <option value="Avancé">Avancé</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <FaCalendarAlt className="inline-block mr-1" />
                            Date
                        </label>
                        <input
                            type="date"
                            value={localFilters.date}
                            onChange={(e) => setLocalFilters({ ...localFilters, date: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* Discipline */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Discipline
                        </label>
                        <select
                            value={localFilters.discipline}
                            onChange={(e) => setLocalFilters({ ...localFilters, discipline: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                            <option value="">Toutes les disciplines</option>
                            <option value="JJB">Jiu-Jitsu Brésilien</option>
                            <option value="Luta Livre">Luta Livre</option>
                        </select>
                    </div>
                </div>

                {/* Boutons */}
                <div className="mt-8 flex justify-end space-x-4">
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                        Réinitialiser
                    </button>
                    <button
                        onClick={handleApply}
                        className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        Appliquer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal; 