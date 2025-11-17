import { AuditLogService } from '../services/audit-log.js';
import { CreateAuditLogsDto } from '../dto/audit_logs/create-audit-logs-dto.js';
import { ResponseAuditLogsDto } from '../dto/audit_logs/response-audit-logs-dto.js';
import { create } from 'domain';

export const AuditLogsController = {
    getAuditLogs: async (req, res) => {
        const auditLogs = await AuditLogService.getAllAuditLogs();

        const response = auditLogs.map(auditLog => new ResponseAuditLogsDto(auditLog));

        return res.status(200).json(response);
    },

    createAuditLog: async (req, res) => {
        const auditLogData = req.body;

        const dto = new CreateAuditLogsDto(auditLogData).validate();

        const newAuditLog = await AuditLogService.createAuditLog(dto);

        const response = new ResponseAuditLogsDto(newAuditLog);

        return res.status(201).json(response);
    },
};