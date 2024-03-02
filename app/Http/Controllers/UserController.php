<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePlaneRequest;
use App\Http\Requests\UpdatePlaneRequest;
use App\Models\Flight;
use App\Models\Plane;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function personalInfo()
    {
        $user = Auth::user();

        return response()->json($user->userInfo);
    }
}
