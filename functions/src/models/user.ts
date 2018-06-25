import { Dictionary } from 'lodash';

export interface User {
    created: string;
    dataProtection:
    {
        newPost: boolean;
        news: boolean;
        reply: boolean;
        results: boolean;
        whatsApp: boolean;
        whatsAppGroup: boolean;
    };
    dob: string;
    email: string;
    favoriteTeams: string;
    firstname: string;
    interests: string;
    lastname: string;
    mobile: string;
    roles: Dictionary<boolean>;
}