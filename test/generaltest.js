var productFactory = artifacts.require("./ProductFactory.sol");
var productRegistryContract=artifacts.require("./ProductRegistry.sol");

var hash='QmNvSDNj7Rv56m6Xo7aLkTAstCx3awXEmspSiH4rN6AiLk'
var products=[["iphone",8,10],  //8 ether
    ["nokia",5,7],
    ["mackbook",15,20],
    ["swatch",3,5],
    ["keyboard",1,3],
    ["kenevir",8,10],
    ["c4",12,14],
    ["nitrat",4,6],
    ["fitil",17,20],
    ["pencil",9,14],
    ["rgp",33,56],
    ["ak47",21,24],
];
var productAddress=[];


const isRevertError = (error) => {
    const invalidOpcode = error.message.search('invalid opcode') >= 0;
    const outOfGas = error.message.search('out of gas') >= 0;
    const revert = error.message.search('revert') >= 0;
    return invalidOpcode || outOfGas || revert;
}

console.log("Address of product Registry :",productRegistryContract.address);
console.log("Address of product Factory  :",productFactory.address);

contract("Product Bazaar",function(accounts){
    let _contract;

    describe('Put products on bazzar', function () {
        before(function() {

        });

        products.forEach(function(item,index) {
            it('Publish product: '+item[0],async () => {
                _contract = await productFactory.deployed();
                const result=await  _contract.publishProduct(item[0],item[1]*(10**3),item[2]*(10**3),true,hash,{value:web3.toWei(0.1,'ether'),from:accounts[0]});
                assert(result.logs[0].event=='LogProductPublished', "Failed")
                productAddress.push(result.logs[0].args.product)
            });

        });

    });


    productAddress.forEach(function (item, index) {
        it('Call Product info: ' + item, async () => {
            _contract = await ProductContract.at(item)
            const result = await  _contract.generalInfo();
            console.log(result)
            console.log("sadasdsa")
        });

    });

});