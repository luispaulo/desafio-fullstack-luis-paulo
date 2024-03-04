import { useNavigate } from 'react-router-dom';
import { usePlan } from '@/hooks/usePlan.tsx';
import { useContracts } from '@/hooks/useContracts.tsx';
import { Menu } from "@/components/Menu"
import React from 'react';

export const Plan = () => {
  const { plan: planList, loading } = usePlan(); 
  const { contract: contract } = useContracts(); 
  console.log(contract);
  const navigate = useNavigate()

  const onClickChoosePlan = async (userId, planId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contracts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          plan_id: planId
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao criar contrato: ${response.statusText}`);
      }

      const contractData = await response.json();

      navigate(`/contracts`);
    } catch (error) {
      console.error('Erro ao criar contrato:', error);
    }
  };

  return (
    <div>
      <Menu />
      <h1 className="align-middle text-orange-500 text-3xl font-bold text-center pb-5">Planos Disponíveis</h1>
      {loading && <p>Carregando...</p>}

      {!loading && planList.length === 0 && <p>Nenhum plano encontrado.</p>}

      {!loading && planList.length > 0 && (
        <ul className="grid grid-cols-3 gap-4">
          {planList.map((plan) => (
            <li key={plan.id}>
              <>
                <div 
                  className="box-content hover:box-content hover:bg-orange-50 focus:cursor-poibter bg-white h-72 w-80 pr-0 pt-7 rounded-lg shadow-lg">
                  {plan.numberOfClients === 1 && (
                    <header className="box-content bg-orange-500 h-11 w-60 border-1 pl-5 pt-1.5 pb-1.5">
                      <h1 className="text-white font-extrabold">{plan.description}</h1>
                    </header>
                  )}

                  {plan.numberOfClients > 1 && (
                    <header className="box-content bg-orange-500 h-11 w-60 border-1 pl-5 pt-1.5 pb-1.5">
                      <h1 className="text-white font-extrabold">Até {plan.gigabytesStorage} vistorias</h1>
                      <h3 className="text-white font-bold">/clientes ativos</h3>
                    </header>
                  )}

                  <div className="pt-5 text-2xl pl-5 text-gray-700">
                    <p>Preço:</p>
                    <span className="text-3xl font-bold">R$ {plan.price}</span>
                    <span> /mês</span>
                  </div>

                  <div className="pt-5 text-2xl pl-5 text-gray-700">
                    <p>Armazenamento:</p>
                    <span className="text-3xl font-bold">{plan.gigabytesStorage} GB</span>
                  </div>
                  <div className="justify-center">
                  <button
                    type="button"
                    onClick={() => onClickChoosePlan(1, plan.id)}
                    className={`align-middle text-center bg-gray-700 hover:bg-gray-800 text-white p-3 rounded-lg shadow-lg w-full ${plan.id === contract?.plan_id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={plan.id === contract?.plan_id}
                  >
                    {plan.id === contract?.plan_id ? 'Plano Ativo' : 'Escolher Plano'}
                  </button>
                  </div>
                </div>
              </>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};