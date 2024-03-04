import React from 'react';
import { Link } from 'react-router-dom';
import { useContracts } from '@/hooks/useContracts.tsx';
import { useUser } from '@/hooks/useUser.tsx';

 export const MeusDados = () => {
  const { contract, loading } = useContracts();
  const { user} = useUser(contract?.user_id);

  return (
    <div className="flex flex-col items-center mt-4">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {user.id ? (
            <div className="mb-4 p-4 border border-gray-300 rounded">
              <h2 className="text-2xl font-bold mb-4">Informações do Usuário</h2>
              <p>Código: {user.id}</p>
              <p>Nome: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          ) : (
            <p></p>
          )}

          {contract.id ? (
            <div className="mb-4 p-4 border border-gray-300 rounded">
              <h2 className="text-2xl font-bold mb-4">Informações do Contrato Ativo</h2>
              <h1>{contract.plan.description}</h1>
              <p><strong>Preço:</strong> R$ {contract.price} /mês</p>
              <p><strong>Situação:</strong> {contract.active ? 'Ativo' : 'Inativo'}</p>
            </div>
          ) : (
            <p>Usuário sem contrato cadastrado.</p>
          )}
        </>
      )}
    </div>
  );
};