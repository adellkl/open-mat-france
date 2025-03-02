import React, { useEffect, useState } from 'react';
import { getFavorites } from '../services/api';
import OpenMatCard from '../components/OpenMatCard';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const userId = 'USER_ID';

    useEffect(() => {
        const fetchFavorites = async () => {
            const data = await getFavorites(userId);
            setFavorites(data);
        };

        fetchFavorites();
    }, [userId]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-extrabold text-gray-600 sm:text-4xl mb-6">Mes Favoris</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {favorites.map((favorite) => (
                    <OpenMatCard key={favorite.open_mat_id} openMat={favorite} />
                ))}
            </div>
        </div>
    );
};

export default FavoritesPage;
