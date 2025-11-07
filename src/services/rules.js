import { RuleRepository } from "../repositories/rules.js";
import { RulesResponseDto } from "../dto/rules/responseRulesDto.js";
import { ValidationError, NotFoundError } from "../utils/errors.js";

export const RuleService = {
    getAllRules: async () => {
        const rules = await RuleRepository.findAll();
        return rules.map(rule => new RulesResponseDto(rule));
    },

    getRuleById: async (id) => {
        //Logica a ser implementada
    },

    createRule: async (ruleData) => {
       //Logica a ser implementada
    },

    updateRule: async (id, ruleData) => {
        //Logica a ser implementada
    },

    deleteRule: async (id) => {
        //Logica a ser implementada
    }
};
