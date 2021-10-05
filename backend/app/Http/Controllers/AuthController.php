<?php

namespace App\Http\Controllers;

use App\Models\Userss;
use Illuminate\Http\Request;


class AuthController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    
    public function register(Request $request)
    {
        $user = Userss::create([
             'username' => $request->username,
             'password' => $request->password,
             'role'     => $request->role,
         ]);

        $token = auth('api')->login($user);

        return $this->respondWithToken($token);
    }

     /**
     * @return \Illuminate\Http\JsonResponse
     */

    public function login()
    {
        $credentials = request(['username', 'password']);

        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth('api')->factory()->getTTL() * 60,
            'data' => Userss::where('username',request(['username']))->first()

            
        ]);
    }
}