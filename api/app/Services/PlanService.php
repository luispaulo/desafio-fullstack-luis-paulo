<?php

namespace App\Services;

use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Models\Plan;

class PlanService
{
    public function getPlanById($id): Plan
    {
        $plan = Plan::where('active', '=', true)->where('id', '=', $id)->first();

        if (!$plan) {
            throw new HttpException(404, 'Plano não localizado!');
        }
        
        return $plan;
    }

}