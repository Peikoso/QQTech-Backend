import { BusinessLogicError } from "../utils/errors";



export class IncidentsLogs {    
    constructor(IncidentsLogs){
        this.id = IncidentsLogs.id;
        this.incidentId = IncidentsLogs.incident_id ?? IncidentsLogs.incidentId;
        this.previousStatus = IncidentsLogs.previous_status ?? IncidentsLogs.previousStatus;
        this.currentStatus = IncidentsLogs.current_status ?? IncidentsLogs.currentStatus;
        this.comment = IncidentsLogs.comment;
        this.actionUserId = IncidentsLogs.action_user_id ?? IncidentsLogs.actionUserId;
        this.createdAt = IncidentsLogs.created_at ?? IncidentsLogs.createdAt;
    }
    
    nextStatus(status){
        this.previousStatus = status;
        
        if(status === 'OPEN'){
            this.currentStatus = 'ACK';
        }
        if(status === 'ACK'){
            this.currentStatus = 'CLOSED';
        }
        if(status === 'CLOSED'){
            throw new BusinessLogicError('Incident is already CLOSED. No further status updates allowed.');
        }

    }
}