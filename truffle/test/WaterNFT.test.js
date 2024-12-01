const WaterNFT = artifacts.require("WaterNFT");

contract("WaterNFT", (accounts) => {
    let waterNFT;
    const owner = accounts[0];
    const user = accounts[1];
    const tokenURI = "https://example.com/nft/1";

    beforeEach(async () => {
        waterNFT = await WaterNFT.new();
    });

    describe("Minting NFTs", () => {
        it("should mint an NFT and assign it to the owner", async () => {
            const tokenId = await waterNFT.mintNFT(owner, tokenURI);
            const ownerOfToken = await waterNFT.ownerOf(tokenId);
            const userNFTs = await waterNFT.getUserNFTs(owner);

            assert.equal(ownerOfToken, owner, "The owner of the NFT should be the minter");
            assert.equal(userNFTs.length, 1, "User  should have one NFT");
            assert.equal(userNFTs[0].toString(), tokenId.toString(), "The NFT ID should match the minted token ID");
        });

        it("should emit NFTMinted event on minting", async () => {
            const result = await waterNFT.mintNFT(owner, tokenURI);
            const event = result.logs[0].args;

            assert.equal(event.owner, owner, "Event owner should match the minter");
            assert.equal(event.tokenId.toString(), "1", "Event tokenId should be 1");
            assert.equal(event.tokenURI, tokenURI, "Event tokenURI should match the provided URI");
        });
    });

    describe("Retrieving NFTs", () => {
        it("should retrieve the correct NFT data", async () => {
            const tokenId = await waterNFT.mintNFT(owner, tokenURI);
            const retrievedURI = await waterNFT.getNFTData(tokenId);

            assert.equal(retrievedURI, tokenURI, "The retrieved URI should match the original URI");
        });

        it("should emit NFTRetrieved event on fetching NFT data", async () => {
            const tokenId = await waterNFT.mintNFT(owner, tokenURI);
            const result = await waterNFT.getNFTData(tokenId);
            const event = result.logs[0].args;

            assert.equal(event.user, owner, "Event user should match the caller");
            assert.equal(event.tokenId.toString(), tokenId.toString(), "Event tokenId should match the retrieved token ID");
            assert.equal(event.tokenURI, tokenURI, "Event tokenURI should match the original URI");
        });
    });

    describe("Checking NFT status", () => {
        it("should return true for minted NFTs", async () => {
            const tokenId = await waterNFT.mintNFT(owner, tokenURI);
            const isMinted = await waterNFT.isMinted(tokenId);

            assert.isTrue(isMinted, "The NFT should be marked as minted");
        });

        it("should return false for non-existent NFTs", async () => {
            const isMinted = await waterNFT.isMinted(999); // Assuming 999 has not been minted

            assert.isFalse(isMinted, "The NFT should not be marked as minted");
        });
    });
});