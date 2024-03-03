<?php

namespace App\Http\Controllers;

use App\Models\PlaneFirm;
use Illuminate\Http\Request;

class FirmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(PlaneFirm::all());
    }
}
