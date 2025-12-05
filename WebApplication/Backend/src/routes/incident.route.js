import { Router } from 'express';
import {
    getIncidents,
    triageIncident,
    getIncidentDetails,
    getContainmentBlocklist
} from '../controllers/incident.controller.js';

const router = Router();

// Route to get a list of all incidents (Dashboard view)
//router.route("/").get(getIncidents);

// Route to get details for a specific incident (Investigation view)
//router.route("/:incidentId").get(getIncidentDetails);

// Route to update status, assignment, and notes (Triage action)
router.route("/:incidentId/triage").patch(triageIncident);

// Route to get the containment blocklist
router.route("/containment/blocklist").get(getContainmentBlocklist);

export default router;