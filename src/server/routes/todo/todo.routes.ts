import { z } from 'zod'
import {router , publicProcedure } from '../../trpc.js'

export const todoRouter = router({
    getAllTodos:publicProcedure
    .input(z.undefined())
    .output()
    .query(()=>{

    })
})