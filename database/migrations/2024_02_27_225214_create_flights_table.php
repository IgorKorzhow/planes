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
        Schema::create('flights', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('plane_id');

            $table->foreign('plane_id')
                ->references('id')
                ->on('planes')
                ->nullOnDelete();

            $table->string('departure_city');
            $table->string('arrival_city');
            $table->dateTime('departure_date_time');
            $table->dateTime('arrival_date_time');
            $table->string('ticket_price_basic_place');
            $table->string('ticket_price_premium_place');
            $table->enum('status', ['history', 'cancelled', 'upcoming']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flights');
    }
};
