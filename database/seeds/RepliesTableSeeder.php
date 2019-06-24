<?php

use Illuminate\Database\Seeder;
use App\Ticket;
use App\Reply;
use Faker\Factory as Faker;


class RepliesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Reply::truncate();

        $tickets = Ticket::all();

        $faker = Faker::create();

        Reply::create([
            'ticket_id' => $tickets[0]->id,
            'user_id' => 1,
            'name' => null,
            'message' => $faker->paragraphs(3, true)
        ]);

        Reply::create([
            'ticket_id' => $tickets[4]->id,
            'user_id' => 1,
            'name' => null,
            'message' => $faker->paragraphs(3, true)
        ]);

        Reply::create([
            'ticket_id' => $tickets[4]->id,
            'user_id' => null,
            'name' => $tickets[4]->name,
            'message' => $faker->paragraphs(3, true)
        ]);
    }
}
