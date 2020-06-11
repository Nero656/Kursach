<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Requests\CategoryRequest;
use App\Product;
use HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::all();
    }
    public function store(CategoryRequest $request)
    {
        return Category::create($request->all());
    }

    public function show(Category $category)
    {
        return $category;
    }

    public function update(CategoryRequest $request, Category $category)
    {
        $category->update($request->all());

        return response()->json($category)->setStatusCode(201, 'Success :3');
    }

    public function destroy(Category $category, Product $product)
    {
        $category ->delete();

        return response()->json([
            'message' =>'Success delete'
        ])->setStatusCode(201,'delete');
    }
}
