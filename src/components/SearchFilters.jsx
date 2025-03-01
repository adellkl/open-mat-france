import React from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline';


const SearchFilters = ({
    searchTerm,
    setSearchTerm,
    filters,
    handleFilterChange,
    resetFilters,
    showFilters,
    setShowFilters,
    uniqueOptions
}) => {
    return (
        <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Rechercher par club, ville, coach..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                </div>

                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                    {showFilters ? (
                        <>
                            <XMarkIcon className="mr-2 h-5 w-5 text-gray-400" />
                            Masquer les filtres
                        </>
                    ) : (
                        <>
                            <AdjustmentsHorizontalIcon className="mr-2 h-5 w-5 text-gray-400" />
                            Filtres avancés
                        </>
                    )}
                </button>
            </div>

            {showFilters && (
                <div className="mt-4 p-4 bg-white shadow rounded-lg">
                    <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="discipline" className="block text-sm font-medium text-gray-700">
                                Discipline
                            </label>
                            <select
                                id="discipline"
                                name="discipline"
                                value={filters.discipline}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            >
                                <option value="">Toutes les disciplines</option>
                                {uniqueOptions('discipline').map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                                Niveau
                            </label>
                            <select
                                id="level"
                                name="level"
                                value={filters.level}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            >
                                <option value="">Tous les niveaux</option>
                                {uniqueOptions('level').map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                Ville
                            </label>
                            <select
                                id="city"
                                name="city"
                                value={filters.city}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            >
                                <option value="">Toutes les villes</option>
                                {uniqueOptions('city').map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">
                                Date de début
                            </label>
                            <input
                                type="date"
                                id="fromDate"
                                name="fromDate"
                                value={filters.fromDate}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">
                                Date de fin
                            </label>
                            <input
                                type="date"
                                id="toDate"
                                name="toDate"
                                value={filters.toDate}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            Réinitialiser
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowFilters(false)}
                            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            Appliquer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchFilters;