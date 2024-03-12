<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->text('description');
            $table->text('thread_id');
            $table->boolean('read')->default(false);
            $table->boolean('closed')->default(false);
            $table->boolean('resolved')->default(false);
            $table->unsignedBigInteger('support_id')->nullable();
            $table->unsignedBigInteger('client_id');
            $table->foreign('support_id')->references('id')->on('users');
            $table->foreign('client_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
