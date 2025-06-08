import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ITeacher } from '@/types/response';
import {
    AlertTriangle,
    CalendarDays,
    Calendar,
    Clock,
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    Settings,
    Trash2,
    User,
    VenusAndMars,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import { FormUpdateTeacher } from './FormTeacher';
import { useDeleteTeacher } from '@/hooks/user/use-teacher';

function ProfileTeacher({ ...teacher }: ITeacher) {
    return (
        <main className="space-y-6">
            {/* Header */}
            <Header {...teacher} />

            {/* Tabs */}
            <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-3 lg:w-fit">
                    <TabsTrigger value="profile">
                        <User />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="attendance">
                        <Clock />
                        Kehadiran
                    </TabsTrigger>
                    <TabsTrigger value="actions">
                        <Settings />
                        Actions
                    </TabsTrigger>
                </TabsList>

                {/* Tabs Content */}
                <TabsContent value="profile">
                    <Profile {...teacher} />
                </TabsContent>

                <TabsContent value="attendance">
                    <Attendance />
                </TabsContent>

                <TabsContent value="actions">
                    <Actions {...teacher} />
                </TabsContent>
            </Tabs>
        </main>
    );
}

function Header(teacher: ITeacher) {
    return (
        <Card className="mt-4 overflow-hidden border-0 bg-gradient-to-r from-emerald-600 to-teal-600 shadow-xl">
            <CardContent className="p-8">
                <div className="flex flex-col items-center gap-6 text-white md:flex-row">
                    {/* Avatar */}
                    <Avatar className="h-32 w-32 shadow-lg">
                        <AvatarImage src={teacher.avatar || ''} />
                        <AvatarFallback className="bg-white text-3xl font-bold text-emerald-600">
                            {teacher.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    {/* Info Utama */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="mb-2 text-3xl font-bold">{teacher.name}</h1>

                        <div className="mb-4 flex flex-wrap justify-center gap-2 md:justify-start">
                            {[
                                {
                                    icon: <GraduationCap />,
                                    label: teacher.education,
                                },
                                {
                                    icon: <CalendarDays />,
                                    label: teacher.entry_date,
                                },
                                {
                                    icon: <User />,
                                    label: teacher.nip,
                                },
                            ].map((item, i) => (
                                <Badge key={i} variant="secondary" className="border-white/30 bg-white/20 text-white">
                                    {item.icon}
                                    {item.label}
                                </Badge>
                            ))}
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-4">
                            {[
                                {
                                    icon: <Mail className="h-4 w-4" />,
                                    value: teacher.user?.email,
                                },
                                {
                                    icon: <Phone className="h-4 w-4" />,
                                    value: teacher.phone_number,
                                },
                                {
                                    icon: <VenusAndMars className="h-4 w-4" />,
                                    value: teacher.gender,
                                },
                                {
                                    icon: <Calendar className="h-4 w-4" />,
                                    value: teacher.date_of_birth
                                        ? `${new Date().getFullYear() - new Date(teacher.date_of_birth).getFullYear()} tahun`
                                        : '-',
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    {item.icon}
                                    <span>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Attendance (contoh dummy) */}
                    <div className="text-center">
                        <div className="mb-1 text-3xl font-bold">16%</div>
                        <div className="text-sm opacity-90">Tingkat Kehadiran</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function Profile(teacher: ITeacher) {
    return (
        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Info Pribadi */}
            <Card className="border p-0 pb-6 shadow-lg">
                <CardHeader className="rounded-t-lg bg-gradient-to-r from-emerald-500 to-emerald-600 py-6 text-white">
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Informasi Pribadi
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {[
                            { label: 'NIP', value: teacher.nip },
                            { label: 'Jenis Kelamin', value: teacher.gender },
                            { label: 'Pendidikan', value: teacher.education },
                            { label: 'Jabatan', value: teacher.position },
                            { label: 'Status', value: teacher.status },
                            { label: 'Tempat Lahir', value: teacher.place_of_birth },
                            { label: 'Tanggal Lahir', value: teacher.date_of_birth },
                            { label: 'Tanggal Masuk', value: teacher.entry_date },
                        ].map((item, i) => (
                            <div key={i}>
                                <label className="text-sm font-medium text-gray-500">{item.label}</label>
                                <p className="font-semibold">{item.value}</p>
                            </div>
                        ))}
                    </div>
                    <Separator />
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-500">
                            <MapPin className="h-4 w-4" />
                            Alamat
                        </label>
                        <p className="mt-1 font-semibold">{teacher.address}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Info Wali Kelas {perlu di perbagus lagi}*/}
            <Card className="border p-0 pb-6 shadow-lg">
                <CardHeader className="rounded-t-lg bg-gradient-to-r from-teal-500 to-teal-600 py-6 text-white">
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Informasi Wali Kelas
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {teacher.current_homeroom ? (
                            [
                                { label: "Nama", value: teacher.current_homeroom.class?.name },
                                { label: "Jurusan", value: teacher.current_homeroom.major?.name },
                                { label: "Semester", value: teacher.current_homeroom.semester },
                                { label: "Tahun Ajaran", value: teacher.current_homeroom.school_year },
                            ].map((item, i) => (
                                <div key={i}>
                                    <label className="text-sm font-medium text-gray-500">{item.label}</label>
                                    <p className="font-semibold capitalize">{item.value}</p>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full">
                                <p className="text-center text-sm font-medium text-gray-500">Tidak ada data</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function Attendance() {
    return 'Attendance';
}

function Actions(teacher: ITeacher) {
    const [isEditing, setIsEditing] = useState(false);
    const teacherQuery = useDeleteTeacher(teacher.id as number); // untuk 

    // Handle Delete
    const handleDelete = () => {
        if (confirm('Apakah anda yakin ingin menghapus data ini?')) {
            teacherQuery.mutateAsync();
        }
    };

    return (
        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Update Form */}
            <Card className="border-0 p-0 pb-6 shadow-lg">
                <CardHeader className="rounded-t-lg bg-gradient-to-r from-emerald-500 to-emerald-600 py-6 text-white">
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Update Profile
                    </CardTitle>
                    <CardDescription className="text-emerald-100">Edit informasi pribadi guru</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 p-6">
                    {/* Update Form */}
                    <FormUpdateTeacher isDisabled={!isEditing} dataDefault={teacher}>
                        <Button type="button" onClick={() => setIsEditing(!isEditing)} variant="outline">
                            <Settings />
                            {isEditing ? 'Batal' : 'Edit Profile'}
                        </Button>
                    </FormUpdateTeacher>
                </CardContent>
            </Card>

            {/* Delete teacher */}
            <Card className="h-max border-0 border-red-200 p-0 pb-6 shadow-lg">
                <CardHeader className="rounded-t-lg bg-gradient-to-r from-red-500 to-red-600 py-6 text-white">
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Danger Zone
                    </CardTitle>
                    <CardDescription className="text-red-100">Aksi ini tidak dapat dibatalkan</CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                            <h4 className="mb-2 font-semibold text-red-800">Hapus Data Siswa</h4>
                            <p className="text-sm text-red-600">
                                Menghapus data siswa akan menghilangkan semua informasi termasuk riwayat kehadiran, nilai, dan data terkait lainnya
                                secara permanen.
                            </p>
                        </div>
                        <Button variant="destructive" className="w-full" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus Data Guru
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export { ProfileTeacher };
