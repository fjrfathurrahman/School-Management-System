import { DataTableCustom, ToolbarItem } from '@/components/data-table/data-table-custom';
import { FormAddStudent } from '@/components/forms/FormStudent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDataTable } from '@/hooks/use-data-table';
import { ColumnsStudent } from '@/lib/columns';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowDownToLine, FileSpreadsheet, Upload, UserPlus } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useDebounce } from 'use-debounce';

interface ResponseStudents extends Pagination {
    data: Student[];
    message: string;
    status: string;
}

async function fetchStudents(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    try {
        return (await axios.get<ResponseStudents>(`/api/v1/students?${params}`)).data;
    } catch (e) {
        console.error(e);
        toast.error('Sorry, Gagal mendapatkan data :(');
    }
}

function TableStudents() {
    const [filters, setFilters] = useState({ class: '', major: '', search: '' });

    const [sort] = useQueryState('sort', parseAsString.withDefault('asc'));
    const [perPage] = useQueryState('perPage', parseAsString.withDefault('20'));
    const [page] = useQueryState('page', parseAsString.withDefault('1'));

    const [debouncedSearch] = useDebounce(filters.search, 500);

    const searchParams = { ...filters, perPage, page, sort, search: debouncedSearch };

    const { data: response, isPending } = useQuery({
        queryKey: ['students', searchParams],
        queryFn: () => fetchStudents(searchParams),
    });

    // Agar tidak merender ulang
    const studentData = useMemo(() => response?.data || [], [response?.data]);

    // Setup data table hook
    const { table } = useDataTable({
        data: studentData,
        columns: ColumnsStudent(),
        pageCount: Number(response?.meta?.last_page),
    });

    // Handler untuk update filter
    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    // ...
    const toolbarItems: ToolbarItem[] = [
        {
            component: 'dropdown',
            icon: <Upload className="h-4 w-4" />,
            title: 'Import',
            items: [
                {
                    label: 'Download Template',
                    icon: <FileSpreadsheet className="h-4 w-4 text-green-600" />,
                    onSelect: () => console.log('Download template'),
                },
                {
                    label: 'Import Data',
                    icon: <Upload className="h-4 w-4 text-blue-600" />,
                    onSelect: () => console.log('Import data'),
                },
            ],
        },
        {
            component: 'sheet',
            icon: <UserPlus />,
            title: 'Tambah Siswa',
            content: <FormAddStudent />,
        },
    ];

    return (
        <main className="space-y-6">
            {/* Filter Section */}
            <Card>
                <CardHeader>
                    <h3 className="text-2xl font-semibold tracking-tight">Filtering & Pencarian</h3>
                    <p>Filter berdasarkan nama, NISN, kelas, atau jurusan</p>
                </CardHeader>

                <CardContent className="grid items-center gap-4 lg:grid-cols-4">
                    {/* Input Pencarian */}
                    <Input
                        placeholder="Cari berdasarkan Nama atau NISN"
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                    />

                    {/* Select Kelas */}
                    <Select value={filters.class} onValueChange={(val) => handleFilterChange('class', val === 'default' ? '' : val)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Kelas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Semua Kelas</SelectItem>
                            <SelectItem value="X">X</SelectItem>
                            <SelectItem value="XI">XI</SelectItem>
                            <SelectItem value="XII">XII</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Select Jurusan */}
                    <Select value={filters.major} onValueChange={(val) => handleFilterChange('major', val === 'default' ? '' : val)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Jurusan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Semua Jurusan</SelectItem>
                            <SelectItem value="RPL">Pengembangan Perangkat Lunak</SelectItem>
                            <SelectItem value="TKJ">Teknik Komputer dan Jaringan</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Tombol Export */}
                    <Button>
                        <ArrowDownToLine />
                        Export
                    </Button>
                </CardContent>
            </Card>

            {/* Data Table */}
            <DataTableCustom table={table} isLoading={isPending} toolbarItems={toolbarItems} />
        </main>
    );
}

export { TableStudents };
