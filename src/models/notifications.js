import { BusinessLogicError } from "../utils/errors.js";

export class Notifications { 
    constructor(notification){
        this.id = notification.id;
        this.incidentId = notification.incident_id ?? notification.incidentId;
        this.channelId = notification.channel_id ?? notification.channelId;
        this.userId = notification.user_id ?? notification.userId;
        this.title = notification.title;
        this.message = notification.message;
        this.durationMs = notification.duration_ms ?? notification.durationMs;
        this.createdAt = notification.created_at ?? notification.createdAt;
    }

    static fromArray(notificationsArray) {
        return notificationsArray.map(notification => new Notifications(notification));
    }

    validateBusinessLogic() {
        if(this.durationMs <= 0) {
            throw new BusinessLogicError('Duration must be a positive integer number');
        }

        return this;
    }
};