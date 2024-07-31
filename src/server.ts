import fastify from 'fastify'

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastifyCors from '@fastify/cors';

import { serializerCompiler, validatorCompiler, jsonSchemaTransform, ZodTypeProvider } from "fastify-type-provider-zod";
import { createEvent } from './routes/create-event';
import { registerForEvent } from './routes/register-for-event';
import { getEvent } from './routes/get-event';
import { getAttendeeBadge } from './routes/get-attendee-badge';
import { CheckIn } from './routes/check-ins';
import { getEventAttendees } from './routes/get-event-attendees';
import { errorHandler } from './error-handler';



export const app = fastify().withTypeProvider<ZodTypeProvider>()


app.register(fastifyCors, {
    origin: '*', // em produção isso precisa ter exatamente o endereço que vai acessar
})

app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: 'pass.in',
            description: 'especificações da API para o Frontend', 
            version: '1.0.0'
        },
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)


app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(CheckIn)
app.register(getEventAttendees)

app.setErrorHandler(errorHandler)

app.listen({ port: 3333, host: '0.0.0' }).then(() => {
    console.log('Server running')
})