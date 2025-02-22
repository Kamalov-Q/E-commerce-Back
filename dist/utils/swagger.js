"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const package_json_1 = require("../../package.json");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ecommerce Inventory API",
            version: package_json_1.version,
            description: "API for managing products in an ecommerce store",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: {
            bearerAuth: [],
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local development server",
            },
            {
                url: "https://e-commerce-back-fijy.onrender.com",
                description: "Production server",
            },
        ],
    },
    apis: ["./src/app/**/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function swaggerDocs(app, port) {
    //Swagger page
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    //Docs in JSON format
    app.get("/docs.json", (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.json(swaggerSpec);
    });
    console.log(`Swagger docs available at http://localhost:${port}/docs`);
}
exports.default = swaggerDocs;
