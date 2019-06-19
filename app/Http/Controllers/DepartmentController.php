<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Department;
use App\Http\Resources\Department as DepartmentResource;
use \stdClass;
use JWTAuth;


class DepartmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['index', 'show']);
    }

    public function index(Request $request)
    {
        if ($request->cookie('token') && JWTAuth::parseToken()->authenticate()) {
            $departments = Department::all();
        } else {
            $departments = Department::where('status', 1)->get();
        }
        $return = [
            'status' => 200,
            'data' => DepartmentResource::collection($departments)
        ];

        return response()->json($return['data'], $return['status']);
    }

    public function store(Request $request)
    {
        $department = new Department();
        $department->name = $request->input('name');
        $department->description = $request->input('description');
        $department->status = (int)$request->input('status');
        $department->save();

        $return = [
            'status' => 201,
            'data' => new DepartmentResource($department)
        ];

        return response()->json($return['data'], $return['status']);
    }

    public function show($id, Request $request)
    {
        try {
            if ($request->cookie('token') && JWTAuth::parseToken()->authenticate()) {
                $department = Department::findOrFail($id);
            } else {
                $department = Department::where('status', 1)->findOrFail($id);
            }
            $return = [
                'status' => 200,
                'data' => new DepartmentResource($department)
            ];
        } catch (ModelNotFoundException $e) {
            $return = [
                'status' => 404,
                'data' => new stdClass
            ];
        }

        return response()->json($return['data'], $return['status']);
    }

    public function update(Request $request, $id)
    {
        try {
            $department = Department::findOrFail($id);
            $department->name = $request->input('name');
            $department->description = $request->input('description');
            $department->status = $request->input('status');
            $department->save();

            $return = [
                'status' => 200,
                'data' => new DepartmentResource($department)
            ];
        } catch (ModelNotFoundException $e) {

            $return = [
                'status' => 404,
                'data' => new stdClass
            ];
        }

        return response()->json($return['data'], $return['status']);
    }

    public function destroy($id)
    {
        $data = new stdClass;

        try {
            $department = Department::findOrFail($id);
            $department->delete();

            $data->deleted = true;

            $return = [
                'status' => 200,
                'data' => $data
            ];
        } catch (ModelNotFoundException $e) {
            $return = [
                'status' => 403,
                'data' => $data,
            ];
        }

        return response()->json($return['data'], $return['status']);
    }
}
