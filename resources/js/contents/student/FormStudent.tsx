import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FormInputRender } from '@/components/ui/form';
import { SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useGetAcademic } from '@/hooks/use-get';
import { useGetStudents } from '@/hooks/user/use-student';
import { cn } from '@/lib/utils';
import { IStudent } from '@/types/response';
import { useForm } from '@inertiajs/react';
import { FileText, LoaderCircle, Save } from 'lucide-react';
import { toast } from 'sonner';

/**
 * * FormAddstudent adalah komponen untuk menambahkan informasi siswa baru ke sistem.
 */
function FormAddStudent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    // ambil data siswa
    const studentQuery = useGetStudents();

    // ambil data akademik
    const academicQuery = useGetAcademic();

    // hook form untuk menambahkan siswa
    const { setData, processing, post, data, errors } = useForm();

    // hook untuk menambahkan siswa
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        console.log(data);

        // kirim request
        post(route('students.store'), {
            onError: (error) => {
                console.log(error);
                toast.error('Gagal menambahkan siswa');
            },
            onSuccess: () => {
                toast.success('Berhasil menambahkan siswa');
                studentQuery.refetch();
            },
        });
    };

    // input fields yang akan ditampilkan
    const inputFields = [
        {
            component: 'input' as const,
            label: 'NIS',
            value: data.nis ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('nis', e.target.value),
            type: 'text',
            errors: errors?.nis,
        },
        {
            component: 'input' as const,
            label: 'NISN',
            value: data.nisn ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('nisn', e.target.value),
            type: 'text',
            errors: errors?.nisn,
        },
        {
            component: 'input' as const,
            label: 'Nama Lengkap',
            value: data.name ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('name', e.target.value),
            type: 'text',
            errors: errors?.name,
        },
        {
            component: 'input' as const,
            label: 'Telepon',
            value: data.phone ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('phone', e.target.value),
            type: 'text',
            errors: errors?.phone,
        },
        {
            component: 'select' as const,
            label: 'Agama',
            value: data.religion ?? '',
            onChange: (value: string) => setData('religion', value),
            options: ['Islam', 'Kristen', 'Hindu', 'Budha', 'Konghucu'],
            errors: errors?.religion,
        },
        {
            component: 'input' as const,
            label: 'Tempat Lahir',
            value: data.birth_place ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('birth_place', e.target.value),
            type: 'text',
            errors: errors?.birth_place,
        },
        {
            component: 'input' as const,
            label: 'Tanggal Lahir',
            value: data.birth_date ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('birth_date', e.target.value),
            type: 'date',
            errors: errors?.birth_date,
        },
        {
            component: 'select' as const,
            label: 'Jenis Kelamin',
            value: data.gender,
            onChange: (value: string) => setData('gender', value),
            options: [
                { value: 'male', label: 'Laki-laki' },
                { value: 'female', label: 'Perempuan' },
            ],
            errors: errors?.gender,
        },
        {
            component: 'select' as const,
            label: 'Kelas',
            value: data?.class_id?.toString() ?? '',
            onChange: (value: string) => setData('class_id', parseInt(value)),
            errors: errors?.class_id,
            options:
                academicQuery.data?.classes.map((classroom) => ({
                    value: classroom.id.toString(),
                    label: classroom.name,
                })) || [],
        },
        {
            component: 'select' as const,
            label: 'Jurusan',
            value: data?.major_id?.toString() ?? '',
            onChange: (value: string) => setData('major_id', parseInt(value)),
            errors: errors?.major_id,
            options:
                academicQuery.data?.majors.map((major) => ({
                    value: major.id.toString(),
                    label: major.name,
                })) || [],
        },
        {
            component: 'textarea' as const,
            label: 'Alamat',
            value: data.address ?? '',
            onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setData('address', e.target.value),
            errors: errors?.address,
        },
    ];

    return (
        <>
            {/* Sheet Header */}
            <SheetHeader>
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <SheetTitle className="flex items-center gap-2 text-xl font-semibold">
                            <div className="bg-primary/10 rounded-lg p-2">
                                <FileText className="text-primary h-5 w-5" />
                            </div>
                            Tambah Siswa Baru
                        </SheetTitle>
                        <SheetDescription className="text-base">Lengkapi informasi siswa untuk mendaftarkan ke sistem.</SheetDescription>
                    </div>
                </div>
            </SheetHeader>

            {/* Form Content */}
            <main className={cn('flex-1 px-4', className)} {...props}>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {inputFields.map((field, index) => (
                                    <FormInputRender key={index} {...field} value={field.value as string | number | null} />
                                ))}
                            </div>
                            <Button className="mt-6 w-full" type="submit" disabled={processing}>
                                {processing ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : 'Simpan'}
                            </Button>
                        </CardContent>
                    </Card>
                </form>
            </main>
        </>
    );
}

interface FormUpdateStudentProps extends React.HTMLAttributes<HTMLDivElement> {
    isDisabled?: boolean;
    dataDefault: IStudent;
}

