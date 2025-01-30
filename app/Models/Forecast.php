<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Forecast extends Model
{
    protected $fillable = [
        'city_name',
        'timestamp_dt',
        'min_tmp',
        'max_tmp',
        'wind_spd',
    ];

    protected function casts(): array
    {
        return [
            'timestamp_dt' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}
