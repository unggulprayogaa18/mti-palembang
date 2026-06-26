'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../lib/supabase/client';

export default function LoginForm() {
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    setError('');
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError('Email atau password salah.');
        return;
      }
      router.replace('/admin');
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="adminLoginForm">
      {error && <div className="adminAlert adminAlertError">{error}</div>}
      <div className="adminFormGroup">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="admin@mti.or.id" required autoFocus />
      </div>
      <div className="adminFormGroup">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" placeholder="Masukkan password" required />
      </div>
      <button type="submit" className="adminBtn adminBtnPrimary" style={{ width: '100%' }} disabled={isPending}>
        {isPending ? 'Memproses...' : 'Masuk'}
      </button>
    </form>
  );
}
