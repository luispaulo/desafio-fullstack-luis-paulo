import React from 'react';
import { Link } from 'react-router-dom';

 export const Menu = () => {
    return (
      <div className="flex justify-center mt-4">
        <Link to="/plan" className="mx-2 bg-green-500 text-white px-4 py-2 rounded">
          Planos Disponiveis
        </Link>
        <Link to="/contracts" className="mx-2 bg-purple-500 text-white px-4 py-2 rounded">
          Plano Atual
        </Link>
        <Link to="/historic" className="mx-2 bg-red-500 text-white px-4 py-2 rounded">
          Historico de assinatura
        </Link>
      </div>
    );
  };
