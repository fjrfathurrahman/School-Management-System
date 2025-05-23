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

    class_id: number;
    major_id: number;
    parent_id: number | null;
    created_at: string;
    updated_at: string;
}