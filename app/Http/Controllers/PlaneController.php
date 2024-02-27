<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePlaneRequest;
use App\Http\Requests\UpdatePlaneRequest;
use App\Models\Plane;

class PlaneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Plane::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreatePlaneRequest $request)
    {
        $data = $request->validated();

        $plane = Plane::create($data);

        return response()->json(['plane' => $plane], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Plane $plane)
    {
        return response()->json(['plane' => $plane]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlaneRequest $request, Plane $plane)
    {
        $data = $request->validated();

        $plane->update($data);

        return response()->json(['plane' => $plane]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Plane $plane)
    {
        $plane->delete();

        return response()->json(status: 204);
    }
}
