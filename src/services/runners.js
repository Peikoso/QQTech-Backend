import { Runners, RunnerLogs } from "../models/runners.js";
import { RunnersRepository, RunnerLogsRepository } from "../repositories/runners.js";
import { RuleService } from "./rules.js";
import { ValidationError } from "../utils/errors.js";
import { isValidUuid } from "../utils/validations.js";

export const RunnerService = {
    getAllRunners: async () => {
        const runners = await RunnersRepository.findAll();

        return runners;
    },

    getRunnerById: async (id) => {
        if(!isValidUuid(id)){
            throw new ValidationError('Invalid Runner UUID.')
        }

        const runner = await RunnersRepository.findById(id);

        if(!runner){
            throw new ValidationError('Runner not found.');
        }

        return runner;
    },

    createRunner: async (dto) => {
        const newRunner = new Runners(dto).validateBusinessLogic();
        
        await RuleService.getRuleById(newRunner.ruleId);

        const savedRunner = await RunnersRepository.create(newRunner);

        return savedRunner;
    }
};

export const RunnerLogService = {
    getAllRunnersLogs: async () => {
        const runnersLogs = await RunnerLogsRepository.findAll();

        return runnersLogs;
    },

    createRunnerLog: async (dto) => {
        const newRunnerLog = new RunnerLogs(dto).validateBusinessLogic();

        await RunnerService.getRunnerById(newRunnerLog.runnerId);

        const savedRunnerLog = await RunnerLogsRepository.create(newRunnerLog);

        return savedRunnerLog;
    }
};