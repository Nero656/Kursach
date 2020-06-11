<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdaterequest extends ApiAdminRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'title',
            'price'=>'integer|min:1',
            'description' => 'required',
            'photo_url' => 'image|mimes:jpg,jpeg,png',
        ];
    }
}
