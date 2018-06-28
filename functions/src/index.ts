import { SetCustomClaimsOnRoleDelete } from './functions/set-custom-claims-on-role-delete';
import { SetCustomClaimsOnRoleUpdate } from './functions/set-custom-claims-on-role-update';
import { SetCustomClaimsOnUserRolesChange } from './functions/set-custom-claims-on-user-roles-change';
import { SetUserCreatedDate } from './functions/set-user-created-date';
import { initialize } from './initialize';

initialize();

// ------------------------ USER ---------------------
exports.SetUserCreatedDate = SetUserCreatedDate;

// ---------------------- SECURITY -------------------
exports.SetCustomClaimsOnRoleUpdate = SetCustomClaimsOnRoleUpdate;
exports.SetCustomClaimsOnRoleDelete = SetCustomClaimsOnRoleDelete;
exports.SetCustomClaimsOnUserRolesChange = SetCustomClaimsOnUserRolesChange;
