import { IPagination, IResponse, IStudent } from '@/types/response';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

interface ResponsseStudents {
    status: string;
    message: string;
    data: {
        data: IStudent[];
        meta: IPagination;
    };
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
    });

    // Handle error
    if (rest.isError) {
        toast.error(rest.error?.response?.data?.message ?? 'Terjadi kesalahan');
    }

    return {
        response: data?.data,
        data: data?.data?.data ?? [],
        ...rest,
    };
}

/**
 * Custom hook untuk menghapus data siswa berdasarkan id.
 * Mengembalikan fungsi `mutateAsync` yang dapat digunakan untuk menghapus data,
 * serta properti `isLoading` dan `isError` untuk mengetahui status dari proses penghapusan.
 *
 * @param {number} id - id data siswa yang akan dihapus
 * @returns {Object} - objek yang berisi fungsi `mutateAsync` dan properti `isLoading` dan `isError`
 */
function useDeleteStudent(id: number) {
    const studentsQuery = useGetStudents();

    return useMutation<IResponse, AxiosError<IResponse>>({
        mutationFn: async () => (await axios.delete(`/api/v1/students/${id}`)).data,
        onError: (e) => toast.error(e.response?.data?.message ?? 'Terjadi kesalahan'),
        onSuccess: (data) => {
            toast.success(data.message ?? 'Berhasil menghapus data siswa');
            studentsQuery.refetch();

            window.location.href = '/dashboard/siswa';
        },
    });
}

export { useDeleteStudent, useGetStudents };
