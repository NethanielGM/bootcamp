export const registerSchema = {
    type: 'object',
    properties: {
        phone: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        passwordConfirm: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' }
    },
    required: ['phone', 'email', 'password', 'passwordConfirm', 'firstName', 'lastName'],
    additionalProperties: false,
}

export const loginSchema = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        password: { type: 'string' },
    },
    required: ['email', 'password'],
    additionalProperties: false,
}

export const dataReqSchema = {
    type: 'object',
    properties: {
        time: { type: 'string' },
        classType: { type: 'string' },
        maxParticipents: { type: 'number' },
        classType: { type: 'string' },
        duration: { type: 'number' },
        day: { type: 'number' },

    },
    required: ['time', 'classType', 'maxParticipents', 'classType', 'duration', 'day'],
    additionalProperties: false,
}