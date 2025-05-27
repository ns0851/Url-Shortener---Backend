import shortUrlModel from "../models/shorturl.model.js";

export const generateRandomId = async (length) => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
    let result = ""

    for(let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    const checkUrl = await shortUrlModel.findOne({short_url: result})

    if (checkUrl) {
        return generateRandomId(length);
    }

    return result
}


