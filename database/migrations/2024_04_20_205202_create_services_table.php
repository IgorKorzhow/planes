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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('service_type_id');

            $table->foreign('service_type_id')->references('id')->on('service_types');

            $table->date('service_date');

            $table->unsignedInteger('plane_id');

            $table->foreign('plane_id')->references('id')->on('planes');

            $table->text('special_info')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};