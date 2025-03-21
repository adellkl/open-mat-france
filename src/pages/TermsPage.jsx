import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const TermsPage = () => {
    return (
        <>
            <Helmet>
                <title>Conditions d'utilisation - OpenMat France</title>
                <meta name="description" content="Conditions d'utilisation d'OpenMat France" />
            </Helmet>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto px-4 py-12"
            >
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Conditions d'utilisation</h1>

                <div className="space-y-6 text-gray-600">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptation des conditions</h2>
                        <p>
                            En accédant et en utilisant OpenMat France, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description du service</h2>
                        <p>
                            OpenMat France est une plateforme qui permet aux pratiquants de grappling de :
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Trouver des Open Mats dans leur région</li>
                            <li>Publier des événements Open Mat</li>
                            <li>Communiquer avec d'autres pratiquants</li>
                            <li>Partager des informations sur la communauté</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Responsabilités des utilisateurs</h2>
                        <p>
                            En utilisant notre plateforme, vous vous engagez à :
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Fournir des informations exactes et à jour</li>
                            <li>Respecter les autres utilisateurs</li>
                            <li>Ne pas publier de contenu illégal ou inapproprié</li>
                            <li>Maintenir la confidentialité de votre compte</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Propriété intellectuelle</h2>
                        <p>
                            Tout le contenu présent sur OpenMat France est protégé par les droits d'auteur et autres lois sur la propriété intellectuelle. Vous ne pouvez pas utiliser ce contenu sans notre autorisation écrite.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Limitation de responsabilité</h2>
                        <p>
                            OpenMat France n'est pas responsable des dommages directs, indirects, accessoires ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser notre service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Modification des conditions</h2>
                        <p>
                            Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur dès leur publication sur la plateforme.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Contact</h2>
                        <p>
                            Pour toute question concernant ces conditions d'utilisation, vous pouvez nous contacter à l'adresse e-mail :{' '}
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