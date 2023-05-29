const mbHelper = require("../../shared/mountebank-helper");
const settings = require("../../shared/settings");
const panSuccessResponseTemplate = require("./response-template");

function panDetails() {
    const stubs = [
        {
            predicates: [{
                and: [
                    { equals: { method: "POST" } },
                    { startsWith: { path: "/pan" } }
                ]
            }],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: panSuccessResponseTemplate
                    },
                    _behaviors: {
                        lookup: [
                            {
                                key: {
                                    from: "body",
                                    using:{"method":"jsonpath","selector":"$..panNumber"},
                                    index:0
                                },
                                fromDataSource: {
                                    csv: {
                                        path: "data/pan.csv",
                                        keyColumn: "panNumber",
                                        delimiter:","
                                    }
                                },
                                into: "${row}",
                            },
                        ],
                        shellTransform: "node transformResponse.js panNumber"
                    }
                }
            ]
        }
    ];
    const imposter = {
        port: settings.pan_service_port,
        protocol: 'http',
        stubs: stubs
    };
    return mbHelper.postImposter(imposter);
}
module.exports = { panDetails };