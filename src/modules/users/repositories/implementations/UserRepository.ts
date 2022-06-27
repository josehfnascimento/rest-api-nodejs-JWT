import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database/index"
import User from "../../../../models/Users";
import {
    IUserRepository, IUserRepositoryDTO,
} from "../IUserRepository";

class UserRepository implements IUserRepository {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async findOne(
        where: { [key: string]: string | number },
    ): Promise<User | null> {
        const user = await this.userRepository.findOne({
            where,
        });

        return user;
    }

    async create(user: IUserRepositoryDTO): Promise<User> {

        const createdUser = this.userRepository.create({
            name: user.name,
            email: user.email,
            password: user.password,
        });
        
        await this.userRepository.save(createdUser);

        return createdUser;
    }
}

export { UserRepository };
