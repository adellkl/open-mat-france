import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOpenMat } from '../services/supabase';
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Snackbar,
    Alert
} from '@mui/material';
import { supabase } from '../services/api';

const AddOpenMatPage = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);
    const [formSuccess, setFormSuccess] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [user, setUser] = useState(null);

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
        contact_email: '',
        contact_phone: '',
        website: '',
        image_url: ''
    });

    useEffect(() => {
        const session = supabase.auth.getSession();
        if (session) {
            setUser(session.user);
        }

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                setUser(null);
                navigate('/login');
            } else if (event === 'SIGNED_IN') {
                setUser(session.user);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError(null);

        // Basic validation
        if (!formData.club_name || !formData.city || !formData.date || !formData.start_time || !formData.end_time) {
            setFormError('Please fill in all required fields');
            setIsSubmitting(false);
            return;
        }

        try {
            const result = await createOpenMat(formData);

            if (result) {
                setFormSuccess(true);
                // Redirect to detail page after 2 seconds
                setTimeout(() => {
                    navigate(`/detail/${result.id}`);
                }, 2000);
            } else {
                throw new Error('Error creating Open Mat');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setFormError('An error occurred while creating the Open Mat. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) {
        return (
            <Container>
                <Alert severity="warning">
                    Vous devez être connecté pour ajouter un Open Mat.
                </Alert>
            </Container>
        );
    }

    if (formSuccess) {
        return (
            <Container>
                <Alert severity="success">
                    Open Mat created successfully! You will be redirected to the detail page.
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Add an Open Mat
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Club / Gym Name"
                            name="club_name"
                            value={formData.club_name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Coach Name"
                            name="coach_name"
                            value={formData.coach_name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Date"
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Start Time"
                            type="time"
                            name="start_time"
                            value={formData.start_time}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="End Time"
                            type="time"
                            name="end_time"
                            value={formData.end_time}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Discipline</InputLabel>
                            <Select
                                name="discipline"
                                value={formData.discipline}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="Jiu-Jitsu Brésilien">Brazilian Jiu-Jitsu</MenuItem>
                                <MenuItem value="Grappling">Grappling</MenuItem>
                                <MenuItem value="Luta Livre">Luta Livre</MenuItem>


                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Level</InputLabel>
                            <Select
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="Tous niveaux">All Levels</MenuItem>
                                <MenuItem value="Débutants">Beginners</MenuItem>
                                <MenuItem value="Intermédiaires">Intermediate</MenuItem>
                                <MenuItem value="Avancés">Advanced</MenuItem>
                                <MenuItem value="Compétiteurs">Competitors</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            multiline
                            rows={3}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Contact Email"
                            name="contact_email"
                            value={formData.contact_email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Contact Phone"
                            name="contact_phone"
                            value={formData.contact_phone}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Website or Social Media"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                        />
                        {selectedImage && (
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected Open Mat"
                                style={{ maxHeight: '200px', marginTop: '16px' }}
                            />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            fullWidth
                        >
                            {isSubmitting ? 'Creating Open Mat...' : 'Create Open Mat'}
                        </Button>
                    </Grid>
                    {formError && (
                        <Grid item xs={12}>
                            <Snackbar open={true} autoHideDuration={6000}>
                                <Alert severity="error">{formError}</Alert>
                            </Snackbar>
                        </Grid>
                    )}
                </Grid>
            </form>
        </Container>
    );
};

export default AddOpenMatPage;
