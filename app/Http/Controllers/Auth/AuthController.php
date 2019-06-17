<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest')->except('terminate');
    }

    public function authenticate(Request $request)
    {
        $return = [
            'status' => 200,
            'data' => [Auth::attempt([
                'email' => $request->input('email'),
                'password' => $request->input('password')
                ]
            )]
        ];

        return response()->json($return['data'], $return['status']);
    }

    public function terminate(Request $request)
    {

    }
}
