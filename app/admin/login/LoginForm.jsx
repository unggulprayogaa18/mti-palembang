'use client';

import { useState, useTransition } from 'react';
import { login } from '../actions';

export default function LoginForm() {
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setError('');
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="adminLoginForm">
      {error && (
        <div className="adminAlert adminAlertError">{error}</div>
      )}
      <div className="adminFormGroup">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Masukkan password admin"
          required
          autoFocus
        />
      </div>
      <button type="submit" className="adminBtn adminBtnPrimary" style={{ width: '100%' }} disabled={isPending}>
        {isPending ? 'Memproses...' : 'Masuk'}
      </button>
    </form>
  );
}
