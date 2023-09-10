import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
    apiKey:   process.env.OPENAI_AI_KEY,          //pass in the openai api key
});

const openai = new OpenAIApi(config); //utilize the config, we merge it with our instance of our openai api so that the api will generate images for me



router.route('/').get((req, res) => {
    res.status(200).json({message: "hello from pixxai"})
})

//route to pass the prompt from frontend to server

router.route('/').post(async (req, res) => {
    try{
        const prompt = req.body;

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });

        const image = response.data.data[0].b64_json;

        res.status(200).json({photo: image});

    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Something went wrong'})
    }
})

export default router