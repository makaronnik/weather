<?php

namespace App\Repositories;

use App\Models\Forecast;

class ForecastRepository
{
    public function getForecastByCityName(string $cityName): ?Forecast
    {
        return Forecast::whereLike('city_name', $cityName)->first();
    }
}
