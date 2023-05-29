const mbHelper = require("../../shared/mountebank-helper");
const settings = require("../../shared/settings");
const responseTemplate = require("./response-template");

function addService() {
  const stubs = [
    {
      predicates: [
        {
          and: [
            { equals: { method: "GET" } },
            { startsWith: { path: "/customers/" } },
          ],
        },
      ],
      responses: [
        {
          is: {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: responseTemplate,
          },
          _behaviors: {
            lookup: [
              {
                key: {
                  from: "path",
                  using: { method: "regex", selector: "/customers/(.*)$" },
                  index: 1,
                },
                fromDataSource: {
                  csv: {
                    path: "data/customers.csv",
                    keyColumn: "id",
                  },
                },
                into: "${row}",
              },
            ],
            shellTransform: "node transformResponse.js id",
          },
        },
      ],
    },
  ];

  const imposter = {
    port: settings.customer_service_get_port,
    protocol: "http",
    stubs: stubs,
  };

  return mbHelper.postImposter(imposter);
}

function postService() {
  const stubs = [
    {
      predicates: [
        {
          and: [
            { equals: { method: "POST" } },
            { startsWith: { path: "/customers/" } },
          ],
        },
      ],
      responses: [
        {
          is: {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: responseTemplate,
          },
          _behaviors: {
            lookup: [
              {
                key: {
                  from: "path",
                  using: { method: "regex", selector: "/customers/(.*)$" },
                  index: 1,
                },
                fromDataSource: {
                  csv: {
                    path: "data/customers.csv",
                    keyColumn: "id",
                  },
                },
                into: "${row}",
              },
            ],
            shellTransform: "node transformResponse.js id",
          },
        },
      ],
    },
  ];

  const imposter = {
    port: settings.customer_service_post_port,
    protocol: "http",
    stubs: stubs,
  };

  return mbHelper.postImposter(imposter);
}

module.exports = { addService, postService };
