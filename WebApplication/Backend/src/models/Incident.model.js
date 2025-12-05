import mongoose, { Schema } from "mongoose";

const incidentSchema = new Schema(
    {
        // Unique identifier for the incident (e.g., INC-A1B2C3D4)
        incidentId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        title: {
            type: String,
            required: true
        },
        // Phase 8: Incident Triage & Prioritization
        status: {
            type: String,
            enum: ["OPEN", "IN_PROGRESS", "CLOSED_TRUE_POSITIVE", "CLOSED_FALSE_POSITIVE"],
            default: "OPEN"
        },
        severity: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
            required: true
        },
        attackVector: {
            type: String,
            enum: ["NONE", "SQLI", "XSS", "BRUTEFORCE", "PORTSCAN", "DDOS", "TOKEN_ABUSE", "MALWARE", "OTHER"],
            required: true
        },
        attackerIP: {
            type: String,
            required: true,
            index: true
        },
        endpointTargeted: {
            type: String,
            default: null
        },
        // Link to the Log documents that caused or contributed to this incident
        relatedLogIds: {
            type: [Schema.Types.ObjectId],
            ref: "Log",
            default: []
        },
        // Count of security events tied to this single incident (correlation)
        occurrenceCount: {
            type: Number,
            default: 1
        },
        timeOfFirstEvent: {
            type: Date,
            required: true
        },
        timeOfLastEvent: {
            type: Date,
            required: true
        },
        // Analyst-related fields for Phase 8/9
        assignedTo: {
            type: String,
            default: null
        },
        analystNotes: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true // Tracks createdAt and updatedAt
    }
);

export const Incident = mongoose.model("Incident", incidentSchema);