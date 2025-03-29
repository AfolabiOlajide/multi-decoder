import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET as string;

export class URLJWT {
    /**
     * Generates a JWT-encoded URL segment
     * @param data - The encoded message (e.g., Caesar, Morse, Binary)
     * @param key - The secret key provided by the user
     * @param method - Encoding method used
     * @returns Encoded JWT string
     */
    static generateJWT(data: string, key: string, method: string): string {
        const token = jwt.sign({ data, key, method }, SECRET_KEY, {
            expiresIn: "24h",
        });
        return token;
    }

    /**
     * Decodes and verifies the JWT token
     * @param token - The JWT string from the URL
     * @returns Decoded object or null if invalid
     */
    static decodeJWT(
        token: string
    ): { data: string; key: string; method: string } | null {
        try {
            const decoded = jwt.verify(token, SECRET_KEY) as {
                data: string;
                key: string;
                method: string;
            };
            return decoded;
        } catch (error) {
            console.error("Invalid or expired JWT:", error);
            return null;
        }
    }
}
