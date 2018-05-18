var base=artifacts.require("./Base.sol");
var productFactory=artifacts.require("./ProductFactory.sol");
var product=artifacts.require("./Product.sol");
var productRegistry=artifacts.require("./ProductRegistry.sol");

module.exports = function(deployer) {

    deployer.deploy(productRegistry).then(function() {
        deployer.deploy(productFactory,productRegistry.address);
    }).then(function() {});
    deployer.deploy(product);

};