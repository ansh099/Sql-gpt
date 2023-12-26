import express, {Application, Request, Response} from "express"
import cors from "cors"
// import { Configuration, OpenAIApi } from "openai"
import OpenAI from 'openai';



const PORT: number = 8000
const app : Application = express()
app.use(cors())
app.use(express.json())

const API_KEY: string = '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'
const openai = new OpenAI({
    apiKey: API_KEY,
  });
// const configuration = new Configuration({
//     // organization: 'org-eAAeL87uZ1bJ5oQxb0hTTI9G',
//     apiKey: API_KEY
//     // apiKey: process.env.OPENAI_API_KEY
// })
// const openai = new OpenAIApi(configuration)
app.post("/completions", async(req: Request, res: Response) =>{
    try{
       const completion =  await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user", 
                    content: "Create a SQL request to " + req.body.message}]
       })
       res.send(completion.choices[0].message)
    }catch(error){
        console.error(error)
        res.status(500).send('Server Error')
    }

})
app.listen(PORT, () => console.log('Your server is running on PORT $', PORT))
