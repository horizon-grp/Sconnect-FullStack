<?php

namespace Database\Seeders;
use App\Models\Appointment;
use App\Models\Service;
use App\Models\User;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AppointmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $serviceSeekers = User::where('user_type', 'service_seeker')->get();
        $serviceProviders = User::where('user_type', 'service_provider')->get();
        $services = Service::all();

        foreach ($serviceSeekers as $seeker) {
            foreach ($services as $service) {
                $provider = $serviceProviders->random();

                Appointment::create([
                    'service_seeker_id' => $seeker->id,
                    'service_provider_id' => $provider->id,
                    'service_id' => $service->id,
                    'date' => now()->addDays(rand(1, 30)),
                    'time' => now()->format('H:i:s'),
                    'status' => 'pending',
                ]);
            }
        }
    }


}