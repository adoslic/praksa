<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // $req = Request::create('http://localhost:8000/oauth/token', 'POST', [
        //             'grant_type' => 'password',
        //             'client_id' => 2,
        //             'client_secret' => 'a5ieRD8QtjnsQysgLhP6jq7xOZRyxMc6jgQYXQVv',
        //             'username' => $request->username,
        //             'password' => $request->password
        // ]);
        // $response = app()->handle($req);
        // return $response;

        $req = Request::create(config('services.passport.login_endpoint'), 'POST', [
            'grant_type' => 'password',
            'client_id' => config('services.passport.client_id'),
            'client_secret' => config('services.passport.client_secret'),
            'username' => $request->username,
            'password' => $request->password
        ]);
        $response = app()->handle($req);
        return $response;       
    }
    public function register(Request $request){

        $request->validate( [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    }
    public function logout(){
        //kad je korisnik odjavi želimo obrisat njegov access token
        auth()->user()->tokens->each(function ($token, $key) {
            $token->delete();
        });
        return response()->json('Logged out successfully', 200);
    }
}
