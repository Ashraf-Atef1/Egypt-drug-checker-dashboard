type User = {
    src: string | null;
    frameName: string | null;
    userType: "admin" | "doctor" | "user";
    name: string;
}

export interface Iusers {
    users: User[];
}
