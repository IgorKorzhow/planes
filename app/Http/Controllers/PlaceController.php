<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use App\Models\Place;
use Illuminate\Database\Query\Builder;

class PlaceController extends Controller
{
    public function getAvailablePlaces(Flight $flight)
    {
        $availablePlaces = Place::query()
            ->where('plane_id', '=', $flight->plane_id)
            ->whereNotExists(function (Builder $query) use ($flight) {
                $query->select(\DB::raw(1))
                    ->from('tickets')
                    ->whereColumn('place_id', '=', 'places.id')
                    ->where('flight_id', '=', $flight->id);
            })->get()
            ->groupBy('type');

        return response()->json($availablePlaces);
    }
}
