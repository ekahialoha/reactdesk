<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\User;
use JWTAuth;
use \stdClass;
use Hash;
use Exception;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        $users = User::all();

        $return = [
            'status' => 200,
            'data' => $users
        ];

        return response()->json($return['data'], $return['status']);
    }

    public function store(Request $request)
    {
        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->save();

        $return = [
            'status' => 201,
            'data' => $user
        ];

        return response()->json($return['data'], $return['status']);
    }


    public function show(Request $request, $id)
    {
        $return = [
            'status' => 404,
            'data' => new stdClass()
        ];

        return response()->json($return['data'], $return['status']);
    }


    public function update(Request $request, $id)
    {
        try {
            $currentUser = JWTAuth::parseToken()->authenticate();
            $user = User::findOrFail($id);

            if ($user->id === $currentUser->id) {
                throw new Exception('Unable to make changes to your own account');
            } elseif ($user->id === env('PROTECTED_USER') {
                throw new Exception('Protected User');
            }

            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));
            $user->save();

            $return = [
                'status' => 200,
                'data' => $user
            ];

        } catch (Exception $e) {
            $data = new stdClass();
            $data->error = $e->getMessage();

            $return = [
                'status' => 403,
                'data' => $data->error
            ];
        } catch (ModelNotFoundException $e) {

            $return = [
                'status' => 404,
                'data' => new stdClass()
            ];
        }

        return response()->json($return['data'], $return['status']);
    }

    public function destroy($id)
    {
        $data = new stdClass;

        try {
            $currentUser = JWTAuth::parseToken()->authenticate();
            $user = User::findOrFail($id);

            if ($user->id === $currentUser->id) {
                throw new Exception('Unable to make changes to your own account');
            } elseif ($user->id === env('PROTECTED_USER') {
                throw new Exception('Protected User');
            }

            $user->delete();

            $data->deleted = true;

            $return = [
                'status' => 200,
                'data' => $data
            ];
        } catch (Exception $e) {
            $data = new stdClass();
            $data->error = $e->getMessage();

            $return = [
                'status' => 403,
                'data' => $data->error
            ];
        } catch (ModelNotFoundException $e) {
            $return = [
                'status' => 403,
                'data' => $data
            ];
        }

        return response()->json($return['data'], $return['status']);
    }
}
