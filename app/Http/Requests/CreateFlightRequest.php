<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateFlightRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'plane_id' => 'required|exists:planes,id',
            'departure_city' => 'required:max:255',
            'arrival_city' => 'required:max:255',
            'departure_date_time' => 'required|date',
            'arrival_date_time' => 'required|date',
            'ticket_price_basic_place' => 'required|numeric',
            'ticket_price_premium_place' => 'required|numeric',
            'status' => 'required'
        ];
    }
}
