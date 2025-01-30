<?php

namespace App\Services;

use App\Data\CityForecastData;
use App\Data\StoreCityForecastData;
use App\Models\Forecast;

class ForecastDbService
{
    public function storeForecastInDb(StoreCityForecastData $data): CityForecastData
    {
        $forecast = Forecast::updateOrCreate(
            ['city_name' => $data->cityName],
            [
                'timestamp_dt' => $data->timestampDt,
                'min_tmp' => $data->minTmp,
                'max_tmp' => $data->maxTmp,
                'wind_spd' => $data->windSpd,
            ]
        );

        return CityForecastData::from($forecast);
    }
}
