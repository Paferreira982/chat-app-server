import { UserEntityPropsType } from "@/domain/user/entities/types";

export type UserLoginInputDto = {
    email: string;
    password: string;
}

export type UserLoginOutputDto = {
    token: string
} & UserEntityPropsType;
