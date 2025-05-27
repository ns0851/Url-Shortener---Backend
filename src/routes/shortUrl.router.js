import express from 'express';
import { createConstUrl, createCustomUrl } from '../controllers/shortUrl.controller.js';
import { redirectUrlDao } from '../dao/shortUrl.dao.js';
import { authMiddleware } from '../middleware/auth.middleware.js';


const router = express.Router();

router.post('/', createConstUrl)
router.post('/custom', authMiddleware, createCustomUrl)


router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const redirect = await redirectUrlDao(id)
    if (redirect.includes("http")) {
        res.redirect(redirect)
    } else {
        res.status(404).send(redirect)
    }
    
})

export default router;