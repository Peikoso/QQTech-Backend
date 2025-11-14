export class ResponseSchedulesDto {
    constructor(schedule) {
        this.id = schedule.id;
        this.userId = schedule.userId;
        this.channels = schedule.channels;
        this.startTime = schedule.startTime;
        this.endTime = schedule.endTime;
    }

    static fromArray(schedules) {
        return schedules.map((schedule) => new ResponseSchedulesDto(schedule));
    }
}
