import { Express, Request, Response } from "express"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { version } from "../../package.json"

const options: swaggerJsdoc.Options = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
        servers: [{ url: '/api/v1' }],
        openapi: "3.0.0",
        info: {
            title: "SmartHome API Docs",
            version
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            }
        ]
    },
    apis: ["src/modules/router.ts", "./src/models/*/*.schema.ts", "./src/models/*/*.router.ts" ]
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDoc(app: Express, port: number) {
    // Swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    // Doc in JSON format
    app.get('docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })

    console.log(`API documentation available at http://localhost:${port}/docs`)
}

export default swaggerDoc
