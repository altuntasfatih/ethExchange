pragma solidity ^0.4.4;
import "./Base.sol";
import "./ProductRegistry.sol";

contract Seller is Base {

    event LogProductDeleted(address indexed owner, address indexed product);
    event LogProductPublished(address indexed owner, address indexed product);

    function Seller(address _proRegistry) public {

        productDb = ProductRegistry(_proRegistry);
    }

    modifier checkParameter(uint _minPrice,uint _price){
        if (_minPrice < _price) //+ (_price*0.1) )
        { 
            revert();
        }
        _;
    }
  
    function publishProduct( 
        string _name,
        uint _minPrice,
        uint _price)
    external
    payable
    checkParameter(_minPrice,_price)
    returns( address)
    {
        if (msg.value != 1* 10**17 ){//assume 0.1 ether
            revert();
        }
        address result=productDb.addProduct(_name,msg.sender,_minPrice,_price);
        LogProductPublished(msg.sender,result);
        return result;

    }

    function recallProduct(address _product)
    external
    {
        require(Product(_product).getOwner()==msg.sender);
        Product(_product).destroyProduct();
        LogProductDeleted(msg.sender,_product);

    }

}
