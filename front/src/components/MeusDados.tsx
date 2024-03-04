import React from 'react';
import { Link } from 'react-router-dom';
import { useContracts } from '@/hooks/useContracts.tsx';

 export const MeusDados = () => {
  const { contract, loading } = useContracts();

  return (
    <div className="flex flex-col items-center mt-4">
      
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className="mb-4 p-4 border border-gray-300 rounded">
            <h2 className="text-2xl font-bold mb-4">Informações do Usuário</h2>
            <p>ID do Usuário: 001</p>
            <p>Nome do Usuário: Luis Paulo</p>
          </div>

          
          <div className="mb-4 p-4 border border-gray-300 rounded">
            <h2 className="text-2xl font-bold mb-4">Informações do Contrato Ativo</h2>
            <h1>{contract?.plan.description}</h1>
            <p><strong>Preço:</strong> R$ {contract.price} /mês</p>
            <p><strong>Situação:</strong> {contract?.active ? 'Ativo' : 'Inativo'}</p>
          </div>
        </>
      )}
    </div>
  );
};