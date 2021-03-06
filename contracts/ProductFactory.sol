pragma solidity ^0.4.4;
import "./Base.sol";
import "./ProductRegistry.sol";

contract ProductFactory is Base {

    event LogProductDeleted(address indexed owner, address indexed product);
    event LogProductPublished(address indexed owner, address indexed product);
    event SetA(uint , uint );


    uint a;

    constructor(address _proRegistry) public  {

        productDb = ProductRegistry(_proRegistry);
    }

    function getA() public view returns(uint){
        return a;
    }
    function setA(uint _a) public {
        emit SetA(a,_a);
        a=_a;
    }

    modifier checkParameter(uint _minPrice,uint _price){
        if (_minPrice > _price) //+ (_price*0.1) )
        { 
            revert();
        }
        _;
    }
  
    function publishProduct( 
        string _name,
        uint _minPrice,
        uint _price,
        bool _ontheBazzar,
        string _imageHash)
    external
    payable
    checkParameter(_minPrice,_price)
    returns( address)
    {
        require(msg.value == 1* 10**17 ); //assume 0.1 is publishin gproduct
        address result=productDb.addProduct(_name,msg.sender,_minPrice,_price,_ontheBazzar,_imageHash);
        emit LogProductPublished(msg.sender,result);
        return result;
    }

    function recallProduct(address _product)
    external
    {
        require(Product(_product).getOwner()==msg.sender);
        Product(_product).destroyProduct();
        //productDb.removeProduct
        emit LogProductDeleted(msg.sender,_product);
    }

}
