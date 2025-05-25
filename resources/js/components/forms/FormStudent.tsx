import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "@inertiajs/react";
import InputError from "../input-error";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
    key?: string
}

export function FormAddStudent({ className, ...props }: FormProps) {
    const { setData, processing, progress, errors, post } = useForm();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        post(route('student.store'));
    };

    return (
        <main className={cn('p-4', className)} {...props}>
            <form>
                <div>
                    <Label>Nama Lengkap</Label>
                    <Input name="name" type="text" placeholder="" />
                    <InputError message={errors.name} />
                </div>
            </form>
        </main>
    )
}