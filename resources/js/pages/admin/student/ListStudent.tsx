import { TableStudents } from '@/contents/student/TableStudent';
import DashboardLayout, { Breadcrumb } from '@/layouts/dashboard-layout';

const breadcrumb: Breadcrumb[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
    },
    {
        title: 'Daftar Siswa',
    },
];

export default function ListStudentPage() {
    return (
        <DashboardLayout breadcrumbs={breadcrumb}>
            <TableStudents/>
        </DashboardLayout>
    );
}
