'use client';

import { ProfileTeacher } from '@/contents/teachers/ProfileTeacher';
import DashboardLayout, { Breadcrumb } from '@/layouts/dashboard-layout';
import { ITeacher } from '@/types/response';
import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';

const breadcrumb: Breadcrumb[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
    },
    {
        title: 'Daftar Guru',
        url: '/dashboard/Guru',
    },
    {
        title: 'Detail Guru',
    },
];

/**
 * DetailTeacherPage adalah halaman yang menampilkan informasi detail guru
 *
 * @returns {JSX.Element}
 */
export default function DetailTeacherPage() {
    const { response } = usePage<{ response: { data: ITeacher } }>().props;
    const teacher = useMemo(() => response?.data || {}, [response]);

    // return <pre>{JSON.stringify(teacher, null, 2)}</pre>

    console.log(teacher)

    return (
        <DashboardLayout breadcrumbs={breadcrumb}>
            <ProfileTeacher {...teacher} />
        </DashboardLayout>
    );
}
