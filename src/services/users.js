import { UsersRepository } from '../repositories/users.js';
import { Users } from '../models/users.js';
import { ValidationError, NotFoundError } from '../utils/errors.js';
import { isValidUuid } from '../utils/validations.js';
import { RoleService } from './roles.js';

export const UserService = {
    getAllUsers: async () => {
        const users = await UsersRepository.findAll();
        
        return users;
    },

    getUserById: async (id) => {
        if(!isValidUuid(id)){
            throw new ValidationError('Invalide User UUID.')
        }

        const user = await UsersRepository.findById(id)

        if(!user){
            throw new NotFoundError('User not found.')
        }

        return user;
    },

    createUser: async (dto) => {
        const newUser = new Users(dto);

        for(const roleId of newUser.roles){
            await RoleService.getRoleById(roleId);
        }

        const savedUser = await UsersRepository.create(newUser);

        return savedUser;
    }
};