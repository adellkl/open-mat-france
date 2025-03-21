import React from 'react';
import { FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaGraduationCap, FaHeart, FaHandshake, FaEnvelope, FaShieldAlt } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
    const features = [
        {
            icon: <FaUsers className="w-8 h-8 text-gray-600" />,
            title: 'Communauté Active',
            description: 'Rejoignez une communauté passionnée de pratiquants de JJB et Luta Livre.'
        },
        {
            icon: <FaCalendarAlt className="w-8 h-8 text-gray-600" />,
            title: 'Événements Réguliers',
            description: 'Découvrez des Open Mats organisés régulièrement dans toute la France.'
        },
        {
            icon: <FaMapMarkerAlt className="w-8 h-8 text-gray-600" />,
            title: 'Localisation Facile',
            description: 'Trouvez facilement les Open Mats près de chez vous.'
        },
        {
            icon: <FaGraduationCap className="w-8 h-8 text-gray-600" />,
            title: 'Tous Niveaux',
            description: 'Des événements adaptés à tous les niveaux, du débutant au confirmé.'
        },
        {
            icon: <FaHeart className="w-8 h-8 text-gray-600" />,
            title: 'Passion Partagée',
            description: 'Partagez votre passion pour le grappling avec d\'autres pratiquants.'
        },
        {
            icon: <FaHandshake className="w-8 h-8 text-gray-600" />,
            title: 'Échange & Partage',
            description: 'Apprenez et échangez avec des partenaires de différents clubs.'
        }
    ];

    // Refs pour chaque section
    const missionRef = useRef(null);
    const openMatRef = useRef(null);
    const featuresRef = useRef(null);
    const privacyRef = useRef(null);
    const contactRef = useRef(null);

    // Utilisation de useInView pour chaque section
    const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
    const openMatInView = useInView(openMatRef, { once: true, margin: "-100px" });
    const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
    const privacyInView = useInView(privacyRef, { once: true, margin: "-100px" });
    const contactInView = useInView(contactRef, { once: true, margin: "-100px" });

    return (
        <>
            <Helmet>
                <title>À Propos d'Open Mat France - La Plateforme des Open Mats de JJB et Luta Livre</title>
                <meta name="description" content="Découvrez Open Mat France, la plateforme qui connecte la communauté du grappling en France. Trouvez et participez à des Open Mats de Jiu-Jitsu Brésilien et de Luta Livre près de chez vous." />
                <meta name="keywords" content="Open Mat, JJB, Jiu-Jitsu Brésilien, Luta Livre, grappling, France, communauté, entraînement, sparring" />
                <meta property="og:title" content="À Propos d'Open Mat France - La Plateforme des Open Mats" />
                <meta property="og:description" content="Découvrez Open Mat France, la plateforme qui connecte la communauté du grappling en France. Trouvez et participez à des Open Mats de JJB et Luta Livre." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://jjbparis.com/wp-content/uploads/2017/08/nsm-team-valentin-blumental-jjb.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="À Propos d'Open Mat France - La Plateforme des Open Mats" />
                <meta name="twitter:description" content="Découvrez Open Mat France, la plateforme qui connecte la communauté du grappling en France." />
                <meta name="twitter:image" content="https://jjbparis.com/wp-content/uploads/2017/08/nsm-team-valentin-blumental-jjb.jpg" />
            </Helmet>

            <main className="min-h-screen bg-gray-50">
                {/* Hero Section */}

                {/* Mission Section */}
                <section
                    ref={missionRef}
                    className="py-16 bg-white"
                    aria-labelledby="mission-title"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center">
                                <h2 id="mission-title" className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                    Notre Mission
                                </h2>
                                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                                    Open Mat France a pour objectif de faciliter l'organisation et la participation aux Open Mats de Jiu-Jitsu Brésilien et de Luta Livre en France. Nous croyons en la force de la communauté et en l'importance du partage des connaissances.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* What is Open Mat Section */}
                <section
                    ref={openMatRef}
                    className="py-16 bg-gray-50"
                    aria-labelledby="openmat-title"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={openMatInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <article className="bg-white rounded-xl shadow-sm p-8 transition-shadow duration-300">
                                <h2 id="openmat-title" className="text-2xl font-bold text-gray-900 mb-6">Qu'est-ce qu'un Open Mat ?</h2>
                                <p className="text-gray-600 mb-8">
                                    Une session d'entraînement libre où les participants peuvent pratiquer sans cours structuré, sous forme de sparring ou d'échanges techniques.
                                </p>

                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Comment ça marche ?</h3>
                                <ul className="space-y-4 text-gray-600">
                                    <li className="flex items-start group transition-colors duration-300">
                                        <FaMapMarkerAlt className="w-5 h-5 text-black mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                        <span>Les clubs, coachs ou pratiquants peuvent ajouter un Open Mat.</span>
                                    </li>
                                    <li className="flex items-start group hover:text-gray-900 transition-colors duration-300">
                                        <FaCalendarAlt className="w-5 h-5 text-black mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                        <span>Les informations sont partagées avec toute la communauté.</span>
                                    </li>
                                    <li className="flex items-start group hover:text-gray-900 transition-colors duration-300">
                                        <FaGraduationCap className="w-5 h-5 text-black mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                        <span>Les pratiquants peuvent rechercher et filtrer les Open Mats.</span>
                                    </li>
                                    <li className="flex items-start group hover:text-gray-900 transition-colors duration-300">
                                        <FaHandshake className="w-5 h-5 text-black mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                        <span>Tout le monde peut participer selon les conditions indiquées.</span>
                                    </li>
                                </ul>
                            </article>
                        </div>
                    </motion.div>
                </section>

                {/* Features Grid */}
                <section
                    ref={featuresRef}
                    className="py-16 bg-white"
                    aria-labelledby="features-title"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 id="features-title" className="sr-only">Fonctionnalités</h2>
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {features.map((feature, index) => (
                                    <motion.article
                                        key={index}
                                        className="relative group bg-white p-8 rounded-xl shadow-sm hover:shadow-lg hover:shadow-gray-200 transition-all duration-300 hover:-translate-y-1"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-6 group-hover:bg-gray-100 transition-colors duration-300">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {feature.description}
                                        </p>
                                    </motion.article>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Privacy Policy Section */}
                <section
                    ref={privacyRef}
                    className="py-16 bg-gray-50"
                    aria-labelledby="privacy-title"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={privacyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <article className="bg-white rounded-xl shadow-sm p-8 transition-shadow duration-300">
                                <h2 id="privacy-title" className="text-2xl font-bold text-gray-900 mb-6">Politique de Confidentialité</h2>
                                <p className="text-gray-600 mb-6">
                                    Chez Open Mat France, nous prenons la confidentialité de vos informations personnelles très au sérieux. Voici comment nous utilisons et protégeons vos données :
                                </p>
                                <ul className="space-y-4 text-gray-600">
                                    <li className="flex items-start group hover:text-gray-900 transition-colors duration-300">
                                        <FaShieldAlt className="w-5 h-5 text-gray-600 mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                        <span>Vos informations personnelles sont utilisées uniquement pour les besoins de la plateforme, comme la gestion des sessions et la communication.</span>
                                    </li>
                                    <li className="flex items-start group hover:text-gray-900 transition-colors duration-300">
                                        <FaShieldAlt className="w-5 h-5 text-gray-600 mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                        <span>Nous ne partageons pas vos informations avec des tiers sans votre consentement explicite.</span>
                                    </li>
                                    <li className="flex items-start group hover:text-gray-900 transition-colors duration-300">
                                        <FaShieldAlt className="w-5 h-5 text-gray-600 mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                        <span>Nous mettons en œuvre des mesures de sécurité pour protéger vos données contre les accès non autorisés et les pertes.</span>
                                    </li>
                                    <li className="flex items-start group hover:text-gray-900 transition-colors duration-300">
                                        <FaShieldAlt className="w-5 h-5 text-gray-600 mt-1 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                        <span>Vous avez le droit de consulter, de corriger ou de supprimer vos informations personnelles à tout moment en nous contactant.</span>
                                    </li>
                                </ul>
                            </article>
                        </div>
                    </motion.div>
                </section>

                {/* Contact Section */}
                <section
                    ref={contactRef}
                    className="py-16 bg-white"
                    aria-labelledby="contact-title"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center">
                                <h2 id="contact-title" className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                    Contactez-nous
                                </h2>
                                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                                    Vous avez des questions ou des suggestions ? N'hésitez pas à nous contacter.
                                </p>
                                <div className="mt-8">
                                    <a
                                        href="mailto:adelloukal2@gmail.com"
                                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300"
                                        aria-label="Envoyer un email à Open Mat France"
                                    >
                                        <FaEnvelope className="w-5 h-5 mr-2" aria-hidden="true" />
                                        Nous contacter
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </main>
        </>
    );
};

export default AboutPage;
