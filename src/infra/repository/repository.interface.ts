import { EntityPropsType } from "@/domain/@shared/entities/types";

/**
 * @interface RepositoryInterface
 * @description Contract interface for Repository.
 * */
export default interface RepositoryInterface<EntityPropsType>{
    create(data: EntityPropsType): Promise<EntityPropsType>;
    delete(id: string): Promise<boolean>;
    findById(id: string): Promise<(EntityPropsType) | null>;
    findAll(): Promise<EntityPropsType[]>;
    update(data: Partial<EntityPropsType>): Promise<EntityPropsType>;
}

export interface ExtendedUserRepository {
    create(data: Omit<EntityPropsType, "status">): Promise<EntityPropsType>;
    findByEmail(email: string): Promise<any>;
}