import { RuleService } from '../services/rules.js';

export const RulesController = {
    getAllRules: async (req, res, next) => {
        try {
            const rules = await RuleService.getAllRules();
            res.status(200).json(rules);
        } catch (error) {
            next(error);
        }
    },

};