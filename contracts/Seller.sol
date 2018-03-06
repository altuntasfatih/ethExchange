pragma solidity ^0.4.4;
import "./Base.sol";
import "./ProductRegistry.sol";

contract Seller is Base {

  ProductRegistry public  productDb;


  function Seller(address _proRegistry) {

    productDb=ProductRegistry(_proRegistry);

  }

  modifier checkParameter(uint _minPrice,uint _price){
      if (_minPrice < _price) //+ (_price*0.1) )
      {
         revert();
      }
      _;
  }


  function publishProduct(string _name,
  uint _minPrice,
  uint _price)
    public
    payable
    checkParameter(_price,_minPrice)
    returns (address)
    {
        if (msg.value != 1* 10**17 ){//assume 0.1 ether
            revert();
        }
        return productDb.addProduct(_name,msg.sender,_minPrice,_price);
    }

    function getDb() public onlyOwner returns  (address){
      return productDb;
    }


}
