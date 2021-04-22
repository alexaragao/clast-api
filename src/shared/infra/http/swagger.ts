// export const swaggerDocument = {
//   openapi: '3.0.1',
//   info: {
//     version: '1.0.0',
//     title: 'APIs Document',
//     description: 'your description here',
//     termsOfService: '',
//     contact: {
//       name: 'Fabricio',
//       email: '',
//       url: ''
//     },
//     license: {
//       name: 'Apache 2.0',
//       url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
//     },
//     tags: [
//       {
//         "name": "Login",
//         "description": "API for users in the system"
//       }
//     ],
//     host: 'localhost:3333',
//     basePath: '/',
//     consumes: [
//       "application/json"
//     ],
//     produces: [
//       "application/json"
//     ],
//     apis: [
//       './routes/*.ts'
//     ]
//   }
// }

const swaggerAutogen = require('swagger-autogen')();

const outputFile = './src/shared/infra/http/swagger_output.json';
const endpointsFiles = [
  './src/modules/logins/infra/http/routes/login.routes.ts',
  './src/modules/logins/infra/http/routes/sessions.routes.ts'
];

const doc = {
  info: {
      version: "1.0.0",
      title: "My API",
      description: "Documentation automatically generated by the <b>swagger.autogen</b> module."
  },
  host: "localhost:3333",
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
      {
          "name": "Login",
          "description": "Endpoints"
      }
  ],
  securityDefinitions: {
      api_key: {
          type: "apiKey",
          name: "api_key",
          in: "header"
      },
      petstore_auth: {
          type: "oauth2",
          authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
          flow: "implicit",
          scopes: {
              read_pets: "read your pets",
              write_pets: "modify pets in your account"
          }
      }
  },
  definitions: {
      User: {
          name: "Jhon Doe",
          age: 29,
          parents: {
              father: "Simon Doe",
              mother: "Marie Doe"
          },
          diplomas: [
              {
                  school: "XYZ University",
                  year: 2020,
                  completed: true,
                  internship: {
                      hours: 290,
                      location: "XYZ Company"
                  }
              }
          ]
      },
      AddUser: {
          $name: "Jhon Doe",
          $age: 29,
          about: ""
      }
  }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server.ts')
})
