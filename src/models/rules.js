import { ValidationError } from '../utils/errors.js';
import { sqlValidantion } from '../utils/sql_validation.js';

export class Rules {
    constructor(rule) {
        this.id = rule.id;
        this.name = rule.name;
        this.description = rule.description;
        this.sql = rule.sql;
        this.priority = rule.priority;
        this.roles = rule.roles;
        this.executionIntervalMs = rule.executionIntervalMs;
        this.maxErrorCount = rule.maxErrorCount;
        this.timeoutMs = rule.timeoutMs;
        this.startTime = rule.startTime;
        this.endTime = rule.endTime;
        this.notificationEnabled = rule.notificationEnabled;
        this.isActive = rule.isActive;
        this.silenceMode = rule.silenceMode;
        this.postponeDate = rule.postponeDate;
        this.userCreatorId = rule.userCreatorId;
        this.createdAt = rule.createdAt;
        this.updatedAt = rule.updatedAt;
    }

    validateBusinessLogic() {
        if(this.name.length > 100) {
            throw new ValidationError('Name must be between 1 and 100 characters');
        }
        if(this.description.length > 255) {
            throw new ValidationError('Description must be between 1 and 255 characters');
        }
        if(!(this.priority === 'LOW' || this.priority === 'MEDIUM' || this.priority === 'HIGH')) {
            throw new ValidationError('Priority must be LOW, MEDIUM, or HIGH');
        }
        if (this.executionIntervalMs <= 0) {
            throw new ValidationError('Execution interval must be positive');
        }
        if (this.maxErrorCount < 0) {
            throw new ValidationError('Max error count cannot be negative');
        }
        if (this.timeoutMs <= 0) {
            throw new ValidationError('Timeout must be positive');
        }
        if (this.startTime >= this.endTime) {
            throw new ValidationError('Start time must be before end time');
        }
        if (this.postponeDate && this.postponeDate < new Date()) {
            throw new ValidationError('Postpone date must be in the future');
        }
        if (!sqlValidantion(this.sql)) {
            throw new ValidationError('SQL contains forbidden commands');
        }

    }

}