<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Filters\Program;
use App\Http\Filters\ProgramFilter;
use App\Http\Requests\StoreProgramRequest;
use App\Http\Requests\UpdateProgramRequest;
use App\Models\Exercise;
use App\Models\Feature;
use Illuminate\Support\Facades\DB;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ProgramFilter $filter)
    {
        $current_page = $filter->request->query('current_page') ?? 0;
        $per_page = $filter->request->query('per_page') ?? 100000;
        $allPrograms = Program::filter($filter)
            ->with(['exercises', 'features'])
            ->paginate($per_page, ['*'], 'page', $current_page);
        return response()->json($allPrograms);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProgramRequest $request)
    {
        $program = $request->validated();
        DB::transaction(function() use ($program) {
            $image = $program['image'];
            $features = $program['features'];
            $exercises = $program['exercises'];
            unset($program['image']);
            unset($program['features']);
            unset($program['exercises']);
            $program['image'] = createAndSaveImage('public/images', $image)['img_name'];
            $program = Program::create($program);
            $program->exercises()->sync($exercises);
            foreach ($features as $feature) {
                $createdFeature = new Feature();
                $createdFeature->name = $feature;
                $program->features()->save($createdFeature);
            }
        }, 3);
        return response(["message" => 'Everything is ok'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $program = Program::with(['exercises.images', 'features'])->findOrFail($id);
        return response()->json($program);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProgramRequest $request, string $id)
    {
        $fields = $request->validated();
        $program = Program::findOrFail($id);
        $program->features()->delete();
        $features = $fields['features'];
        $exercises = $fields['exercises'];
        foreach ($features as $feature) {
            $createdFeature = new Feature();
            $createdFeature->name = $feature;
            $program->features()->save($createdFeature);
        }
        $program->exercises()->sync($exercises);
        $program->header = $fields['header'];
        $program->description = $fields['description'];
        $program->save();

        return response()->json("Program was updated", 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Program $program)
    {
        $imageName = $program->image;
        deleteImage("storage/images/", $imageName);
        $program->delete();
        return response()->json("Ok", 201);
    }
}
