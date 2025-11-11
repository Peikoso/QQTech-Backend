import { pool } from '../config/database_conn.js';

export const RolesRepository = {
    findAll: async () => {
        const result = await pool.query(
            `
            SELECT * FROM roles
            ORDER BY created_at DESC;
            `
        );

        return result.rows;
    },

    findById: async (id) => {
        const selectIdQuery =
        `
        SELECT * FROM roles
        WHERE id = $1
        `

        const result = await pool.query(selectIdQuery, [id]);

        return result.rows[0];
    },

    create: async(roleData) =>{
        const insertRoleQuery = 
        `
        INSERT INTO roles
        (name, color, description)
        VALUES ($1, $2, $3)
        RETURNING *;
        `;

        const values = [
            roleData.name,
            roleData.color,
            roleData.description
        ];
        
        const roleDB = await pool.query(insertRoleQuery, values);

        return roleDB.rows[0];
    }
};