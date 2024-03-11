<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class Users extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return User::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'name' => 'required|alpha|min:5|max:50',
            'level' => 'numeric|between:0,3',
            'email' => 'required|email',
            'password' => 'required|min:60|max:300'
        ]);
        return $validated;
        $user = new User();

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
    public function destroy(string $id)
    {
        //
    }
}
