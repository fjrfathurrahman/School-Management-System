import { DefaultDataTable } from '@/components/data-table/default-table';
import DashboardLayout from '@/layouts/dashboard-layout';
import { ColumnsStudent } from '@/lib/columns';
import { usePage } from '@inertiajs/react';

interface PROPS {
    responsse: {
        data: [];
    };
    [key: string]: unknown;
}

export default function ListStudentPage() {
    const { responsse } = usePage<PROPS>().props;
    return <pre>{JSON.stringify(responsse, null, 2)}</pre>;

    return (
        <DashboardLayout>
            <DefaultDataTable data={responsse.data} columns={ColumnsStudent()} />
        </DashboardLayout>
    );
}
