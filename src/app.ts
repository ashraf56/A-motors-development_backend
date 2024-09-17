
import express, { Request, Response } from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import router from './app/allroute/routes';
import noRoutefound from './app/middleware/notfound';
import globalErrorhandler from './app/middleware/globalErrorhandler';

const app = express()

app.use(cors({origin:['https://a-motors-development-backend.vercel.app'], credentials:true}))
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)


app.get('/', (req: Request, res: Response) => {
  res.send('Car rental service running..!')
})

app.use(globalErrorhandler)

app.use(noRoutefound)


export default app;