const OracleSC = artifacts.require("OracleSC"); // Replace with your contract name

contract("OracleSC", (accounts) => {
    let instance;
    const oracle1 = accounts[1];
    const oracle2 = accounts[2];
    const oracle3 = accounts[3];

    beforeEach(async () => {
        instance = await OracleSC.new(); // Deploy a new instance before each test
    });

    // Tests for creating a request
    describe("Creating a Request", () => {
        it("should create a new request", async () => {
            const urlToQuery = "http://localhost:3001/2";
            const attributeToFetch = "name";

            const result = await instance.createRequest(urlToQuery, attributeToFetch, { from: oracle1 });

            // Check if the event was emitted
            const event = result.logs[0].event;
            assert.equal(event, "NewRequest", "NewRequest event was not emitted");

            // Check the request details
            const request = await instance.requests(0); // Assuming requests is an array
            assert.equal(request.id.toString(), "0", "Request ID should be 0");
            assert.equal(request.urlToQuery, urlToQuery, "URL to query does not match");
            assert.equal(request.attributeToFetch, attributeToFetch, "Attribute to fetch does not match");
        });
    });

    // Tests for updating a request
    describe("Updating a Request", () => {
        it("should update a request with a new value", async () => {
            const urlToQuery = "http://localhost:3001/2";
            const attributeToFetch = "name";
            await instance.createRequest(urlToQuery, attributeToFetch, { from: oracle1 });

            const valueRetrieved = "newValue";

            // Update the request
            const result = await instance.updateRequest(0, valueRetrieved, { from: oracle1 });

            // Check if the event was emitted
            const event = result.logs[0].event;
            assert.equal(event, "UpdateRequest", "UpdateRequest event was not emitted");

            // Check the updated request details
            const request = await instance.requests(0);
            assert.equal(request.agreedValue, valueRetrieved, "Agreed value should match the retrieved value");
        });

        it("should not allow an oracle to vote more than once", async () => {
            const urlToQuery = "http://localhost:3001/2";
            const attributeToFetch = "name";
            await instance.createRequest(urlToQuery, attributeToFetch, { from: oracle1 });

            const valueRetrieved = "William";
            await instance.updateRequest(0, valueRetrieved, { from: oracle1 }); // First vote

            // Attempt to vote again
            await instance.updateRequest(0, valueRetrieved, { from: oracle1 }); // Second vote

            // Check the updated request details
            const request = await instance.requests(0);
            assert.equal(request.answers[0], valueRetrieved, "First answer should match the retrieved value");
            assert.equal(request.answers[1], "", "Second answer should still be empty");
        });

        it("should require a minimum quorum to agree on a value", async () => {
            const urlToQuery = "http://localhost:3001/2";
            const attributeToFetch = "name";
            await instance.createRequest(urlToQuery, attributeToFetch, { from: oracle1 });

            const valueRetrieved = "william";
            await instance.updateRequest(0, valueRetrieved, { from: oracle1 }); // First vote
            await instance.updateRequest(0, valueRetrieved, { from: oracle2 }); // Second vote

            // Check that the agreed value is still empty if minQuorum is not reached
            const request = await instance.requests(0);
            assert.equal(request.agreedValue, "", "Agreed value should still be empty if minQuorum is not reached");
        });
    });
});