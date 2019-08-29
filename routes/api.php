<?php

use Illuminate\Http\Request;

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

Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');
Route::middleware('auth:api')->post('/logout', 'AuthController@logout');

Route::middleware('auth:api')->resource('profile', 'ProfileController');
Route::middleware('auth:api')->resource('students', 'StudentController');
Route::middleware('auth:api')->resource('practise', 'PractiseController');
Route::middleware('auth:api')->resource('reports', 'ReportController');