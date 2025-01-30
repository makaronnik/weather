import { Forecast } from '@/types/forecats';
import { formatDate } from '@/utils/timeHelpers';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';

type ForecastTableBlockProps = {
    forecasts?: Forecast[];
    forecast?: Forecast;
};

export default function ForecastTableBlock(props: ForecastTableBlockProps) {
    const { forecasts, forecast } = props;

    const columns: GridColDef[] = [
        {
            field: 'timestamp_dt',
            headerName: 'Datetime',
            flex: 2,
            valueGetter: (value: string) => formatDate(value),
        },
        {
            field: 'min_tmp',
            headerName: 'Min Temp',
            flex: 1,
            renderCell: (params) => (
                <div
                    dangerouslySetInnerHTML={{
                        __html: `${params.value}<span class="opacity-75">°C</span>`,
                    }}
                />
            ),
        },
        {
            field: 'max_tmp',
            headerName: 'Max Temp',
            flex: 1,
            renderCell: (params) => (
                <div
                    dangerouslySetInnerHTML={{
                        __html: `${params.value}<span class="opacity-75">°C</span>`,
                    }}
                />
            ),
        },
        {
            field: 'wind_spd',
            headerName: 'Wind Speed',
            flex: 1,
            renderCell: (params) => (
                <div
                    dangerouslySetInnerHTML={{
                        __html: `${params.value} <span class="opacity-75">km/h</span>`,
                    }}
                />
            ),
        },
    ];

    const rows = useMemo(() => {
        if (forecasts) {
            return forecasts.map((forecast) => ({
                ...forecast,
                id: forecast.timestamp_dt,
            }));
        }

        if (forecast) {
            return [
                {
                    ...forecast,
                    id: forecast.timestamp_dt,
                },
            ];
        }

        return [];
    }, [forecasts, forecast]);

    return (
        <Paper className="mt-8 p-4">
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[5, 10, 20, 100]}
                autosizeOnMount
                disableColumnFilter
                sx={{
                    '& .MuiDataGrid-row': {
                        borderBottom: (theme) =>
                            rows.length > 1
                                ? `1px solid ${theme.palette.divider}`
                                : undefined,
                    },
                }}
                hideFooter={rows.length < 2}
            />
        </Paper>
    );
}
