import { Log } from "../models/Log.model.js";
import { Incident } from "../models/Incident.model.js";
import { v4 as uuidv4 } from "uuid";
import { getIO } from "../socket.js";

// Configuration
const TIME_WINDOW_MINUTES = 5;
const THRESHOLD_COUNT = 5; // e.g., 5 attacks in 5 minutes triggers an incident

/**
 * Analyzes a log entry before saving to detect specific patterns (like failed logins).
 * Mutates the logData object in place.
 * @param {Object} logData - The log data object being prepared.
 */
export const analyzeLog = (logData) => {
    // Rule: Failed Login Detection (Time-based correlation elsewhere handles the "Brute Force" naming, 
    // but here we flag the individual event)
    if ((logData.endpoint.includes("/login") || logData.endpoint.includes("/signin")) && logData.statusCode === 401) {
        logData.category = "SECURITY";
        logData.eventType = "FAILED_LOGIN";
        logData.severity = "MEDIUM";
        logData.classification = "SUSPICIOUS";
        logData.attackVector = "BRUTE_FORCE";
        logData.details.message = "Failed login attempt detected";
        logData.details.ruleId = "AUTH-001";
        if (!logData.details.tags.includes("BRUTE_FORCE")) {
            logData.details.tags.push("BRUTE_FORCE");
        }
    }
};

/**
 * Analyzes a security log to determine if an incident should be created or updated.
 * @param {Object} logDoc - The Mongoose document of the newly saved log.
 */
export const processLog = async (logDoc) => {
    try {
        const { sourceIP, attackVector, severity, details } = logDoc;
        const now = new Date();
        const windowStart = new Date(now.getTime() - TIME_WINDOW_MINUTES * 60 * 1000);

        // 1. Count recent security logs from this IP with the same attack vector
        const recentLogsCount = await Log.countDocuments({
            sourceIP: sourceIP,
            category: "SECURITY",
            attackVector: attackVector,
            timestamp: { $gte: windowStart }
        });

        // console.log(`[ThreatEngine] IP: ${sourceIP}, Vector: ${attackVector}, Count: ${recentLogsCount}`);

        // 2. Check Threshold
        if (recentLogsCount >= THRESHOLD_COUNT) {
            // 3. Check for existing OPEN incident for this IP
            let incident = await Incident.findOne({
                sourceIp: sourceIP,
                status: { $in: ["OPEN", "IN_PROGRESS"] }
            });

            if (incident) {
                // UPDATE existing incident
                incident.occurrenceCount += 1;
                incident.lastSeenAt = now;
                // Add this log to relatedLogs if not already present (though logic implies it's new)
                incident.relatedLogs.push(logDoc._id);

                // Upgrade severity if needed (e.g., if new log is CRITICAL but incident was HIGH)
                // For simplicity, we keep the highest severity seen or just keep current.
                // Let's stick to the diagram: "update incident"

                await incident.save();
                console.log(`[ThreatEngine] Updated Incident: ${incident.incidentId}`);
                try {
                    getIO().emit("INCIDENT_UPDATED", incident);
                } catch (e) { console.error("Socket emit failed", e); }
            } else {
                // CREATE new incident
                const newIncidentId = `INC-${uuidv4().substring(0, 8).toUpperCase()}`;

                // Find all related logs in the window to link them
                const relatedLogs = await Log.find({
                    sourceIP: sourceIP,
                    category: "SECURITY",
                    attackVector: attackVector,
                    timestamp: { $gte: windowStart }
                }).select("_id");

                incident = await Incident.create({
                    incidentId: newIncidentId,
                    type: `${attackVector} Attack`,
                    sourceIp: sourceIP,
                    severity: severity, // Start with severity of the current log
                    status: "OPEN",
                    occurrenceCount: recentLogsCount,
                    firstSeenAt: windowStart, // Approximate start of the attack window
                    lastSeenAt: now,
                    relatedLogs: relatedLogs.map(l => l._id),
                    triggerRule: details.ruleId || "THRESHOLD_RULE"
                });
                console.log(`[ThreatEngine] Created New Incident: ${incident.incidentId}`);
                try {
                    getIO().emit("NEW_INCIDENT", incident);
                } catch (e) { console.error("Socket emit failed", e); }
            }
        }
    } catch (error) {
        console.error("[ThreatEngine] Error processing log:", error);
    }
};
