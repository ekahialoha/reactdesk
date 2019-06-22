<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Resources\Reply as ReplyResource;
use App\Ticket;
use App\Reply;
use JWTAuth;
use \stdClass;

class ReplyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except('store');
    }

    public function index()
    {
        $replies = Reply::all();

        $return = [
                'status' => 200,
                'data' => ReplyResource::collection($replies)
        ];

        return response()->json($return['data'], $return['status']);
    }

    public function store(Request $request)
    {
        try {
            $ticket_id = $request->input('ticket_id');

            if ($request->cookie('token') && JWTAuth::parseToken()->authenticate()) {
                $ticket = Ticket::findOrFail($ticket_id);
            } else {
                $ticket = Ticket::where('track_id', $ticket_id)->firstOrFail();
                $ticket_id = $ticket->id;
            }

            $reply = new Reply();
            $reply->ticket_id = $ticket_id;
            $reply->user_id = $request->input('user_id');
            $reply->name = $request->input('name');
            $reply->message = $request->input('message');
            $reply->save();

            $reply->loadMissing('user');

            $return = [
                'status' => 201,
                'data' => new ReplyResource($reply)
            ];
        } catch (ModelNotFoundException $e) {
            $data = new stdClass();
            $data->error = 'Ticket Not Found';
            $ticket_id = $request->input('ticket_id');

            $return = [
                'status' => 404,
                'data' => $request->input('ticket_id')
            ];
        }

        return response()->json($return['data'], $return['status']);
    }

    public function show($id, Request $request)
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

        return response()->json($return['data'], $return['status']);
    }

    public function update(Request $request, $id)
    {
        try {
            $reply = Reply::findOrFail($id);
            $reply->ticket_id = $request->input('ticket_id');
            $reply->user_id = $request->input('user_id');
            $reply->name = $request->input('name');
            $reply->message = $request->input('message');
            $reply->save();

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

        return response()->json($return['data'], $return['status']);
    }

    public function destroy($id)
    {
        $data = new stdClass();

        try {
            $reply = Reply::findOrFail($id);
            $reply->delete();

            $data->deleted = true;

            $return = [
                'status' => 200,
                'data' => $data
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
