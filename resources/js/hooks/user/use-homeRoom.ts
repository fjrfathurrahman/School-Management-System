import { IPagination, IResponse, IHomeRoom } from '@/types/response';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

interface ResponsseHomeRoom {
    status: string;
    message: string;
    data: {
        data: IHomeRoom[];
        meta: IPagination;
    }
}
/**
 * Custom hook untuk mengambil data student dari API.
 * Mendukung searchParams sebagai dependency agar query bisa re-fetch saat berubah.
 */
function useGetHomeRoom(searchParams?: Record<string, string> | null) {
    const { data, ...rest } = useQuery<ResponsseHomeRoom, AxiosError<IResponse>>({
        queryKey: ['homeRoom', searchParams], // Key unik untuk caching dan refetch berdasarkan params
        queryFn: async () => {
            const response = await axios.get('/api/v1/homeRoom', {
                params: searchParams ?? undefined, // Jika searchParams tidak null, pasang ke params
            });
            return response.data;
        },
    });

    // Handle error
    if (rest.isError) {
        toast.error(rest.error?.response?.data?.message ?? 'Terjadi kesalahan');
    }

    return {
        response: data?.data,
        homeRoom: data?.data?.data ?? [],
        ...rest,
    };
}

export { useGetHomeRoom };
