<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function () {
    return 'Привет мир';
});


Route::get('/users', 'UsersController@index');
Route::post('/users', 'UsersController@store');
Route::middleware('auth:api')->get('/user', 'UsersController@show');
Route::middleware('auth:api')->patch('/user/{user}', 'UsersController@update');
Route::post('/login', 'UsersController@login');
Route::middleware('auth:api')->post('/logout', 'UsersController@logout');

Route::prefix('basket')->group(function (){
    Route::middleware('auth:api')->get('/', 'orderController@index');
    Route::middleware('auth:api')->post('/store', 'orderController@store');
    Route::middleware('auth:api')->patch('/bay/{order}', 'orderController@update');
    Route::middleware('auth:api')->get('/show/{order}', 'orderController@show');
    Route::middleware('auth:api')->delete('/destroy/{order}', 'orderController@destroy');
});


Route::prefix('category')->group(function (){
    Route::get('/', 'CategoryController@index');
    Route::middleware('auth:api')->post('/store', 'CategoryController@store');
    Route::middleware('auth:api')->patch('/update/{category}', 'CategoryController@update');
    Route::middleware('auth:api')->get('/show/{category}', 'CategoryController@show');
    Route::middleware('auth:api')->delete('/destroy/{category}', 'CategoryController@destroy');


    Route::prefix('{category}/products')->group(function (){
        Route::get('/', 'ProductController@index');
        Route::get('/show/{product}', 'ProductController@show');
        Route::middleware('auth:api')->post('/store', 'ProductController@store');
        Route::middleware('auth:api')->patch('/update/{product}', 'ProductController@update');
        Route::middleware('auth:api')->delete('/destroy/{product}', 'ProductController@destroy');
    });
});
