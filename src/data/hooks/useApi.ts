import { AxiosRequestConfig } from 'axios';
import { ApiService } from 'data/services/ApiService';
import useSWR from 'swr';

export function useApi<OutputType>(
    endpoint: string | null,
    config?: AxiosRequestConfig
): { data?: OutputType; error: Error } {
    const { data, error } = useSWR(endpoint, async (url) => {
        const response = await ApiService(url, config);
        return response.data;
    });

    return { data, error };
}
