<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\Token;
use App\Models\User;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\isEmpty;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Token::where('token', $request->header('user_token'))->first()->user;
        $tickets = $user->tickets;
        return $tickets;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function fetchAll() {
        return Ticket::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string|min:10'
        ]);

        $user = Token::where('token', $request->header('user_token'))->first()->user;

        $supports = DB::table('users')
        // ->select('name', 'id', DB::raw('COUNT(support_id) AS assignments')) // Mysql doesnt allow
        ->select('users.id')
        ->leftJoin('tickets', 'tickets.support_id', '=', 'users.id')
        ->where('users.level', 1)
        ->get()
        ->toArray();
        $supportCount = array_count_values(array_map(fn($x) => $x->id, $supports));
        $newSupportId = array_search(min($supportCount), $supportCount);
        $newTicket = new Ticket();
        $newTicket->client_id = $user->id;
        $newTicket->support_id = $newSupportId;
        $newTicket->read = true;
        $newTicket->thread_id = uniqid($user->id, true);
        $newTicket->description = $request->description;
        $newTicket->save();

        return response()->json(['Message' => 'Success'], 201);
        
    }

    public function getThread($id) {
        $user = Token::where('token', request()->header('user_token'))->first()->user;
        $thread = $user->tickets->where('thread_id', $id);
        if($thread->isEmpty()) {
            abort(400, "Bad thread request");
        }
        return $thread;
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        //
        $user = Token::where('token', $request->header('user_token'))->first()->user;

    }
}
