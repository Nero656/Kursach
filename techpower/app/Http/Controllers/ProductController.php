<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Requests\ApiAdminRequest;
use App\Http\Requests\ProductUpdaterequest;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    public function index(Category $category)
    {
        return $category->products;
    }

    public function show(Category $category, Product $product)
    {
        return $product;
    }

    public function store(Category $category, ApiAdminRequest $request)
    {
        $file = $request->file('photo_url');
        $fileName = uniqid() . '.' . $file->extension();

        $fileDir = 'public/images/';
        $file->storeAs($fileDir, $fileName);

        $product = Product::create(array_merge([
            'title' => $request->title,
            'price' => $request->price,
            'description' => $request->description,
            'photo_url' => $fileDir.'/'.$fileName,
            'categories_id' => $category->id,
        ]));

        return $product;
    }

    public function update(Category $category,Product $product, ProductUpdateRequest $request)
    {
        $update = [];

        $file = $request->file('photo_url');

        if ($request->file('photo_url')) {
            $update['photo_url'] = $this->undofile($file);
        }

        $product->update(array_merge($request->all(), $update));

        return response()->json($product)->setStatusCode(201, 'Successful Update');
    }

    public function undofile($file)
    {
        $fileName = uniqid() . '.' . $file->extension();
        $fileDir = 'public/images/';
        $file->storeAs($fileDir, $fileName);

        return $fileDir.$fileName;
    }

    public function destroy(Category $category, Product $product)
    {
        $product->delete();
        return response()->json([
            'message' => 'Succes delete',
        ])->setStatusCode(201, 'delete');
    }
}
