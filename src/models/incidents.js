import { ValidationError } from '../utils/errors.js'

export class Incidents {
    constructor(incident) {
        this.id = incident.id;
        this.assignedUserId = incident.assignedUserId;
        this.ruleId = incident.ruleId;
        this.status = incident.status;
        this.priority = incident.priority;
        this.ackAt = incident.ackAt;
        this.closedAt = incident.closedAt;
        this.createdAt = incident.createdAt;
        this.updatedAt = incident.updatedAt;
    }

    validateBusinessLogic() {
        if(!(this.status === 'OPEN' || this.status === 'ACK' || this.status === 'CLOSED')) {
            throw new ValidationError('Status must be OPEN, ACK, or CLOSED');
        }
        if(!(this.priority === 'LOW' || this.priority === 'MEDIUM' || this.priority === 'HIGH')) {
            throw new ValidationError('Priority must be LOW, MEDIUM, or HIGH');
        }
    }
}