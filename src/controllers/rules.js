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

    createRule: async (req, res, next) => {
        try {
            const ruleData = req.body;
            const newRule = await RuleService.createRule(ruleData);
            res.status(201).json(newRule);
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(error.status).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

};