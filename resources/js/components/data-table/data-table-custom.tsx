import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getCommonPinningStyles } from '@/lib/data-table';
import { cn } from '@/lib/utils';
import { type Table as TanstackTable, flexRender } from '@tanstack/react-table';
import { ChevronDown, Columns3, Database, Eye, EyeOff, Filter, SortAsc, SortDesc } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { DataTablePagination } from './data-table-pagination';
import { DataTableSkeleton } from './data-table-skeleton';

interface DataTableProps<TData> extends React.ComponentProps<'div'> {
    title?: string;
    description?: string;
    table: TanstackTable<TData>;
    showColumnToggle?: boolean;
    showSort?: boolean;
    isLoading?: boolean;
    toolbarItems?: ToolbarItem[];
}

interface DropdownItem {
    label: string;
    icon?: React.ReactNode;
    onSelect?: () => void;
}

export interface ToolbarItem {
    component: 'sheet' | 'button' | 'dropdown';
    icon: React.ReactNode;
    title: string;
    onPress?: () => void; // only for button
    content?: React.ReactNode; // for sheet
    items?: DropdownItem[]; // for dropdown
}

function DataTableCustom<TData>({
    table,
    className,
    children,
    title = 'Data Table',
    description = 'Lorem ipsum dolor amet oh take me back',
    showColumnToggle = true,
    showSort = true,
    isLoading = false,
    toolbarItems,
    ...props
}: DataTableProps<TData>) {
    // Query state
    const [sort, setSort] = useQueryState('sort', parseAsString.withDefault('asc'));

    // Column toggle
    const visibleColumns = table.getAllColumns().filter((column) => column.getCanHide());
    const hiddenColumnsCount = visibleColumns.filter((column) => !column.getIsVisible()).length;

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    {/* Heading */}
                    <div className="space-y-1">
                        <h4>{title}</h4>
                        <p>{description}</p>
                    </div>

                    {/* Toolbar Section */}
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        {/* Column Toggle */}
                        {showColumnToggle && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Columns3 className="h-4 w-4" />
                                        Kolom
                                        {hiddenColumnsCount > 0 && (
                                            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                                                {hiddenColumnsCount}
                                            </Badge>
                                        )}
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[200px]">
                                    <DropdownMenuLabel className="flex items-center gap-2">
                                        <Columns3 className="h-4 w-4" />
                                        Tampilkan Kolom
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {visibleColumns.map((column) => {
                                        const isVisible = column.getIsVisible();
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={isVisible}
                                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {isVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                                                    {column.id.replace(/([A-Z])/g, ' $1').trim()}
                                                </div>
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}

                        {/* Sort Toggle */}
                        {showSort && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        {sort === 'desc' ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
                                        Urutan
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel className="flex items-center gap-2">
                                        <Filter className="h-4 w-4" />
                                        Urutkan Data
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem checked={sort === 'asc'} onCheckedChange={() => setSort('asc')}>
                                        <div className="flex items-center gap-2">
                                            <SortAsc className="h-3 w-3" />
                                            Ascending (A-Z)
                                        </div>
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem checked={sort === 'desc'} onCheckedChange={() => setSort('desc')}>
                                        <div className="flex items-center gap-2">
                                            <SortDesc className="h-3 w-3" />
                                            Descending (Z-A)
                                        </div>
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}

                        {/* Toolbar Items */}
                        {toolbarItems?.map((item, index) => renderToolbarItem(item, index))}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className={cn('flex flex-col', className)} {...props}>
                    {children}

                    {/* Table Container */}
                    <div className="relative px-4">
                        {isLoading ? (
                            <DataTableSkeleton columnCount={4} filterCount={3} />
                        ) : (
                            <div className="overflow-hidden border-t">
                                <div className="overflow-auto">
                                    <Table>
                                        <TableHeader>
                                            {table.getHeaderGroups().map((headerGroup) => (
                                                <TableRow key={headerGroup.id} className="border-b hover:bg-transparent">
                                                    {headerGroup.headers.map((header) => (
                                                        <TableHead
                                                            key={header.id}
                                                            colSpan={header.colSpan}
                                                            className="text-muted-foreground bg-muted/50 h-12 px-4 text-left align-middle font-medium"
                                                            style={{ ...getCommonPinningStyles({ column: header.column }) }}
                                                        >
                                                            {header.isPlaceholder ? null : (
                                                                <div className="flex items-center gap-2">
                                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                                </div>
                                                            )}
                                                        </TableHead>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableHeader>
                                        <TableBody>
                                            {table.getRowModel().rows?.length ? (
                                                table.getRowModel().rows.map((row, index) => (
                                                    <TableRow
                                                        key={row.id}
                                                        data-state={row.getIsSelected() && 'selected'}
                                                        className={cn(
                                                            'hover:bg-muted/50 border-b transition-colors',
                                                            row.getIsSelected() && 'bg-muted',
                                                            index % 2 === 0 && 'bg-background',
                                                        )}
                                                    >
                                                        {row.getVisibleCells().map((cell) => (
                                                            <TableCell
                                                                key={cell.id}
                                                                className="px-4 py-3"
                                                                style={{
                                                                    ...getCommonPinningStyles({ column: cell.column }),
                                                                }}
                                                            >
                                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={table.getAllColumns().length} className="h-[400px] p-0 text-center">
                                                        <EmptyState />
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {!isLoading && table.getRowModel().rows?.length > 0 && (
                        <div className="bg-background border-t px-6 py-4">
                            <DataTablePagination table={table} />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

// Empty state component
function EmptyState({
    title = 'Tidak ada data',
    description = 'Belum ada data yang tersedia untuk ditampilkan',
    icon,
}: {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-muted mx-auto flex h-20 w-20 items-center justify-center rounded-full">
                {icon || <Database className="text-muted-foreground h-10 w-10" />}
            </div>
            <h3 className="text-foreground mt-4 text-lg font-semibold">{title}</h3>
            <p className="text-muted-foreground mt-2 max-w-sm text-sm">{description}</p>
        </div>
    );
}

const renderToolbarItem = (item: ToolbarItem, index: number) => {
    switch (item.component) {
        case 'sheet':
            return (
                <Sheet key={index}>
                    <SheetTrigger asChild>
                        <Button size="sm">
                            {item.icon} {item.title}
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">{item.content}</SheetContent>
                </Sheet>
            );
        case 'button':
            return (
                <Button key={index} size="sm" onClick={item.onPress}>
                    {item.icon} {item.title}
                </Button>
            );
        case 'dropdown':
            return (
                <DropdownMenu key={index}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            {item.icon} {item.title}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {item.items?.map((dropdownItem, i) => (
                            <DropdownMenuItem key={i} onSelect={dropdownItem.onSelect}>
                                {dropdownItem.icon && <span className="mr-2">{dropdownItem.icon}</span>}
                                {dropdownItem.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        default:
            return null;
    }
};

export { DataTableCustom };
