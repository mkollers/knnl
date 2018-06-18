import { AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';

export class User {
    uid?: string;
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

    static fromAction(action: AngularFireAction<DatabaseSnapshot<any>>): User {
        const val = action.payload.val();
        return {
            uid: action.payload.key, ...val
        };
    }
}