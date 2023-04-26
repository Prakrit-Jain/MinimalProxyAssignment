const { expect } = require("chai");
const { ethers } = require("hardhat");

let owner, user1, user2, ERC20Token, hardhatERC20Token , ERC20Factory, hardhatFactory;

describe("Minimal Proxy", function() {
    beforeEach(async function() {
        [owner, user1, user2] = await ethers.getSigners();
        ERC20Token = await ethers.getContractFactory("ERC20Token");
        hardhatERC20Token = await ERC20Token.deploy();
        await hardhatERC20Token.deployed();
        ERC20Factory = await ethers.getContractFactory("ERC20Factory");
        hardhatFactory = await ERC20Factory.deploy(hardhatERC20Token.address);
        await hardhatFactory.deployed();
    })

    it("should able to check fee Rate", async function() {
        expect(await hardhatFactory.checkFeeRate()).to.be.equal(3);
        await hardhatFactory.changeFeeMode();
        expect(await hardhatFactory.checkFeeRate()).to.be.equal(2);
    });

    it("should check only owner can change mode", async function() {
        await hardhatFactory.changeFeeMode();
        expect(await hardhatFactory.checkFeeRate()).to.be.equal(2);
        await expect(hardhatFactory.connect(user1).changeFeeMode()).to.be.revertedWith("Not a owner");
    });

    it("should able to create minimal clone", async function() {
        await hardhatFactory.createERC20Proxy("My-tokrn", "mkt", 1000);
        await hardhatFactory.changeFeeMode();
        await hardhatFactory.createERC20Proxy("My-sdn", "mdt", 1100);
    })

    
})