<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ticket;
use App\Http\Resources\Ticket as TicketResource;
use App\Http\Resources\Department as DepartmentResource;

class TicketController extends Controller
{

    public function index()
    {
        $tickets = Ticket::all();
        return response()->json(TicketResource::collection($tickets));
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
