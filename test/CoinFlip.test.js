const {
	expect
} = require("chai");
const {
	ethers,
	web3
} = require("hardhat");
const {
	deployments
} = require("hardhat");

describe("CoinFlip contract: ", function () {
	let coinFlip, accounts;
	before("Before: ", async () => {
		accounts = await ethers.getNamedSigners();
		let tx = await deployments.deploy("CoinFlip", {
			from: accounts.deployer.address,
			log: false
		});

		coinFlip = await ethers.getContract("CoinFlip");
	});

	describe("Initialize: ", async () => {
		it("Should initialize with correct args: ", async () => {
			expect(await coinFlip.owner()).to.eq(accounts.deployer.address);
			expect(await coinFlip.croupie()).to.eq(accounts.deployer.address);
		});
	});

	describe("Play function: ", async () => {
		it("Should create game: ", async () => {
			const seed = ethers.utils.formatBytes32String("game1");
			const choice = ethers.BigNumber.from("1");
			await coinFlip.connect(accounts.caller).play(choice, seed, {value: ethers.utils.parseEther(0.1)});

			expect(await coinFlip.games(seed)).to.deep.equal(
				1,
				accounts.caller.address,
				choice,
				ethers.utils.parseEther(0.1),
				0,
				0,
				0
			)
		});

		it("Shoul revert with message: ", async () => {
			const seed = ethers.utils.formatBytes32String("game1");
			const choice = ethers.BigNumber.from("1");
			await coinFlip.connect(accounts.caller).play(choice, seed, {value: ethers.utils.parseEther(0.1)});

			await expect(coinFlip.play(choice, seed))
			.to
			.be
			.revertedWith("CoinFlip: Only unique seed");
		});
	});


	describe("Confirm function: ", async () => {
		it("Should confirm game: ", async () => {
			const seed = ethers.utils.formatBytes32String("game1");
			await coinFlip.connect(caller.address).play(0, seed);
			const privateKey = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
			const signature = web3.eth.accounts.sign(seed, privateKey);

			const result = signature.s % 2;

			expect()
		});
	})


});