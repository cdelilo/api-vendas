import 'reflect-metadata'
import 'express-async-errors'
import 'dotenv/config'
import { errors } from 'celebrate'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'

import upload from '@config/upload'
import AppError from '@shared/errors/AppError'
import '@shared/infra/typeorm'
import '@shared/container'

import rateLimiter from './middlewares/rateLimiter'
import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(rateLimiter)

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`))
app.use(routes)

app.use(errors())

app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            })
        }

        return response.status(500).json({
            status: 'error',
            message: `Internal server error - ${error.message}`,
        })
    },
)

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}! 🏆`)
})
