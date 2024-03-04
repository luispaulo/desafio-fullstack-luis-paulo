<?php

namespace App\Services;

use App\Models\Contract;
use App\Services\PaymentService;
use App\Enums\PaymentEnum;

class ContractPlanService
{

    protected $paymentService;
    protected $planService;

    public function __construct(PaymentService $paymentService, PlanService $planService)
    {
        $this->paymentService = $paymentService;
        $this->planService = $planService;
    }

    public function getAllContractPlans()
    {
        return Contract::all();
    }

    public function getContractPlanByUserId($userId)
    {
        return Contract::where('user_id', '=', $userId)
            ->with(['plan',
            'payments' => function ($query) {
                $query
                    ->select('id' ,'contract_id', 'price_contracted' , 'balance', 'type_invoice', 'type_payment', 'status')
                    ->where('status', PaymentEnum::PENDING);
            }])
            ->where('active', true)
                ->first();
    }

    public function gethistoricByUserId($userId)
    {
        return Contract::all();
    }

    public function saveContract(int $userId,int $planId): void
    {
        $plan = $this->planService->getPlanById($planId);
        $activeContract = Contract::isActive($userId)->first();

        $contract = $this->createContract($userId, $plan, $activeContract);

    }

    public function savePayment(int $userId,int $planId,float $price,string $typePayment, string $typeInvoice): void
    {

        $plan = $this->planService->getPlanById($planId);
        $activeContract = Contract::isActive($userId)->first();

        $this->paymentService->payment($activeContract->id, $activeContract, $plan, $price, $typeInvoice, $typePayment);

    }

    private function createContract(int $userId, $plan, $activeContract): Contract
    {
        if ($activeContract) {
            $activeContract->active = false;
            $activeContract->updated_at = now();
            $activeContract->deleted_at = now();
            $activeContract->save();
        }

        return Contract::create(['user_id' => $userId, 'plan_id' => $plan['id'], 'price' => $plan['price']]);
    }
    

}