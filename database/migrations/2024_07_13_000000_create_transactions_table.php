<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('service_provider_id');
            $table->unsignedBigInteger('service_seeker_id');
            $table->unsignedBigInteger('service_id');
            $table->decimal('amount', 10, 2);
            $table->enum('status', ['pending', 'in_escrow', 'completed', 'canceled'])->default('pending');
            $table->timestamps();

            $table->foreign('service_provider_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('service_seeker_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
