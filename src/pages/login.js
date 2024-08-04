import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/login.module.scss';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isForgotPassword) {
      try {
        const response = await axios.post('/api/forgot-password', { email: resetEmail });
        setMessage(response.data.message);
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    } else {
      try {
        const response = await axios.post('/api/login', { email, password });
        if (response.data.success) {
          window.location.href = '/dashboard';
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className={styles['login-container']}>
      <Container className={styles['login-form-container']}>
        <Typography variant="h4" component="h2" gutterBottom>
          {isForgotPassword ? 'Forgot Password' : 'Login'}
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {message && <Typography color="success">{message}</Typography>}
        <form onSubmit={handleSubmit}>
          {isForgotPassword ? (
            <>
              <Box mb={2}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </Box>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Request Password Reset
              </Button>
              <Button
                onClick={() => setIsForgotPassword(false)}
                variant="outlined"
                color="secondary"
                fullWidth
                style={{ marginTop: '10px' }}
              >
                Back to Login
              </Button>
            </>
          ) : (
            <>
              <Box mb={2}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Box>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
              <Button
                onClick={() => setIsForgotPassword(true)}
                variant="text"
                color="secondary"
                fullWidth
                style={{ marginTop: '10px' }}
              >
                Forgot Password?
              </Button>
            </>
          )}
        </form>
      </Container>
    </div>
  );
}
