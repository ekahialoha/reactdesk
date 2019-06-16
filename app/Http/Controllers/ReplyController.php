<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
// use App\Http\Resources\Reply as ReplyResource;
use App\Reply;
use \stdClass;

class ReplyController extends Controller
{
    public function index()
    {
        $replies = Reply::all();

        $return = [
                'status' => 200,
                'data' => $replies
        ];

        return response()->json($return, $return['status']);
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
