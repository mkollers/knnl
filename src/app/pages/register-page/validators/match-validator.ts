import { FormGroup } from '@angular/forms';

export function MatchValidator(group: FormGroup) {
    let prev = null;

    // tslint:disable-next-line:forin
    for (const name in group.controls) {
        const val = group.controls[name].value;

        if (prev !== null && prev !== val) {
            return {
                mismatch: true
            };
        }

        prev = val;
    }

    return null;
}
