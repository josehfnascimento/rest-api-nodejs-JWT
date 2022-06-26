import User from "../../../models/User";

interface IUserRepositoryDTO {
    id?: number;
    name: string;
    email: string;
    password: string;
}

interface IUserRepository {
    create(user: IUserRepositoryDTO): Promise<User>;
    findOne(
        where: { [key: string]: string | number },
    ): Promise<User | null>;
}

export {
    IUserRepository,
    IUserRepositoryDTO,
};