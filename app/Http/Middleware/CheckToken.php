<?php

namespace App\Http\Middleware;

use App\Models\Token;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!($request->hasHeader('user_token'))) {
            return response()->json(["Message" => "No token supplied"], 400);
        }

        $route = $request->route()->getName();
        $tokenEntry = Token::select("user_id")->where("token", $request->header('user_token'))->get();

        if($tokenEntry->isEmpty()) {
            return response()->json(["Message" => "Bad token"], 400);
        }

        $user = User::find($tokenEntry->value('user_id'));
        if ($route == "allTickets") {
            if($user->level < 3) {
                return response()->json(["Message" => "Permission denied"], 403);
            }
        }

        return $next($request);
    }
}
