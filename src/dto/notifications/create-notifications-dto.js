import { ValidationError } from "../../utils/errors.js";

export class CreateNotificationsDto { 
    constructor(notification){
        this.incidentId = notification.incidentId?.trim();
        this.channelId = notification.channelId?.trim();
        this.userId = notification.userId?.trim();
        this.title = notification.title?.trim();
        this.message = notification.message?.trim();
        this.durationMs = Number(notification.durationMs);
        this.createdAt = notification.createdAt;
    }

    validate() {
        if(typeof this.incidentId !== 'string' || this.incidentId === '') {
            throw new ValidationError('Incident ID is required and must be a non-empty string');
        }
        if(typeof this.channelId !== 'string' || this.channelId === '') {
            throw new ValidationError('Channel ID is required and must be a non-empty string');
        }
        if(typeof this.userId !== 'string' || this.userId === '') {
            throw new ValidationError('User ID is required and must be a non-empty string');
        }
        if(typeof this.title !== 'string' || this.title === '') {
            throw new ValidationError('Title is required and must be a non-empty string');
        }
        if(typeof this.message !== 'string' || this.message === '') {
            throw new ValidationError('Message is required and must be a non-empty string');
        }
        if(isNaN(this.durationMs) || !Number.isInteger(this.durationMs)) {
            throw new ValidationError('Duration must be a integer number');
        }

        return this;
    }

};