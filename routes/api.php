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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {

    Route::post('/', 'Auth\AuthController@authenticate');
    Route::post('/iam', 'Auth\AuthController@checkIAm');
    Route::post('/terminate', 'Auth\AuthController@terminate');
    // Route::post('/refresh', 'Auth\AuthController@refresh');
});

Route::apiResources([
    'departments' => 'DepartmentController',
    'tickets' => 'TicketController',
    'replies' => 'ReplyController',
    'users' => 'UserController',
]);
