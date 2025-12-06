import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const analystSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['analyst'],
        default: 'analyst',
        immutable: true
    },
    assignedIncidents: [{
        type: String // Incident IDs
    }],
    specialization: {
        type: String, // e.g., 'Forensics', 'Network', 'Triage'
        default: 'General'
    },
    refreshToken: {
        type: String
    },
    lastLogin: {
        type: Date
    }
}, {
    timestamps: true
});

analystSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

analystSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

analystSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET || "access-token-secret",
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d"
        }
    )
}

analystSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret",
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d"
        }
    )
}

export const Analyst = mongoose.model('Analyst', analystSchema);
