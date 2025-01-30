<?php

namespace App\Http\Controllers;

use App\Data\CityForecastData;
use App\Data\GetCityForecastData;
use App\Data\StoreCityForecastData;
use App\Repositories\ForecastRepository;
use App\Services\ForecastApiService;
use App\Services\ForecastDbService;
use Exception;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ForecastController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('WeatherForecast');
    }

    public function getForecastFromApi(
        GetCityForecastData $data,
        ForecastApiService $service
    ): RedirectResponse|Response {
        try {
            $forecasts = $service->fetchForecastFromApi($data->cityName);
        } catch (RequestException $e) {
            if ($e->getCode() === 404) {
                return back()->withErrors(['api' => "City {$data->cityName} not found"]);
            }

            return back()->withErrors(['api' => 'Failed to fetch data from API']);
        } catch (Exception $e) {
            return back()->withErrors(['api' => $e->getMessage()]);
        }

        return Inertia::render('WeatherForecast', [
            'city' => $data->cityName,
            'forecasts' => $forecasts,
        ]);
    }

    public function getForecastFromDb(
        GetCityForecastData $data,
        ForecastRepository $repository
    ): RedirectResponse|Response {
        $forecast = $repository->getForecastByCityName($data->cityName);

        if (!$forecast) {
            return back()->withErrors(['db' => 'No forecast found in database']);
        }

        try {
            $forecastData = CityForecastData::from($forecast);
        } catch (Exception $e) {
            return back()->withErrors(['db' => $e->getMessage()]);
        }

        return Inertia::render('WeatherForecast', [
            'city' => $data->cityName,
            'forecast' => $forecastData,
        ]);
    }

    public function saveForecast(StoreCityForecastData $data, ForecastDbService $service): RedirectResponse|Response
    {
        $forecastData = $service->storeForecastInDb($data);

        return Inertia::render('WeatherForecast', [
            'city' => $data->cityName,
            'forecast' => $forecastData,
        ]);
    }
}
