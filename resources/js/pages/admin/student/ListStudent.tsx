import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewChart } from '@/contents/student/OverviewStudent';
import { TableStudents } from '@/contents/student/TableStudent';
import DashboardLayout, { Breadcrumb } from '@/layouts/dashboard-layout';
import { Calendar, GraduationCap, TrendingUp, Users } from 'lucide-react';

const breadcrumb: Breadcrumb[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
    },
    {
        title: 'Daftar Siswa',
    },
];

/**
 * Halaman untuk menampilkan daftar siswa beserta data ringkasan dan analitik.
 *
 * Komponen ini menggunakan komponen `Tabs` untuk membagi menjadi beberapa bagian:
 * - Ringkasan: menampilkan data ringkasan siswa
 * - Data Siswa: menampilkan data siswa
 * - Analitik: menampilkan data analitik siswa
 * - Laporan: menampilkan data laporan siswa
 */
export default function ListStudentPage() {
    return (
        <DashboardLayout breadcrumbs={breadcrumb}>
            {/* tabs */}
            <Tabs defaultValue="students" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
                    <TabsTrigger value="overview" className="gap-2">
                        <GraduationCap />
                        Ringkasan
                    </TabsTrigger>
                    <TabsTrigger value="students" className="gap-2">
                        <Users />
                        Data Siswa
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="gap-2">
                        <TrendingUp />
                        Analitik
                    </TabsTrigger>
                    <TabsTrigger value="reports" className="gap-2">
                        <Calendar />
                        Laporan
                    </TabsTrigger>
                </TabsList>

                {/* tabs content */}
                <TabsContent value="overview">
                    <OverviewChart />
                </TabsContent>
                <TabsContent value="students">
                    <TableStudents />
                </TabsContent>
            </Tabs>
        </DashboardLayout>
    );
}
