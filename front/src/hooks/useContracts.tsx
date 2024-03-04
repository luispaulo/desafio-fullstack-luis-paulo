import { useState, useEffect } from 'react';

export const useContracts = () => {
  const [contract, setContract] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/contracts/1`);
        if (!response.ok) {
          throw new Error(`Erro ao obter os detalhes do contrato: ${response.statusText}`);
        }

        const data = await response.json();

        setContract(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter os detalhes do contrato:', error);
        setLoading(false);
      }
    };

    fetchContractDetails();
  }, []);

  return { contract, loading };
};