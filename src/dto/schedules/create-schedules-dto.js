import { ValidationError } from '../../utils/errors.js';
import { validateTimestampFormat } from '../../utils/validations.js';

export class CreateSchedulesDto {
    constructor(schedule) {
        this.userId = schedule.userId?.trim();
        this.roles = Array.isArray(schedule.roles) ? [...new Set(schedule.roles)] : [];
        this.startTime = schedule.startTime?.trim();
        this.endTime = schedule.endTime?.trim();
    }

    validate() {
        if(!this.userId || this.userId.trim() === '') {
            throw new ValidationError('userId is required');
        }
        if(!Array.isArray(this.roles) || this.roles.length === 0 || !this.roles.every(role => typeof role === 'string')) {
            throw new ValidationError('Roles must be a non-empty array of strings');
        }
        if(!validateTimestampFormat(this.startTime)) {
            throw new ValidationError('Start time must be in the format YYYY-MM-DDTHH:MM:SS.sssZ');
        }
        if(!validateTimestampFormat(this.endTime)) {
            throw new ValidationError('End time must be in the format YYYY-MM-DDTHH:MM:SS.sssZ');
        }

        return this;
    }
}
