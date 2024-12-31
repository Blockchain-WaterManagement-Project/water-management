const OracleSC = artifacts.require("OracleSC");

contract("OracleSC", (accounts) => {
    let oracleInstance;

    const oracle1 = accounts[1];
    const oracle2 = accounts[2];
    const oracle3 = accounts[3];

    beforeEach(async () => {
        oracleInstance = await OracleSC.new();
    });

    it("should create a new request", async () => {
        const urlToQuery = "http://example.com/api";
        const attributeToFetch = "data";

        // Create a new request
        const result = await oracleInstance.createRequest(urlToQuery, attributeToFetch, { from: oracle1 });

        // Check if the event was emitted
        const event = result.logs[0].args;
        assert.equal(event.urlToQuery, urlToQuery, "URL to query does not match");
        assert.equal(event.attributeToFetch, attributeToFetch, "Attribute to fetch does not match");

        // Check if the request was created
        const request = await oracleInstance.requests(0);
        assert.equal(request.id.toString(), "0", "Request ID should be 0");
        assert.equal(request.urlToQuery, urlToQuery, "Request URL does not match");
        assert.equal(request.attributeToFetch, attributeToFetch, "Request attribute does not match");
    });

    it("should update a request with oracle votes", async () => {
        const urlToQuery = "http://example.com/api";
        const attributeToFetch = "data";
        const valueRetrieved = "some value";

        // Create a new request
        await oracleInstance.createRequest(urlToQuery, attributeToFetch, { from: oracle1 });

        // Update the request with the first oracle
        await oracleInstance.updateRequest(0, valueRetrieved, { from: oracle1 });

        // Check if the answer was stored
        const request = await oracleInstance.requests(0);
        assert.equal(request.answers[0], valueRetrieved, "The answer should be stored in the first slot");

        // Update the request with the second oracle
        await oracleInstance.updateRequest(0, valueRetrieved, { from: oracle2 });

        // Check if the agreed value is still empty
        const updatedRequest = await oracleInstance.requests(0);
        assert.equal(updatedRequest.agreedValue, "", "Agreed value should still be empty");

        // Update the request with the third oracle
        await oracleInstance.updateRequest(0, valueRetrieved, { from: oracle3 });

        // Check if the agreed value is now set
        const finalRequest = await oracleInstance.requests(0);
        assert.equal(finalRequest.agreedValue, valueRetrieved, "Agreed value should match the retrieved value");
    });

    it("should not allow the same oracle to vote twice", async () => {
        const urlToQuery = "http://example.com/api";
        const attributeToFetch = "data";
        const valueRetrieved = "some value";

        // Create a new request
        await oracleInstance.createRequest(urlToQuery, attributeToFetch, { from: oracle1 });

        // First vote
        await oracleInstance.updateRequest(0, valueRetrieved, { from: oracle1 });

        // Attempt to vote again
        try {
            await oracleInstance.updateRequest(0, valueRetrieved, { from: oracle1 });
            assert.fail("The oracle should not be able to vote twice");
        } catch (error) {
            assert.include(error.message, "revert", "Expected revert error not received");
        }
    });
});