import { Incident } from "../models/Incident.model.js";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

/**
 * PHASE 5 & 7: Correlates a new security log with existing incidents or creates a new one.
 * @param {object} securityLogData - The Log document data that triggered the alert, including the MongoDB _id.
 */

export const correlateAndManageIncident = async (securityLogData) => {
    // Correlation Window: 5 minutes (adjust based on desired sensitivity)
    const correlationWindowMinutes = 5;
    const { sourceIP, attackVector, endpoint, severity } = securityLogData;

    // Calculate time threshold
    const timeThreshold = new Date(Date.now() - correlationWindowMinutes * 60 * 1000);

    // 1. Search for an existing OPEN incident by IP, Attack Vector, and time window
    const existingIncident = await Incident.findOne({
        attackerIP: sourceIP,
        attackVector: attackVector,
        status: "OPEN",
        // Incident must have an event within the last 5 minutes to be considered active
        timeOfLastEvent: { $gte: timeThreshold }
    }).sort({ timeOfLastEvent: -1 }); // Get the most recent one if multiple exist

    const logObjectId = securityLogData._id;

    if (existingIncident) {
        // --- CORRELATION FOUND: Update Existing Incident ---

        // Ensure the log ID is a valid ObjectId before pushing
        if (mongoose.Types.ObjectId.isValid(logObjectId)) {
            existingIncident.relatedLogIds.push(logObjectId);
        }

        existingIncident.occurrenceCount += 1;
        existingIncident.timeOfLastEvent = securityLogData.timestamp;

        // If the new log is of a higher severity, update the incident's severity
        if (severity === "CRITICAL" && existingIncident.severity !== "CRITICAL") {
            existingIncident.severity = "CRITICAL";
        }

        await existingIncident.save();
        console.log(`[INCIDENT] Log correlated to existing incident: ${existingIncident.incidentId}`);
        return existingIncident;

    } else {
        // --- NO CORRELATION: Create New Incident ---

        const newIncidentId = `INC-${uuidv4().substring(0, 8).toUpperCase()}`;
        const title = `${attackVector} Recon/Attack from ${sourceIP}${endpoint ? ` targeting ${endpoint}` : ''}`;

        const initialRelatedLogIds = mongoose.Types.ObjectId.isValid(logObjectId) ? [logObjectId] : [];

        const newIncident = await Incident.create({
            incidentId: newIncidentId,
            title: title,
            severity: severity,
            attackVector: attackVector,
            attackerIP: sourceIP,
            endpointTargeted: endpoint,
            relatedLogIds: initialRelatedLogIds,
            occurrenceCount: 1,
            timeOfFirstEvent: securityLogData.timestamp,
            timeOfLastEvent: securityLogData.timestamp
        });

        console.log(`[INCIDENT] New incident created: ${newIncidentId}`);
        return newIncident;
    }
};