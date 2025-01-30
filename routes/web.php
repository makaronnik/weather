<?php

use App\Http\Controllers\ForecastController;
use Illuminate\Support\Facades\Route;

Route::group(['controller' => ForecastController::class], function () {
    Route::get('/', 'index');
    Route::post('/db', 'getForecastFromDb');
    Route::post('/api', 'getForecastFromApi');
    Route::post('/save', 'saveForecast');
});
