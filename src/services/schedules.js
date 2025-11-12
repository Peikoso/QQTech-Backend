import { SchedulesRepository, SchedulesLogsRepository } from "../repositories/schedules.js";
import { Schedules, ScheduleLogs } from "../models/schedules.js";
import { NotFoundError, ValidationError } from "../utils/errors.js";
import { isValidUuid } from "../utils/validations.js";
import { UserService } from "./users.js";

export const ScheduleService = {
    getUpcomingSchedules: async () => {
        const date = new Date().toISOString().split('T')[0];
        
        return await SchedulesRepository.findUpcomingSchedules(date);
    },

    getScheduleById: async (id) => {
        if(!isValidUuid(id)) {
            throw new ValidationError(`Invalid UUID.`);
        }

        const schedule =  await SchedulesRepository.findById(id);

        if(!schedule) {
            throw new NotFoundError(`Schedule not found.`);
        }

        return schedule;
    },

    createSchedule: async (dto) => {
        const newSchedule = new Schedules(dto).validateBusinessLogic();

        await UserService.getUserById(newSchedule.userId);

        const savedSchedule = await SchedulesRepository.create(newSchedule);
        
        return savedSchedule;
    },

    updateSchedule: async (id, dto) => {
        const existingSchedule = await ScheduleService.getScheduleById(id);

        const updatedScheduleEntity  = new Schedules({
            ...existingSchedule,
            ...dto
        }).validateBusinessLogic();

        const savedSchedule = await SchedulesRepository.update(id, updatedScheduleEntity);

        await ScheduleLogService.createScheduleLog(
            id,
            userId,
            "UPDATE",
            "Schedule updated",
            existingSchedule,
            savedSchedule
        );
        
        return savedSchedule;
    }
};

export const ScheduleLogService = {
    getScheduleLogsByScheduleId: async (id) => {
        if(!isValidUuid(id)) {
            throw new ValidationError(`Invalid UUID.`);
        }

        await ScheduleService.getScheduleById(id);
        
        const scheduleLogs = await SchedulesLogsRepository.findScheduleLogsByScheduleId(id);
        
        return scheduleLogs;
    },

    createScheduleLog: async (scheduleId, userId, actionType, description, oldValue, newValue) => {
        const newScheduleLog = new ScheduleLogs(
            {
                scheduleId: scheduleId,
                userId: userId,
                actionType: actionType,
                description: description,
                oldValue: JSON.stringify(oldValue),
                newValue: JSON.stringify(newValue)
            }
        );

        const savedScheduleLog = await SchedulesLogsRepository.create(newScheduleLog);
        
        return savedScheduleLog;
    }
};