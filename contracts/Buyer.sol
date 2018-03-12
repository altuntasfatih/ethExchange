pragma solidity ^0.4.4;
import "./Base.sol";
import "./Product.sol";
import "./ProductRegistry.sol";

contract Buyer is Base {


  function Buyer(address _proRegistry) {
    productDb=ProductRegistry(_proRegistry);
  }

  mapping (address => uint) private  payBack ;

  modifier checkLockable( address _product ) {
      if (msg.value != 10000000000  &&  !Product(_product).checkLockable() ) { //0.1 ether
          revert();
      }
      _;
  }

  modifier checkBuyable( address _product ) {

      if (Product(_product).checkBuyable(msg.sender,msg.value) ) { //0.1 ether
          revert();
      }
      _;
  }

  function lockProduct(address _product)
  external
  payable
  checkLockable(_product)
  returns(bool){
    Product temp=Product(_product);
    temp.lockProduct(msg.sender);
    return true;

  }

  function buyProduct(address _product)
  external
  payable
  checkBuyable(_product)
  returns(bool){
    Product _temp=Product(_product);
    _temp.destroyProduct();
    //change state product is selled then
        bool sent = _temp.getOwner().send(msg.value);
        if (!sent){
            revert();
        }
        else{
          return true;
        }
  }

}
