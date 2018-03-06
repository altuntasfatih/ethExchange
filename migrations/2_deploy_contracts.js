

var Base=artifacts.require("./Base.sol");
var Buyer=artifacts.require("./Buyer.sol");
var Seller=artifacts.require("./Seller.sol");
var Product=artifacts.require("./Product.sol");
var ProductRegistry=artifacts.require("./ProductRegistry.sol");



module.exports = function(deployer) {

/*
  module.exports = function(deployer) {
      deployer.deploy(ProductRegistry).then(function() {
          return deployer.deploy(Base, ProductRegistry.address);
      }).then(function() { })
  };
*/

  deployer.deploy(Product);




};
