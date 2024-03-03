<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePlaneRequest extends FormRequest
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
            'image' => 'required|file',
            'model' => 'required|max:255',
            'creation_date' => 'required|date',
            'serial_number' => 'required',
            'basic_seats_number' => 'required|integer',
            'premium_seats_number' => 'required|integer',
            'firm_id' => 'required|exists:plane_firms,id',
        ];
    }
}
