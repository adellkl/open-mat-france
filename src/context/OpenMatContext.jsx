import React, { createContext, useState, useContext, useEffect } from 'react';
import { getOpenMats, getOpenMatById as fetchOpenMatById } from '../services/api';

const OpenMatContext = createContext();

export const useOpenMat = () => useContext(OpenMatContext);

export const OpenMatProvider = ({ children }) => {
    const [openMats, setOpenMats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOpenMats = async () => {
        try {
            setLoading(true);
            const data = await getOpenMats();
            setOpenMats(data);
            setError(null);
        } catch (err) {
            console.error('Erreur lors du chargement des Open Mats:', err);
            setError('Erreur lors du chargement des Open Mats');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOpenMats();
    }, []);

    const getOpenMatById = (id) => {
        return openMats.find(mat => mat.id === id);
    };

    const getOpenMatByIdAsync = async (id) => {
        try {
            return await fetchOpenMatById(id);
        } catch (err) {
            console.error('Erreur lors du chargement de l\'Open Mat:', err);
            throw err;
        }
    };

    const value = {
        openMats,
        loading,
        error,
        fetchOpenMats,
        getOpenMatById,
        getOpenMatByIdAsync
    };

    return (
        <OpenMatContext.Provider value={value}>
            {children}
        </OpenMatContext.Provider>
    );
};

export default OpenMatContext;