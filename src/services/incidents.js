import { IncidentsRepository } from "../repositories/incidents.js";
import { Incidents } from '../models/incidents.js';
import { isValidUuid } from "../utils/valid_uuid.js";
import { ValidationError, NotFoundError } from "../utils/errors.js";
import { RoleService } from "./roles.js";
import { RuleService } from "./rules.js";
import { UserService } from "./users.js";
import { IncidentsLogs } from '../models/incidentsLogs.js';


export const IncidentService = {
    getAllIncidents: async () => {
        const incidents = await IncidentsRepository.findAll();

        return incidents;
    },

    getAllIncidentsLogs: async () => {
        const incidentsLogs = await IncidentsLogsRepository.findAll();

        return incidentsLogs;
    },

    getIncidentById: async (id) => {
        if(!isValidUuid(id)){
            throw new ValidationError('Invalid Incident UUID.');
        }

        const incident = await IncidentsRepository.findById(id);

        if(!incident){
            throw new NotFoundError('Incident not found.');
        }

        return incident;

    },

    getIncidentesLogsById: async (id) => {
        if(!isValidUuid(id)){
            throw new ValidationError('Invalid Incidents Logs UUID.');
        }

        const incidentLogs = await IncidentsLogsRepository.findById(id);

        if(!incidentLogs){
            throw new NotFoundError('Incidents Logs not found.');
        }

        return incidentLogs;
    },

    createIncident: async (dto) => {
        const newIncident = new Incidents(dto);

        await UserService.getUserById(newIncident.assignedUserId);
        await RuleService.getRuleById(newIncident.ruleId);

        for(const roleId of newIncident.roles){
            await RoleService.getRoleById(roleId);
        }

        const savedIncident = await IncidentsRepository.create(newIncident);

        return savedIncident;
    }, 

    createIncidentsAction: async (dto) => {
        const newIncidentsLogs = new IncidentsLogs(dto);

        const incident = await IncidentService.getIncidentById(newIncidentsLogs.incidentId);
        
        await UserService.getUserById(newIncidentsLogs.actionUserId);
        
        newIncidentsLogs.nextStatus(incident.status);

        const savedIncidentsLogs = await IncidentsLogsRepository.create(newIncidentsLogs);

        return savedIncidentsLogs;
    }

}