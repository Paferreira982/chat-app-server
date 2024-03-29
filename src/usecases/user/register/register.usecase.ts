import { Usecase } from "@/usecases/usecase.interface";
import { UserRegisterInputDto, UserRegisterOutputDto } from "./register.usecase.dtos";
import { UserBuildDto, UserEntityPropsType, UserPropsType, UserUpdateDto } from "@/domain/user/entities/types";
import RepositoryInterface, { ExtendedUserRepository } from "@/infra/repository/repository.interface";
import Authenticator from "@/infra/auth/authenticator.interface";
import { User } from "@/domain/user/entities/user.entity";

export class RegisterUserUsecase implements Usecase<UserRegisterInputDto, UserRegisterOutputDto> {
    public constructor(
        private readonly userRepository: RepositoryInterface<Omit<UserEntityPropsType, "status">>,
        private readonly authenticator: Authenticator,
    ) {}
    
    public async execute(input: UserBuildDto): Promise<UserEntityPropsType> {
        const {email, name, password, profileImage } = input;
    
        const user = User.build({email, name, password, profileImage });
        await user.hashPassword(this.authenticator);

        await this.userRepository.create({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            profileImage: user.profileImage,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            deletedAt: user.deletedAt
        });
        
        return user;
    }
}