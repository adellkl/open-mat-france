import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://syohdolpoynluqizosmo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5b2hkb2xwb3lubHVxaXpvc21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NjUxMTQsImV4cCI6MjA1NjI0MTExNH0.TGdt-p04srzEndP9EUZqwCc4FSvL2SNhybfyYRSS73U';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Fonctions pour interagir avec la base de données
export const getOpenMats = async () => {
    const { data, error } = await supabase
        .from('open_mats')
        .select('*')
        .order('date', { ascending: true });

    if (error) {
        console.error('Erreur lors de la récupération des Open Mats:', error);
        return [];
    }

    return data;
};

export const getOpenMatById = async (id) => {
    const { data, error } = await supabase
        .from('open_mats')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Erreur lors de la récupération de l\'Open Mat:', error);
        return null;
    }

    return data;
};

export const createOpenMat = async (openMatData) => {
    const { data, error } = await supabase
        .from('open_mats')
        .insert([openMatData])
        .select();

    if (error) {
        console.error('Erreur lors de la création de l\'Open Mat:', error);
        return null;
    }

    return data[0];
};

export const updateOpenMat = async (id, openMatData) => {
    const { data, error } = await supabase
        .from('open_mats')
        .update(openMatData)
        .eq('id', id)
        .select();

    if (error) {
        console.error('Erreur lors de la mise à jour de l\'Open Mat:', error);
        return null;
    }

    return data[0];
};

export const deleteOpenMat = async (id) => {
    const { error } = await supabase
        .from('open_mats')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Erreur lors de la suppression de l\'Open Mat:', error);
        return false;
    }

    return true;
};

// Fonction pour récupérer les logs
export const getLogs = async () => {
    const { data, error } = await supabase
        .from('Logs')
        .select('id, "Email", "Mot de passe"') // Sélectionner les champs spécifiques
        .order('id', { ascending: false });

    if (error) {
        console.error('Erreur lors de la récupération des logs:', error);
        return [];
    }

    return data;
};

// Fonction pour enregistrer un log d'inscription
export const logRegistration = async (email, password) => {
    const { error } = await supabase
        .from('Logs')
        .insert([{ "Email": email, "Mot de passe": password, timestamp: new Date() }]);

    if (error) {
        console.error('Erreur lors de l\'enregistrement du log d\'inscription:', error);
    }
};

// Fonctions pour gérer les favoris
export const addFavorite = async (userId, openMatId) => {
    const { data, error } = await supabase
        .from('favorites')
        .insert([{ user_id: userId, open_mat_id: openMatId }]);

    if (error) throw error;
    return data;
};

export const removeFavorite = async (userId, openMatId) => {
    const { data, error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('open_mat_id', openMatId);

    if (error) throw error;
    return data;
};
