import { Badge } from '@/components/ui/badge';
import { IStudent } from '@/types/response';
import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

export const ColumnsStudent = () =>
    [
        {
            id: 'ID',
            accessorKey: 'id',
            header: 'ID',
            cell: ({ row }) => row.index + 1,
        },
        {
            id: 'NISN',
            accessorKey: 'nisn',
            header: 'NISN',
            cell: ({ row }) => <div className="font-mono text-sm">{row.original.nisn}</div>,
        },
        {
            id: 'NIS',
            accessorKey: 'nis',
            header: 'NIS',
            cell: ({ row }) => <div className="font-mono text-sm">{row.original.nis}</div>,
        },
        {
            id: 'name',
            accessorKey: 'name',
            header: 'Nama Lengkap',
            cell: ({ row }) => (
                <Link to={`/student/${row.original.nisn}`} className="font-medium underline underline-offset-4">
                    {row.original.name}
                </Link>
            ),
        },
        {
            id: 'Kelas & Jurusan',
            header: 'Kelas & Jurusan',
            cell: ({ row }) => (
                <Badge variant="outline" className="text-sm">
                    {row.original.classroom.name} - {row.original.major.short}
                </Badge>
            ),
        },
        {
            id: 'Email',
            header: 'Email',
            cell: ({ row }) => <div className="text-sm">{row.original.user.email}</div>,
        },
        {
            id: 'Phone',
            header: 'No. Telepon',
            cell: ({ row }) => (
                <Link
                    to={`https://wa.me/${row.original.phone}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-sm underline underline-offset-4"
                >
                    {row.original.phone}
                </Link>
            ),
        },
        {
            id: 'Jenis Kelamin',
            accessorKey: 'gender',
            header: 'Jenis Kelamin',
            cell: ({ row }) => {
                const colors = row.original.gender === 'Perempuan' ? 'bg-pink-500/10 text-pink-500' : 'bg-blue-500/10 text-blue-500';
                return <div className={`w-max rounded px-2 py-0.5 text-sm ${colors}`}>{row.original.gender}</div>;
            },
        },
    ] as ColumnDef<IStudent>[];
