<?php

use Illuminate\Database\Seeder;
use App\Traits\CreateTrackId;
use App\Ticket;
use Faker\Factory as Faker;

class TicketsTableSeeder extends Seeder
{
    use CreateTrackId;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Ticket::truncate();

        $faker = Faker::create();

        for ($i = 0; $i < 10; $i++) {
            Ticket::create([
                'track_id' => $this->generateTrackId(),
                'department_id' => 1,
                'name' => $faker->name,
                'email' => $faker->email,
                'subject' => $faker->sentence(3),
                'message' => $faker->paragraphs(3, true),
                'priority' => 1
            ]);
        }
    }
}
