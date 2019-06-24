<?php

use Illuminate\Database\Seeder;
use App\Department;

class DepartmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Department::truncate();

        Department::create([
            'name' => 'Sales',
            'description' => 'Sales team inquiries',
            'status' => 1
        ]);

        Department::create([
            'name' => 'Tech Support',
            'description' => 'Tech team assisting with all technical concerns',
            'status' => 1
        ]);

        Department::create([
            'name' => 'Esclations',
            'description' => 'Esclations team',
            'status' => 2
        ]);
    }
}
