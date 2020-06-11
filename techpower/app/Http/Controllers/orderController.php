<?php

namespace App\Http\Controllers;

use App\Http\Requests\orderRequest;
use App\User;
use Illuminate\Http\Request;
use App\Order;
use Illuminate\Support\Facades\DB;

class orderController extends Controller
{
    public function index()
    {
        $orders = Order::with('users', 'products')->get();

        return $orders;
    }

    public function store(orderRequest $request)
    {
        $request = Order::create([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id,
        ]);

        return $request;
    }

    public function update(orderRequest $request, Order $order){
        $order->update($request->all());

        return response()->json($order)->setStatusCode(201, 'Success :3');
    }

    public function show(Order $order)
    {
        return $order;
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json([
            'message' => 'Succes delete',
        ])->setStatusCode(201, 'delete');
    }
}
