<?php

namespace App\Services;

use App\Data\CityForecastData;
use App\Data\GetCityForecastData;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class ForecastApiService
{
    /**
     * @return array<CityForecastData>|null
     * @throws RequestException
     */
    public function fetchForecastFromApi(string $cityName): ?array
    {
        $response = Http::get(config('app.forecast.api_url'), [
            'q' => $cityName,
            'units' => 'metric',
            'appid' => config('app.forecast.api_key'),
        ]);

        $response->throw();

        if ($response->failed()) {
            throw new RuntimeException('Failed to fetch data from API');
        }

        $data = $response->json();

        if (!is_array(data_get($data, 'list'))) {
            return null;
        }

        $cityName = data_get($data, 'city.name');

        return Arr::map(data_get($data, 'list'), function (array $item) use ($cityName) {
            return new CityForecastData(
                cityName: $cityName,
                timestampDt: now()->setTimestamp($item['dt']),
                minTmp: $item['main']['temp_min'],
                maxTmp: $item['main']['temp_max'],
                windSpd: $item['wind']['speed'],
                createdAt: now(),
                updatedAt: now(),
            );
        });
    }
}
