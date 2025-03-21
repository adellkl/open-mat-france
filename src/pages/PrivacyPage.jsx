import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const PrivacyPage = () => {
    return (
        <>
            <Helmet>
                <title>Politique de confidentialité - OpenMat France</title>
                <meta name="description" content="Politique de confidentialité d'OpenMat France" />
            </Helmet>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto px-4 py-12"
            >
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Politique de confidentialité</h1>

                <div className="space-y-6 text-gray-600">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Collecte d'informations</h2>
                        <p>
                            Nous collectons les informations que vous nous fournissez directement lors de l'inscription et de l'utilisation de notre plateforme, notamment :
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Nom et prénom</li>
                            <li>Adresse e-mail</li>
                            <li>Informations de profil (niveau, club, etc.)</li>
                            <li>Données de localisation pour les Open Mats</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Utilisation des informations</h2>
                        <p>
                            Nous utilisons vos informations pour :
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Gérer votre compte et vos préférences</li>
                            <li>Faciliter la communication entre les utilisateurs</li>
                            <li>Améliorer nos services</li>
                            <li>Envoyer des notifications pertinentes</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Protection des données</h2>
                        <p>
                            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Cookies</h2>
                        <p>
                            Nous utilisons des cookies pour améliorer votre expérience sur notre site. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Vos droits</h2>
                        <p>
                            Vous avez le droit de :
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Accéder à vos données personnelles</li>
                            <li>Corriger vos données</li>
                            <li>Demander la suppression de vos données</li>
                            <li>Vous opposer au traitement de vos données</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Contact</h2>
                        <p>
                            Pour toute question concernant notre politique de confidentialité, vous pouvez nous contacter à l'adresse e-mail :{' '}
                            <a href="mailto:adelloukal2@gmail.com" className="text-primary-600 hover:underline">
                                adelloukal2@gmail.com
                            </a>
                        </p>
                    </section>
                </div>
            </motion.div>
        </>
    );
};

export default PrivacyPage; 