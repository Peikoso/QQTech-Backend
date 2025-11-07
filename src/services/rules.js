import { RuleRepository } from "../repositories/rules.js";
import { RulesResponseDto } from "../dto/rules/responseRulesDto.js";
import { CreateRulesDto } from "../dto/rules/createRulesDto.js";
import { Rules } from "../models/rules.js";
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
       const dto = new CreateRulesDto(ruleData).validate();

       new Rules(dto).validateBusinessRules();

       const newRule = await RuleRepository.create(dto);

       return new RulesResponseDto(newRule);
    },

    updateRule: async (id, ruleData) => {
        //Logica a ser implementada
    },

    deleteRule: async (id) => {
        //Logica a ser implementada
    }
};
