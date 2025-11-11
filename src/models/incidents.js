export class Incidents {
    constructor(incident) {
        this.id = incident.id;
        this.assignedUserId = incident.assigned_user_id ?? incident.assignedUserId;
        this.ruleId = incident.rule_id ?? incident.ruleId;
        this.status = incident.status ?? 'OPEN';
        this.priority = incident.priority;
        this.roles = incident.roles;
        this.ackAt = incident.ack_at ?? incident.ackAt;
        this.closedAt = incident.closed_at ?? incident.closedAt;
        this.createdAt = incident.created_at ?? incident.createdAt;
        this.updatedAt = incident.updated_at ?? incident.updatedAt;
    }

    static fromArray(incidentsArray) {
        return incidentsArray.map(incident => new Incidents(incident));
    }
}