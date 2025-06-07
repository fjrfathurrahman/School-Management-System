import { Badge } from '@/components/ui/badge';
import { IStudent, ITeacher, IHomeRoom } from '@/types/response';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { ColumnDef } from '@tanstack/react-table';
import { GraduationCap, School, User, Users } from 'lucide-react';
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
                <a href={`/dashboard/siswa/${row.original.id}`} className="font-medium underline underline-offset-4">
                    {row.original.name}
                </a>
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

export const ColumnsTeacher = () =>
    [
        {
            id: 'ID',
            accessorKey: 'id',
            header: 'ID',
            cell: ({ row }) => row.index + 1,
        },
        {
            id: 'NIP',
            accessorKey: 'nip',
            header: 'NIP',
            cell: ({ row }) => <div className="font-mono text-sm">{row.original.nip}</div>,
        },
        {
            id: 'name',
            accessorKey: 'name',
            header: 'Nama Lengkap',
            cell: ({ row }) => (
                <a href={`/dashboard/guru/${row.original.id}`} className="font-medium underline underline-offset-4">
                    {row.original.name}
                </a>
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
                    to={`https://wa.me/${row.original.phone_number}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-sm underline underline-offset-4"
                >
                    {row.original.phone_number}
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
    ] as ColumnDef<ITeacher>[];

export const ColumnsClass = () => [
  {
    id: "kelas",
    accessorKey: "class",
    header: "Kelas",
    cell: ({ row }) => (
      <div className="flex items-center gap-4 py-2">
        <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center font-bold shadow">
          <School size={18} />
        </div>
        <div>
          <p className="font-semibold text-base">{row.original.class.name}</p>
          <p className="text-xs text-muted-foreground">Semester: {row.original.semester}</p>
        </div>
      </div>
    ),
  },
  {
    id: "wali_kelas",
    accessorKey: "teacher",
    header: "Wali Kelas",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <User className="text-sky-600" size={18} />
        <div>
          <p className="font-medium">{row.original.teacher.name}</p>
          <p className="text-xs text-muted-foreground">Wali Kelas</p>
        </div>
      </div>
    ),
  },
  {
    id: "jurusan",
    accessorKey: "major",
    header: "Jurusan",
    cell: ({ row }) => {
      const colorMap: Record<string, string> = {
        "RPL": "bg-blue-100 text-blue-700",
        "TKJ": "bg-green-100 text-green-700",
        "MM": "bg-pink-100 text-pink-700",
        "OTKP": "bg-yellow-100 text-yellow-700",
      };
      const colorClass = colorMap[row.original.major.name] ?? "bg-gray-100 text-gray-700";

      return (
        <Badge className={`${colorClass} font-medium px-3 py-1 rounded-full`}>
          {row.original.major.name}
        </Badge>
      );
    },
  },
  {
    id: "tahun_ajaran",
    accessorKey: "school_year",
    header: "Tahun Ajaran",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center">
          <GraduationCap size={16} />
        </div>
        <div>
          <p className="font-medium text-sm">{row.original.school_year}</p>
          <p className="text-xs text-muted-foreground">Tahun Ajaran</p>
        </div>
      </div>
    ),
  },

  {
    id: "jumlah_siswa",
    accessorKey: "students_count",
    header: "Jumlah Siswa",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 text-sm font-medium cursor-default">
              <Users className="text-green-600" size={16} />
              {row.original.students_count} siswa
            </div>
          </TooltipTrigger>
          <TooltipContent>
            Total siswa dalam kelas {row.original.class.name}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
] as ColumnDef<IHomeRoom>[];
