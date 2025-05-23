import { ColumnDef } from '@tanstack/react-table';

export const ColumnsStudent = () =>
    [
        {
            header: 'ID',
            accessorKey: 'id',
            cell: ({ row }) => row.index + 1,
        },
        {
            header: 'NIS',
            accessorKey: 'nis',
        },
        {
            header: 'Name',
            accessorKey: 'name',
        },
        {
            header: 'Email',
            accessorKey: 'user.email',
        },
        {
            header: 'Phone',
            accessorKey: 'phone',
        },
    ] as ColumnDef<Student>[];
