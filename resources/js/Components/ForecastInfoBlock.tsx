import { Forecast } from '@/types/forecats';
import { formatDate } from '@/utils/timeHelpers';
import { router } from '@inertiajs/react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';

type ForecastInfoBlockProps = {
    city: string;
    forecasts?: Forecast[];
    forecast?: Forecast;
};
export default function ForecastInfoBlock(props: ForecastInfoBlockProps) {
    const { city, forecasts, forecast } = props;
    const handleSaveLatestForecast = () => {
        if (Array.isArray(forecasts) && forecasts.length > 0) {
            const latestForecast = forecasts[0];

            router.post(
                '/save',
                {
                    city_name: city,
                    timestamp_dt: latestForecast.timestamp_dt,
                    min_tmp: latestForecast.min_tmp,
                    max_tmp: latestForecast.max_tmp,
                    wind_spd: latestForecast.wind_spd,
                },
                {
                    preserveUrl: true,
                    preserveState: true,
                },
            );
        }
    };

    const startPeriod = useMemo(() => {
        if (!forecasts || forecasts.length === 0) {
            return null;
        }

        const firstForecast = forecasts[0];

        return formatDate(firstForecast.timestamp_dt);
    }, [forecasts]);

    const endPeriod = useMemo(() => {
        if (!forecasts || forecasts.length === 1) {
            return null;
        }

        const lastForecast = forecasts[forecasts.length - 1];

        return formatDate(lastForecast.timestamp_dt);
    }, [forecasts]);

    return (
        <Paper className="mt-8 flex flex-col items-start gap-4 p-4">
            <Typography variant="h2">{city}</Typography>

            {forecasts ? (
                <>
                    <div>
                        <Typography variant="h6">Period</Typography>

                        <p>Starts at: {startPeriod}</p>

                        <p>Ends at: {endPeriod ?? startPeriod}</p>
                    </div>

                    <Button
                        onClick={handleSaveLatestForecast}
                        variant="outlined"
                        color="secondary"
                    >
                        Save forecast
                    </Button>
                </>
            ) : null}

            {forecast ? (
                <p className="text-lg">
                    <strong>Updated at:</strong>{' '}
                    {formatDate(forecast.timestamp_dt)}
                </p>
            ) : null}
        </Paper>
    );
}
