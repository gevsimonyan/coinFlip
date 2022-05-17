module.exports = async function({
    getNamedAccounts,
    deployments
}) {
    const {
        deploy
    } = deployments;
    const {
        deployer
    } = await getNamedAccounts();
    console.log("line 11 deployer info", deployer);
    await deploy("CoinFlip", {
        from: deployer,
        log: true,
    });
}

module.exports.tags = ["CoinFlip"];