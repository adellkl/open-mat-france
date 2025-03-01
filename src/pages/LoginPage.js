import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
    Snackbar,
    Alert,
    Tabs,
    Tab,
    IconButton,
    InputAdornment
} from '@mui/material';
import { supabase } from '../services/api'; // Importer supabase
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            if (error.message.includes('Invalid login credentials')) {
                setError('Identifiants incorrects. Veuillez réessayer.');
            } else {
                setError('Erreur lors de la connexion. Veuillez réessayer.');
            }
            console.error('Erreur de connexion:', error);
        } else {
            const from = location.state?.from || '/';
            navigate(from);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            if (error.message.includes('User already registered')) {
                setError('Cet utilisateur est déjà enregistré.');
            } else if (error.message.includes('Password should be at least')) {
                setError('Le mot de passe est trop court.');
            } else {
                setError('Erreur lors de l\'inscription. Veuillez vérifier vos informations.');
            }
            console.error('Erreur d\'inscription:', error);
        } else {
            setError('Inscription réussie. Vous pouvez maintenant vous connecter.');
        }
    };

    const closeAlert = () => {
        setError(null);
    };

    const handleTabChange = (event, newValue) => {
        setIsRegistering(newValue === 1);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <Container maxWidth="xs" className="mt-16">
            <Typography variant="h4" gutterBottom align="center">
                {isRegistering ? 'Inscription' : 'Connexion'}
            </Typography>
            <Tabs value={isRegistering ? 1 : 0} onChange={handleTabChange} centered>
                <Tab label="Connexion" />
                <Tab label="Inscription" />
            </Tabs>
            <form onSubmit={isRegistering ? handleRegister : handleLogin} className="mt-8">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            InputProps={{
                                disableUnderline: true,
                                style: {
                                    borderRadius: '8px',
                                    border: '1px solid #e0e0e0',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Mot de passe"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={togglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                                style: {
                                    borderRadius: '8px',
                                    border: '1px solid #e0e0e0',
                                },
                            }}
                        />
                    </Grid>
                    {isRegistering && (
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Confirmer le mot de passe"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={toggleConfirmPasswordVisibility}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    disableUnderline: true,
                                    style: {
                                        borderRadius: '8px',
                                        border: '1px solid #e0e0e0',
                                    },
                                }}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            fullWidth
                            className="mt-4"
                        >
                            {isRegistering ? 'S\'inscrire' : 'Se connecter'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {error && (
                <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={closeAlert}>
                    <Alert onClose={closeAlert} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            )}
        </Container>
    );
};

export default LoginPage;
