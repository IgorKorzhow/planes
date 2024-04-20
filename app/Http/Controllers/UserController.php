<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePlaneRequest;
use App\Http\Requests\UpdatePersonalInfoRequest;
use App\Http\Requests\UpdatePlaneRequest;
use App\Models\Flight;
use App\Models\Plane;
use App\Models\User;
use App\Models\UserPersonalInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function personalInfo()
    {
        $user = Auth::user();

        return response()->json($user->userInfo);
    }

    public function personalInfoUpdate(UpdatePersonalInfoRequest $updatePersonalInfoRequest)
    {
        $user = Auth::user();

        $data = $updatePersonalInfoRequest->validated();

        $userInfo = UserPersonalInfo::updateOrCreate(
            [
                'user_id' => $user->id,
                ...$data
            ]
        );

        return response()->json($userInfo);
    }
}
