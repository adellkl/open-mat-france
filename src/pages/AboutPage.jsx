import React from 'react';
import { Helmet } from 'react-helmet';
import { EnvelopeIcon, CodeBracketIcon, ChatBubbleLeftEllipsisIcon, UserGroupIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const AboutPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Helmet>
                <title>À propos d'OpenMat France - Notre Mission et Comment Ça Marche</title>
                <meta name="description" content="Découvrez la mission d'OpenMat France, comment fonctionne notre plateforme, et comment vous pouvez contribuer à la communauté des Open Mats." />
                <meta name="keywords" content="OpenMat France, mission, plateforme, Open Mats, Jiu-Jitsu Brésilien, Grappling, communauté, contribuer" />
                <meta property="og:title" content="À propos d'OpenMat France - Notre Mission et Comment Ça Marche" />
                <meta property="og:description" content="Découvrez la mission d'OpenMat France, comment fonctionne notre plateforme, et comment vous pouvez contribuer à la communauté des Open Mats." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://open-mat-france.vercel.app/about" />
                <meta property="og:image" content="URL_DE_VOTRE_IMAGE" />
            </Helmet>

            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl font-extrabold text-gray-600 sm:text-4xl">À propos d'OpenMat France</h1>
                <p className="mt-4 text-lg text-gray-500">Découvrez notre mission, comment fonctionne la plateforme, et comment vous pouvez contribuer.</p>
            </div>

            <div className="mt-12 bg-white p-6 rounded-lg shadow-md text-gray-600">
                <h2 className="text-xl font-semibold text-gray-900">Notre mission</h2>
                <p className="mt-4">Faciliter le partage d'informations sur les Open Mats en France, permettant aux pratiquants de s'entraîner avec différents partenaires et de découvrir de nouvelles salles.</p>

                <h2 className="text-xl font-semibold text-gray-900 mt-6">Qu'est-ce qu'un Open Mat ?</h2>
                <p className="mt-4">Une session d'entraînement libre où les participants peuvent pratiquer sans cours structuré, sous forme de sparring ou d'échanges techniques.</p>

                <h2 className="text-xl font-semibold text-gray-900 mt-6">Comment ça marche ?</h2>
                <ul className="mt-4 space-y-2 list-disc list-inside">
                    <li>📌 Les clubs, coachs ou pratiquants peuvent ajouter un Open Mat.</li>
                    <li>📅 Les informations sont partagées avec toute la communauté.</li>
                    <li>🔎 Les pratiquants peuvent rechercher et filtrer les Open Mats.</li>
                    <li>🤝 Tout le monde peut participer selon les conditions indiquées.</li>
                </ul>

                <h2 className="text-xl font-semibold text-gray-900 mt-6">Contribuer</h2>
                <ul className="mt-4 space-y-2 list-disc list-inside">
                    <li><UserGroupIcon className="inline-flex h-5 w-5 mr-2 text-gray-400" /> Ajouter un Open Mat de votre club.</li>
                    <li><ChatBubbleLeftEllipsisIcon className="inline-flex h-5 w-5 mr-2 text-gray-400" /> Partager la plateforme.</li>
                    <li><EnvelopeIcon className="inline-flex h-5 w-5 mr-2 text-gray-400" /> Envoyer des suggestions.</li>
                    <li><CodeBracketIcon className="inline-flex h-5 w-5 mr-2 text-gray-400" /> Contribuer au code sur GitHub.</li>
                </ul>

                <h2 className="text-xl font-semibold text-gray-900 mt-6">Contact</h2>
                <p className="mt-4">📩 Contactez-nous : <a href="mailto:contact@openmatfrance.fr" className="text-primary-600 hover:underline">adelloukal2@gmail.com</a></p>

                <h2 className="text-xl font-semibold text-gray-900 mt-6">Politique de Confidentialité</h2>
                <p className="mt-4">
                    Chez OpenMat France, nous prenons la confidentialité de vos informations personnelles très au sérieux. Voici comment nous utilisons et protégeons vos données :
                </p>
                <ul className="mt-4 space-y-2 list-disc list-inside">
                    <li><ShieldCheckIcon className="inline-flex h-5 w-5 mr-2 text-gray-400" /> Vos informations personnelles sont utilisées uniquement pour les besoins de la plateforme, comme la gestion des sessions et la communication.</li>
                    <li><ShieldCheckIcon className="inline-flex h-5 w-5 mr-2 text-gray-400" /> Nous ne partageons pas vos informations avec des tiers sans votre consentement explicite.</li>
                    <li><ShieldCheckIcon className="inline-flex h-5 w-5 mr-2 text-gray-400" /> Nous mettons en œuvre des mesures de sécurité pour protéger vos données contre les accès non autorisés et les pertes.</li>
                    <li><ShieldCheckIcon className="inline-flex h-5 w-5 mr-2 text-gray-400" /> Vous avez le droit de consulter, de corriger ou de supprimer vos informations personnelles à tout moment en nous contactant.</li>
                </ul>
            </div>
        </div>
    );
};

export default AboutPage;
