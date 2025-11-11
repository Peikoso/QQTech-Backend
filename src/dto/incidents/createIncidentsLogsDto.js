import { ValidationError } from "../../utils/errors.js";

export class CreateIncidentsLogsDto {    
    constructor(IncidentsLogs){
        this.incidentId = IncidentsLogs.incidentId?.trim();
        this.comment = IncidentsLogs.comment?.trim();
        this.actionUserId = IncidentsLogs.actionUserId?.trim();
    }

    validate() {
        if (typeof this.comment !== 'string' || this.comment.trim() === '') {
            throw new ValidationError('Comment must be a non-empty string');
        }
        if(this.comment.length > 255){
            throw new ValidationError('Comment cannot exceed 255 characters');
        }
        if (!this.incidentId || this.incidentId === '') {
            throw new ValidationError("incidentId is required");
        }
        if (!this.actionUserId || this.actionUserId === '') {
            throw new ValidationError("actionUserId is required");
        }

        return this;
    }
}