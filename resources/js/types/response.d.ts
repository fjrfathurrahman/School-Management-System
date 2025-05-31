export interface IResponse<T = null> {
    status: boolean;
    message: string;
    data: T; // Jika mendapatkan data, maka data akan diisi dengan tipe T tidak null
}

export interface IStudent {
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

    classroom: IClass;
    major: IMajor;
    user: IUser;
    parent: IParent;

    created_at: string;
    updated_at: string;
}

export interface IParent {
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

export interface IUser {
    user_id: number;
    username: string;
    email: string;
    email_verified_at: string | null;
}

export interface IMajor {
    id: number;
    major_id: number;
    name: string;
    short: string;
    slug: string;
    description: string;
}

export interface IClass {
    id: number;
    class_id: number;
    name: string;
}

export interface IPagination {
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
}

export interface ITeacher {
    id: number;
    nip: string;
    name: string;
    phone_number: string | null;
    address: string | null;
    entry_date: string | null;
    date_of_birth: string | null;
    place_of_birth: string | null;
    education: string | null;
    position: string | null;
    status: string;
    gender: string | null;
    avatar: string | null;

    user: IUser;

    created_at: string;
    updated_at: string;
}

export interface IHomeRoom {
  students_count: ReactNode;
  id: number | string;
  school_year: string;
  semester: string;
  
  class: IClass;
  students: IStudent[];
  teacher: ITeacher;
  major: IMajor;

  students_count: number;
};
