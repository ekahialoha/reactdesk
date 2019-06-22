<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Resources\Ticket as TicketResource;
use App\Traits\CreateTrackId;
use App\Ticket;
use JWTAuth;
use \stdClass;

class TicketController extends Controller
{
    use CreateTrackId;

    public function __construct()
    {
        $this->middleware('auth:api')->except(['store', 'show', 'update']);
    }

    public function index()
    {
        $tickets = Ticket::all();
        $tickets->loadMissing(['department', 'replies']);

        $return = [
            'status' => 200,
            'data' => TicketResource::collection($tickets)
        ];

        return response()->json($return['data'], $return['status']);
    }

    public function store(Request $request)
    {
        $ticket = new Ticket();
        $ticket->track_id = $this->generateTrackId();
        $ticket->department_id = $request->input('department_id');
        $ticket->name = $request->input('name');
        $ticket->email = $request->input('email');
        $ticket->subject = $request->input('subject');
        $ticket->message = $request->input('message');
        $ticket->priority = $request->input('priority');
        $ticket->status = $request->input('status');
        $ticket->save();

        $return = [
            'status' => 201,
            'data' => new TicketResource($ticket)
        ];

        return response()->json($return['data'], $return['status']);
    }


    public function show(Request $request, $id)
    {
        try {
            if ($request->cookie('token') && JWTAuth::parseToken()->authenticate()) {
                $ticket = Ticket::findOrFail($id);
            } else {
                $ticket = Ticket::where('track_id', $id)->firstOrFail();
            }
            $ticket->loadMissing(['department', 'replies', 'replies.user']);

            $return = [
                'status' => 200,
                'data' => new TicketResource($ticket)
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
            if ($request->cookie('token') && JWTAuth::parseToken()->authenticate()) {
                $ticket = Ticket::findOrFail($id);
            } else {
                $ticket = Ticket::where('track_id', $id)->firstOrFail();
           }
           $ticket->loadMissing(['department', 'replies']);

            $ticket->department_id = $request->input('department_id');
            $ticket->name = $request->input('name');
            $ticket->email = $request->input('email');
            $ticket->subject = $request->input('subject');
            $ticket->message = $request->input('message');
            $ticket->priority = $request->input('priority');
            $ticket->status = $request->input('status');
            $ticket->save();

            $return = [
                'status' => 200,
                'data' => new TicketResource($ticket)
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
            $ticket = Ticket::findOrFail($id);
            $ticket->delete();

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
