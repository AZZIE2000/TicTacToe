<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use GuzzleHttp\Psr7\Message;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    use HttpResponses;
    public function login(Request $request)
    {
        // $request->validated($request->all());
        $validator = Validator::make($request->all(), [

            'email' => ['required', 'string', 'max:255'],
            'password' => ['required', 'min:8']
        ]);
        if ($validator->fails()) {
            return response()->json(['status' => 401, 'errors' => $validator->messages()]);
        }
        if (!Auth::attempt($request->only(['email', 'password']))) {
            // return $this->error('', 'user do not exist!', 401);
            return response()->json(['status' => 402, 'errors' => 'user do not exist!']);
        }
        $user = User::where('email', $request->email)->first();
        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token Of ' . $user->name)->plainTextToken
        ]);
    }

    public function register(Request $request)
    {
        // $val =    $request->validated($request->all());
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Password::defaults(), 'min:8']
        ]);
        if ($validator->fails()) {
            return response()->json(['status' => 401, 'errors' => $validator->messages()]);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),

        ]);
        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token Of ' . $user->name)->plainTextToken
        ]);
    }
    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();
        return $this->success([
            'message' => "see ya bish"
        ]);
    }
    public function user()
    {
        return $this->success([
            'user' => Auth::user(),
            'message' => "hi" . Auth::user()->name,
        ]);
    }
    public function googleLogin(Request $request)
    {
        $finduser = User::where('email', $request->email)->first();

        if ($finduser) {
            return $this->success([
                'user' => $finduser,
                'token' => $finduser->createToken('API token of ' . $finduser->name)->plainTextToken
            ]);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'google_id' => $request->google_id
            ]);
            return $this->success([
                'user' => $user,
                'token' => $user->createToken('API Token of ' . $user->name)->plainTextToken
            ]);
        }
    }
}
