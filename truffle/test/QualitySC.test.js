const QualitySC = artifacts.require("QualitySC");
const WaterNFT = artifacts.require("WaterNFT");
const OracleSC = artifacts.require("OracleSC");

contract("QualitySC", (accounts) => {
    let qualitySC;
    let waterNFT;
    let oracleSC;

    const owner = accounts[0];
    const user1 = accounts[1];
    const user2 = accounts[2];
    const tokenURI = "http://localhost:8080/ipfs/QmQ5zVrMsUmVKAGFkyuDmkeTbcHz4GVbkCEnrgbJn7rDVP";
    const tokenId = 1;

    beforeEach(async () => {
        waterNFT = await WaterNFT.new();
        oracleSC = await OracleSC.new();
        qualitySC = await QualitySC.new(waterNFT.address, oracleSC.address);
    });

    describe("User  Management", () => {
        it("should allow the owner to add a user", async () => {
            await qualitySC.addUser (user1, { from: owner });
            const isAuthorized = await qualitySC.isUserAuthorized(user1);
            assert.isTrue(isAuthorized, "User  should be authorized");
        });

        it("should allow the owner to remove a user", async () => {
            await qualitySC.addUser (user1, { from: owner });
            await qualitySC.removeUser (user1, { from: owner });
            const isAuthorized = await qualitySC.isUserAuthorized(user1);
            assert.isFalse(isAuthorized, "User  should be unauthorized");
        });

        it("should not allow non-owners to add or remove users", async () => {
            try {
                await qualitySC.addUser (user1, { from: user1 });
                assert.fail("Non-owner should not be able to add a user");
            } catch (error) {
                assert.include(error.message, "Only the owner can add users");
            }

            try {
                await qualitySC.removeUser (user1, { from: user1 });
                assert.fail("Non-owner should not be able to remove a user");
            } catch (error) {
                assert.include(error.message, "Only the owner can remove users");
            }
        });
    });

    describe("Data Management", () => {
        beforeEach(async () => {
            await qualitySC.addUser (user1, { from: owner });
        });

        it("should allow authorized users to upload data", async () => {
            await qualitySC.addData(tokenId, tokenURI, { from: user1 });
            const storedIPFS = await qualitySC.dataIPFS(tokenId);
            assert.equal(storedIPFS, tokenURI, "IPFS hash should match the uploaded data");
        });

        it("should emit DataUploaded event on data upload", async () => {
            const result = await qualitySC.addData(tokenId, tokenURI, { from: user1 });
            const event = result.logs[0].args;

            assert.equal(event.tokenId.toString(), tokenId.toString(), "Event tokenId should match");
            assert.equal(event.ipfsHash, tokenURI, "Event IPFS hash should match");
            assert.equal(event.owner, user1, "Event owner should match the uploader");
        });

        it("should not allow unauthorized users to upload data", async () => {
            try {
                await qualitySC.addData(tokenId, tokenURI, { from: user2 });
                assert.fail("Unauthorized user should not be able to upload data");
            } catch (error) {
                assert.include(error.message, "User  is not authorized");
            }
        });

        it("should allow data owners to remove their data", async () => {
            await qualitySC.addData(tokenId, tokenURI, { from: user1 });
            await qualitySC.removeData(tokenId, { from: user1 });
            const storedIPFS = await qualitySC.dataIPFS(tokenId);
            assert.equal(storedIPFS, "", "IPFS hash should be cleared after removal");
        });

        it("should not allow non-owners to remove data", async () => {
            await qualitySC.addData(tokenId, tokenURI, { from: user1 });
            try {
                await qualitySC.removeData(tokenId, { from: user2 });
                assert.fail("Non-owner should not be able to remove data");
            } catch (error) {
                assert.include(error.message, "Only the data owner can remove data");
            }
        });
    });

    describe("Access Management", () => {
        const tokenId = 1; // Example token ID
        const tokenURI = "https://example.com/data"; // Example token URI
        const user1 = accounts[1]; // Data owner
        const user2 = accounts[2]; // Data user
        const owner = accounts[0]; // Contract owner
    
        beforeEach(async () => {
            await qualitySC.addUser (user1, { from: owner });
            await qualitySC.addData(tokenId, tokenURI, { from: user1 });
        });
    
        it("should allow users to request access to data", async () => {
            await qualitySC.requestAccess(tokenId, { from: user2 });
            const requests = await qualitySC.accessRequests(user1);
            assert.equal(requests.length, 1, "There should be one access request");
            assert.equal(requests[0].requester, user2, "The requester should match the user");
            assert.isFalse(requests[0].granted, "Access should not be granted yet");
        });
    
        it("should allow data owners to grant access", async () => {
            await qualitySC.requestAccess(tokenId, { from: user2 });
            await qualitySC.grantAccess(user2, tokenId, { from: user1 });
            const requests = await qualitySC.accessRequests(user1);
            assert.isTrue(requests[0].granted, "Access should be granted");
        });
    
        it("should allow data owners to revoke access", async () => {
            await qualitySC.requestAccess(tokenId, { from: user2 });
            await qualitySC.grantAccess(user2, tokenId, { from: user1 });
            await qualitySC.revokeAccess(user2, tokenId, { from: user1 });
            const requests = await qualitySC.accessRequests(user1);
            assert.isFalse(requests[0].granted, "Access should be revoked");
        });
    
        it("should not allow non-owners to grant or revoke access", async () => {
            await qualitySC.requestAccess(tokenId, { from: user2 });
            try {
                await qualitySC.grantAccess(user2, tokenId, { from: user2 });
                assert.fail("Non-owner should not be able to grant access");
            } catch (error) {
                assert.include(error.message, "Only the data owner can grant access");
            }
    
            try {
                await qualitySC.revokeAccess(user2, tokenId, { from: user2 });
                assert.fail("Non-owner should not be able to revoke access");
            } catch (error) {
                assert.include(error.message, "Only the data owner can revoke access");
            }
        });
    });

    describe("Oracle Interaction", () => {
        beforeEach(async () => {
            await qualitySC.addUser (user1, { from: owner });
            await qualitySC.addData(tokenId, tokenURI, { from: user1 });
            await qualitySC.requestAccess(tokenId, { from: user2 });
            await qualitySC.grantAccess(user2, tokenId, { from: user1 });
        });

        it("should allow verification of content using the Oracle", async () => {
            await qualitySC.contentVerification(tokenId, { from: user2 });
            // Assuming the Oracle contract has a method to verify data
            // You would need to mock or implement the Oracle contract for this test
        });

        it("should retrieve the agreed value from the Oracle contract", async () => {
            const agreedValue = await qualitySC.getAgreedValue(tokenId);
            assert.isString(agreedValue, "Agreed value should be a string");
        });
    });
});