<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use JWTAuth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['authenticate']);
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if ($token = JWTAuth::attempt($credentials)){
            $return = [
                'status' => 200,
                'data' => JWTAuth::user(),
                'cookie' => [
                    'value' => $token,
                    'expires' => 1800
                ],
            ];
        } else {
            $return = [
                'status' => 403,
                'data' => [],
                'cookie' => [
                    'value' => '',
                    'expires' => Carbon::now()->timestamp - 3600
                ],
            ];
        }

        return response()
                ->json($return['data'], $return['status'])
                ->cookie('token', $return['cookie']['value'], $return['cookie']['expires']);
    }

    public function terminate(Request $request)
    {

    }

    public function checkAuthed()
    {
        if ($user = JWTAuth::parseToken()->authenticate()) {
            $return = [
                'status' => 200,
                'data' => JWTAuth::user()
            ];
        } else {
            $return = [
                'status' => 403,
                'data' => JWTAuth::user()
            ];
        }
        return response()->json($return['data'], $return['status']);
    }
}
