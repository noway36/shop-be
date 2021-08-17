export enum HttpCode {
    Ok = 200,
    NotFound = 404,
    InternalServerError = 500,
    BadRequest = 400,
}

export enum CsvFileFolder {
    Uploaded = 'uploaded',
    Parsed = 'parsed',
}

export const BUCKET = 'import-service-products-files';
