import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

export default function ListStudentPage() {
    return (
        <DashboardLayout breadcrumbs={breadcrumb}>
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

                <TabsContent value="students">
                    <TableStudents />
                </TabsContent>
            </Tabs>
        </DashboardLayout>
    );
}
