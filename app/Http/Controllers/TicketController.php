<?php

namespace App\Http\Controllers;

use App\Http\Requests\BuyTicketRequest;
use App\Models\Place;
use App\Models\Ticket;
use App\Models\Flight;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TicketController extends Controller
{
    public function buyTicket(Flight $flight, BuyTicketRequest $request)
    {
        $data = $request->validated();

        $place = Place::find($data['place_id']);

        $user = Auth::user();

        $boughtPlace = Ticket::create(
            [
                'user_id' => $user->id,
                'flight_id' => $flight->id,
                'place_id' => $place->id,
                'price' => $place->type === 'basic'
                    ? $flight->ticket_price_basic_place
                    : $flight->ticket_price_premium_place,
            ]
        );

        return response()->json($boughtPlace);
    }

    public function getTickets()
    {
        $user = Auth::user();

        return response()->json($user->tickets()->with(['plane', 'flight', 'place'])->get());
    }

    public function statistics()
    {
        $year = Carbon::now()->year;

        $tickets = Ticket::whereYear('created_at', $year)->get();

        $ticketsByMonth = array_fill(1, 12, 0);

        foreach ($tickets as $ticket) {
            $month = $ticket->created_at->format('n');
            $ticketsByMonth[$month]++;
        }

        return response()->json($ticketsByMonth);
    }
}
