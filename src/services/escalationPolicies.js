import { EscalationPolicy } from "../models/escalationPolicies.js";
import { EscalationPoliciesRepository } from "../repositories/escalationPolicies.js";
import { RoleService } from "./roles.js";


export const EscalationPolicyService = {
    getAllEscalationPolicies: async () => {
        const escalationPolicies = await EscalationPoliciesRepository.findAll();

        return escalationPolicies;
    },

    createEscalationPolicy: async (dto) => {
        const newEscalationPolicy = new EscalationPolicy(dto).validateBusinessLogic();

        await RoleService.getRoleById(newEscalationPolicy.roleId);

        const savedEscalationPolicy = await EscalationPoliciesRepository.create(newEscalationPolicy);

        return savedEscalationPolicy;
    }
};