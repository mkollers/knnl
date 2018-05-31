export class ErrorResponse {
    description = 'Hoppla, da ist was schiefgelaufen...';
    code = 'Unknown';
    data?: any;

    constructor(err: any) {
        try {
            if (!err) {
                return;
            }

            if (err.errorDescription && err.errorCode) {
                this.description = err.errorDescription;
                this.code = err.errorCode;
                this.data = err.data;
                return;
            }

            if (err.error) {
                if (err.error.errorDescription && err.error.errorCode) {
                    this.description = err.error.errorDescription;
                    this.code = err.error.errorCode;
                }
                if (err.error.data) {
                    this.data = err.error.data;
                }
            }
        } catch (ex) {
            console.error(ex);
        }
    }
}
