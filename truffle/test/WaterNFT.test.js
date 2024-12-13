const WaterNFT = artifacts.require("WaterNFT");

contract("WaterNFT", (accounts) => {
    let waterNFT;
    const owner = accounts[0];
    const recipient = accounts[1];
    const tokenURI = "http://localhost:8080/ipfs/QmQ5zVrMsUmVKAGFkyuDmkeTbcHz4GVbkCEnrgbJn7rDVP";
    const tokenURI2 = "http";
    const invalidTokenId = 999; // Assuming this token ID does not exist

    beforeEach(async () => {
        waterNFT = await WaterNFT.new();
    });

    describe("MintNFT Function", () => {
        it("should mint a new NFT successfully", async () => {
            const tokenId = await waterNFT.mintNFT(recipient, tokenURI, { from: owner });
            assert.equal(tokenId.logs[0].args.tokenId.toString(), "1", "Token ID should be 1");
            const balance = await waterNFT.balanceOf(recipient);
            assert.equal(balance.toString(), "1", "Recipient should own one NFT");
        });

        it("should fail to mint NFT with invalid recipient address", async () => {
            try {
                const tokenId = await waterNFT.mintNFT("0x0000000000000000000000000000000000000000", tokenURI, { from: owner });
                assert.fail("Expected revert not received");
            } catch (error) {
                assert(error.message.includes("Invalid recipient address: cannot be zero address"), "Expected revert error not received");
            }
        });

        it("should fail to mint NFT with empty token URI", async () => {
            try {
                await waterNFT.mintNFT(recipient, "", { from: owner });
                assert.fail("Expected revert not received");
            } catch (error) {
                assert(error.message.includes("String must be non-zero"), "Expected revert error not received");
            }
        });
    });

    describe("UpdateNFT Function", () => {
        beforeEach(async () => {
            await waterNFT.mintNFT(recipient, tokenURI, { from: owner });
        });

        it("should update the NFT URI successfully", async () => {
            const newTokenURI = "http://localhost:8080/ipfs/QmYymfKenBQWrYfi7MBtqTYLhzFJDQWbNJfVd6VpF3e6on";
            const result = await waterNFT.updateNFT(1, newTokenURI, { from: recipient });
            assert.equal(result.logs[0].args.tokenId.toString(), "1", "Token ID should be 1");
            const updatedURI = await waterNFT.fetchTokenURI(1);
            assert.equal(updatedURI, newTokenURI, "Token URI should be updated");
        });

        it("should fail to update NFT with invalid token ID", async () => {
            try {
                await waterNFT.updateNFT(invalidTokenId, tokenURI, { from: recipient });
                assert.fail("Expected revert not received");
            } catch (error) {
                assert(error.message.includes("revert"), "Expected revert error not received");
            }
        });

        it("should fail to update NFT with empty URI", async () => {
            try {
                await waterNFT.updateNFT(1, "", { from: recipient });
                assert.fail("Expected revert not received");
            } catch (error) {
                assert(error.message.includes("String must be non-zero"), "Expected revert error not received");
            }
        });
    });

    describe("BurnNFT Function", () => {
        beforeEach(async () => {
            await waterNFT.mintNFT(recipient, tokenURI, { from: owner });
        });

        it("should burn the NFT successfully", async () => {
            const result = await waterNFT.burnNFT(1, { from: recipient });
            assert.equal(result.logs[0].args.tokenId.toString(), "1", "Token ID should be 1");
            const balance = await waterNFT.balanceOf(recipient);
            assert.equal(balance.toString(), "0", "Recipient should own no NFTs after burning");
        });

        it("should fail to burn NFT with invalid token ID", async () => {
            try {
                await waterNFT.burnNFT(invalidTokenId, { from: recipient });
                assert.fail("Expected revert not received");
            } catch (error) {
                assert(error.message.includes("revert"), "Expected revert error not received");
            }
        });

        it("should fail to burn an already burned NFT", async () => {
            await waterNFT.burnNFT(1, { from: recipient });
            try {
                await waterNFT.burnNFT(1, { from: recipient });
                assert.fail("Expected revert not received");
            } catch (error) {
                assert(error.message.includes("revert"), "Expected revert error not received");
            }
        });
    });
});