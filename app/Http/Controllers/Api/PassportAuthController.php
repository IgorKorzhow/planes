<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class PassportAuthController extends Controller
{
    public function register(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = new UserResource(User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]));

        $token = $user->createToken('PassportAuthToken')->accessToken;

        return response(compact('user', 'token'));
    }

    public function login(Request $request)
    {
        $data = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (auth()->attempt($data)) {
            $user = new UserResource(auth()->user());
            $token = auth()->user()->createToken('PassportAuthToken')->accessToken;
            return response(compact('user', 'token'));
        } else {
            return response()->json(['error' => 'Unauthorised'], 401);
        }
    }

    public function logout(Request $request)
    {
        Auth::user()->AauthAcessToken()->delete();
        return response([], 204);
    }

    public function changePassword(Request $request)
    {
        $this->validate($request, [
            'old_password' => 'required|min:8',
            'new_password' => 'required|min:8|confirmed',
        ]);
        $user = User::findOrFail(Auth::id());
        if (Hash::check($request['old_password'], $user->password)) {
            $user->update([
                'password' => Hash::make($request['new_password']),
            ]);
            auth()->user()->tokens()->delete();
        }
        return response()->json(['status' => 'Your password was changed'], 200);
    }
}
