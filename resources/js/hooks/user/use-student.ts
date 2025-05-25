import { IPagination, IResponse, IStudent } from '@/types/response';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

/**
 * Custom hook untuk mengambil data student dari API.
 * Mendukung searchParams sebagai dependency agar query bisa re-fetch saat berubah.
 */
function useGetStudent(searchParams?: Record<string, string> | null) {
    const { data, ...rest } = useQuery<IResponse<IStudent[]> & IPagination, AxiosError>({
        queryKey: ['students', searchParams], // Key unik untuk caching dan refetch berdasarkan params
        queryFn: async () => {
            try {
                const response = await axios.get('/api/v1/students', {
                    params: searchParams ?? undefined, // Jika searchParams tidak null, pasang ke params
                });
                return response.data;
            } catch (error) {
                toast.error('Sorry, gagal mendapatkan data 😓');
                throw error; 
            }
        },
        staleTime: 1000 * 60 * 5, // Cache selama 5 menit
        retry: 2, // Coba ulang 2x jika gagal
    });

    return {
        response: data,
        students: data?.data ?? [], 
        ...rest,
    };
}

export { useGetStudent };
