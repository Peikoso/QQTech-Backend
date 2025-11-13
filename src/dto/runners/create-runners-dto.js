import { ValidationError } from "../../utils/errors.js";
import { validateTimestampFormat } from "../../utils/validations.js";

export class CreateRunnersDto {
    constructor(runner){
        this.ruleId = runner.ruleId?.trim();
        this.status = runner.status?.trim();
        this.lastRunAt = runner.lastRunAt;
        this.nextRunAt = runner.nextRunAt;
    }

    validate() {
        if(typeof this.ruleId !== 'string' || this.ruleId === '') {
            throw new ValidationError('Rule id is required and must be a non-empty string');
        }
        if(typeof this.status !== 'string' || this.status === '') {
            throw new ValidationError('Status is required and must be a non-empty string');
        }
        if(!validateTimestampFormat(this.lastRunAt)) {
            throw new ValidationError('Last run at must be in the format YYYY-MM-DDTHH:MM:SS.sssZ');
        }
        if(!validateTimestampFormat(this.nextRunAt)) {
            throw new ValidationError('Next run at must be in the format YYYY-MM-DDTHH:MM:SS.sssZ');
        }
        
        return this;
    }
    
};

export class CreateRunnerLogsDto {
    constructor(runnerLog){
        this.runnerId = runnerLog.runnerId?.trim();
        this.runTimeMs = Number(runnerLog.runTimeMs);
        this.result = runnerLog.result?.trim();
        this.error = runnerLog.error?.trim();
        this.executedAt = runnerLog.executedAt;
    }

    validate() {
        if (typeof this.runnerId !== 'string' || this.runnerId === '') {
            throw new ValidationError('Runner id is required and must be a non-empty string');
        }
        if (isNaN(this.runTimeMs) || !Number.isInteger(this.runTimeMs)) {
            throw new ValidationError('Run time must be a integer number');
        }
        if (typeof this.result !== 'string' || this.result === '') {
            throw new ValidationError('Result is required and must be a non-empty string');
        }
        if (typeof this.error !== 'string' || this.error === '') {
            throw new ValidationError('Error is required and must be a non-empty string');
        }
        if (!validateTimestampFormat(this.executedAt)) {
            throw new ValidationError('Executed at must be in the format YYYY-MM-DDTHH:MM:SS.sssZ');
        }

        return this;
    }
};