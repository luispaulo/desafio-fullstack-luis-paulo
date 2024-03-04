import { useState, useEffect } from 'react';

export const useUser = (userId) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}`);
        if (!response.ok) {
          throw new Error(`Erro ao obter os detalhes do usuário: ${response.statusText}`);
        }

        const data = await response.json();

        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter os detalhes do usuário:', error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return { user, loading };
};
