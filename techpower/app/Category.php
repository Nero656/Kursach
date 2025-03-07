<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public $fillable = ['name'];

    public function products()
    {
        return $this->hasMany(Product::class, 'categories_id','id');
    }
}
