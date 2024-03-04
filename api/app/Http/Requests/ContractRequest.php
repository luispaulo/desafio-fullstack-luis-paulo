<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContractRequest extends FormRequest
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
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'Informe o usuário contratante',
            'plan_id.required' => 'Plano obrigatorio',
        ];
    }
}