import { pool } from "../config/database-conn.js";
import { Channels } from "../models/channels.js";

export const ChannelsRepository = {
    findAll: async () => {
        const response = await pool.query(
            `
            SELECT * FROM channels
            ORDER BY created_at DESC
            `
        );

        return Channels.fromArray(response.rows);
    },

    create: async (channel) => {
        const insertQuery = 
        `
        INSERT INTO channels (type, name, config, is_active)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `;  

        const values = [
            channel.type,
            channel.name,
            channel.config,
            channel.isActive,
        ];

        const response = await pool.query(insertQuery, values);

        return new Channels(response.rows[0]);
    },
};