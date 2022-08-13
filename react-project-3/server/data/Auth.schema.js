// REGISTER
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

// LOGIN
export const loginSchema = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        password: { type: 'string' },
    },
    required: ['email', 'password'],
    additionalProperties: false,
}
