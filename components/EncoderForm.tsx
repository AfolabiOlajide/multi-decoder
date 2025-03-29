"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CaesarCipher, BinaryEncoding, MorseCode } from "@/utils/encoder";
import { URLJWT } from "@/utils/jwtHandler";

const EncoderForm = () => {
    const [text, setText] = useState("");
    const [key, setKey] = useState("");
    const [method, setMethod] = useState("caesar");
    const router = useRouter();

    const handleEncode = () => {
        let encoder;
        switch (method) {
            case "caesar":
                encoder = new CaesarCipher(parseInt(key) || 3);
                break;
            case "binary":
                encoder = new BinaryEncoding();
                break;
            case "morse":
                encoder = new MorseCode();
                break;
        }
        const encodedText = encoder?.encode(text) || "";

        const jwtToken = URLJWT.generateJWT(encodedText, key, method);

        router.push(`/decode?token=${jwtToken}`);
    };

    return (
        <div className="p-6 bg-gray-800 text-white rounded-lg">
            <select
                className="mb-4 p-2 w-full"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
            >
                <option value="caesar">Caesar Cipher</option>
                <option value="binary">Binary</option>
                <option value="morse">Morse Code</option>
            </select>
            <textarea
                className="w-full p-2 text-black"
                placeholder="Enter text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <input
                className="w-full p-2 mt-2 text-black"
                placeholder="Secret Key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
            />
            <button
                className="bg-blue-500 p-2 w-full mt-4"
                onClick={handleEncode}
            >
                Encode
            </button>
        </div>
    );
};

export default EncoderForm;
