import { inject, injectable } from "tsyringe";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../../../../models/Users";
import {
    IAuth,
    IUserRepository,
    IUserRepositoryDTO,
} from "../../repositories/IUserRepository";

@injectable()
class AuthUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,
    ) {}
    async execute(user: IUserRepositoryDTO): Promise<IAuth> { 
        dotenv.config();
        const userExists = await this.userRepository.findOne({
            email: user.email,
        });

        if (!userExists)
            throw new Error(
                "O E-mail informado não está cadastrado.",
            );

        const isValidPassword = await bcrypt.compare(user.password!, userExists.password!);

        if (!isValidPassword)
            throw new Error(
                "O E-mail e/ou senha informados estão incorretos.",
            );

        const token = jwt.sign({ id: userExists.id},`${process.env.SECRET}`, {expiresIn: "1d"});
        delete userExists.password;
        
        return { user: userExists, token };
    }
}

export { AuthUserUseCase };
