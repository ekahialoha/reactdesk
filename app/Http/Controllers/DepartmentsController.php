<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Department;
use App\Http\Resources\Department as DepartmentResource;
use \stdClass;


class DepartmentsController extends Controller
{
    public function index()
    {
        $return = [
            'status' => 200,
            'data' => DepartmentResource::collection(Department::all())
        ];

        return response()->json($return, $return['status']);
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

        return response()->json($return, $return['status']);
    }

    public function show($id)
    {
        try {
            $department = Department::findOrFail($id);
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

        return response()->json($return, $return['status']);
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

        return response()->json($return, $return['status']);
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

        return response()->json($return, $return['status']);
    }
}
