<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    public $fillable = ['user_id', 'product_id','status'];

    public function products()
    {
        return $this->hasMany('App\Product', 'id', 'product_id');
    }

    public function users()
    {
        return $this->hasMany('App\User', 'id', 'user_id');
    }
}

//Product::class, 'product_id','id'
//Product::class, 'user_id','id'
