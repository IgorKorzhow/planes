<?php

namespace App\Http\Controllers;

use App\Http\Filters\FlightFilter;
use App\Http\Requests\CreateFlightRequest;
use App\Models\Flight;

class FlightController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(FlightFilter $filter)
    {
        $current_page = $filter->request->query('current_page') ?? 0;
        $per_page = $filter->request->query('per_page') ?? 100000;
        $allFlights = Flight::filter($filter)
            ->paginate($per_page, ['*'], 'page', $current_page);
        return response()->json($allFlights);

    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateFlightRequest $request)
    {
        $data = $request->validated();

        $flight = Flight::create($data);

        return response()->json($flight, 201);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function show(Flight $flight)
    {
        return response()->json($flight);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CreateFlightRequest $request, Flight $flight)
    {
        $data = $request->validated();

        $flight->update($data);

        return response()->json($flight);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Flight $flight)
    {
        $flight->delete();

        return response()->json(status: 201);
    }
}
