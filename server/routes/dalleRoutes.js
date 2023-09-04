import express from 'express'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

import Post from '../mongodb/models/post.js'

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

router.route('/').get((req, res) => {
  res.send('Hello from DALL-E')
})
router.route('/test-retrieve').get(async (req, res) => {
  try {
    const response = await openai.retrieveModel("text-davinci-003");
    console.log('This is the response from retrieveModel: ')
    console.log(response);
    res.send('Hello from DALL-E TEST' + (response))

  } catch (error) {
    console.log('dalleRoute ERROR: ' + error);
    res.status(500).send(error?.response.data.error.message);
  }
})
router.route('/test-create-image').get(async (req, res) => {
  try {
    res.send('Hello from DALL-E TEST CREATE IMAGE')
    const prompt = "synthwave aeroplane";
    console.log('This is the prompt: ' + prompt);

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '256x256',
      response_format: 'b64_json', // default to 'url'
    })
    // const image = aiResponse.data.data[0].b64_json;
    // res.status(200).json({photo: image});
    // res.status(200)
    
    console.log('This is aiResponse keys: ')
    console.log(Object.keys(aiResponse))
    console.log('This should be the data keys inside: ')
    console.log(Object.keys(aiResponse.data))
    console.log('This should be the data inside: ')
    console.log(aiResponse.data)
    /*
This should be the data inside:
{
  created: 1685578560,
  data: [
    {
      url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-VIaGvV7L914QWnv7BiOHY2mn/user-RYrCHOLFfJONNcGYrZFmefSc/img-2Phtat73QhsdKsE6CIPMigZV.png?st=2023-05-31T23%3A16%3A00Z&se=2023-06-01T01%3A16%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-31T20%3A31%3A33Z&ske=2023-06-01T20%3A31%3A33Z&sks=b&skv=2021-08-06&sig=jOiQoaEO1aiyxlXZ0D10P4CemSH1Niqesg3EgsnbmBQ%3D'
    }
  ]
}
    */
    console.log('This should be the data.data inside: ')
    console.log(aiResponse.data.data)
    /**
This should be the data.data inside:
[
  {
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-VIaGvV7L914QWnv7BiOHY2mn/user-RYrCHOLFfJONNcGYrZFmefSc/img-2Phtat73QhsdKsE6CIPMigZV.png?st=2023-05-31T23%3A16%3A00Z&se=2023-06-01T01%3A16%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-31T20%3A31%3A33Z&ske=2023-06-01T20%3A31%3A33Z&sks=b&skv=2021-08-06&sig=jOiQoaEO1aiyxlXZ0D10P4CemSH1Niqesg3EgsnbmBQ%3D'
  }
]
     */
    // console.log('This should be the data.data[0] inside: ')
    // console.log(aiResponse.data.data[0].b64_json)

  } catch (error) {
    console.log('dalleRoute ERROR: ' + error);
    // res.status(500).send(error?.response.data.error.message);
  }
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log('This is prompt: ' + prompt);
    // res.json({answer: 'Hello from DALL-E'}) // all 3 ways to return data to caller
    // res.status(200).send({'url': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-VIaGvV7L914QWnv7BiOHY2mn/user-RYrCHOLFfJONNcGYrZFmefSc/img-2Phtat73QhsdKsE6CIPMigZV.png?st=2023-05-31T23%3A16%3A00Z&se=2023-06-01T01%3A16%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-31T20%3A31%3A33Z&ske=2023-06-01T20%3A31%3A33Z&sks=b&skv=2021-08-06&sig=jOiQoaEO1aiyxlXZ0D10P4CemSH1Niqesg3EgsnbmBQ%3D', });
    // return res.json({url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-VIaGvV7L914QWnv7BiOHY2mn/user-RYrCHOLFfJONNcGYrZFmefSc/img-2Phtat73QhsdKsE6CIPMigZV.png?st=2023-05-31T23%3A16%3A00Z&se=2023-06-01T01%3A16%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-31T20%3A31%3A33Z&ske=2023-06-01T20%3A31%3A33Z&sks=b&skv=2021-08-06&sig=jOiQoaEO1aiyxlXZ0D10P4CemSH1Niqesg3EgsnbmBQ%3D'})

    // // what the data probably looks like
    // res.json({data: {
    //   data: [
    //     {
    //       url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-VIaGvV7L914QWnv7BiOHY2mn/user-RYrCHOLFfJONNcGYrZFmefSc/img-QdWHAz17MR3RyNpTJygBsaO6.png?st=2023-06-04T01%3A37%3A20Z&se=2023-06-04T03%3A37%3A20Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-03T20%3A56%3A53Z&ske=2023-06-04T20%3A56%3A53Z&sks=b&skv=2021-08-06&sig=0tJw%2B1/Igk9Q8R3rrQs8qCPXp1z0MdoRRaUQn9RhN9k%3D'
    //     }
    //   ]
    // }})

    
    // tutorial code WORKS, will generate new image
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '256x256',
      // size: '1024x1024',
      response_format: 'b64_json', // default to 'url'
    })
    // res.json({data: aiResponse.data})
    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({data: aiResponse.data, photo: image});
    console.log('This should be the data.data: ')
    console.log(aiResponse.data.data)
  } catch (error) {
    console.log('dalleRoute ERROR: ' + error);
    res.status(500).send(error?.response.data.error.message);
  } finally {
    
  }
})

/**
 * 
 */

export default router;