<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Resources\Reply as ReplyResource;
use App\Reply;
use \stdClass;

class ReplyController extends Controller
{
    public function index()
    {
        $replies = Reply::all();

        $return = [
                'status' => 200,
                'data' => ReplyResource::collection($replies)
        ];

        return response()->json($return, $return['status']);
    }

    public function store(Request $request)
    {
        $reply = new Reply();
        $reply->ticket_id = $request->input('ticket_id');
        $reply->user_id = $request->input('user_id');
        $reply->name = $request->input('name');
        $reply->message = $request->input('message');
        $reply->save();

        $return = [
            'status' => 201,
            'data' => new ReplyResource($reply)
        ];

        return response()->json($return, $return['status']);
    }

    public function show($id)
    {
        try {
            $reply = Reply::findOrFail($id);

            $return = [
                'status' => 200,
                'data' => new ReplyResource($reply)
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
        //
    }

    public function destroy($id)
    {
        //
    }
}
