export const parkingSpotSchema = {
    type: 'object',
    properties: {
        userId: { type: 'string' },
        alt: { type: 'string' },
        lon: { type: 'string' },
        time: { type: 'string' },
    },
    required: ['userId', 'alt', 'lon', 'time'],
    additionalProperties: false,
}
