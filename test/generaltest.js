var buyer  = artifacts.require("./Buyer.sol");
var Product  = artifacts.require("./Product.sol");
var seller = artifacts.require("./Seller.sol");
var proRegistry=artifacts.require("./ProductRegistry.sol");


var products=[["iphone",8,10],
          ["nokia",5,7],
          ["mackbook",15,20],
          ["swatch",3,5],
          ["keyboard",1,3],
          ["kenevir",8,10],
          ["c4",12,14],
          ["nitrat",4,6],
          ["fitil",17,20],
        ];
var productAddress=[];

contract("Product Publish",function(accounts){

  products.forEach(function(product) {

    it('Publish product: '+product[0],function(){
      var contractInstance;
      seller.deployed().then(function(instance){
        contractInstance=instance;
      return contractInstance.publishProduct(product[0],product[1],product[2],{value:web3.toWei(0.1,'ether'),from:accounts[0]});
      }).then(function(tx){
        //console.log(web3.eth.getBalance(contractInstance.address));
      })
    });

  });

});

contract("Event of Product",function(accounts){

  it('List events of product:',function(){
    proRegistry.deployed().then(function(instance){
      instance.allEvents({fromBlock: 0, toBlock: 'latest'}, function(error, result) {
        console.log("Adress of product : ",result.args.product);
        productAddress.push(result.args.product);
        Product item = Product(result.args.product);


      });

  });
});

});
