const QualitySC = artifacts.require("QualitySC.sol");

contract("QualitySC", (accounts) => {
    let instance;

    const dataOwner = accounts[0];
    const dataUser    = accounts[1];
    const tokenId = 1; // Example token ID
    const tokenURI = "localhost:8080/ipfs/QmYymfKenBQWrYfi7MBtqTYLhzFJDQWbNJfVd6VpF3e6on"; // Example token URI

    beforeEach(async () => {
        instance = await QualitySC.new();
    });

    describe("requestAccess", () => {
        beforeEach(async () => {
            // Register the data owner and add data before testing access requests
            await instance.addUser (dataOwner, { from: dataOwner });
            await instance.addData(tokenId, tokenURI, { from: dataOwner });
        });

        it("should allow a Data User to request access to a specific token ID", async () => {
            const result = await instance.requestAccess(tokenId, { from: dataUser  });
            assert.equal(result.receipt.status, true, "Access request should be successful");
        });

        it("should emit AccessRequested event", async () => {
            const result = await instance.requestAccess(tokenId, { from: dataUser  });
            assert.equal(result.logs[0].event, "AccessRequested", "Event should be AccessRequested");
        });
    });

    describe("grantAccess", () => {
        beforeEach(async () => {
            await instance.addUser (dataOwner, { from: dataOwner });
            await instance.addData(tokenId, tokenURI, { from: dataOwner });
            await instance.requestAccess(tokenId, { from: dataUser  });
        });

        it("should allow the Data Owner to grant access to a specific token ID", async () => {
            const result = await instance.grantAccess(dataUser , tokenId, { from: dataOwner });
            assert.equal(result.receipt.status, true, "Access grant should be successful");
        });

        it("should emit AccessGranted event", async () => {
            const result = await instance.grantAccess(dataUser , tokenId, { from: dataOwner });
            assert.equal(result.logs[0].event, "AccessGranted", "Event should be AccessGranted");
        });

        it("should not allow non-owners to grant access", async () => {
            try {
                await instance.grantAccess(dataUser , tokenId, { from: accounts[2] }); // Non-owner
                assert.fail("Expected revert not received");
            } catch (error) {
                assert(error.message.includes("Only the data owner can grant access"), "Error message should contain 'Only the data owner can grant access'");
            }
        });
    });

    describe("revokeAccess", () => {
        beforeEach(async () => {
            await instance.addUser  (dataOwner, { from: dataOwner });
            await instance.addData(tokenId, tokenURI, { from: dataOwner });
            await instance.requestAccess(tokenId, { from: dataUser   });
            await instance.grantAccess(dataUser  , tokenId, { from: dataOwner });
        });

        it("should allow the Data Owner to revoke access to a specific token ID", async () => {
            const result = await instance.revokeAccess(dataUser  , tokenId, { from: dataOwner });
            assert.equal(result.receipt.status, true, "Access revoke should be successful");
        });

        it("should emit AccessRevoked event", async () => {
            const result = await instance.revokeAccess(dataUser  , tokenId, { from: dataOwner });
            assert.equal(result.logs[0].event, "AccessRevoked", "Event should be AccessRevoked");
        });

        it("should not allow non-owners to revoke access", async () => {
            try {
                await instance.revokeAccess(dataUser  , tokenId, { from: accounts[2] }); // Non-owner
                assert.fail("Expected revert not received");
            } catch (error) {
                assert(error.message.includes("Only the data owner can revoke access"), "Error message should contain 'Only the data owner can revoke access'");
            }
        });
    });
});