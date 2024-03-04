import { useState, useEffect } from 'react';

export const usePlan = () => {
  const [plan, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/plans/`);
        if (!response.ok) {
          throw new Error(`Erro ao obter os planos: ${response.statusText}`);
        }

        const data = await response.json();
        setPlans(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter os planos:');
        setLoading(false);
      }
    };

    fetchPlans();
  }, [])

  return { plan, loading };
}
