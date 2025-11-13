import { RunnerService, RunnerLogService } from '../services/runners.js';
import { ResponseRunnersDto } from '../dto/runners/response-runners-dto.js';
import { CreateRunnerLogsDto } from '../dto/runners/create-runners-dto.js';

export const RunnersController = {
    getAllRunners: async (req, res) => {
        const runners = await RunnerService.getAllRunners();

        const response = ResponseRunnersDto.fromArray(runners);

        return res.status(200).json(response);
    },

    createRunner: async (req, res) => {
        const runnerData = req.body;

        const dot = new CreateRunnerLogsDto(runnerData).validate();

        const newRunner = await RunnerService.createRunner(dot);

        const response = new ResponseRunnersDto(newRunner);

        return res.status(201).json(response);
    }
}

export const RunnerLogsController = {
    getAllRunnersLogs: async (req, res) => {
        const runnersLogs = await RunnerLogService.getAllRunnersLogs();
        
        const response = ResponseRunnersDto.RunnerLogs.fromArray(runnersLogs);

        return res.status(200).json(response);
    },

    createRunnerLog: async (req, res) => {
        const runnerLogData = req.body;

        const dto = new CreateRunnerLogsDto(runnerLogData).validate();

        const newRunnerLog = await RunnerLogService.createRunnerLog(dto);

        const response = new ResponseRunnersDto.RunnerLogs(newRunnerLog);

        return res.status(201).json(response);
    }
}