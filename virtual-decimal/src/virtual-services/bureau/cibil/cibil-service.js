const mbHelper = require("../../../shared/mountebank-helper");
const settings = require("../../../shared/settings");
const responseTemplate = require("./response-template");

function addService() {
  const stubs = [
    {
      predicates: [
        {
          and: [
            { equals: { method: "POST" } },
            { startsWith: { path: "/bureau/cibil/" } },
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
            body: responseTemplate.success,
          },
          _behaviors: {
            lookup: [
              {
                key: {
                  from: "path",
                  using: { method: "regex", selector: "/bureau/cibil/(.*)$" },
                  index: 1,
                },
                fromDataSource: {
                  csv: {
                    path: "data/cibil.csv",
                    keyColumn: "RqUID",
                  },
                },
                into: "${row}",
              },
            ],
            shellTransform:
              "node src/virtual-services/bureau/cibil/transformResponse.js RqUID",
          },
        },
      ],
    },
  ];

  const imposter = {
    port: settings.cibil_service_port,
    protocol: "http",
    stubs: stubs,
  };

  return mbHelper.postImposter(imposter);
}

module.exports = { addService };
