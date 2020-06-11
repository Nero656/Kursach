<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends ApiRequest
{
    public function rules()
    {
        return [
                'login'=>'required|unique:users',
                'password'=>'required',
            ];
    }
}
