<?php

namespace App\Data;

use Carbon\Carbon;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class CityForecastData extends Data
{
    public function __construct(
        public string $cityName,
        public Carbon $timestampDt,
        public float $minTmp,
        public float $maxTmp,
        public float $windSpd,
        public Carbon $createdAt,
        public Carbon $updatedAt,
    ) {
    }
}
