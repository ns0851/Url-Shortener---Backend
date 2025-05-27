import { createShortWithoutUser, createCustomShortWithoutUser } from '../services/shortUrl.service.js';
import { checkCustomAlias } from '../dao/shortUrl.dao.js';
import dotenv from 'dotenv';

dotenv.config()

const app_url = process.env.APP_URL

export const createConstUrl = async (req,res) => {
    let {url} = req.body;
    if (url.includes("https")) {
        url = url;
    } else {
        url = `https://${url}`;
    }

    // const shortUrl = generatreRandomId(7);
    const short_url = await createShortWithoutUser(url);
    
    res.status(200).json({short_url: (app_url + short_url)})
}

export const createCustomUrl = async (req,res) => {
    let {url, customAlias} = req.body;
    if (url.includes("https")) {
        url = url;
    } else {
        url = `https://${url}`;
    }

    const check = await checkCustomAlias(customAlias);

    if (!check) {
        createCustomUrl(customAlias)
    }
    const short_url = await createCustomShortWithoutUser(url, customAlias);
    res.status(200).json({short_url: (app_url + short_url)})
}