// hooks/useCsrfToken.js
import { useState, useEffect } from 'react';
import config from '../../config';

export function useCsrfToken() {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetch(`${config.backend}/csrf-token`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.csrfToken))
      .catch((err) => console.error('Erreur lors de la récupération du token CSRF:', err));
  }, []);

  return csrfToken;
}
