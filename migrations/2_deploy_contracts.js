var Base=artifacts.require("./Base.sol");
var Seller=artifacts.require("./Seller.sol");
var Product=artifacts.require("./Product.sol");
var ProductRegistry=artifacts.require("./ProductRegistry.sol");


module.exports = function(deployer) {



    deployer.deploy(ProductRegistry).then(function() {
        deployer.deploy(Seller,ProductRegistry.address);
    }).then(function() {});

    deployer.deploy(Product);


};