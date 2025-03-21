import { supabase } from './supabaseClient';

// Exporter supabase pour les autres composants
export { supabase };

// Fonctions pour interagir avec la base de données
export const getOpenMats = async () => {
    try {
        console.log('Tentative de récupération des Open Mats...');
        const { data, error } = await supabase
            .from('open_mats')
            .select('*')
            .order('date', { ascending: true });

        if (error) {
            console.error('Erreur Supabase:', error);
            throw error;
        }

        console.log('Open Mats récupérés avec succès:', data);
        return data;
    } catch (error) {
        console.error('Erreur détaillée lors de la récupération des Open Mats:', error);
        throw error;
    }
};

export const getOpenMatById = async (id) => {
    try {
        console.log('Recherche de l\'Open Mat avec l\'ID:', id);

        if (!id) {
            return Promise.reject(new Error('ID non fourni'));
        }

        const { data, error } = await supabase
            .from('open_mats')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Erreur Supabase:', error);
            return Promise.reject(new Error('Open Mat non trouvé'));
        }

        if (!data) {
            return Promise.reject(new Error('Open Mat non trouvé'));
        }

        console.log('Open Mat trouvé:', data);
        return Promise.resolve(data);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'Open Mat:', error);
        return Promise.reject(error);
    }
};

export const createOpenMat = async (openMatData) => {
    try {
        const { data, error } = await supabase
            .from('open_mats')
            .insert([openMatData])
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Erreur lors de la création de l\'Open Mat:', error);
        throw error;
    }
};

export const updateOpenMat = async (id, openMatData) => {
    try {
        const { data, error } = await supabase
            .from('open_mats')
            .update(openMatData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'Open Mat:', error);
        throw error;
    }
};

export const deleteOpenMat = async (id) => {
    try {
        const { error } = await supabase
            .from('open_mats')
            .delete()
            .eq('id', id);

        if (error) throw error;
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'Open Mat:', error);
        throw error;
    }
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
    const { error } = await supabase
        .from('favorites')
        .insert([{ user_id: userId, open_mat_id: openMatId }]);

    if (error) throw error;
};

export const removeFavorite = async (userId, openMatId) => {
    const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('open_mat_id', openMatId);

    if (error) throw error;
};

export const uploadImage = async (file) => {
    try {
        // Vérification du type de fichier
        if (!file.type.startsWith('image/')) {
            throw new Error('Le fichier doit être une image');
        }

        // Vérification de la taille (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            throw new Error('L\'image ne doit pas dépasser 5MB');
        }

        // Génération d'un nom de fichier unique
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        // Upload de l'image
        const { error } = await supabase.storage
            .from('open-mat-images')
            .upload(filePath, file);

        if (error) {
            console.error('Erreur lors de l\'upload:', error);
            throw error;
        }

        // Récupération de l'URL publique
        const { data: { publicUrl } } = supabase.storage
            .from('open-mat-images')
            .getPublicUrl(filePath);

        return publicUrl;
    } catch (error) {
        console.error('Erreur lors de l\'upload de l\'image:', error);
        throw error;
    }
};
