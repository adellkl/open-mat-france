import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { MagnifyingGlassIcon, PlusCircleIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import OpenMatCard from '../components/OpenMatCard';
import { supabase } from '../services/supabaseClient';
import { Typography, Modal, Button } from '@mui/material';
import { FaFilter } from 'react-icons/fa';

const ITEMS_PER_PAGE = 6;

const HomePage = () => {
    const [openMats, setOpenMats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        city: '',
        level: '',
        date: '',
        discipline: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUser] = useState(null);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [localFilters, setLocalFilters] = useState(filters);

    useEffect(() => {
        const fetchOpenMats = async () => {
            try {
                let query = supabase
                    .from('open_mats')
                    .select('*')
                    .order('date', { ascending: true });

                if (filters.city) {
                    query = query.ilike('city', `%${filters.city}%`);
                }
                if (filters.level) {
                    query = query.eq('level', filters.level);
                }
                if (filters.discipline) {
                    query = query.eq('discipline', filters.discipline);
                }
                if (filters.date) {
                    const selectedDate = new Date(filters.date);
                    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0)).toISOString();
                    const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999)).toISOString();
                    query = query.gte('date', startOfDay).lte('date', endOfDay);
                }

                const { data, error } = await query;
                if (error) throw error;
                setOpenMats(data || []);

                const uniqueCities = [...new Set(data.map(mat => mat.city))].sort();
                setCitySuggestions(uniqueCities);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchUser = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    setUser(session.user);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération de la session:', error);
            }
        };

        fetchOpenMats();
        fetchUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                setUser(null);
            } else if (event === 'SIGNED_IN') {
                setUser(session.user);
            }
        });

        return () => {
            if (authListener?.subscription) {
                authListener.subscription.unsubscribe();
            }
        };
    }, [filters]);

    const filteredOpenMats = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();
        return openMats.filter(mat => {
            const matchesSearch = !term ||
                mat.club_name?.toLowerCase().includes(term) ||
                mat.city?.toLowerCase().includes(term) ||
                mat.coach_name?.toLowerCase().includes(term) ||
                (mat.description && mat.description.toLowerCase().includes(term));

            const matchesFilters = (!filters.discipline || mat.discipline === filters.discipline) &&
                (!filters.level || mat.level === filters.level) &&
                (!filters.city || mat.city.toLowerCase() === filters.city.toLowerCase());

            return matchesSearch && matchesFilters;
        });
    }, [searchTerm, filters, openMats]);

    const indexOfLastOpenMat = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstOpenMat = indexOfLastOpenMat - ITEMS_PER_PAGE;
    const currentOpenMats = filteredOpenMats.slice(indexOfFirstOpenMat, indexOfLastOpenMat);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleApplyFilters = (newFilters) => {
        const validatedFilters = {
            ...newFilters,
            city: newFilters.city?.trim(),
            level: newFilters.level?.trim(),
            discipline: newFilters.discipline?.trim(),
            date: newFilters.date || ''
        };
        setFilters(validatedFilters);
        setIsFilterModalOpen(false);
        setCurrentPage(1);
    };

    const handleResetFilters = () => {
        const emptyFilters = {
            city: '',
            level: '',
            date: '',
            discipline: ''
        };
        setFilters(emptyFilters);
        setLocalFilters(emptyFilters);
        setSearchTerm('');
        setCurrentPage(1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleApply = () => {
        handleApplyFilters(localFilters);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Helmet>
                <title>OpenMat France - Trouvez des Open Mats de Jiu-Jitsu Brésilien et Grappling</title>
                <meta name="description" content="Trouvez des Open Mats de Jiu-Jitsu Brésilien et Grappling partout en France. Rejoignez la communauté et participez à des événements près de chez vous." />
                <meta name="keywords" content="OpenMat, Jiu-Jitsu Brésilien, Grappling, France, Open Mats, événements sportifs" />
                <meta property="og:title" content="OpenMat France - Trouvez des Open Mats de Jiu-Jitsu Brésilien et Grappling" />
                <meta property="og:description" content="Trouvez des Open Mats de Jiu-Jitsu Brésilien et Grappling partout en France. Rejoignez la communauté et participez à des événements près de chez vous." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://open-mat-france.vercel.app/" />
                <meta property="og:image" content="URL_DE_VOTRE_IMAGE" />
            </Helmet>

            <div className="bg-primary-700 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
                            OpenMat France
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-lg sm:text-xl">
                            Trouvez des Open Mats de Jiu-Jitsu Brésilien et Grappling partout en France.
                        </p>
                        <br />
                        {user ? (
                            <Typography variant="body1" className="mt-4 text-black">
                                Bonjour, {user.email} !
                            </Typography>
                        ) : (
                            <Typography variant="body1" className="mt-4 text-black">
                                Vous n'êtes pas connecté. Veuillez vous connecter pour accéder à toutes les fonctionnalités.
                            </Typography>
                        )}
                        <div className="mt-8 flex justify-center text-black">
                            <Link
                                to="/add"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                            >
                                <PlusCircleIcon className="h-5 w-5 mr-2 text-black" />
                                Ajouter un Open Mat
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                setLocalFilters(filters);
                                setIsFilterModalOpen(true);
                            }}
                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                        >
                            <FaFilter className="mr-2 h-5 w-5 text-gray-400" />
                            Filtres
                            {(filters.city || filters.level || filters.date || filters.discipline) && (
                                <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-primary-100 text-primary-800 rounded-full">
                                    {Object.values(filters).filter(Boolean).length}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={handleResetFilters}
                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                        >
                            <XMarkIcon className="mr-2 h-5 w-5 text-gray-400" />
                            Réinitialiser
                        </button>
                    </div>
                </div>

                {/* Affichage des filtres actifs */}
                {(filters.city || filters.level || filters.date || filters.discipline) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {filters.city && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                Ville: {filters.city}
                                <button
                                    onClick={() => handleApplyFilters({ ...filters, city: '' })}
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                    <XMarkIcon className="h-4 w-4" />
                                </button>
                            </span>
                        )}
                        {filters.level && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                Niveau: {filters.level}
                                <button
                                    onClick={() => handleApplyFilters({ ...filters, level: '' })}
                                    className="ml-2 text-green-600 hover:text-green-800"
                                >
                                    <XMarkIcon className="h-4 w-4" />
                                </button>
                            </span>
                        )}
                        {filters.date && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                Date: {new Date(filters.date).toLocaleDateString('fr-FR')}
                                <button
                                    onClick={() => handleApplyFilters({ ...filters, date: '' })}
                                    className="ml-2 text-purple-600 hover:text-purple-800"
                                >
                                    <XMarkIcon className="h-4 w-4" />
                                </button>
                            </span>
                        )}
                        {filters.discipline && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                                Discipline: {filters.discipline}
                                <button
                                    onClick={() => handleApplyFilters({ ...filters, discipline: '' })}
                                    className="ml-2 text-orange-600 hover:text-orange-800"
                                >
                                    <XMarkIcon className="h-4 w-4" />
                                </button>
                            </span>
                        )}
                    </div>
                )}

                <div className="mt-8">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium text-red-900">Une erreur est survenue</h3>
                            <p className="mt-2 text-sm text-red-500">
                                {error}
                            </p>
                        </div>
                    ) : filteredOpenMats.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium text-gray-900">Aucun Open Mat trouvé</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Aucun Open Mat ne correspond à vos critères de recherche. Essayez de modifier vos filtres ou d'ajouter un nouvel Open Mat.
                            </p>
                            <br />
                            <Link
                                to="/add"
                                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                <PlusCircleIcon className="h-5 w-5 mr-2 text-black" />
                                <p className="text-black">
                                    Ajouter un Open Mat
                                </p>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="mb-4 flex justify-between items-center">
                                <h2 className="text-lg font-medium text-gray-900">
                                    {filteredOpenMats.length} Open Mat{filteredOpenMats.length > 1 ? 's' : ''} trouvé{filteredOpenMats.length > 1 ? 's' : ''}
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {currentOpenMats.map((openMat, index) => (
                                    <div
                                        key={openMat.id}
                                        className="opacity-0 animate-fade-up"
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                            animationFillMode: 'forwards'
                                        }}
                                    >
                                        <OpenMatCard openMat={openMat} />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex justify-center">
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>

                                    {Array.from({ length: Math.ceil(filteredOpenMats.length / ITEMS_PER_PAGE) }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => paginate(i + 1)}
                                            aria-current={currentPage === i + 1 ? 'page' : undefined}
                                            className={`${currentPage === i + 1
                                                ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === Math.ceil(filteredOpenMats.length / ITEMS_PER_PAGE)}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Next</span>
                                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </nav>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Modal open={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)}>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-2xl w-96 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                            <FaFilter className="mr-2 text-primary-600" />
                            Filtres
                        </h2>
                        <button
                            onClick={() => setIsFilterModalOpen(false)}
                            className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Ville */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Ville
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="city"
                                    value={localFilters.city}
                                    onChange={handleInputChange}
                                    placeholder="Toutes les villes"
                                    className="block w-full pl-4 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors duration-200"
                                />
                                {localFilters.city && !citySuggestions.some(city => city.toLowerCase() === localFilters.city.toLowerCase()) && (
                                    <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                        {citySuggestions
                                            .filter(city => city.toLowerCase().includes(localFilters.city.toLowerCase()))
                                            .map((city, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => setLocalFilters(prev => ({ ...prev, city }))}
                                                    className="px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                                                >
                                                    {city}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Niveau */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Niveau
                            </label>
                            <select
                                name="level"
                                value={localFilters.level}
                                onChange={handleInputChange}
                                className="block w-full pl-4 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors duration-200"
                            >
                                <option value="">Tous les niveaux</option>
                                <option value="débutant">Débutant</option>
                                <option value="intermédiaire">Intermédiaire</option>
                                <option value="avancé">Avancé</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Date
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="date"
                                    name="date"
                                    value={localFilters.date}
                                    onChange={handleInputChange}
                                    className="block w-full pl-4 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors duration-200"
                                />
                                <button
                                    onClick={() => {
                                        const today = new Date().toISOString().split('T')[0];
                                        setLocalFilters(prev => ({
                                            ...prev,
                                            date: today
                                        }));
                                    }}
                                    className="px-4 py-2.5 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 whitespace-nowrap"
                                >
                                    Aujourd'hui
                                </button>
                            </div>
                        </div>

                        {/* Discipline */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                Discipline
                            </label>
                            <select
                                name="discipline"
                                value={localFilters.discipline}
                                onChange={handleInputChange}
                                className="block w-full pl-4 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors duration-200"
                            >
                                <option value="">Toutes les disciplines</option>
                                <option value="jiu-jitsu">Jiu-Jitsu</option>
                                <option value="grappling">Grappling</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end space-x-4">
                        <button
                            onClick={() => {
                                setLocalFilters({
                                    city: '',
                                    level: '',
                                    date: '',
                                    discipline: ''
                                });
                            }}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                        >
                            Réinitialiser
                        </button>
                        <button
                            onClick={handleApply}
                            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                        >
                            Appliquer
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default HomePage;
