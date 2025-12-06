import { Admin } from '../models/Admin.model.js';
import { Analyst } from '../models/Analyst.model.js';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const generateAccessAndRefereshTokens = async (user) => {
    try {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token");
    }
};

export const register = asyncHandler(async (req, res) => {
    const { username, password, role } = req.body;

    // Determine model based on role
    const targetRole = role === 'admin' ? 'admin' : 'analyst';
    const Model = targetRole === 'admin' ? Admin : Analyst;

    // Check if user already exists
    const existingUser = await Model.findOne({ username });
    if (existingUser) {
        throw new ApiError(400, "Username already exists");
    }

    // Create new user
    const user = await Model.create({
        username,
        password,
        role: targetRole
    });

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user);

    const options = {
        httpOnly: true,
        secure: true
    };

    res.status(201)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                201,
                {
                    user: {
                        _id: user._id,
                        username: user.username,
                        role: user.role
                    },
                    accessToken,
                    refreshToken
                },
                "User registered successfully"
            )
        );
});

export const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new ApiError(400, "Username and password are required");
    }

    // Check Analyst first
    let user = await Analyst.findOne({ username });

    // If not found, check Admin
    if (!user) {
        user = await Admin.findOne({ username });
    }

    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user);

    const options = {
        httpOnly: true,
        secure: true
    };

    res.status(200)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: {
                        _id: user._id,
                        username: user.username,
                        role: user.role
                    },
                    accessToken,
                    refreshToken
                },
                "User logged in successfully"
            )
        );
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret"
        );

        // Try to find user in both collections
        let user = await Analyst.findById(decodedToken?._id);
        if (!user) {
            user = await Admin.findById(decodedToken?._id);
        }

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true
        };

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefereshTokens(user);

        res.status(200)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken: newRefreshToken
                    },
                    "Access token refreshed"
                )
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

export const getCurrentUser = asyncHandler(async (req, res) => {
    const user = req.user;
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user: {
                    _id: user._id,
                    username: user.username,
                    role: user.role
                }
            },
            "User fetched successfully"
        )
    );
});
