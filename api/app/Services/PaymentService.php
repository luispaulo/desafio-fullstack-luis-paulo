<?php

namespace App\Services;

use App\Enums\PaymentEnum;
use App\Models\Contract;
use App\Models\Payment;
use App\Models\Plan;

class PaymentService
{
    public function payment(int $contractId, ?Contract $activeContract, Plan $plan, float $pricePaid, string $typeInvoice, string $typePayment): void
    {
        $planPrice = $plan['price'];
        $activeContractPrice = $activeContract ? $activeContract['price'] : 0;
        $pendingCalculation = $this->pendingCalculation($planPrice);

        $this->savePayments($planPrice, $activeContractPrice , $contractId, $pendingCalculation, $typeInvoice, $typePayment);

        if (!$activeContract) {
            Payment::create([
                'contract_id' => $contractId,
                'price_contracted' => $planPrice,
                'balance' => 0,
                'price_paid' => $pricePaid,
                'type_invoice' => $typeInvoice,
                'type_payment' => $typePayment,
                'status' => PaymentEnum::PAID
            ]);
            return;
        }
    }

    private function pendingCalculation(float $price): float
    {
        $daysInMonth = (int) date('t');

        $pricePerDay = $this->calculatePricePerDay($price, $daysInMonth);
        $countDays = abs((int) date('d', strtotime(' +1 day')) - $daysInMonth);

        return $countDays * $pricePerDay;
    }

    private function calculatePricePerDay(float $price, int $daysInMonth): float
    {
        return floor(($price / $daysInMonth) * 100) / 100;
    }

    private function savePayments($planPrice, $activeContractPrice, $contractId, $pendingCalculation, $typeInvoice, $typePayment)
    {
        if ($planPrice < $activeContractPrice) {
            Payment::create([
                'contract_id' => $contractId,
                'price_contracted' => $planPrice,
                'balance' => $pendingCalculation,
                'price_paid' => $planPrice,
                'type_invoice' => 'credit',
                'type_payment' => $typePayment,
                'status' => PaymentEnum::PENDING
            ]);
            return;
        }

        if ($planPrice > $activeContractPrice) {
            Payment::create([
                'contract_id' => $contractId,
                'price_contracted' => $planPrice,
                'balance' => -$pendingCalculation,
                'price_paid' => 0,
                'type_invoice' => $typeInvoice,
                'type_payment' => $typePayment,
                'status' => PaymentEnum::PENDING
            ]);
            return;
        }

        if ($planPrice == $activeContractPrice) {
            Payment::create([
                'contract_id' => $contractId,
                'price_contracted' => $planPrice,
                'balance' => 0,
                'price_paid' => $planPrice,
                'type_invoice' => $typeInvoice,
                'type_payment' => $typePayment,
                'status' => PaymentEnum::PENDING
            ]);
            return;
        }
    }

}