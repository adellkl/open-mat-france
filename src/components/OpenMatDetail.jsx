import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowBack as ArrowLeftIcon,
    LocationOn as MapPinIcon,
    Group as UserGroupIcon,
    Phone as PhoneIcon,
    Email as EnvelopeIcon,
    Language as WebsiteIcon,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { getOpenMatById } from '../services/api';

const OpenMatDetail = () => {
    const { id } = useParams();
    const [openMat, setOpenMat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOpenMat = async () => {
            try {
                setLoading(true);
                const data = await getOpenMatById(id);
                setOpenMat(data);
            } catch (err) {
                setError('Erreur lors du chargement des détails');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOpenMat();
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            </div>
        );
    }

    if (error || !openMat) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-red-50 p-4 rounded-md">
                    <h2 className="text-lg font-medium text-red-800">Erreur</h2>
                    <p className="mt-2 text-sm text-red-700">
                        {error || "Impossible de trouver les détails de cet Open Mat."}
                    </p>
                    <Link to="/" className="mt-4 inline-block">
                        <Button variant="outlined" color="primary" startIcon={<ArrowLeftIcon />}>
                            Retour à la liste
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link to="/" className="mb-6 inline-block">
                <Button variant="outlined" color="primary" startIcon={<ArrowLeftIcon />}>
                    Retour à la liste
                </Button>
            </Link>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 w-full overflow-hidden">
                    <img
                        src={openMat.image_url || 'https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aml1JTIwaml0c3V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=60'}
                        alt={openMat.club_name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-6 sm:p-8">
                    <h1 className="text-2xl font-bold text-gray-900">{openMat.club_name}</h1>

                    <div className="mt-2 flex items-center">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
                            {openMat.discipline}
                        </span>
                        <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                            {openMat.level}
                        </span>
                        <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-green-800">
                            {openMat.speciality}
                        </span>
                        {openMat.website && (
                            <a href={openMat.website} target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800 hover:text-primary-600">
                                <WebsiteIcon className="mr-1 h-5 w-5 text-gray-500" />
                                Site Web
                            </a>
                        )}
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-6">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500 flex items-center">
                                    <UserGroupIcon className="mr-1 h-5 w-5 text-gray-400" />
                                    Coach
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">{openMat.coach_name}</dd>
                            </div>

                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500 flex items-center">
                                    <MapPinIcon className="mr-1 h-5 w-5 text-gray-400" />
                                    Localisation
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">{openMat.city}, {openMat.address}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-6">
                        <h2 className="text-lg font-medium text-gray-900">Contact</h2>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {openMat.contact_email && (
                                <div className="flex items-center text-sm text-gray-500">
                                    <PhoneIcon className="mr-1.5 h-5 w-5 text-gray-400" />
                                    <a href={`mailto:${openMat.contact_email}`} className="hover:text-primary-600">
                                        {openMat.contact_email}
                                    </a>
                                </div>
                            )}

                            {openMat.contact_phone && (
                                <div className="flex items-center text-sm text-gray-500">
                                    <EnvelopeIcon className="mr-1.5 h-5 w-5 text-gray-400" />
                                    <a href={`tel:${openMat.contact_phone}`} className="hover:text-primary-600">
                                        {openMat.contact_phone}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => window.open(
                                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${openMat.address}, ${openMat.city}`)}`,
                                '_blank',
                                'noopener,noreferrer'
                            )}
                        >
                            Voir sur Google Maps 📍
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpenMatDetail;
