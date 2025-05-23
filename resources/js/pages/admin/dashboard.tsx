import { DefaultDataTable } from '@/components/data-table/default-table';
import DashboardLayout from '@/layouts/dashboard-layout';

export default function Page() {
    return (
        <DashboardLayout>
            <DefaultDataTable data={[]} columns={[]} />
        </DashboardLayout>
    );
}
