const { ethers } = require("hardhat");

async function main() {
    const ERC20Token = await ethers.getContractFactory("ERC20Token");
    const implementation = await ERC20Token.deploy();

    console.log(implementation.address);

    const ERC20Factory = await ethers.getContractFactory("ERC20Factory");
    const proxy = await ERC20Factory.deploy(implementation.address);

    console.log(proxy.address);

}

main()
.then(() => process.exit(0))
.catch((err) => {
    console.log(err);
    process.exit(1);
})

