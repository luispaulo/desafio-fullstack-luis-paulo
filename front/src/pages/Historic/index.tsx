import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserHistory } from '@/hooks/useUserHistory.tsx';
import { Menu } from "@/components/Menu"

export const UserHistoryPage = () => {
  const { userId } = useParams();
  const { userHistory, loading } = useUserHistory(1);
  const navigate = useNavigate();

  console.log(userHistory)

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <Menu />
      <div className="grid justify-center">
        <div className="justify-center">
          <h1 className="align-middle text-orange-500 text-3xl font-bold text-center pb-5">Histórico do Usuário</h1>

          {userHistory.length === 0 && (
            <p className="text-gray-700 text-xl text-center">Nenhum histórico disponível.</p>
          )}

          {userHistory.length > 0 && (
            <table className="table-auto border-collapse w-96">
              <thead>
                <tr>
                  <th className="border px-8 py-2">Descrição do Plano</th>
                  <th className="border px-10 py-2">Valor</th>
                  <th className="border px-8 py-2">Desconto</th>
                  <th className="border px-8 py-2">Data de Pagamento</th>
                </tr>
              </thead>
              <tbody>
                {userHistory.map((historyItem) => (
                  <tr key={historyItem.id}>
                    <td className="border px-8 py-2">{historyItem?.plan.description}</td>
                    <td className="border px-10 py-2">R$ {historyItem?.plan.price}</td>
                    <td className="border px-8 py-2">R$ {historyItem?.payments[0]?.price_contracted ? historyItem?.payments[0]?.price_contracted : '0,00'}</td>
                    <td className="border px-8 py-2">{historyItem?.payments[0]?.formatted_created_at ? historyItem?.payments[0]?.formatted_created_at : 'Pendente de Pagamento'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
