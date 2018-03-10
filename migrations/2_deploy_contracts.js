

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
  deployer.link(Product,ProductRegistry);
//  deployer.deploy(ProductRegistry);

  deployer.deploy(ProductRegistry).then(function() {
      deployer.deploy(Buyer, ProductRegistry.address);
      deployer.deploy(Seller,ProductRegistry.address);
  }).then(function() {});



/*
  deployer.link(Base, Seller);
  deployer.link(ProductRegistry, Seller);
  deployer.deploy(Seller,ProductRegistry.address);
  */

  /*
      return deployer.deploy(Seller, ProductRegistry.address);
   }).then(function(){})

*/

/*
  deployer.deploy(Base,ProductRegistry.address);
  //deployer.link(Base, ProductRegistry);
  deployer.link(Base, Buyer);
  deployer.link(Base, Seller);

  deployer.deploy(Buyer,ProductRegistry.address);
  deployer.deploy(Seller,ProductRegistry.address);
  deployer.link(ProductRegistry, Buyer);
  deployer.link(ProductRegistry, Seller);
  */



};
