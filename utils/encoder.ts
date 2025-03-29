export abstract class EncoderDecoder {
    abstract encode(text: string): string;
    abstract decode(text: string): string;
}

export class CaesarCipher extends EncoderDecoder {
    shift: number;
    constructor(shift: number = 3) {
        super();
        this.shift = shift;
    }

    private shiftChar(char: string, shiftValue: number): string {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90)
            return String.fromCharCode(
                ((((code - 65 + shiftValue) % 26) + 26) % 26) + 65
            );
        if (code >= 97 && code <= 122)
            return String.fromCharCode(
                ((((code - 97 + shiftValue) % 26) + 26) % 26) + 97
            );
        return char;
    }

    encode(text: string): string {
        return text
            .split("")
            .map((char) => this.shiftChar(char, this.shift))
            .join("");
    }

    decode(text: string): string {
        return text
            .split("")
            .map((char) => this.shiftChar(char, -this.shift))
            .join("");
    }
}

export class BinaryEncoding extends EncoderDecoder {
    private trie: { [char: string]: string } = {};
    private reverseTrie: { [binary: string]: string } = {};

    constructor() {
        super();
        for (let i = 32; i <= 126; i++) {
            const char = String.fromCharCode(i);
            const binary = i.toString(2);
            this.trie[char] = binary;
            this.reverseTrie[binary] = char;
        }
    }

    encode(text: string): string {
        return text
            .split("")
            .map((char) => this.trie[char] || char)
            .join(" ");
    }

    decode(text: string): string {
        return text
            .split(" ")
            .map((binary) => this.reverseTrie[binary] || "?")
            .join("");
    }
}

export class MorseCode extends EncoderDecoder {
    private morseDict: { [char: string]: string } = {
        A: ".-",
        B: "-...",
        C: "-.-.",
        D: "-..",
        E: ".",
        F: "..-.",
    };

    private reverseDict: { [code: string]: string } = Object.fromEntries(
        Object.entries(this.morseDict).map(([k, v]) => [v, k])
    );

    encode(text: string): string {
        return text
            .toUpperCase()
            .split("")
            .map((char) => this.morseDict[char] || char)
            .join(" ");
    }

    decode(text: string): string {
        return text
            .split(" ")
            .map((code) => this.reverseDict[code] || "?")
            .join("");
    }
}
