import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useNavigate, Link } from 'react-router-dom';
import './auth.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Помилка при реєстрації');
    }
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleRegister}>
        <h2>Реєстрація</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Зареєструватися</button>
      </form>

      <div className="auth-switch">
        Вже маєте акаунт? <Link to="/login">Увійти</Link>
      </div>

      <div className="back-home">
        <Link to="/">← Повернутися на головну</Link>
      </div>
    </div>
  );
};

export default Register;
