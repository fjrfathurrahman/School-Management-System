import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewChart } from '@/contents/student/OverviewStudent';
import { TableTeachers } from '@/contents/teachers/TableTeacher';
import DashboardLayout, { Breadcrumb } from '@/layouts/dashboard-layout';
import { Calendar, BookUser, TrendingUp, Users } from 'lucide-react';
import  ListHomeRoomTeacher from '@/pages/admin/academic/ListHomeRoomTeacher';

const breadcrumb: Breadcrumb[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
    },
    {
        title: 'Daftar Guru',
    },
];

/**
 * Halaman untuk menampilkan daftar Guru beserta data ringkasan dan analitik.
 *
 * Komponen ini menggunakan komponen `Tabs` untuk membagi menjadi beberapa bagian:
 * - Ringkasan: menampilkan data ringkasan siswa
 * - Data Siswa: menampilkan data siswa
 * - Analitik: menampilkan data analitik siswa
 * - Laporan: menampilkan data laporan siswa
 */
export default function ListTeacherPage() {
    return (
        <DashboardLayout breadcrumbs={breadcrumb}>
            {/* tabs */}
            <Tabs defaultValue="teachers" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
                    <TabsTrigger value="overview" className="gap-2">
                        <BookUser />
                        Wali Kelas
                    </TabsTrigger>
                    <TabsTrigger value="teachers" className="gap-2">
                        <Users />
                        Data Guru
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
                    <ListHomeRoomTeacher/>
                </TabsContent>
                <TabsContent value="teachers">
                    <TableTeachers/>
                </TabsContent>
            </Tabs>
        </DashboardLayout>
    );
}
