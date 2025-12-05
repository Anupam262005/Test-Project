import { asyncHandler } from "../utils/asyncHandler.js";
import { Log } from "../models/Log.model.js";
import { v4 as uuidv4 } from "uuid";
// New Import for Phase 5 & 7
import { correlateAndManageIncident } from "../services/incident.service.js";

export const monitorRequest = asyncHandler(async (req, res, next) => {
    const start = Date.now();
    const requestId = uuidv4();

    const contentLengthIn = req.get("content-length");
    const bytesIn = contentLengthIn ? parseInt(contentLengthIn, 10) : 0;

    const logData = {
        logId: requestId,
        timestamp: new Date(),
        sourceIP: req.ip || req.connection.remoteAddress,
        sourceType: "APP",
        userId: null, // will be filled in finish if req.user exists
        targetSystem: "Mini-SOC-Backend",
        endpoint: req.originalUrl,
        httpMethod: req.method,
        statusCode: 0, // will set in finish
        category: "REQUEST",
        eventType: "HTTP_REQUEST",
        severity: "LOW",
        classification: "INFO",
        attackVector: "NONE",
        details: {
            message: null,
            suspiciousFragment: null,
            username: req.body?.username || null,
            ports: [],
            bytesIn,
            bytesOut: 0,
            fileName: null,
            command: null,
            ruleId: null,
            patternMatched: null,
            tags: ["REQUEST_LOG"]
        }
    };

    // --- SQLi detection (Phase 4: Detection Engine) ---
    const bodyString = JSON.stringify(req.body || {}).toLowerCase();
    const sqliPatterns = ["' or '1'='1", "union select", "drop table"];

    let isAttack = false;
    let matchedPattern = null;

    for (const pattern of sqliPatterns) {
        if (bodyString.includes(pattern)) {
            isAttack = true;
            matchedPattern = pattern;
            break;
        }
    }

    if (isAttack) {
        logData.category = "SECURITY";
        logData.eventType = "SQLI_DETECTED";
        logData.severity = "HIGH";
        logData.classification = "CONFIRMED_ATTACK";
        logData.attackVector = "SQLI";
        logData.details.ruleId = "SQLI-001";
        logData.details.patternMatched = "SQLI_OR_1_EQ_1";
        logData.details.suspiciousFragment = matchedPattern;
        logData.details.tags.push("SQLI");
    }

    res.on("finish", async () => {
        const duration = Date.now() - start;

        // If JWT auth ran, we can pick the final userId here
        logData.userId = req.user?.id || null;

        logData.statusCode = res.statusCode;
        logData.details.message = `Request took ${duration}ms`;

        const contentLengthOut = res.get("Content-Length");
        if (contentLengthOut) {
            logData.details.bytesOut = parseInt(contentLengthOut, 10);
        }

        try {
            // PHASE 2 & 6: Save Log (Log Ingestion and Alert Generation)
            const createdLog = await Log.create(logData);

            // Trigger Correlation and Incident Management ONLY if it's a security event
            if (isAttack) {
                // PHASE 5 & 7: Threat Correlation & Incident Management
                await correlateAndManageIncident(createdLog);
            }

        } catch (error) {
            console.error("Failed to save monitoring log or manage incident:", error);
        }
    });

    next();
});