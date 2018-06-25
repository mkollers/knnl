import * as functions from 'firebase-functions';
import _ = require('lodash');

import { RoleRepository } from '../repositories/role-repository';
import { UserRepository } from '../repositories/user-repository';

export const SetCustomClaimsOnRoleUpdate = functions.database
    .ref('/roles/{roleId}/permissions')
    .onWrite(async (snapshot, context) => {
        const users = await UserRepository.findAll();
        const roles = await RoleRepository.findAll();

        for (const uid in users) {
            const user = users[uid];

            const permissions = _.chain(user.roles)
                .pickBy(value => !!value)
                .keys()
                .map(key => roles[key])
                .filter(role => !!role)
                .map(role => role.permissions)
                .map(p => _.pickBy(p, value => !!value))
                .map(p => _.keys(p))
                .value();

            console.log('permissions', permissions);
            // await admin.auth().setCustomUserClaims(uid, {admin: true});
        }
    });

