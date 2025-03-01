import { supabase } from './api'; // Correct import

// Fonction pour enregistrer un log de connexion
export const logConnection = async (userId, action) => {
    const { error } = await supabase
        .from('connection_log')
        .insert([{ user_id: userId, action, timestamp: new Date() }]);

    if (error) {
        console.error('Erreur lors de l\'enregistrement du log de connexion:', error);
    }
};

// Fonction pour enregistrer un log de déconnexion
export const logDisconnection = async (userId) => {
    await logConnection(userId, 'déconnecté');
};

// Fonction pour récupérer les logs de connexion
export const getConnectionLogs = async () => {
    const { data, error } = await supabase
        .from('connection_log')
        .select('*')
        .order('timestamp', { ascending: false });

    if (error) {
        console.error('Erreur lors de la récupération des logs de connexion:', error);
        return [];
    }

    return data;
};
