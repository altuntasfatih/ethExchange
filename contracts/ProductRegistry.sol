pragma solidity ^0.4.4;
import "./Product.sol";
contract ProductRegistry {



  event LogProductAdded(address indexed owner, address indexed product, string  name);
  event LogProductDeleted(address indexed owner, address indexed product, string  name);


  mapping (address => address[]) public OwnerToProducts;
  mapping (address => bool) public Products; //product is publish or not
  uint public productSize;



  function ProductRegistry() {
    // constructor
  }

  function addProduct(
    string _name,
    address _owner,
    uint _minPrice,
    uint _price
    ) public
    returns(address){

      Product _product=new Product();
      _product.construct(_name,_owner,_minPrice,_price);
      Products[_product]= true;
      OwnerToProducts[_owner].push(_product);
      productSize++;
      LogProductAdded(_owner,_product,_name);

      return address(_product);

  }


  function removeProduct(address _product)
  external
  {
     if(Product(_product).getOwner()==address(0))
     {
       delete Products[_product];
     }
  }

}
