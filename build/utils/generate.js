"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateContainerName = void 0;
const generateContainerName = () => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.generateContainerName = generateContainerName;
