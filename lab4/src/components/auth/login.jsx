import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useNavigate, Link } from 'react-router-dom';
import './auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Невірний email або пароль');
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleLogin}>
        <h2>Увійти</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Увійти</button>
      </form>

      <div className="auth-switch">
        Ще не маєте акаунту? <Link to="/register">Зареєструватися</Link>
      </div>

      <div className="back-home">
        <Link to="/">← Повернутися на головну</Link>
      </div>
    </div>
  );
};

export default Login;
