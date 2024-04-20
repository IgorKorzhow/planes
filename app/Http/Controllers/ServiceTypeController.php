<?php

namespace App\Http\Controllers;

use App\Models\ServiceType;

class ServiceTypeController extends Controller
{
    public function index() {
        return response()->json(ServiceType::all());
    }
}
