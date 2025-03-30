"use client";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import { CaesarCipher, BinaryEncoding, MorseCode } from "@/utils/encoder";
// import { URLJWT } from "@/utils/jwtHandler";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Switch } from "@heroui/switch";

const EncoderForm = () => {
    const [text, setText] = useState("");
    const [key, setKey] = useState("");
    const [method, setMethod] = useState("caesar");
    // const router = useRouter();
    const [encodedText, setEncodedText] = useState("");
    const [decodedText, setDecodedText] = useState("");
    const [mode, setMode] = useState("encode");

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

        if (mode === "encode") {
            const encodedText = encoder?.encode(text) || "";
            setEncodedText(encodedText);
        } else {
            const decodedText = encoder?.decode(text) || "";
            setDecodedText(decodedText);
        }

        // const jwtToken = URLJWT.generateJWT(encodedText, key, method);

        // router.push(`/decode?token=${jwtToken}`);
    };

    const handleClear = () => {
        setText("");
        setKey("");
        setMethod("caesar");
        setEncodedText("");
        setDecodedText("");
    };

    return (
        <div className="">
            {/* switch */}
            <div className="switch flex items-center mb-5">
                <Switch
                    onValueChange={(isSwitched) =>
                        setMode(isSwitched ? "decode" : "encode")
                    }
                />{" "}
                <span className="ml-2 font-bold capitalize">{mode}</span>
            </div>
            {/* form */}
            <div className="form">
                <Select
                    label={`${
                        mode === "encode" ? "Encoding" : "Decoding"
                    } Method`}
                    className="w-full"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                >
                    <SelectItem key="caesar">Caesar Cipher</SelectItem>
                    <SelectItem key="binary">Binary</SelectItem>
                    <SelectItem key="morse">Morse Code</SelectItem>
                </Select>

                {method === "caesar" && (
                    <Input
                        className="w-full mt-2 text-black"
                        placeholder="No. of shifts (default 3)"
                        label="Shifts"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                )}
                <Textarea
                    className="w-full text-black mt-4"
                    placeholder={`${
                        mode === "encode" ? "Enter Text" : "Enter Coded Text"
                    }`}
                    value={text}
                    label={`${mode === "encode" ? "Text" : "Coded Text"}`}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button
                    className="p-[1rem] md:p-[2rem] w-full mt-4 text-[1rem] md:text-[1.5rem] font-bold"
                    color="primary"
                    variant="flat"
                    onClick={handleEncode}
                >
                    {mode === "encode" ? "Encode" : "Decode"}
                </Button>
            </div>
            {/* encoded text */}
            {encodedText && mode === "encode" && (
                <Card className="mt-[2rem]">
                    <CardHeader className="text-[1.2rem] font-bold flex justify-between">
                        <span>Encoded Text</span>
                        <Button size="sm" radius="full" onPress={handleClear}>
                            clear
                        </Button>
                    </CardHeader>
                    <Divider />
                    <CardBody className="my-6">
                        <p className="font-semibold text-[1.2rem]">
                            {encodedText}
                        </p>
                    </CardBody>
                </Card>
            )}
            {/* decoded text */}
            {decodedText && mode === "decode" && (
                <Card className="mt-[2rem]">
                    <CardHeader className="text-[1.2rem] font-bold flex justify-between">
                        <span>Decoded Text</span>
                        <Button size="sm" radius="full" onPress={handleClear}>
                            clear
                        </Button>
                    </CardHeader>
                    <Divider />
                    <CardBody className="my-6">
                        <p className="font-semibold text-[1.2rem]">
                            {decodedText}
                        </p>
                    </CardBody>
                </Card>
            )}
        </div>
    );
};

export default EncoderForm;
