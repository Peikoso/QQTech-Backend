import { ValidationError } from '../../utils/errors.js'

export class CreateIncidentsDto { 
    constructor(incident) {
        this.assignedUserId = incident.assignedUserId?.trim();
        this.ruleId = incident.ruleId?.trim();
        this.priority = incident.priority?.trim();
        this.roles = Array.isArray(incident.roles) ? [...new Set(incident.roles)] : [];
    }

    validate() {
        if (!this.assignedUserId) {
            throw new ValidationError('assignedUserId is required');
        }
        if (!this.ruleId) {
            throw new ValidationError('ruleId is required');
        }
        if (!(this.priority === 'LOW' || this.priority === 'MEDIUM' || this.priority === 'HIGH')) {
            throw new ValidationError('Priority must be LOW, MEDIUM, or HIGH');
        }
        if(!Array.isArray(this.roles) || this.roles.length === 0 || !this.roles.every(role => typeof role === 'string')) {
            throw new ValidationError('Roles must be a non-empty array of strings');
        }

        return this;
    }
};