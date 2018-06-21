import { AngularFireAction, DatabaseSnapshot } from 'angularfire2/database';
import { Dictionary } from 'lodash';

export class User {
    uid?: string;
    created?: string;
    email: string;
    dob: string;
    favoriteTeams: string;
    interests: string;
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
    roles: Dictionary<boolean>;

    static fromAction(action: AngularFireAction<DatabaseSnapshot<any>>): User {
        const val = action.payload.val();
        return {
            uid: action.payload.key, ...val
        };
    }
}