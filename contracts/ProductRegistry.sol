pragma solidity ^0.4.4;
import "./Product.sol";

contract ProductRegistry {

    event LogProductAdded(address indexed owner, address indexed product, string  name,bool ontheBazzar);
    event LogProductDeleted(address indexed owner, address indexed product, string  name);


    mapping (address => address[]) public ownertoProducts;
    mapping (address => uint) public productsIndex;
    mapping (address => bool) public productsState; //product is publish or not
    uint public productSize;

    bool isActive;

    function  ProductRegistry()  public {
        isActive=true;
    }

    function addProduct(
    string _name,
    address _owner,
    uint _minPrice,
    uint _price,
    bool onBazzar
    ) public
    returns(address){
        Product _product=new Product();
        _product.construct(_name,_owner,_minPrice,_price,onBazzar);
        productsState[_product]= true;
        ownertoProducts[_owner].push(_product);
        productsIndex[address(_product)]=ownertoProducts[_owner].length-1;
        productSize++;
        LogProductAdded(_owner,_product,_name,onBazzar);
        return address(_product);
    }

    function getSize() public view returns(uint){
        return productSize;
    }

    function removeProduct(address _product)
    external
    {
        require(Product(_product).getOwner()==msg.sender);

        delete productsState[_product];
        //delete ownertoProducts[msg.sender][];
    }

}
