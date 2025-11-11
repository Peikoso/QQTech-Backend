import { CreateRolesDto } from '../dto/roles/createRolesDto.js';
import { ResponseRolesDto } from '../dto/roles/responseRolesDto.js';
import { RolesRepository } from '../repositories/roles.js';
import { Roles } from '../models/roles.js';
import { isValidUuid } from '../utils/valid_uuid.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';


export const RoleService = {
    getAllRoles: async () => {
        const roles = await RolesRepository.findAll();
        return ResponseRolesDto.fromArray(roles);
    },

    getRoleById: async (id) => {
        if(!isValidUuid(id)){
            throw new ValidationError('Invalid Role UUID.');
        }

        const role = await RolesRepository.findById(id);

        if(!role){
            throw new NotFoundError('Role not found.');
        }

        return new ResponseRolesDto(role);
    },

    createRole: async (roleData) => {
        const dto = new CreateRolesDto(roleData).validate();
        
        new Roles(dto).validateBusinessLogic();

        const newRole = await RolesRepository.create(dto);

        return new ResponseRolesDto(newRole);
    }
};