import { Search, Users, Filter, Eye, MoreHorizontal, BookOpen, Clock, MapPin, Upload, FileSpreadsheet, UserPlus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTableCustom, ToolbarItem } from "@/components/data-table/data-table-custom"
import { ColumnsClass } from "@/lib/columns";
import { useDataTable } from '@/hooks/use-data-table';
import { useCallback, useMemo, useState } from 'react';
import { useGetHomeRoom } from "@/hooks/user/use-homeRoom"
import { FormAddTeacher } from "@/contents/teachers/FormTeacher"


export default function ListHomeRoomTeacher() {

  // // Setup filter
  // const [filters, setFilters] = useState({ class: '', major: '', search: '' });

  // // Query params
  // const [sort] = useQueryState('sort', parseAsString.withDefault('asc'));
  // const [perPage] = useQueryState('perPage', parseAsString.withDefault('20'));
  // const [page] = useQueryState('page', parseAsString.withDefault('1'));



  // Mendapatkan data HomeRoom untuk filter
  const { homeRoom, response, isPending } = useGetHomeRoom();

  // Agar tidak merender ulang
  const data = useMemo(() => homeRoom || [], [homeRoom]);

  // Setup data table hook
  const { table } = useDataTable({
    data,
    columns: ColumnsClass(),
    pageCount: Number(response?.meta?.last_page),
  });

  // Toolbar items: Action Tambahan
  const toolbarItems: ToolbarItem[] = [
    {
      component: 'dropdown',
      icon: <Upload className="h-4 w-4" />,
      title: 'Import',
      items: [
        {
          label: 'Download Template',
          icon: <FileSpreadsheet className="h-4 w-4 text-green-600" />,
          onSelect: () => console.log('Download template'),
        },
        {
          label: 'Import Data',
          icon: <Upload className="h-4 w-4 text-blue-600" />,
          onSelect: () => console.log('Import data'),
        },
      ],
    },
    {
      component: 'sheet',
      icon: <UserPlus />,
      title: 'Tambah Guru',
      content: <FormAddTeacher />,
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                Daftar Kelas (10)
              </CardTitle>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Eye className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </CardHeader>

          <DataTableCustom
            table={table}
            title="Data Table Guru"
            description={`Berhasil mendapatkan data Guru berjumlah ${response?.meta?.total || 0} guru`}
            isLoading={isPending}
            toolbarItems={toolbarItems}
          />
        </Card>
      </div>
    </div>
  )

}


