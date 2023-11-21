export interface GenericResponse {
    status: string;
    message: string;
}


export interface IUser {
    id: string,
    email: string,
    updated_at: string;
}


export interface IProgram {
    id: string,
    name: string
    programId: string,
    blank: IBlank,
    machiningTime: number,
    comment: string
}

export interface IBlank {
    width: number,
    length: number,
    height:number
}