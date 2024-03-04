<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'user_id' =>        ['required', 'present', 'integer'],
            'plan_id' =>        ['required', 'present', 'integer'],
            'price' =>          ['required', 'present'],
            'type_payment' =>   ['required', 'present', 'in:billet,credit_card,pix'],
            'type_invoice' =>   ['required', 'present', 'in:credit,debit']
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'Informe o usuário contratante',
            'plan_id.required' => 'Plano obrigatorio',
            'price.required' => 'Informe o valor',
            'type_payment.required' => 'Tipo de pagamento é valido',
            'type_invoice.required' => 'Tipo de transação é obrigatorio'
        ];
    }
}
