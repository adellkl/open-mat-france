import React, { useState } from 'react';
import { FaMapMarkerAlt, FaGraduationCap, FaPhone, FaEnvelope, FaCalendarAlt, FaClock, FaUsers, FaInfoCircle, FaTimes, FaUserTie, FaEuroSign } from 'react-icons/fa';
import { supabase } from '../services/supabaseClient';

const OpenMatCard = ({ openMat }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleViewDetails = async () => {
        setShowDetails(true);
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from('open_mats')
                .select('*')
                .eq('id', openMat.id)
                .single();

            if (error) throw error;
            setDetails(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des détails:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getGoogleMapsUrl = (address, city) => {
        const query = encodeURIComponent(`${address}, ${city}`);
        return `https://www.google.com/maps/search/?api=1&query=${query}`;
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer relative group">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={openMat.image_url || 'https://images.unsplash.com/photo-1578768079059-4b3e6b7c3b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                    alt={openMat.club_name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{openMat.club_name}</h3>
                    <p className="text-sm text-white/90">{openMat.city}</p>
                </div>
            </div>

            {/* Contenu */}
            <div className="p-6">
                <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                        <FaMapMarkerAlt className="w-5 h-5 mr-2 text-gray-900" />
                        <span className="group-hover:text-gray-900 transition-colors duration-300">{openMat.city}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                        <FaGraduationCap className="w-5 h-5 mr-2 text-gray-900" />
                        <span className="group-hover:text-gray-900 transition-colors duration-300">{openMat.level}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                        <FaCalendarAlt className="w-5 h-5 mr-2 text-gray-900" />
                        <span className="group-hover:text-gray-900 transition-colors duration-300">{formatDate(openMat.date)}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                        <FaClock className="w-5 h-5 mr-2 text-gray-900" />
                        <span className="group-hover:text-gray-900 transition-colors duration-300">{formatTime(openMat.start_time)} - {formatTime(openMat.end_time)}</span>
                    </div>

                    {openMat.max_participants && (
                        <div className="flex items-center text-gray-600">
                            <FaUsers className="w-5 h-5 mr-2 text-gray-900" />
                            <span className="group-hover:text-gray-900 transition-colors duration-300">Max {openMat.max_participants} participants</span>
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <button
                        onClick={handleViewDetails}
                        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 group"
                    >
                        <FaInfoCircle className="w-4 h-4 mr-2" />
                        Voir les détails
                    </button>
                </div>
            </div>

            {/* Modal de détails */}
            {showDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-4 relative">
                        <button
                            onClick={() => setShowDetails(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                        >
                            <FaTimes className="h-6 w-6" />
                        </button>

                        {loading ? (
                            <div className="flex justify-center items-center h-32">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-4">
                                <p className="text-red-500">{error}</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-900">{details?.club_name}</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-600">
                                        <FaMapMarkerAlt className="w-5 h-5 mr-2 text-gray-900" />
                                        <span>{details?.address}, {details?.city}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <FaCalendarAlt className="w-5 h-5 mr-2 text-gray-900" />
                                        <span>{formatDate(details?.date)}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <FaClock className="w-5 h-5 mr-2 text-gray-900" />
                                        <span>{formatTime(details?.start_time)} - {formatTime(details?.end_time)}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <FaGraduationCap className="w-5 h-5 mr-2 text-gray-900" />
                                        <span>{details?.level}</span>
                                    </div>
                                    {details?.coach_name && (
                                        <div className="flex items-center text-gray-600">
                                            <FaUserTie className="w-5 h-5 mr-2 text-gray-900" />
                                            <span>{details?.coach_name}</span>
                                        </div>
                                    )}
                                    {details?.price && (
                                        <div className="flex items-center text-gray-600">
                                            <FaEuroSign className="w-5 h-5 mr-2 text-gray-900" />
                                            <span>{details?.price}€</span>
                                        </div>
                                    )}
                                    {details?.contact_phone && (
                                        <div className="flex items-center text-gray-600">
                                            <FaPhone className="w-5 h-5 mr-2 text-gray-900" />
                                            <a href={`tel:${details?.contact_phone}`} className="hover:text-gray-900">
                                                {details?.contact_phone}
                                            </a>
                                        </div>
                                    )}
                                    {details?.contact_email && (
                                        <div className="flex items-center text-gray-600">
                                            <FaEnvelope className="w-5 h-5 mr-2 text-gray-900" />
                                            <a href={`mailto:${details?.contact_email}`} className="hover:text-gray-900">
                                                {details?.contact_email}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Bouton Google Maps */}
                                <div className="mt-6">
                                    <a
                                        href={getGoogleMapsUrl(details?.address, details?.city)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-black bg-white border-2 border-black rounded-lg hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300"
                                    >
                                        <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                                        Voir sur Google Maps
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OpenMatCard;
