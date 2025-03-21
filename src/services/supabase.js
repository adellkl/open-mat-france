import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Les variables d\'environnement Supabase ne sont pas définies');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fonction pour créer un bucket de stockage s'il n'existe pas
export const initializeStorage = async () => {
    try {
        const { data: buckets } = await supabase.storage.listBuckets();
        const openMatImagesBucket = buckets.find(bucket => bucket.name === 'open-mat-images');

        if (!openMatImagesBucket) {
            const { data, error } = await supabase.storage.createBucket('open-mat-images', {
                public: true,
                fileSizeLimit: 5242880, // 5MB
            });

            if (error) {
                throw error;
            }

            console.log('Bucket open-mat-images créé avec succès');
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation du stockage:', error);
    }
}; 