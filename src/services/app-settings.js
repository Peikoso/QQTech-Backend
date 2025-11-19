import { AppSettingsRepository } from "../repositories/app-settings.js";
import { AppSettings } from "../models/app-settings.js";
import { UserService } from "./users.js";

export const AppSettingService = {
    getAllAppSettings: async () => {
        const appSettings = await AppSettingsRepository.findAll();

        return appSettings
    },

    createAppSettings: async (dto) => {
        const appSettings = new AppSettings(dto).validateBusinessLogic();

        await UserService.getUserById(appSettings.updatedByUserId);

        const savedAppSettings = await AppSettingsRepository.create(appSettings);

        return savedAppSettings;
    },
};