function FormUpdateStudent({ className, children, dataDefault, isDisabled, ...props }: FormUpdateStudentProps) {
    // ambil data akademik
    const academicQuery = useGetAcademic();

    // hook form untuk update siswa
    const { setData, processing, data, errors, put } = useForm({
        nis: dataDefault.nis,
        nisn: dataDefault.nisn,
        name: dataDefault.name,
        phone: dataDefault.phone,
        gender: dataDefault.gender === 'Perempuan' ? 'female' : 'male',
        birth_place: dataDefault.birth_place,
        birth_date: dataDefault.birth_date,
        address: dataDefault.address,
        religion: dataDefault.religion,
        avatar: null,
        class_id: dataDefault?.classroom?.class_id,
        major_id: dataDefault?.major?.major_id,
    });

    // hook untuk update siswa
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        console.log(data);

        // kirim request
        put(route('students.update', dataDefault.id), {
            onSuccess: () => toast.success('Berhasil mengubah data siswa'),
            onError: (error) => {
                console.log(error);
                toast.error('Gagal mengubah data siswa');
            },
        });
    };

    // input fields yang akan ditampilkan
    const inputFields = [
        {
            component: 'input' as const,
            label: 'NIS',
            value: data.nis ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('nis', e.target.value),
            type: 'text',
            errors: errors?.nis,
            disabled: isDisabled,
        },
        {
            component: 'input' as const,
            label: 'NISN',
            value: data.nisn ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('nisn', e.target.value),
            type: 'text',
            errors: errors?.nisn,
            disabled: isDisabled,
        },
        {
            component: 'input' as const,
            label: 'Nama Lengkap',
            value: data.name ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('name', e.target.value),
            type: 'text',
            errors: errors?.name,
            disabled: isDisabled,
        },
        {
            component: 'input' as const,
            label: 'Telepon',
            value: data.phone ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('phone', e.target.value),
            type: 'text',
            errors: errors?.phone,
            disabled: isDisabled,
        },
        {
            component: 'select' as const,
            label: 'Agama',
            value: data.religion ?? '',
            onChange: (value: string) => setData('religion', value),
            options: ['Islam', 'Kristen', 'Hindu', 'Budha', 'Konghucu'],
            errors: errors?.religion,
            disabled: isDisabled,
        },
        {
            component: 'input' as const,
            label: 'Tempat Lahir',
            value: data.birth_place ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('birth_place', e.target.value),
            type: 'text',
            errors: errors?.birth_place,
            disabled: isDisabled,
        },
        {
            component: 'input' as const,
            label: 'Tanggal Lahir',
            value: data.birth_date ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('birth_date', e.target.value),
            type: 'date',
            errors: errors?.birth_date,
            disabled: isDisabled,
        },
        {
            component: 'select' as const,
            label: 'Jenis Kelamin',
            value: data.gender,
            onChange: (value: string) => setData('gender', value),
            options: [
                { value: 'male', label: 'Laki-laki' },
                { value: 'female', label: 'Perempuan' },
            ],
            errors: errors?.gender,
            disabled: isDisabled,
        },
        {
            component: 'select' as const,
            label: 'Kelas',
            value: data?.class_id?.toString() ?? '',
            onChange: (value: string) => setData('class_id', parseInt(value)),
            errors: errors?.class_id,
            options:
                academicQuery.data?.classes.map((classroom) => ({
                    value: classroom.id.toString(),
                    label: classroom.name,
                })) || [],
            disabled: isDisabled,
        },
        {
            component: 'select' as const,
            label: 'Jurusan',
            value: data?.major_id?.toString() ?? '',
            onChange: (value: string) => setData('major_id', parseInt(value)),
            errors: errors?.major_id,
            options:
                academicQuery.data?.majors.map((major) => ({
                    value: major.id.toString(),
                    label: major.name,
                })) || [],
            disabled: isDisabled,
        },
        {
            component: 'textarea' as const,
            label: 'Alamat',
            value: data.address ?? '',
            onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setData('address', e.target.value),
            errors: errors?.address,
            disabled: isDisabled,
        },
        {
            component: 'input' as const,
            label: 'Tanggal Lahir',
            value: data.birth_date ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('birth_date', e.target.value),
            type: 'date',
            errors: errors?.birth_date,
            disabled: isDisabled,
        },
    ];

    return (
        <main className={cn('flex-1 px-4', className)} {...props}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {inputFields.map((field, index) => (
                        <FormInputRender key={index} {...field} />
                    ))}
                </div>
                <div className="mt-6 flex items-center gap-2">
                    <Button className="bg-emerald-600 hover:bg-emerald-700" type="submit" disabled={processing || isDisabled}>
                        <Save className="mr-2 h-4 w-4" />
                        {processing ? 'Loading...' : 'Simpan'}
                    </Button>
                    {children}
                </div>
            </form>
        </main>
    );
}

export { FormAddStudent, FormUpdateStudent };
