<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use JWTAuth;
use stdClass;

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
                'status' => 401,
                'data' => new stdClass(),
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
        JWTAuth::invalidate(JWTAuth::parseToken());

        $data = new stdClass();
        $data->loggedOut = true;

        $return = [
            'status' => 200,
            'data' => $data
        ];

        return response()
                ->json($return['data'], $return['status'])
                ->cookie('token', '', Carbon::now()->timestamp - 3600);
    }

    public function checkIAm()
    {
        if ($user = JWTAuth::parseToken()->authenticate()) {
            $return = [
                'status' => 200,
                'data' => JWTAuth::user()
            ];
        } else {
            $data = new stdClass();
            $return = [
                'status' => 401,
                'data' => $data
            ];
        }
        return response()->json($return['data'], $return['status']);
    }
}
