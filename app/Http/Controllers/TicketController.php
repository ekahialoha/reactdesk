<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Ticket as TicketResource;
use App\Ticket;

class TicketController extends Controller
{

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
