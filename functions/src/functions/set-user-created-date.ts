import * as functions from 'firebase-functions';

export const SetUserCreatedDate = functions.database
    .ref('/users/{uid}')
    .onCreate(async (snapshot, context) => {
        try {
            const user = snapshot.val();
            await snapshot.ref.child('created').set(context.timestamp);
            
            console.log(`Successfully set created date for "${user.firstname} ${user.lastname}"`);
        } catch (err) {
            console.error(err);
        }
    });