import { IPagination, IResponse, IStudent } from '@/types/response';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

interface ResponsseStudents {
    status: string;
    message: string;
    data: {
        data: IStudent[];
        meta: IPagination;
    }
}

/**
 * Custom hook untuk mengambil data student dari API.
 * Mendukung searchParams sebagai dependency agar query bisa re-fetch saat berubah.
 */
function useGetStudents(searchParams?: Record<string, string> | null) {
    const { data, ...rest } = useQuery<ResponsseStudents, AxiosError<IResponse>>({
        queryKey: ['students', searchParams], // Key unik untuk caching dan refetch berdasarkan params
        queryFn: async () => {
            const response = await axios.get('/api/v1/students', {
                params: searchParams ?? undefined, // Jika searchParams tidak null, pasang ke params
            });
            return response.data;
        },
        networkMode: 'online',
    });

    if (rest.isError) {
        toast.error(rest.error?.response?.data?.message ?? 'Terjadi kesalahan');
    }

    return {
        response: data?.data,
        students: data?.data?.data ?? [],
        ...rest,
    };
}

export { useGetStudents };
