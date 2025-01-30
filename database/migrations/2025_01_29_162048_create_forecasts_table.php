<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('forecasts', function (Blueprint $table) {
            $table->id();

            $table->timestamp('timestamp_dt');
            $table->string('city_name');
            $table->decimal('min_tmp', 5);
            $table->decimal('max_tmp', 5);
            $table->decimal('wind_spd', 5);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('forecasts');
    }
};
