import { openDB } from 'idb';

const DB_NAME = 'openmat-offline';
const DB_VERSION = 1;

const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            // Store pour les Open Mats
            if (!db.objectStoreNames.contains('openMats')) {
                const openMatsStore = db.createObjectStore('openMats', { keyPath: 'id' });
                openMatsStore.createIndex('date', 'date');
                openMatsStore.createIndex('city', 'city');
            }

            // Store pour les préférences utilisateur
            if (!db.objectStoreNames.contains('userPreferences')) {
                db.createObjectStore('userPreferences', { keyPath: 'id' });
            }
        },
    });
};

export const offlineService = {
    // Initialiser la base de données
    async init() {
        return await initDB();
    },

    // Sauvegarder les Open Mats
    async saveOpenMats(openMats) {
        const db = await initDB();
        const tx = db.transaction('openMats', 'readwrite');
        const store = tx.objectStore('openMats');

        for (const openMat of openMats) {
            await store.put(openMat);
        }

        await tx.done;
    },

    // Récupérer les Open Mats
    async getOpenMats() {
        const db = await initDB();
        return await db.getAll('openMats');
    },

    // Sauvegarder les préférences utilisateur
    async saveUserPreferences(preferences) {
        const db = await initDB();
        const tx = db.transaction('userPreferences', 'readwrite');
        const store = tx.objectStore('userPreferences');

        await store.put({
            id: 'current',
            ...preferences
        });

        await tx.done;
    },

    // Récupérer les préférences utilisateur
    async getUserPreferences() {
        const db = await initDB();
        return await db.get('userPreferences', 'current');
    },

    // Vérifier si l'application est en ligne
    isOnline() {
        return navigator.onLine;
    },

    // Écouter les changements d'état de connexion
    onConnectionChange(callback) {
        window.addEventListener('online', () => callback(true));
        window.addEventListener('offline', () => callback(false));
    }
}; 