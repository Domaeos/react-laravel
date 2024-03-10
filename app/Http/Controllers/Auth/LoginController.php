<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\Token;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    //  
    public function store(Request $request) {      
        try {
            if($request->has("user_token")) {
                $validToken = Token::where("token", $request->user_token)->first();
                if($validToken) {
                    return $validToken;
                } else {
                    return response()->json(["Error" => "Bad token"], 400);
                }
            }
            $token = Auth::attempt(['email' => $request->email, 'password' => $request->password]);
            if ($token) {
                $user = Auth::user();
                $logToken = new Token();
                $logToken->user_id = $user->id;
                $logToken->token = $token;
                $logToken->save();
                return response()->json([
                    'user' => $user,
                    'authorization' => [
                        'token' => $token,
                        'type' => 'bearer',
                    ]
                ]);
            }
            return response()->json(["login" => false], 400);
        } catch (Exception $e) {
            return $e;
        }
    }
}
