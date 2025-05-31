'use client';

import { ProfileStudent } from '@/contents/student/ProfileStudent';
import DashboardLayout, { Breadcrumb } from '@/layouts/dashboard-layout';
import { IStudent } from '@/types/response';
import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';

const breadcrumb: Breadcrumb[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
    },
    {
        title: 'Daftar Siswa',
        url: '/dashboard/siswa',
    },
    {
        title: 'Detail Siswa',
    },
];

/**
 * DetailStudentPage adalah halaman yang menampilkan informasi detail siswa
 *
 * @returns {JSX.Element}
 */
export default function DetailStudentPage() {
    const { response } = usePage<{ response: { data: IStudent } }>().props;
    const student = useMemo(() => response?.data || {}, [response]);

    // return <pre>{JSON.stringify(student, null, 2)}</pre>

    console.log(student)
    
    return (
        <DashboardLayout breadcrumbs={breadcrumb}>
            <ProfileStudent {...student} />
        </DashboardLayout>
    );
}
