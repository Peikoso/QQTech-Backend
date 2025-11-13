import { BusinessLogicError } from "../utils/errors.js";

export class Runners {
    constructor(runner){
        this.id = runner.id;
        this.ruleId = runner.rule_id ?? runner.ruleId;
        this.status = runner.status;
        this.lastRunAt = runner.last_run_at ?? runner.lastRunAt;
        this.nextRunAt = runner.next_run_at ?? runner.nextRunAt;
        this.createdAt = runner.created_at ?? runner.createdAt;
        this.updatedAt = runner.updated_at ?? runner.updatedAt;
    }

    static fromArray(runnersArray) {   
        return runnersArray.map(runner => new Runners(runner));
    }

    validateBusinessLogic() {
        if(this.lastRunAt > this.nextRunAt) {
            throw new BusinessLogicError('Last run time must be before next run time');
        }
        if(this.status !== 'active' && this.status !== 'inactive') {
            throw new BusinessLogicError('Status must be either active or inactive');
        }

        return this;
    }
    
};

export class RunnerLogs {
    constructor(runnerLog){
        this.id = runnerLog.id;
        this.runnerId = runnerLog.runner_id ?? runnerLog.runnerId;
        this.runTimeMs = runnerLog.run_time_ms ?? runnerLog.runTimeMs;
        this.result = runnerLog.result;
        this.error = runnerLog.error;
        this.executedAt = runnerLog.executed_at ?? runnerLog.executedAt;
    }

    validateBusinessLogic() {
        if(this.runTimeMs <= 0) {
            throw new BusinessLogicError('Run time must be positive');
        }

        return this;
    }

    static fromArray(runnerLogsArray) {
        return runnerLogsArray.map(runnerLog => new RunnerLogs(runnerLog));
    }
};