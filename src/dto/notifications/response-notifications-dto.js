export class ResponseNotificationsDto { 
    constructor(notification){
        this.id = notification.id;
        this.incidentId = notification.incidentId;
        this.channelId = notification.channelId;
        this.userId = notification.userId;
        this.title = notification.title;
        this.message = notification.message;
    }

    static fromArray(notificationsArray) {
        return notificationsArray.map(notification => new ResponseNotificationsDto(notification));
    }
};