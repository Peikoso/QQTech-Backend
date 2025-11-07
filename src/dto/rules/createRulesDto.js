import { ValidationError } from '../utils/errors.js';

export class CreateRulesDto {
    constructor(rule) {
        this.name = rule.name;
        this.description = rule.description;
        this.sql = rule.sql;
        this.priority = rule.priority;
        this.execution_interval = Number(rule.execution_interval);
        this.max_error_count = Number(rule.max_error_count);
        this.timeout = Number(rule.timeout);
        this.start_time = rule.start_time;
        this.end_time = rule.end_time;
        this.notification_enabled = rule.notification_enabled;
        this.is_active = rule.is_active;
        this.silence_mode = rule.silence_mode;
        this.postpone_date = rule.postpone_date;
        this.user_creator_id = rule.user_creator_id;
    }

    validate() {
        if(typeof this.name !== 'string' || this.name.trim() === '') {
            throw new ValidationError('Name is required and must be a non-empty string');
        }

        if(typeof this.description !== 'string' || this.description.trim() === '') {
            throw new ValidationError('Description is required and must be a non-empty string');
        }

        if(typeof this.sql !== 'string' || this.sql.trim() === '') {
            throw new ValidationError('SQL is required and must be a non-empty string');
        }

        if(typeof this.priority !== 'string' || this.priority.trim() === '') {
            throw new ValidationError('Priority must be baixa, media, or alta');
        }

        if(isNaN(this.execution_interval)) {
            throw new ValidationError('Execution interval must be a number');
        }

        if(isNaN(this.max_error_count)) {
            throw new ValidationError('Max error count must be a number');
        }
        if(isNaN(this.timeout)) {
            throw new ValidationError('Timeout must be a number');
        }

        if(isNaN(Date.parse(this.start_time))) {
            throw new ValidationError('Start time must be a Date');
        }

        if(isNaN(Date.parse(this.end_time))) {
            throw new ValidationError('End time must be a Date');
        }

        if(typeof this.notification_enabled !== 'boolean') {
            throw new ValidationError('Notification enabled must be a boolean');
        }

        if(typeof this.is_active !== 'boolean') {
            throw new ValidationError('Is active must be a boolean');
        }

        if(this.postpone_date && isNaN(Date.parse(this.postpone_date))) {
            throw new ValidationError('Postpone date must be a Date');
        }

        if(typeof this.user_creator_id !== 'string' || this.user_creator_id.trim() === '') {
            throw new ValidationError('User creator ID must be a non-empty string');
        }
    }

}