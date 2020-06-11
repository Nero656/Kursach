<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable =
        [
            'title',
            'description',
            'price',
            'photo_url',
            'categories_id',
        ];

    public function products()
    {
        return $this->hasMany('App\Order', 'Product_id', 'id');
    }
}
