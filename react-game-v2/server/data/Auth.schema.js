export const registerSchema = {
    type: 'object',
    properties: {
        nickname: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        passwordConfirm: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' }
    },
    required: ['email', 'password', 'passwordConfirm'],
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

export const updateSchema = {
    type: 'object',
    properties: {
        userId: { type: 'string' },
        nickname: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        passwordConfirm: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' }
    },
    required: ['userId'],
    additionalProperties: false,
}