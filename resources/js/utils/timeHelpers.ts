import { format } from 'date-fns';

export const formatDate = (timestamp: number | string) => {
    return format(new Date(timestamp), 'yyyy-MM-dd h:mm:ss a').toLowerCase();
};
