import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FormInputRender } from '@/components/ui/form';
import { SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useGetAcademic } from '@/hooks/use-get';
import { cn } from '@/lib/utils';
import { IStudent } from '@/types/response';
import { useForm } from '@inertiajs/react';
import { useQueryClient } from '@tanstack/react-query';
import { FileText, LoaderCircle, Save } from 'lucide-react';
import { toast } from 'sonner';

/**
 * * FormAddstudent adalah komponen untuk menambahkan informasi siswa baru ke sistem.
 */
function FormAddTeacher({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    // query client untuk refetch
    const query = useQueryClient();

    // hook form untuk menambahkan siswa
    const { setData, processing, post, data, errors } = useForm({
        nip: '12345678',
        name: 'John Doe',
        phone_number: '081234567890',
        address: '123 Main St',
        entry_date: '2023-01-01',
        date_of_birth: '1990-01-01',
        place_of_birth: 'Jakarta',
        education: 'S1 Pendidikan',
        position: 'Guru',
        status: 'aktif',
        gender: 'male',
        avatar: null,
    });

    // hook untuk menambahkan siswa
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        console.log(data);

        // kirim request
        post(route('teacher.store'), {
            onError: () => toast.error('Gagal menambahkan Guru'),
            onSuccess: () => {
                toast.success('Berhasil menambahkan guru');
                query.refetchQueries({ queryKey: ['teacher'] }); // refetch data guru
            },
        });
    };

    // input fields yang akan ditampilkan
    const inputFields = [
        {
            component: 'input' as const,
            label: 'NIP',
            value: data.nip ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('nip', e.target.value),
            type: 'text',
            errors: errors?.nip,

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
            value: data.phone_number ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('phone_number', e.target.value),
            type: 'text',
            errors: errors?.phone_number,

        },
        {
            component: 'input' as const,
            label: 'Alamat',
            value: data.address ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('address', e.target.value),
            type: 'text',
            errors: errors?.address,

        },
        {
            component: 'input' as const,
            label: 'Tanggal Masuk',
            value: data.entry_date ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('entry_date', e.target.value),
            type: 'date',
            errors: errors?.entry_date,

        },
        {
            component: 'input' as const,
            label: 'Tanggal Lahir',
            value: data.date_of_birth ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('date_of_birth', e.target.value),
            type: 'date',
            errors: errors?.date_of_birth,

        },
        {
            component: 'input' as const,
            label: 'Tempat Lahir',
            value: data.place_of_birth ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('place_of_birth', e.target.value),
            type: 'text',
            errors: errors?.place_of_birth,

        },
        {
            component: 'input' as const,
            label: 'Pendidikan',
            value: data.education,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('education', e.target.value),
            type: 'text',
            errors: errors?.education,
            
        },
        {
            component: 'input' as const,
            label: 'Jabatan',
            value: data.position,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('position', e.target.value),
            type: 'text',
            errors: errors?.position,

        },
        {
            component: 'select' as const,
            label: 'Status',
            value: data.status,
            onChange: (value: string) => setData('status', value),
            options: [
                { value: 'aktif', label: 'Aktif' },
                { value: 'tidak aktif', label: 'Tidak Aktif' },
            ],
            errors: errors?.status,

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
                            Tambah Guru Baru
                        </SheetTitle>
                        <SheetDescription className="text-base">Lengkapi informasi Guru untuk mendaftarkan ke sistem.</SheetDescription>
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
                                    <FormInputRender key={index} {...field} />
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

interface FormUpdateTeacherProps extends React.HTMLAttributes<HTMLDivElement> {
    isDisabled?: boolean;
    dataDefault: IStudent;
}

function FormUpdateTeacher({ className, children, isDisabled, ...props }: FormUpdateTeacherProps) {

    // hook form untuk menambahkan siswa
    const { setData, processing, data, errors } = useForm({
        nip: '12345678',
        name: 'John Doe',
        phone_number: '081234567890',
        address: '123 Main St',
        entry_date: '2023-01-01',
        date_of_birth: '1990-01-01',
        place_of_birth: 'Jakarta',
        education: 'S1 Pendidikan',
        position: 'Guru',
        status: 'aktif',
        gender: 'male',
        avatar: null,
    });

    // hook untuk update siswa
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        console.log(data);
    };

    // input fields yang akan ditampilkan
    const inputFields = [
        {
            component: 'input' as const,
            label: 'NIP',
            value: data.nip ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('nip', e.target.value),
            type: 'text',
            errors: errors?.nip,
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
            value: data.phone_number ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('phone_number', e.target.value),
            type: 'text',
            errors: errors?.phone_number,
            disabled: isDisabled,
        },
        {
            component: 'input' as const,
            label: 'Alamat',
            value: data.address ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('address', e.target.value),
            type: 'text',
            errors: errors?.address,
            disabled: isDisabled,
        },
        {
            component: 'input' as const,
            label: 'Tanggal Masuk',
            value: data.entry_date ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('entry_date', e.target.value),
            type: 'date',
            errors: errors?.entry_date,
            disabled: isDisabled,
        },
        {
            component: 'input' as const,
            label: 'Tanggal Lahir',
            value: data.date_of_birth ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('date_of_birth', e.target.value),
            type: 'date',
            errors: errors?.date_of_birth,
            disabled: isDisabled,
        },
        {
            component: 'input' as const,
            label: 'Tempat Lahir',
            value: data.place_of_birth ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setData('place_of_birth', e.target.value),
            type: 'text',
            errors: errors?.place_of_birth,
            disabled: isDisabled,
        },
        {
            component: 'select' as const,
            label: 'Pendidikan',
            value: data.education,
            onChange: (value: string) => setData('education', value),
            type: 'text',
            errors: errors?.education,
            disabled: isDisabled,
        },
        {
            component: 'select' as const,
            label: 'Jabatan',
            value: data.position,
            onChange: (value: string) => setData('position', value),
            type: 'text',
            errors: errors?.position,
            disabled: isDisabled,
        },
        {
            component: 'select' as const,
            label: 'Status',
            value: data.status,
            onChange: (value: string) => setData('status', value),
            options: [
                { value: 'aktif', label: 'Aktif' },
                { value: 'nonaktif', label: 'Tidak Aktif' },
            ],
            errors: errors?.status,
            disabled: isDisabled,
        },
        {
            component: 'select' as const,
            label: 'Jenis Kelamin',
            value: data.gender,
            onChange: (value: string) => setData('gender', value),
            options: [
                { value: 'male', label: 'Laki-laki' },
            ],
            errors: errors?.gender,
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
                <div className='flex items-center gap-2 mt-6'>
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

export { FormAddTeacher, FormUpdateTeacher };
