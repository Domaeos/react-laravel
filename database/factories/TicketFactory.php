<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "client_id" => User::where('level', 0)->inRandomOrder()->first(),
            "support_id" => User::whereBetween('level', [1,2])->inRandomOrder()->first(),
            "thread_id" => Str::random(100),
            "read" => true,
            "closed" => $this->faker->boolean(20),
            "resolved" => $this->faker->boolean(50),
            "description" => $this->faker->sentence(30)
        ];

        /*
         $table->boolean('read')->default(false);
            $table->boolean('closed')->default(false);
            $table->boolean('resolved')->default(false);
            */
    }
}
