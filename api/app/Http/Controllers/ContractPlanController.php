<?php

namespace App\Http\Controllers;


use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\ContractRequest;
use App\Http\Requests\PaymentRequest;
use App\Services\ContractPlanService;

class ContractPlanController extends Controller
{

    protected $contractPlanService;

    public function __construct(ContractPlanService $contractPlanService)
    {
        $this->contractPlanService = $contractPlanService;
    }

    public function index()
    {
        $contractPlans = $this->contractPlanService->getAllContractPlans();
        return \response()->json($contractPlans);
    }

    public function show(int $userId)
    {
        try {
            $contract = $this->contractPlanService->getContractPlanByUserId($userId);

            return \response()->json($contract);
        } catch (HttpException $e) {
            return \response()->json([
                'message' => $e->getMessage()
            ], $e->getStatusCode());
        }
    }

    public function historic(int $userId)
    {
        try {
            $contract = $this->contractPlanService->gethistoricByUserId($userId);

            return \response()->json($contract);
        } catch (HttpException $e) {
            return \response()->json([
                'message' => $e->getMessage()
            ], $e->getStatusCode());
        }
    }

    public function store(ContractRequest $request): JsonResponse
    {
        try {
            $input = $request->validated();
            $this->contractPlanService->saveContract($input['user_id'], $input['plan_id']);

            return \response()->json(['message' => 'Plano contratado com sucesso']);
        } catch (HttpException $e) {
            return \response()->json([
                'message' => $e->getMessage()
            ], $e->getStatusCode());
        }
    }

    public function storePay(PaymentRequest $request): JsonResponse
    {
        try {
            $input = $request->validated();

            $this->contractPlanService->savePayment($input['user_id'], $input['plan_id'], $input['price'], $input['type_payment'], $input['type_invoice']);

            return \response()->json(['message' => 'Pagamento efetuado com sucesso']);
        } catch (HttpException $e) {
            return \response()->json([
                'message' => $e->getMessage()
            ], $e->getStatusCode());
        }
    }

    public function edit($id)
    {
        // 
    }

    public function update(Request $request, $id)
    {
        // 
    }

    public function destroy($id)
    {
        // 
    }
}
