import { SetCustomClaimsOnRoleUpdate } from './functions/set-custom-claims';
import { SetUserCreatedDate } from './functions/set-user-created-date';
import { initialize } from './initialize';

initialize();

// ------------------------ USER ---------------------
exports.SetUserCreatedDate = SetUserCreatedDate;

// ---------------------- SECURITY -------------------
exports.SetCustomClaimsOnRoleUpdate = SetCustomClaimsOnRoleUpdate;
