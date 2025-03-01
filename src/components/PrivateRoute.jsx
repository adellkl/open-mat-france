import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../services/api'; // Assurez-vous d'importer supabase

const PrivateRoute = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
            }
            setLoading(false);
        };

        checkAuth();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                setUser(null);
            } else if (event === 'SIGNED_IN') {
                setUser(session.user);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Afficher un indicateur de chargement pendant la vérification
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
