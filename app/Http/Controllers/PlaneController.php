<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePlaneRequest;
use App\Http\Requests\CreateServiceRequest;
use App\Http\Requests\UpdatePlaneRequest;
use App\Models\Plane;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PlaneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $current_page = $request->input('current_page') ?? 0;
        $per_page = $request->input('per_page') ?? 100000;
        $allPlanes = Plane::with('firm')->paginate($per_page, ['*'], 'page', $current_page);

        return response()->json($allPlanes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreatePlaneRequest $request)
    {
        $data = $request->validated();

        $image = $data['image'];

        $data['img_url'] = 'storage/' . Storage::put('/img', $image);

        unset($data['image']);

        $plane = Plane::create($data);

        return response()->json(['plane' => $plane], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Plane $plane)
    {
        $plane->load(['firm', 'services.serviceType']);

        return response()->json($plane);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlaneRequest $request, Plane $plane)
    {
        $data = $request->validated();

        $plane->model = $data['model'];
        $plane->creation_date = $data['creation_date'];
        $plane->basic_seats_number = $data['basic_seats_number'];
        $plane->premium_seats_number = $data['premium_seats_number'];
        $plane->firm_id = $data['firm_id'];
        $plane->save();

        return response()->json(['plane' => $plane->fresh()]);
    }

    public function createService(CreateServiceRequest $request)
    {
        $data = $request->validated();

        $plane = Plane::find($data['plane_id']);

        unset($data['plane_id']);

        $service = $plane->services()->create($data);

        $plane->load(['firm', 'services.serviceType']);

        return response()->json($plane);
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
