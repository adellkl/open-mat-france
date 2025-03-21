import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createOpenMat, supabase } from '../services/api';

const AddOpenMatPage = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);
    const [formSuccess, setFormSuccess] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        club_name: '',
        coach_name: '',
        city: '',
        address: '',
        date: '',
        start_time: '',
        end_time: '',
        description: '',
        discipline: 'Jiu-Jitsu Brésilien',
        level: 'Tous niveaux',
        speciality: 'Gi/NoGi',
        contact_email: '',
        contact_phone: '',
        website: '',
        image_url: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async (file) => {
        try {
            console.log('Début de la fonction uploadImage');
            console.log('Type de fichier:', file.type);
            console.log('Taille du fichier:', file.size);

            // Vérifier le type de fichier
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                throw new Error('Type de fichier non supporté. Utilisez JPEG, PNG, GIF ou WEBP.');
            }

            // Vérifier la taille du fichier (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                throw new Error('Le fichier est trop volumineux. Taille maximum : 5MB');
            }

            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            console.log('Tentative d\'upload du fichier:', { fileName, filePath });

            const { error: uploadError } = await supabase.storage
                .from('open-mat-images')
                .upload(filePath, file, {
                    contentType: file.type,
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) {
                console.error('Erreur Supabase Storage:', uploadError);
                throw new Error(`Erreur d'upload: ${uploadError.message}`);
            }

            console.log('Upload réussi, récupération de l\'URL...');
            const { data: { publicUrl } } = supabase.storage
                .from('open-mat-images')
                .getPublicUrl(filePath);

            if (!publicUrl) {
                throw new Error('Impossible de récupérer l\'URL publique de l\'image');
            }

            console.log('URL publique récupérée:', publicUrl);
            return publicUrl;
        } catch (error) {
            console.error('Erreur détaillée lors de l\'upload de l\'image:', error);
            throw new Error(`Erreur lors de l'upload de l'image: ${error.message}`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError(null);

        // Validation de base
        if (!formData.club_name || !formData.city || !formData.date || !formData.start_time || !formData.end_time) {
            setFormError('Veuillez remplir tous les champs obligatoires');
            setIsSubmitting(false);
            return;
        }

        try {
            let imageUrl = formData.image_url;

            // Si une image a été sélectionnée, l'uploader
            if (selectedImage) {
                try {
                    imageUrl = await uploadImage(selectedImage);
                } catch (error) {
                    console.error('Erreur lors de l\'upload de l\'image:', error);
                    setFormError('Erreur lors de l\'upload de l\'image. Veuillez réessayer.');
                    setIsSubmitting(false);
                    return;
                }
            }

            // Vérifier si l'utilisateur est connecté
            const { error: sessionError } = await supabase.auth.getSession();

            if (sessionError) {
                throw new Error('Erreur d\'authentification. Veuillez vous connecter.');
            }

            const result = await createOpenMat({
                ...formData,
                image_url: imageUrl
            });

            if (result) {
                setFormSuccess(true);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                throw new Error('Erreur lors de la création de l\'Open Mat');
            }
        } catch (error) {
            console.error('Erreur de soumission:', error);
            if (error.message.includes('authentication')) {
                setFormError('Veuillez vous connecter pour créer un Open Mat.');
            } else {
                setFormError('Une erreur est survenue lors de la création de l\'Open Mat. Veuillez réessayer.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (formSuccess) {
        return (
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-green-800">Open Mat créé avec succès</h3>
                            <div className="mt-2 text-sm text-green-700">
                                <p>Votre Open Mat a été ajouté à la liste. Vous allez être redirigé vers la page d'accueil.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Helmet>
                <title>Ajouter un Open Mat - OpenMat France</title>
                <meta name="description" content="Ajoutez votre Open Mat à la communauté OpenMat France. Partagez les détails de votre événement et attirez plus de participants." />
                <meta name="keywords" content="Ajouter Open Mat, OpenMat France, Jiu-Jitsu Brésilien, Grappling, événements sportifs, créer Open Mat" />
                <meta property="og:title" content="Ajouter un Open Mat - OpenMat France" />
                <meta property="og:description" content="Ajoutez votre Open Mat à la communauté OpenMat France. Partagez les détails de votre événement et attirez plus de participants." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://open-mat-france.vercel.app/add" />
                <meta property="og:image" content="URL_DE_VOTRE_IMAGE" />
            </Helmet>

            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Ajouter un Open Mat</h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Partagez les informations de votre Open Mat avec la communauté. Les champs marqués d'un astérisque (*) sont obligatoires.
                        </p>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form onSubmit={handleSubmit}>
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                {formError && (
                                    <div className="rounded-md bg-red-50 p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-red-800">Erreur</h3>
                                                <div className="mt-2 text-sm text-red-700">
                                                    <p>{formError}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="club_name" className="block text-sm font-medium text-gray-700">
                                            Nom du club / de la salle *
                                        </label>
                                        <input
                                            type="text"
                                            name="club_name"
                                            id="club_name"
                                            value={formData.club_name}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="coach_name" className="block text-sm font-medium text-gray-700">
                                            Nom du coach
                                        </label>
                                        <input
                                            type="text"
                                            name="coach_name"
                                            id="coach_name"
                                            value={formData.coach_name}
                                            onChange={handleChange}
                                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                            Ville *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                            Adresse
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-2">
                                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                            Date *
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-2">
                                        <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
                                            Heure de début *
                                        </label>
                                        <input
                                            type="time"
                                            name="start_time"
                                            id="start_time"
                                            value={formData.start_time}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-2">
                                        <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">
                                            Heure de fin *
                                        </label>
                                        <input
                                            type="time"
                                            name="end_time"
                                            id="end_time"
                                            value={formData.end_time}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="discipline" className="block text-sm font-medium text-gray-700">
                                            Discipline *
                                        </label>
                                        <select
                                            id="discipline"
                                            name="discipline"
                                            value={formData.discipline}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                        >
                                            <option value="Jiu-Jitsu Brésilien">Jiu-Jitsu Brésilien</option>
                                            <option value="Grappling">Grappling</option>
                                            <option value="Luta Livre">Luta Livre</option>

                                        </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                                            Niveau *
                                        </label>
                                        <select
                                            id="level"
                                            name="level"
                                            value={formData.level}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                        >
                                            <option value="Tous niveaux">Tous niveaux</option>
                                            <option value="Débutants">Débutants</option>
                                            <option value="Intermédiaires">Intermédiaires</option>
                                            <option value="Avancés">Avancés</option>
                                            <option value="Compétiteurs">Compétiteurs</option>
                                        </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="speciality" className="block text-sm font-medium text-gray-700">
                                            Spécialité *
                                        </label>
                                        <select
                                            id="speciality"
                                            name="speciality"
                                            value={formData.speciality}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                        >
                                            <option value="Gi">Gi</option>
                                            <option value="NoGi">NoGi</option>
                                            <option value="Gi/NoGi'">Gi/NoGi</option>
                                        </select>
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={3}
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                            placeholder="Informations supplémentaires, thème, particularités..."
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700">
                                            Email de contact
                                        </label>
                                        <input
                                            type="email"
                                            name="contact_email"
                                            id="contact_email"
                                            value={formData.contact_email}
                                            onChange={handleChange}
                                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700">
                                            Téléphone de contact
                                        </label>
                                        <input
                                            type="tel"
                                            name="contact_phone"
                                            id="contact_phone"
                                            value={formData.contact_phone}
                                            onChange={handleChange}
                                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                                            Site web ou Réseaux Sociaux
                                        </label>
                                        <input
                                            type="text"
                                            name="website"
                                            id="website"
                                            value={formData.website}
                                            onChange={handleChange}
                                            placeholder="https://..."
                                            className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                            Image de l'Open Mat
                                        </label>
                                        <div className="mt-1 flex items-center">
                                            <input
                                                type="file"
                                                name="image"
                                                id="image"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="block w-full text-sm text-gray-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-md file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-primary-50 file:text-primary-700
                                                    hover:file:bg-primary-100"
                                            />
                                        </div>
                                        {imagePreview && (
                                            <div className="mt-2">
                                                <img
                                                    src={imagePreview}
                                                    alt="Aperçu"
                                                    className="h-32 w-auto object-cover rounded-md"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Création en cours...' : 'Créer l\'Open Mat'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddOpenMatPage;
