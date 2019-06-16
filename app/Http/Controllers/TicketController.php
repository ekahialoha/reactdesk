<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Resources\Ticket as TicketResource;
use App\Traits\CreateTrackId;
use App\Ticket;
use \stdClass;



class TicketController extends Controller
{
    use CreateTrackId;

    public function index()
    {
        $tickets = Ticket::all();
        $tickets->loadMissing('department');

        $return = [
            'status' => 200,
            'data' => TicketResource::collection($tickets)
        ];

        return response()->json($return, $return['status']);
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
        $ticket->save();

        $return = [
            'status' => 201,
            'data' => new TicketResource($ticket)
        ];

        return response()->json($return, $return['status']);
    }


    public function show($id)
    {
        try {
            $ticket = Ticket::findOrFail($id);

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

        return response()->json($return, $return['status']);
    }


    public function update(Request $request, $id)
    {
        try {
            $ticket = Ticket::findOrFail($id);
            $ticket->department_id = $request->input('department_id');
            $ticket->name = $request->input('name');
            $ticket->email = $request->input('email');
            $ticket->subject = $request->input('subject');
            $ticket->message = $request->input('message');
            $ticket->priority = $request->input('priority');
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

        return response()->json($return, $return['status']);
    }

    public function destroy($id)
    {
        //
    }
}
