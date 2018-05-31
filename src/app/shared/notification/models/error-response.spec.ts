import { ErrorResponse } from './error-response';


describe('NotificationComponent', () => {
    let errorResponse: ErrorResponse;
    const defaultErrorDescription: String = 'Hoppla, da ist was schiefgelaufen...';
    const defaultErrorCode: String = 'Unknown';

    let description: string;
    let errorCode: string;
    let data: any;

    beforeEach(() => {
        description = 'Test';
        errorCode = '0';
        data = 'data';
    });

    it('should keep default values if given error is null', () => {
        errorResponse = new ErrorResponse(null);

        expect(errorResponse.description).toBe(defaultErrorDescription);
        expect(errorResponse.code).toBe(defaultErrorCode);
    });

    it('should set data if there is a error description and error code', () => {
        errorResponse = new ErrorResponse({
            errorDescription: description,
            errorCode: errorCode,
            data: data
        });

        expect(errorResponse.description).toBe(description);
        expect(errorResponse.code).toBe(errorCode);
        expect(errorResponse.data).toBe(data);
    });

    it('should set data if there is a error property containing the description and error code', () => {
        errorResponse = new ErrorResponse({ error: { errorDescription: description, errorCode: errorCode } });

        expect(errorResponse.description).toBe(description);
        expect(errorResponse.code).toBe(errorCode);
    });

    it('should set data if there is a error property containing data', () => {
        errorResponse = new ErrorResponse({ error: { data: data } });

        expect(errorResponse.data).toBe(data);
    });

    it('should not set any data if error object does not contain these properties', () => {
        errorResponse = new ErrorResponse({ error: {} });

        expect(errorResponse.description).toBe(defaultErrorDescription);
        expect(errorResponse.code).toBe(defaultErrorCode);
        expect(errorResponse.data).toBe(undefined);
    });

    it('should not set any data if error object does not contain these properties', () => {
        errorResponse = new ErrorResponse({});

        expect(errorResponse.description).toBe(defaultErrorDescription);
        expect(errorResponse.code).toBe(defaultErrorCode);
        expect(errorResponse.data).toBe(undefined);
    });

});
