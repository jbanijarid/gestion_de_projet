import connectDb from "./src/config/db.js";
import express from 'express';
import router  from "./src/routes/index.js";
import { config } from "dotenv";
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import cors from 'cors';

config();
const port = process.env.PORT;

const app = express();
app.use(cors({
    origin: 'https://gestion-de-projet-3rzab875b-firasmessaoud5-gmailcom.vercel.app/' // Replace with your frontend domain
  }));
connectDb();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Contact REST API',
            description: "A REST API built with Express and MongoDB.",
            version: '0.1',
        },
        servers: [
            {
                url: `http://localhost:${port}/api`,
                description: 'Development server',
            },
        ],
    },
    apis: ["./src/routes/*.js"],
}

const openapiSpecification = swaggerJsDoc(options);

app.use(express.json())
app.use('/api', router);
app.use('/docs', serve, setup(openapiSpecification));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  });
