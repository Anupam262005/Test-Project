import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Incident } from "../models/Incident.model.js";
import { Log } from "../models/Log.model.js";
import { Blocklist } from "../models/Blocklist.model.js";
import mongoose from "mongoose";

/**
 * Get comprehensive system health and high-level stats for Admin Overview.
 * Route: GET /api/v1/admin/health
 */
const getSystemHealth = asyncHandler(async (req, res) => {
    // 1. System Status
    const dbStatus = mongoose.connection.readyState === 1 ? "UP" : "DOWN";

    // 2. Counters (Parallel execution for performance)
    const [
        activeIncidents,
        criticalIncidents,
        totalLogs24h,
        totalBlocks,
        recentLogs1h
    ] = await Promise.all([
        Incident.countDocuments({ status: { $in: ["OPEN", "IN_PROGRESS"] } }),
        Incident.countDocuments({ severity: "CRITICAL", status: { $in: ["OPEN", "IN_PROGRESS"] } }),
        Log.countDocuments({ timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }),
        Blocklist.countDocuments({ isActive: true }),
        Log.countDocuments({ timestamp: { $gte: new Date(Date.now() - 60 * 60 * 1000) } })
    ]);

    // 3. Top Attackers (Aggregation)
    // Identify top 5 source IPs from Security logs in last 24h
    const topAttackers = await Log.aggregate([
        {
            $match: {
                category: "SECURITY",
                timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
            }
        },
        { $group: { _id: "$sourceIP", count: { $sum: 1 }, country: { $first: "$geo.country" } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
    ]);

    const healthData = {
        system: {
            database: dbStatus,
            api: "UP", // Since this request reached us
            socket: "UNKNOWN" // Would need internal check
        },
        metrics: {
            activeIncidents,
            criticalIncidents,
            blockedIPs: totalBlocks,
            logsLastHour: recentLogs1h,
            logsLast24h: totalLogs24h,
            mttr: "45m" // Placeholder for Mean Time To Resolve calculation
        },
        topAttackers
    };

    return res.status(200).json(
        new ApiResponse(200, healthData, "System health data fetched successfully")
    );
});

export { getSystemHealth };
