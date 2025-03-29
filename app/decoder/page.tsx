"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CaesarCipher, BinaryEncoding, MorseCode } from "@/utils/encoder";
import { URLJWT } from "@/utils/jwtHandler";

const Decoder = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [decodedText, setDecodedText] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            setError("No token found.");
            return;
        }

        const decodedData = URLJWT.decodeJWT(token);
        if (!decodedData) {
            setError("Invalid or expired token.");
            return;
        }

        const { data, key, method } = decodedData;

        let decoder;
        switch (method) {
            case "caesar":
                decoder = new CaesarCipher(parseInt(key) || 3);
                break;
            case "binary":
                decoder = new BinaryEncoding();
                break;
            case "morse":
                decoder = new MorseCode();
                break;
        }

        setDecodedText(decoder?.decode(data) || "Decoding error.");
    }, [token]);

    return (
        <div className="p-6 bg-gray-800 text-white rounded-lg">
            Decoded: {decodedText}
            <div className="error">{error}</div>
        </div>
    );
};

export default Decoder;
