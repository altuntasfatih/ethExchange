pragma solidity ^0.4.4;
import "./Base.sol";
import "./ProductRegistry.sol";

contract Buyer is Base {

  ProductRegistry public  productDb;


  function Buyer(address _proRegistry) {
  
    productDb=ProductRegistry(_proRegistry);

  }

}
