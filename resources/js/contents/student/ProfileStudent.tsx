import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IStudent } from '@/types/response';
import {
    AlertTriangle,
    BookOpen,
    Calendar,
    Clock,
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    Settings,
    Trash2,
    User,
    Users,
    VenusAndMars,
} from 'lucide-react';
import { useState } from 'react';
import { FormUpdateStudent } from './FormStudent';

function ProfileStudent({ ...student }: IStudent) {
    return (
        <main className="space-y-6">
            {/* Header */}
            <Header {...student} />

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
                    <Profile {...student} />
                </TabsContent>

                <TabsContent value="attendance">
                    <Attendance />
                </TabsContent>

                <TabsContent value="actions">
                    <Actions {...student} />
                </TabsContent>
            </Tabs>
        </main>
    );
}

function Header(student: IStudent) {
    return (
        <Card className="mt-4 overflow-hidden border-0 bg-gradient-to-r from-emerald-600 to-teal-600 shadow-xl">
            <CardContent className="p-8">
                <div className="flex flex-col items-center gap-6 text-white md:flex-row">
                    {/* Avatar */}
                    <Avatar className="h-32 w-32 shadow-lg">
                        <AvatarImage src={student.avatar || ''} />
                        <AvatarFallback className="bg-white text-3xl font-bold text-emerald-600">
                            {student.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    {/* Info Utama */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="mb-2 text-3xl font-bold">{student.name}</h1>

                        <div className="mb-4 flex flex-wrap justify-center gap-2 md:justify-start">
                            {[
                                {
                                    icon: <GraduationCap />,
                                    label: `Kelas ${student.classroom?.name}`,
                                },
                                {
                                    icon: <BookOpen />,
                                    label: student.major?.short,
                                },
                                {
                                    icon: <User />,
                                    label: student.nis,
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
                                    value: student.user?.email,
                                },
                                {
                                    icon: <Phone className="h-4 w-4" />,
                                    value: student.phone,
                                },
                                {
                                    icon: <VenusAndMars className="h-4 w-4" />,
                                    value: student.gender,
                                },
                                {
                                    icon: <Calendar className="h-4 w-4" />,
                                    value: `${new Date().getFullYear() - new Date(student.birth_date as string).getFullYear()} tahun`,
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

function Profile(student: IStudent) {
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
                            { label: 'NISN', value: student.nisn },
                            { label: 'NIS', value: student.nis },
                            { label: 'Jenis Kelamin', value: student.gender },
                            { label: 'Agama', value: student.religion },
                            { label: 'Tempat Lahir', value: student.birth_place },
                            { label: 'Tanggal Lahir', value: student.birth_date },
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
                        <p className="mt-1 font-semibold">{student.address}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Info Orang Tua/Wali */}
            <Card className="border p-0 pb-6 shadow-lg">
                <CardHeader className="rounded-t-lg bg-gradient-to-r from-teal-500 to-teal-600 py-6 text-white">
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Informasi Orang Tua/Wali
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {[
                            { label: 'Nama', value: student.parent?.name },
                            { label: 'Hubungan', value: student.parent?.relation },
                            { label: 'No. Telepon', value: student.parent?.phone },
                            { label: 'Jenis Kelamin', value: student.parent?.gender },
                            { label: 'Agama', value: student.parent?.religion },
                            { label: 'Tanggal Lahir', value: student.parent?.birth_date },
                        ].map((item, i) => (
                            <div key={i}>
                                <label className="text-sm font-medium text-gray-500">{item.label}</label>
                                <p className="font-semibold capitalize">{item.value}</p>
                            </div>
                        ))}
                    </div>
                    <Separator />
                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-500">
                            <MapPin className="h-4 w-4" />
                            Alamat
                        </label>
                        <p className="mt-1 font-semibold">{student.parent?.address}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function Attendance() {
    return 'Attendance';
}

function Actions(student: IStudent) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Update Form */}
            <Card className="border-0 p-0 pb-6 shadow-lg">
                <CardHeader className="rounded-t-lg bg-gradient-to-r from-emerald-500 to-emerald-600 py-6 text-white">
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Update Profile
                    </CardTitle>
                    <CardDescription className="text-emerald-100">Edit informasi pribadi siswa</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 p-6">
                    <FormUpdateStudent isDisabled={!isEditing} dataDefault={student}>
                        <Button type="button" onClick={() => setIsEditing(!isEditing)} variant="outline">
                            <Settings />
                            {isEditing ? 'Batal' : 'Edit Profile'}
                        </Button>
                    </FormUpdateStudent>
                </CardContent>
            </Card>

            {/* Delete Student */}
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
                        <Button variant="destructive" className="w-full">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus Data Siswa
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export { ProfileStudent };
