import { pool } from '../config/database_conn.js'
import { Incidents } from '../models/incidents.js'

export const IncidentsRepository = {
    findAll: async () => {
        const result = await pool.query(
            `
            SELECT * FROM incidents
            ORDER BY created_at DESC;
            `
        );

        return Incidents.fromArray(result.rows);
    },

    findById: async(id) => {
        const selectIdQuery =
        `
        SELECT * FROM incidents
        WHERE id = $1
        `;

        const result = await pool.query(selectIdQuery, [id]);

        if(!result.rows[0]){
            return null;
        }

        return new Incidents(result.rows[0]);
    },

    create: async(incident) => {
        const insertIncidentQuery =
        `
        INSERT INTO incidents
        (assigned_user_id, rule_id, status, priority)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
        `

        const values = [
            incident.assignedUserId,
            incident.ruleId,
            incident.status,
            incident.priority
        ]

        const incidentDB = await pool.query(insertIncidentQuery, values);

        const insertRoleIncidentQuery = ` INSERT INTO incidents_roles (incident_id, role_id) VALUES ($1, $2); `;

        for (const roleId of incident.roles) {
            await pool.query(insertRoleIncidentQuery, [incidentDB.rows[0].id, roleId]);
        }

        const incidentWithRolesQuery =
        `
        SELECT i.*, array_agg(ir.role_id) AS roles
        FROM incidents i
        LEFT JOIN incidents_roles ir ON i.id = ir.incident_id
        WHERE i.id = $1
        GROUP BY i.id;
        `;

        const result = await pool.query(incidentWithRolesQuery, [incidentDB.rows[0].id]);

        return new Incidents(result.rows[0]);
    }
};