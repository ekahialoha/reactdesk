<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        $department = Department::find($id);

        if (empty($department)) {
            $return = [
                'status' => 404,
                'data' => new stdClass
            ];
        } else {
            $return = [
                'status' => 200,
                'data' => new DepartmentResource($department)
            ];
        }

        return response()->json($return, $return['status']);
    }

    public function update(Request $request, $id)
    {
        $department = Department::find($id);
        $department->name = $request->input('name');
        $department->description = $request->input('description');
        $department->status = $request->input('status');
        $department->save();

        $return = [
            'status' => 200,
            'data' =>new DepartmentResource($department)
        ];

        return response()->json($return, $return['status']);
    }

    public function destroy($id)
    {
        $department = Department::find($id);

        $data = new stdClass;
        if (empty($department)) {
            $return = [
                'status' => 403,
                'data' => $data,
            ];
        } else {
            $department->delete();

            $data->deleted = true;

            $return = [
                'status' => 200,
                'data' => $data
            ];
        }

        return response()->json($return, $return['status']);
    }
}
