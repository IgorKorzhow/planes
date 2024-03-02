<?php

namespace App\Http\Controllers;

use App\Http\Requests\BuyTicketRequest;
use App\Models\Place;
use App\Models\Ticket;
use App\Models\Flight;
use Illuminate\Support\Facades\Auth;

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
}
