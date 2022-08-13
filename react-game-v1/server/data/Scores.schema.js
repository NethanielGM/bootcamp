const scoresSchema = {
    type: 'object',
    properties: {
        userId: { type: 'string' },
        score: { type: 'integer' },
    },
    required: ['userId', 'score'],
    additionalProperties: false,
}

export default scoresSchema
