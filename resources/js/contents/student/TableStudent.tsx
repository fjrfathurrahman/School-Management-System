import { DataTableCustom, ToolbarItem } from '@/components/data-table/data-table-custom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormAddStudent } from '@/contents/student/FormStudent';
import { useDataTable } from '@/hooks/use-data-table';
import { useGetAcademic } from '@/hooks/use-get';
import { useGetStudents } from '@/hooks/user/use-student';
import { ColumnsStudent } from '@/lib/columns';
import { ArrowDownToLine, FileSpreadsheet, Upload, UserPlus } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import { useCallback, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

function TableStudents() {
    // Setup filter
    const [filters, setFilters] = useState({ class: '', major: '', search: '' });

    // Query params
    const [sort] = useQueryState('sort', parseAsString.withDefault('asc'));
    const [perPage] = useQueryState('perPage', parseAsString.withDefault('20'));
    const [page] = useQueryState('page', parseAsString.withDefault('1'));

    // Debounce search for better performance
    const [debouncedSearch] = useDebounce(filters.search, 500);
    const searchParams = { ...filters, perPage, page, sort, search: debouncedSearch };

    // Mendapatkan data student dan academic untuk filter
    const { students, response, isPending } = useGetStudents(searchParams);
    const { academic } = useGetAcademic();

    // Agar tidak merender ulang
    const data = useMemo(() => students || [], [students]);

    // Setup data table hook
    const { table } = useDataTable({
        data,
        columns: ColumnsStudent(),
        pageCount: Number(response?.meta?.last_page),
    });

    // Handle change filter
    const handleFilterChange = useCallback((key: keyof typeof filters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    }, []);

    // Toolbar items: Action Tambahan
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
                    <h4>Filtering & Pencarian</h4>
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
                            {academic?.classes.map((cls) => (
                                <SelectItem value={cls.name} key={cls.name}>
                                    {cls.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Select Jurusan */}
                    <Select value={filters.major} onValueChange={(val) => handleFilterChange('major', val === 'default' ? '' : val)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Jurusan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Semua Jurusan</SelectItem>
                            {academic?.majors.map((major) => (
                                <SelectItem value={major.short} key={major.name}>
                                    {major.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Export berdasarkan filter */ }
                    <Button>
                        <ArrowDownToLine />
                        Export
                    </Button>
                </CardContent>
            </Card>

            {/* Data Table */}
            <DataTableCustom
                table={table}
                title="Data Table Siswa"
                description={`Berhasil mendapatkan data siswa berjumlah ${response?.meta?.total || 0} siswa`}
                isLoading={isPending}
                toolbarItems={toolbarItems}
            />
        </main>
    );
}

export { TableStudents };
