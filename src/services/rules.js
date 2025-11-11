import { RulesRepository } from '../repositories/rules.js';
import { Rules } from '../models/rules.js';
import { RoleService } from './roles.js';
import { ValidationError, NotFoundError } from '../utils/errors.js';
import { isValidUuid } from '../utils/valid_uuid.js'

export const RuleService = {
    getAllRules: async () => {
        const rules = await RulesRepository.findAll();

        return rules;
    },

    getRuleById: async (id) => {
        if(!isValidUuid(id)){
            throw new ValidationError('Invalid Rule UUID.')
        }

        const rule = await RulesRepository.findById(id)

        if(!rule){
            throw new NotFoundError('Rule not found.')
        }

        return rule;
    },

    createRule: async (dto) => {
        const newRule = new Rules(dto).validateBusinessLogic();

        for(const roleId of newRule.roles){
            await RoleService.getRoleById(roleId);
        }

        const savedRule = await RulesRepository.create(newRule);

        return savedRule;
    },

    updateRule: async (id, ruleData) => {
        //Logica a ser implementada
    },

    deleteRule: async (id) => {
        //Logica a ser implementada
    }
};
