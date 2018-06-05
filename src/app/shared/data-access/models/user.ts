export interface User {
    email: string;
    dob: number;
    favoriteTeams: string;
    firstname: string;
    lastname: string;
    mobile: string;
    dataProtection: {
        newPost: boolean;
        news: boolean;
        reply: boolean;
        results: boolean;
        whatsApp: boolean;
        whatsAppGroup: boolean;
    };
}