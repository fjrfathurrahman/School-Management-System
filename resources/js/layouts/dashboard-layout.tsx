import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import React from 'react';

interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    name?: string;
    title?: string;
    description?: string;
    breadcrumbs?: Breadcrumb[];
}

export interface Breadcrumb {
    title: string;
    url?: string;
}

export default ({ children, title = 'Dashboard', className, breadcrumbs = [], ...props }: DashboardLayoutProps) => {
    return (
        <SidebarProvider {...props}>
            <Head title={title} />
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumbs.length <= 3 ? (
                                    breadcrumbs.map((item, idx) => (
                                        <React.Fragment key={idx}>
                                            <BreadcrumbItem>
                                                {item.url ? (
                                                    <BreadcrumbLink href={item.url}>{item.title}</BreadcrumbLink>
                                                ) : (
                                                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                                                )}
                                            </BreadcrumbItem>
                                            {idx < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <>
                                        {/* First item */}
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href={breadcrumbs[0].url}>{breadcrumbs[0].title}</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />

                                        {/* Ellipsis Dropdown for middle items */}
                                        <BreadcrumbItem>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="flex items-center gap-1">
                                                    <BreadcrumbEllipsis className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start">
                                                    {breadcrumbs.slice(1, -1).map((item, idx) => (
                                                        <DropdownMenuItem key={idx}>
                                                            {item.url ? (
                                                                <a href={item.url} className="w-full text-left">
                                                                    {item.title}
                                                                </a>
                                                            ) : (
                                                                <span>{item.title}</span>
                                                            )}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />

                                        {/* Last item */}
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>{breadcrumbs[breadcrumbs.length - 1].title}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </>
                                )}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                <main className={cn('p-4', className)}>{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
};
