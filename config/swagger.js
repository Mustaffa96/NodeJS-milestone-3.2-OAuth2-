const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'OAuth2 Authentication API',
            version: '1.0.0',
            description: 'API documentation for OAuth2 authentication system',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        googleId: { type: 'string' },
                        email: { type: 'string' },
                        displayName: { type: 'string' },
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        profilePhoto: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        isAuthenticated: { type: 'boolean' },
                        user: {
                            $ref: '#/components/schemas/User'
                        }
                    }
                }
            },
            securitySchemes: {
                sessionAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'connect.sid'
                }
            }
        }
    },
    apis: ['./routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;
