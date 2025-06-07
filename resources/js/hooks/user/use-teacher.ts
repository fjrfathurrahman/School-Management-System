import { IPagination, IResponse, ITeacher } from '@/types/response';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

interface ResponsseTeachers {
    status: string;
    message: string;
    data: {
        data: ITeacher[];
        meta: IPagination;
    }
}

/**
 * Hook untuk mengambil data guru dari API.
 * Mendukung searchParams sebagai dependency agar query bisa re-fetch saat berubah.
 * 
 * @param searchParams? - Object berisi parameter query yang akan dikirimkan ke API.
 * Contoh: { search: 'John Doe', class: 'X' }
 * Jika tidak ada parameter, maka query akan mengembalikan data guru tanpa filter.
 * 
 * @returns Object berisi data guru dan props lainnya dari useQuery.
 * Contoh: { teachers: [...], response: {...}, isLoading: boolean, ... }
 * 
 * @note Jika terjadi error, maka akan ditampilkan menggunakan toast.error.
 */
function useGetTeachers(searchParams?: Record<string, string> | null) {
    const { data, ...rest } = useQuery<ResponsseTeachers, AxiosError<IResponse>>({
        queryKey: ['teachers', searchParams], // Key unik untuk caching dan refetch berdasarkan params
        queryFn: async () => {
            const response = await axios.get('/api/v1/teachers', {
                params: searchParams ?? undefined, // Jika searchParams tidak null, pasang ke params
            });
            return response.data;
        },
    });

    // Handle error
    if (rest.isError) {
        toast.error(rest.error?.response?.data?.message ?? 'Terjadi kesalahan');
    } else {
        // Handle success
    }

    return {
        response: data?.data,
        teachers: data?.data?.data ?? [],
        ...rest,
    };
}

function useDeleteTeacher(id: number) {
    const teachersQuery = useGetTeachers();

    return useMutation<IResponse, AxiosError<IResponse>>({
        mutationFn: async () => (await axios.delete(`/api/v1/teachers/${id}`)).data,
        onError: (e) => toast.error(e.response?.data?.message ?? 'Terjadi kesalahan'),
        onSuccess: (data) => {
            toast.success(data.message ?? 'Berhasil menghapus data siswa');
            teachersQuery.refetch();

            window.location.href = '/dashboard/siswa';
        },
    });
}


export {useGetTeachers, useDeleteTeacher};