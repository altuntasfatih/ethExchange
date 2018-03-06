pragma solidity ^0.4.4;
import "./Product.sol";
contract ProductRegistry {



  event anProductAdded(address indexed owner, address indexed product, string indexed name);


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

      anProductAdded(_owner,_product,_name);
      productSize++;
      return address(_product);

  }


  function removeProduct(){

  }

}
