import { inject, injectable } from "tsyringe";

import User from "../../../../models/User";
import {
    IUserRepository,
    IUserRepositoryDTO,
} from "../../repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,
    ) {}
    async execute(user: IUserRepositoryDTO): Promise<User> { 
        const userExists = await this.userRepository.findOne({
            email: user.email,
        });

        if (userExists)
            throw new Error(
                "O E-mail informado já está cadastrado.",
            );

        const createdUser = await this.userRepository.create(user);
        
        return createdUser;
    }
}

export { CreateUserUseCase };
