<?php

use Illuminate\Database\Seeder;
use App\Ticket;
use Faker\Factory as Faker;

class TicketsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Ticket::truncate();

        $faker = Faker::create();

        $trackIds = ['350-BJWW', '480-OWLQ', '221-PLSC', '892-MMSN'];

        foreach ($trackIds as $id) {
            Ticket::create([
                'track_id' => $id,
                'department_id' => 1,
                'name' => $faker->name,
                'email' => $faker->email,
                'subject' => $faker->sentence(3),
                'message' => $faker->paragraphs(3, true),
                'prioity' => 1
            ]);
        }
    }
}
