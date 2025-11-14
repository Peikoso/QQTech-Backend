import { ValidationError } from "../../utils/errors.js";
import { validateTimeFormat } from "../../utils/validations.js";

export class CreateUserPreferencesDto {
    constructor(preferences) {
        this.userId = preferences.userId?.trim();
        this.dndStartTime = preferences.dndStartTime?.trim();
        this.dndEndTime = preferences.dndEndTime?.trim();
        this.pushEnabled = preferences.pushEnabled;
        this.pushSoundEnabled = preferences.pushSoundEnabled;
        this.channels = Array.isArray(preferences.channels) ? [...new Set(preferences.channels)] : [];
    }
    
    validate() {
        if (!validateTimeFormat(this.dndStartTime)) {
            throw new ValidationError('DND start time must be in HH:MM:SS format');
        }
        if (!validateTimeFormat(this.dndEndTime)) {
            throw new ValidationError('DND end time must be in HH:MM:SS format');
        }
        if(!Array.isArray(this.channels) || this.channels.length === 0 || !this.channels.every(channel => typeof channel === 'string')) {
            throw new ValidationError('Channels must be a non-empty array of strings');
        }
        if (typeof this.pushEnabled !== 'boolean') {
            throw new ValidationError('Push enabled must be a boolean');
        }
        if (typeof this.pushSoundEnabled !== 'boolean') {
            throw new ValidationError('Push sound enabled must be a boolean');
        }

        return this;
    }
};