<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    //
    public function store(Request $request) {
        
        try {
            $token = Auth::attempt(['email' => $request->email, 'password' => $request->password]);
            if ($token) {
                $user = Auth::user();
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
