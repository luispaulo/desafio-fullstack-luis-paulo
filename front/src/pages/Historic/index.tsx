import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserHistory } from '@/hooks/useUserHistory.tsx';
import { Menu } from "@/components/Menu"

export const UserHistoryPage = () => {
  const { userId } = useParams();
  const { userHistory, loading } = useUserHistory(1);
  const navigate = useNavigate();

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
                  <th className="border px-4 py-2">Descrição do Plano</th>
                  <th className="border px-4 py-2">Valor</th>
                  <th className="border px-4 py-2">Desconto</th>
                  <th className="border px-4 py-2">Data de Pagamento</th>
                </tr>
              </thead>
              <tbody>
                {userHistory.map((historyItem) => (
                  <tr key={historyItem.id}>
                    <td className="border px-4 py-2">{historyItem.plan_description}</td>
                    <td className="border px-4 py-2">R$ {historyItem.value}</td>
                    <td className="border px-4 py-2">R$ {historyItem.discount}</td>
                    <td className="border px-4 py-2">{historyItem.payment_date}</td>
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
