import User from "../../../models/User";

interface IAuth {
    user: IUserRepositoryDTO;
    token: string;
}

interface IUserRepositoryDTO {
    id?: string;
    name?: string;
    email: string;
    password?: string;
}

interface IUserRepository {
    create(user: IUserRepositoryDTO): Promise<User>;
    findOne(
        where: { [key: string]: string | number },
    ): Promise<IUserRepositoryDTO | null>;
}

export {
    IUserRepository,
    IUserRepositoryDTO,
    IAuth,
};