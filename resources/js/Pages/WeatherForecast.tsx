import ErrorSnackbar from '@/Components/ErrorSnackbar';
import ForecastInfoBlock from '@/Components/ForecastInfoBlock';
import ForecastTableBlock from '@/Components/ForecastTableBlock';
import SearchInput from '@/Components/SearchInput';
import MainLayout from '@/Layouts/MainLayout';
import { PageProps } from '@/types';
import { Forecast } from '@/types/forecats';
import { router, usePage } from '@inertiajs/react';
import Button from '@mui/material/Button';
import { useState } from 'react';

export type WeatherForecastProps = {
    city: string;
    forecasts?: Forecast[];
    forecast?: Forecast;
    errors?: Record<string, string>;
};

const WeatherForecast = () => {
    const {
        city = '',
        forecasts,
        forecast,
        errors,
    } = usePage<PageProps<WeatherForecastProps>>().props;

    const [cityName, setCityName] = useState<string>(city);

    const handleFetchFromApi = () => {
        router.post('/api', { city_name: cityName }, { preserveUrl: true });
    };

    const handleFetchFromDb = () => {
        router.post('/db', { city_name: cityName }, { preserveUrl: true });
    };

    return (
        <MainLayout>
            <div className="mt-2">
                <div className="flex gap-4">
                    <SearchInput
                        value={cityName}
                        onChange={setCityName}
                        placeholder="Enter city name"
                        fullWidth
                    />

                    <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                        onClick={handleFetchFromApi}
                        className="shrink-0"
                        disabled={!cityName}
                    >
                        Get from API
                    </Button>

                    <Button
                        size="large"
                        variant="outlined"
                        color="secondary"
                        onClick={handleFetchFromDb}
                        className="shrink-0"
                        disabled={!cityName}
                    >
                        Get from DB
                    </Button>
                </div>

                {city && (forecasts || forecast) ? (
                    <>
                        <ForecastInfoBlock
                            city={city}
                            forecasts={forecasts}
                            forecast={forecast}
                        />

                        <ForecastTableBlock
                            forecasts={forecasts}
                            forecast={forecast}
                        />
                    </>
                ) : null}
            </div>

            {errors
                ? Object.entries(errors).map(([key, value]) => (
                      <ErrorSnackbar key={`${key}-${value}`} error={value} />
                  ))
                : null}
        </MainLayout>
    );
};

export default WeatherForecast;
