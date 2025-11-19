import { AppSettingService } from '../services/app-settings.js';
import { CreateAppSettingsDto } from '../dto/app_settings/create-app-settings-dto.js';
import { ResponseAppSettingsDto } from '../dto/app_settings/response-app-settings-dto.js';

export const AppSettingsController = {
    getAllAppSettings: async (req, res) => {
        const appSettings = await AppSettingService.getAllAppSettings();

        const response = new ResponseAppSettingsDto(appSettings);

        return res.status(200).json(response);
    },

    createAppSettings: async (req, res) => {
        const appSettingsData = req.body;

        const dto = new CreateAppSettingsDto(appSettingsData);

        const newAppSettings = await AppSettingService.CreateAppSettingsDto(dto);

        const response = new ResponseAppSettingsDto(newAppSettings);

        return res.status(201).json(response);
    },
};