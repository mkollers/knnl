import * as admin from 'firebase-admin';

export function initialize() {
    let serviceAccount;
    let databaseUrl: string;

    serviceAccount = require("../private-key");
    databaseUrl = 'https://knnl-43fbb.firebaseio.com';

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: databaseUrl
    });
}