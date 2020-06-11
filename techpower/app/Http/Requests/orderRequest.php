<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class orderRequest extends ApiRequest
{
    public function rules()
    {
        return [
            'user_id'=>'required',
            'product_id'=>'required',
            'status',
        ];
    }
}
