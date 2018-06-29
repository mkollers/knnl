import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as _ from 'lodash';

import { RoleRepository } from '../repositories/role-repository';
import { UserRepository } from '../repositories/user-repository';
import { MetadataRepository } from '../repositories/metadata-repository';

export const SetCustomClaimsOnRoleWrite = functions.database
    .ref('/roles/{roleKey}/permissions')
    .onWrite(async (snapshot, context) => {
        const users = await UserRepository.findAll();
        const roles = await RoleRepository.findAll();

        // Only user who has the role assigned
        const roleKey = context.params.roleKey;

        for (const uid in users) {
            const user = users[uid];

            // skip users who does not contains the role
            if (!user.roles || !user.roles[roleKey]) {
                continue;
            }

            const permissions = _.chain(user.roles)
                .keys() // get role keys of object ({ role_key: boolean })
                .map(key => roles[key]) // map to complete role objects
                .filter(role => !!role) // wrong role assignmnets results in undefined roles -> remove them
                .map(role => role.permissions) // map to permissions
                .map(p => _.pickBy(p, value => !!value)) // Roles without permissions are irrelevant
                .map(p => _.keys(p)) // get permission names ({ permission_name: boolean })
                .flatten()
                .keyBy(v => v)
                .mapValues(v => true)
                .value();

            await admin.auth().setCustomUserClaims(uid, permissions);
            await MetadataRepository.enforceTokenRefresh(uid);

            console.log(`Set permissions for ${user.firstname} ${user.lastname}:`, _.keys(permissions));
        }
    });

