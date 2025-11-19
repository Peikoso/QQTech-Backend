import { pool } from '../config/database-conn.js';
import { AppSettings } from '../models/app-settings.js';

export const AppSettingsRepository = {
    findAll: async () => {
        const result = await pool.query('SELECT * FROM app_settings');

        return AppSettings.fromArray(result.rows);
    },

    create: async (appSettings) => {
        const insertQuery =
        `
        INSERT INTO app_settings (key, value)
        VALUES ($1, $2)
        RETURNING *;
        `

        const values = [
            appSettings.key,
            appSettings.value,
        ];

        const result = await pool.query(insertQuery, values);

        return new AppSettings(result.rows[0]);
    },
}