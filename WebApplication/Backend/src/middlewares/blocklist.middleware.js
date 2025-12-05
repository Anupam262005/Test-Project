import { isIPBlocked } from '../services/containment.service.js';
// Removed ApiError import as middleware handles its own response

/**
 * PHASE 10: Enforces the IP Blocklist using the Redis-based service.
 */
export const blocklistEnforcer = async (req, res, next) => {
    // Get the client IP (using the same logic as in monitorRequest)
    const clientIP = req.ip || req.connection.remoteAddress;

    // Check Redis for blocklist status
    const isBlocked = await isIPBlocked(clientIP);

    if (isBlocked) {
        console.warn(`[BLOCK] Request from blocked IP: ${clientIP}`);

        // Block the request with a standard 403 Forbidden error
        return res.status(403).json({
            success: false,
            message: "Access Denied: Your IP address has been flagged for security violations."
        });
    }

    next();
};