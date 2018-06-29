import { SetCustomClaimsOnRoleWrite } from './functions/set-custom-claims-on-role-write';
import { SetCustomClaimsOnUserRolesChange } from './functions/set-custom-claims-on-user-roles-change';
import { SetUserCreatedDate } from './functions/set-user-created-date';
import { initialize } from './initialize';

initialize();

// ------------------------ USER ---------------------
exports.SetUserCreatedDate = SetUserCreatedDate;

// ---------------------- SECURITY -------------------
exports.SetCustomClaimsOnRoleWrite = SetCustomClaimsOnRoleWrite;
exports.SetCustomClaimsOnUserRolesChange = SetCustomClaimsOnUserRolesChange;
