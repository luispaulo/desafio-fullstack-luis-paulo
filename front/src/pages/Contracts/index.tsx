import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useContracts } from '@/hooks/useContracts.tsx';
import { Menu } from "@/components/Menu"

export const Contracts = () => {
  const { contract: contract, loading } = useContracts(); 
  const navigate = useNavigate()

  if (loading) {
    return <p>Carregando...</p>;
  }
  const onClickPayment = async (userId, planId, price) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contracts/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          plan_id: planId,
          price: price,
          type_invoice: 'debit',
          type_payment: 'pix'
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao criar contrato: ${response.statusText}`);
      }

      const contractData = await response.json();

      navigate(`/`);
    } catch (error) {
      console.error('Erro ao criar contrato:', error);
    }
  };
  
  return (
    <div>
      <Menu />
      <div className="grid justify-center">
      <div className="justify-center">
        <h1 className="align-middle text-orange-500 text-3xl font-bold text-center pb-5">Plano Atual</h1>
        <div className="box-content bg-white h-72 w-96 pr-0 pt-7 rounded-lg shadow-lg">
          {!contract?.plan && (
            <h1 className="text-gray-700 text-xl text-center">
              Nenhum plano ativo
            </h1>
          )}

          {contract?.plan && (
            <>
              {contract?.plan?.numberOfClients === 1 && (
                <header className="box-content bg-orange-500 h-11 w-60 border-1 pl-5 pt-1.5 pb-1.5">
                  <h1 className="text-white font-extrabold">{contract?.plan.description}</h1>
                </header>
              )}

              {contract?.plan?.numberOfClients > 1 && (
                <header className="box-content bg-orange-500 h-11 w-72 border-1 pl-5 pt-1.5 pb-1.5">
                  <h1 className="text-white font-extrabold">Até {contract?.plan.gigabytesStorage} vistorias</h1>
                  <h3 className="text-white font-bold">/clientes ativos</h3>
                </header>
              )}

              <div className="pt-5 text-2xl pl-5 text-gray-700">
                <p>Preço:</p>
                <span className="text-3xl font-bold">R$ {contract?.plan?.price}</span>
                <span> /mês</span>
              </div>

              <div className="pt-5 text-2xl pl-5 text-gray-700">
                <p>Armazenamento:</p>
                <span className="text-3xl font-bold">{contract?.plan?.gigabytesStorage} GB</span>
              </div>
              <div className="justify-center">
                  <button
                    type="button"
                    onClick={() => onClickPayment(1, contract?.plan?.id, contract?.plan?.price)}
                    className={`align-middle text-center bg-gray-700 hover:bg-gray-800 text-white p-3 rounded-lg shadow-lg w-full }`}
                  >
                    {contract?.payments.status != 'paid' ? 'Plano Pendente de Pagamento' : 'Plano Pago'}
                  </button>
                  </div>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};
