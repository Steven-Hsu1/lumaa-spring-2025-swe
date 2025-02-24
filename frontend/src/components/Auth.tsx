import React, { useState } from 'react';
import { registerUser, loginUser } from '../api';

interface AuthProps {
  setToken: (token: string) => void;
}

const Auth: React.FC<AuthProps> = ({ setToken }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    // Trim input to avoid accidental spaces
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setErrorMessage('Username and password cannot be empty.');
      setLoading(false);
      return;
    }

    try {
      const response = isLogin
        ? await loginUser(trimmedUsername, trimmedPassword)
        : await registerUser(trimmedUsername, trimmedPassword);
      const token: string = response.data.token;
      setToken(token);
      localStorage.setItem('token', token);
    } catch (error: any) {
      console.error('Error during authentication:', error);
      setErrorMessage(
        error.response?.data?.error ||
          'An error occurred during authentication.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? 'Register' : 'Login'}
      </button>
    </div>
  );
};

export default Auth;