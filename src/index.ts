import express from "express";
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from "./server/index.js";
import fs from 'fs/promises'
import { createContext } from './server/context.js'
import { generateOpenApiDocument , createOpenApiExpressMiddleware} from 'trpc-to-openapi';


const app = express()

app.use(express.json())

const openapiDocument = generateOpenApiDocument(appRouter, {
    baseUrl: 'http://localhost:8000/api',
    title:'My TODO Server',
    version:'1.0.0'
})

fs.writeFile('./openapi-specification.json', JSON.stringify(openapiDocument))

app.get('/',(req,res)=>{
    return res.json({status:'Server running'})
})

app.get('/openapi.json',(req,res)=>{
    return res.json(openapiDocument)
})

app.use('/api', createOpenApiExpressMiddleware({
    router:appRouter,
    createContext
}))

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
)

app.listen(8000,()=> console.log(`Express server is running on port 8000`))