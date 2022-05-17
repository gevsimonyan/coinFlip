require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy-ethers");
require("@nomiclabs/hardhat-web3");

const {
	normalizeHardhatNetworkAccountsConfig
} = require("hardhat/internal/core/providers/util")

const {
	BN,
	bufferToHex,
	privateToAddress,
	toBuffer
} = require("ethereumjs-util")



task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const networkConfig = hre.config.networks["hardhat"]


	const accounts = normalizeHardhatNetworkAccountsConfig(networkConfig.accounts)

	console.log("Accounts")
	console.log("========")

	for (const [index, account] of accounts.entries()) {
		const address = bufferToHex(privateToAddress(toBuffer(account.privateKey)))
		const privateKey = bufferToHex(toBuffer(account.privateKey))
		const balance = new BN(account.balance).div(new BN(10).pow(new BN(18))).toString(10)
		console.log(`Account #${index}: ${address} (${balance} ETH) Private Key: ${privateKey}`)
	}
});

const ALCHEMY_API_KEY = "APIKEY";
const PRIVATE_KEY = "APIKEY";
const ETHERSCAN_APIKEY = "APIKEY";

module.exports = {
	networks: {
		hardhat: {
		}
	},
	namedAccounts: {
		deployer: {
			default: 0,
		},
		caller: {
			default: 1,
		},

	},
	etherscan: {
		apiKey: ETHERSCAN_APIKEY,
	},
	solidity: "0.8.7",
};
