export class ResponseIncidentsLogsDto {
    constructor(IncidentsLogs){
        this.id = IncidentsLogs.id;
        this.incidentId = IncidentsLogs.incidentId;
        this.previousStatus = IncidentsLogs.previousStatus;
        this.currentStatus = IncidentsLogs.currentStatus;
        this.comment = IncidentsLogs.comment;
        this.actionUserId = IncidentsLogs.actionUserId;
    }
    
    static fromArray(IncidentsLogs){
        return new ResponseIncidentsLogsDto(IncidentsLogs);
    }
}

