interface Response<T = null> {
    status: boolean;
    message: string;
    data: T;
}

interface Student {
    id: number;
    user_id: number;
    nis: string;
    nisn: string;
    name: string;
    gender: string | null;
    birth_place: string | null;
    birth_date: string | null;
    phone: string | null;
    address: string | null;
    religion: string | null;
    avatar: string | null;

    classroom: Class;
    major: Major;
    user: User;
    parent: Parent;

    created_at: string;
    updated_at: string;
}

interface Parent {
    parent_id: number;
    name: string;
    gender: string | null;
    birth_place: string | null;
    birth_date: string | null;
    phone: string | null;
    address: string | null;
    religion: string | null;
    avatar: string | null;
    relation: string | null;
}

interface User {
    user_id: number;
    username: string;
    email: string;
    email_verified_at: string | null;
}

interface Major {
    major_id: number;
    name: string;
    short: string;
    slug: string;
    description: string;
}

interface Class {
    class_id: number;
    name: string;
}

interface Pagination {
    meta: {
        current_page: number;
        last_page: number;
        from: number;
        per_page: number;
        links: [
            {
                url: string;
                label: string;
                active: boolean;
            },
        ];
        path: string;
        to: number;
        total: number;
    };
}
