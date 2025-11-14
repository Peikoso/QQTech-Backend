import { Notifications } from "../models/notifications.js";
import { NotificationsRepository } from "../repositories/notifications.js";
import { ForbiddenError, ValidationError  } from "../utils/errors.js";
import { isValidUuid } from "../utils/validations.js";
import { UserService } from "./users.js";
import { ChannelService } from "./channels.js";
import { IncidentService } from "./incidents.js";



export const NotificationService = {
    getNotificationsByUserId: async (id) => {
        if(!isValidUuid(id)){
            throw new ValidationError('Invalid user ID UUID.');
        }

        await UserService.getUserById(id);

        const notifications = await NotificationsRepository.findByUserId(id);

        return notifications;
    },

    createNotification: async (dto) => {
        const newNotification = new Notifications(dto).validateBusinessLogic();

        await UserService.getUserById(newNotification.userId);
        await ChannelService.getChannelById(newNotification.channelId);
        await IncidentService.getIncidentById(newNotification.incidentId);

        const savedNotification = await NotificationsRepository.create(newNotification);

        return savedNotification;
    },

    updateNotification: async (id, dto) => {
        throw new ForbiddenError('Not implemented.');
    },

    deleteNotification: async (id) => {
        throw new ForbiddenError('Not implemented.');
    },
};