import { IncidentService } from '../services/incidents.js';

export const IncidentsController = {
    getAllIncidents: async(req, res) => {
        try {
            const incidents = await IncidentService.getAllIncidents();
            return res.status(200).json(incidents)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error.' })
        }
    },

    getIncidentById: async(req, res) => {
        try {
            const id = req.params.id

            const incident = await IncidentService.getIncidentById(id);
            return res.status(200).json(incident);
        } catch (error) {
            if(error.name === 'NotFoundError'){
                res.status(error.status).json({error: error.message})
            }
            if(error.name === 'ValidationError'){
                return res.status(error.status).json({error: error.message});
            }
            console.error(error)
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    createIncident: async(req, res) => {
        try {
            const incidentData = req.body;

            const newIncident = await IncidentService.createIncident(incidentData);
            return res.status(201).json(newIncident);
        } catch (error) {
            if(error.name === 'ValidationError'){
                return res.status(error.status).json({error: error.message});
            }
            if(error.name === 'NotFoundError'){
                return res.status(error.status).json({ error: error.message });
            }
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}