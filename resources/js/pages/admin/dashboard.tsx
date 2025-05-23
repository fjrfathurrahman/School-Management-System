import { DefaultDataTable } from '@/components/data-table/default-table';
import DashboardLayout from '@/layouts/dashboard-layout';

export default function Page() {
    return (
        <DashboardLayout>
            <h1>test</h1>
            <DefaultDataTable data={[]} columns={[]} />
        </DashboardLayout>
    );
}
