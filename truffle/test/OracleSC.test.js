const OracleSC = artifacts.require("OracleSC");

contract("OracleSC", (accounts) => {
    let oracleSC;
    const oracle1 = accounts[1];
    const oracle2 = accounts[2];
    const oracle3 = accounts[3];

    beforeEach(async () => {
        oracleSC = await OracleSC.new();
    });

    describe("Oracle Registration", () => {
        it("should allow an oracle to register", async () => {
            await oracleSC.registerOracle({ from: oracle1 });
            const isRegistered = await oracleSC.oracles(oracle1);
            assert.isTrue(isRegistered, "Oracle should be registered");
        });

        it("should not allow the same oracle to register twice", async () => {
            await oracleSC.registerOracle({ from: oracle1 });
            try {
                await oracleSC.registerOracle({ from: oracle1 });
                assert.fail("Oracle should not be able to register twice");
            } catch (error) {
                assert.include(error.message, "Oracle already registered");
            }
        });
    });

    describe("Request Management", () => {
        it("should allow creating a new request", async () => {
            await oracleSC.createRequest("http://localhost:8080/ipfs/QmQ5zVrMsUmVKAGFkyuDmkeTbcHz4GVbkCEnrgbJn7rDVP", "value", { from: oracle1 });
            const request = await oracleSC.requests(0);
            assert.equal(request.urlToQuery, "http://localhost:8080/ipfs/QmQ5zVrMsUmVKAGFkyuDmkeTbcHz4GVbkCEnrgbJn7rDVP", "URL should match");
            assert.equal(request.attributeToFetch, "value", "Attribute should match");
        });

        it("should emit NewRequest event on request creation", async () => {
            const result = await oracleSC.createRequest("http://localhost:8080/ipfs/QmQ5zVrMsUmVKAGFkyuDmkeTbcHz4GVbkCEnrgbJn7rDVP", "value", { from: oracle1 });
            const event = result.logs[0].args;

            assert.equal(event.id.toString(), "0", "Event ID should match the request ID");
            assert.equal(event.urlToQuery, "http://localhost:8080/ipfs/QmQ5zVrMsUmVKAGFkyuDmkeTbcHz4GVbkCEnrgbJn7rDVP", "Event URL should match");
            assert.equal(event.attributeToFetch, "value", "Event attribute should match");
        });
    });

    describe("Updating Requests", () => {
        beforeEach(async () => {
            await oracleSC.registerOracle({ from: oracle1 });
            await oracleSC.registerOracle({ from: oracle2 });
            await oracleSC.createRequest("http://localhost:8080/ipfs/QmQ5zVrMsUmVKAGFkyuDmkeTbcHz4GVbkCEnrgbJn7rDVP", "value", { from: oracle1 });
        });

        it("should allow registered oracles to update requests", async () => {
            await oracleSC.updateRequest(0, "100", { from: oracle1 });
            await oracleSC.updateRequest(0, "100", { from: oracle2 });

            const request = await oracleSC.requests(0);
            assert.equal(request.agreedValue, "100", "Agreed value should match the updated value");
        });

        it("should not allow unregistered addresses to update requests", async () => {
            try {
                await oracleSC.updateRequest(0, "100", { from: accounts[4] });
                assert.fail("Unregistered address should not be able to update requests");
            } catch (error) {
                assert.include(error.message, "Only registered oracles can update requests");
            }
        });

        it("should require a minimum quorum to set the agreed value", async () => {
            await oracleSC.updateRequest(0, "100", { from: oracle1 });
            const request = await oracleSC.requests(0);
            assert.equal(request.agreedValue, "", "Agreed value should not be set yet");

            await oracleSC.updateRequest(0, "100", { from: oracle2 });
            assert.equal(request.agreedValue, "100", "Agreed value should be set after quorum is reached");
        });
    });

    describe("Retrieving Agreed Values", () => {
        beforeEach(async () => {
            await oracleSC.registerOracle({ from: oracle1 });
            await oracleSC.registerOracle({ from: oracle2 });
            await oracleSC.createRequest("http://localhost:8080/ipfs/QmQ5zVrMsUmVKAGFkyuDmkeTbcHz4GVbkCEnrgbJn7rDVP", "value", { from: oracle1 });
            await oracleSC.updateRequest(0, "100", { from: oracle1 });
            await oracleSC.updateRequest(0, "100", { from: oracle2 });
        });

        it("should allow retrieval of the agreed value", async () => {
            const agreedValue = await oracleSC.getAgreedValue(0);
            assert.equal(agreedValue, "100", "Agreed value should match the consensus value");
        });

        it("should verify the data retrieved by oracles", async () => {
            const isVerified = await oracleSC.verifyData(0, "100");
            assert.isTrue(isVerified, "Data should be verified as matching the agreed value");
        });

        it("should return false for incorrect verification", async () => {
            const isVerified = await oracleSC.verifyData(0, "200");
            assert.isFalse(isVerified, "Data should not be verified as it does not match the agreed value");
        });
    });
});