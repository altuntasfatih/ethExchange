pragma solidity ^0.4.4;
import "./ProductRegistry.sol";

contract Base{
    address owner;
    ProductRegistry public  productDbv2;


    modifier onlyOwner(){
        if (owner==msg.sender){
        _;
        }else{
            revert();
        }
    }

    function Base  (address _proRegistry) public{
          owner= msg.sender;


          productDbv2=ProductRegistry(_proRegistry);
          /*
              productDbv2=ProductRegistry(_proRegistry);
          if (productDb==address(0)){
          productDb=new ProductRegistry(_proRegistry);
        }
        */
    }

    function getDb() public onlyOwner returns  (address){
      return address(productDbv2);
    }


    function kill() public onlyOwner{

        selfdestruct(owner);
    }

    function owneraddress() public view returns(address){

        return owner;
    }
}
