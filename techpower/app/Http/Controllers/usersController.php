<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApiRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Http\Requests\userUpdateRequest;
use App\Order;
use App\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class usersController extends Controller
{
    public function index()
    {
          return User::all();

    }

    public function store(RegisterRequest $request)
    {
        $userId = User::create(
            [
                'name' => $request->name,
                'email' => $request->email,
                'login' => $request->login,
                'password' => Hash::make($request->password),
            ]);

        return $userId;
    }

    public function show(){
        return Auth::user();
    }

    public function update(User $user, userUpdateRequest $request) {

        $update = ['password' => Hash::make($request->password)];

        $user->update(array_merge(
            $request->all(), $update)
        );

        //return $request->all();
        return response()->json($user)->setStatusCode(201, 'Successful Update');
    }

    public function login(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'login'=>'required',
            'password'=>'required',
        ]);
        if ($validateData->fails()){
            return $validateData->messages();
        }

        if($user = user::query()->where(['login' => $request->login,])->first()
            and
            Hash::check($request->password, $user->password))
        {
            $user->api_token = Hash::make(Str::random(40));
            $user->save();
            return response()->json(['token' => $user->api_token]);
        }

        return response()->json(['message'=>'authorization error']);
    }

    public function logout()
    {
        Auth::user()->logout();

        return \response()->json([
            'message'=>'Success logout',
        ])->setStatusCode(200, 'Success logout');
    }
}
