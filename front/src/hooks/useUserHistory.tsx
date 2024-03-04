// useUserHistory.js
import { useState, useEffect } from 'react';

export const useUserHistory = (userId) => {
  const [userHistory, setUserHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/contracts/1/userHistory`);
        if (!response.ok) {
          throw new Error(`Erro ao obter o histórico do usuário: ${response.statusText}`);
        }

        const data = await response.json();
        setUserHistory(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter o histórico do usuário:', error);
        setLoading(false);
      }
    };

    fetchUserHistory();
  }, [userId]);

  return { userHistory, loading };
};
