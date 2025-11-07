import { pool } from '../config/database_conn.js';

export const RuleRepository = {
    findAll: async () => {
        const result = await pool.query('SELECT * FROM rules');
        return result.rows;
    },

    findById: async (id) => {
        // Lógica para encontrar uma regra pelo ID
    },

    create: async (ruleData) => {
        // Lógica para criar uma nova regra no banco de dados
    },

    update: async (id, ruleData) => {
        // Lógica para atualizar uma regra existente no banco de dados
    },

    delete: async (id) => {
        // Lógica para deletar uma regra do banco de dados
    }
}