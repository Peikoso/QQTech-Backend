import { EscalationPolicyService } from "../services/escalationPolicies.js";
import { CreateEscalationPolicy } from "../dto/escalation_policies/CreateEscalationPolicies.js";
import { ResponseEscalationPolicy } from "../dto/escalation_policies/ResponseEscalationPolicies.js";

export const EscalationPoliciesController = {
    getAllEscalationPolicies: async (req, res) => {
        const escalationPolicies = await EscalationPolicyService.getAllEscalationPolicies();

        const response = ResponseEscalationPolicy.fromArray(escalationPolicies);

        return res.status(200).json(response);
    },

    createEscalationPolicy: async (req, res) => {
        const escalationPolicyData = req.body;

        const dto = new CreateEscalationPolicy(escalationPolicyData).validate();

        const newEscalationPolicy = await EscalationPolicyService.createEscalationPolicy(dto);

        const response = new ResponseEscalationPolicy(newEscalationPolicy);

        return res.status(201).json(response);
    }
};