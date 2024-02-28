export interface GenericResponse {
    status: string;
    message: string;
}

export interface LoginRequest {
    email: string,
    password: string
}


export interface IUser {
    id: string,
    email: string,
    updated_at: string;
}

export interface ITokenSession{
    refreshToken: string,
    accessToken: string
}

export interface IProgram {
    id: string,
    name: string
    programId: string,
    blank: IBlank,
    machiningTime: number,
    comment: string
    parts: IPart[],
    tools: string[],
    files: IFiles
}


export interface IFiles{
    lst: IFile,
    tmt: IFile,
    preview:IFile
}


export  interface IFile{
    path: string,
    lastUpdate: string,
    url: string
}
export interface IPart{
    dimensions: IBlank,
    geoFilename: string,
    quantity: number
}


export interface IBlank {
    width: number,
    length: number,
    height:number
}