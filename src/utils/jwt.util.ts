import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { AppError } from '../utils/appError.util';

// Add type definition for Request to include user property
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

// Interface for the payload of our JWT
interface JwtPayload {
    userId: string;
    tokenVersion: number;
    role: string;
}

// Function to get secret as buffer
const getSecretBuffer = (): Buffer => {
    return Buffer.from(process.env.JWT_SECRET || '', 'utf8');
};

// Function to generate a JWT
export const generateToken = (userId: string, role: string): string => {
    return jwt.sign(
        { userId, role },
        getSecretBuffer(),
        // Cast the expiresIn option to appropriate type
        { expiresIn: process.env.JWT_EXPIRE || '30d' } as jwt.SignOptions
    );
};

// Function to set JWT in cookie
export const setTokenCookie = (res: Response, token: string): void => {
    const cookieOptions = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const
    };

    res.cookie('jwt', token, cookieOptions);
};

// Function to clear JWT cookie
export const clearTokenCookie = (res: Response): void => {
    res.cookie('jwt', 'none', {
        expires: new Date(Date.now() + 5 * 1000), // 5 seconds
        httpOnly: true
    });
};

// Function to get JWT from request
export const getTokenFromRequest = (req: Request): string | null => {
    let token: string | null = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Get token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        // Get token from cookie
        token = req.cookies.jwt;
    }

    return token;
};

// Function to extract user data from JWT
export const extractUserFromToken = (token: string): { userId: string; role: string } => {
    const decoded = verifyToken(token);
    return { userId: decoded.userId, role: decoded.role };
};

// Middleware to attach user to request if JWT is valid
export const attachUserToRequest = (req: Request, res: Response, next: Function): void => {
    const token = getTokenFromRequest(req);

    if (token) {
        try {
            const decoded = verifyToken(token);
            req.user = { id: decoded.userId, role: decoded.role };
        } catch (error: any) {
            // If token is invalid, we don't throw an error, we just don't attach the user
        }
    }

    next();
};

// Function to refresh JWT
export const refreshToken = (oldToken: string): string => {
    const decoded = verifyToken(oldToken);
    return generateToken(decoded.userId, decoded.role);
};

export const signToken = (userId: string, role: string, tokenVersion: number): string => {
    return jwt.sign(
        { userId, role, tokenVersion },
        getSecretBuffer(),
        // Cast the expiresIn option to appropriate type
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' } as jwt.SignOptions
    );
};

export const verifyToken = (token: string): JwtPayload => {
    try {
        return jwt.verify(token, getSecretBuffer()) as JwtPayload;
    } catch (error) {
        throw new AppError('Invalid token', 401);
    }
};