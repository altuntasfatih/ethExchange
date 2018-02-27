pragma solidity ^0.4.4;

import "./ProductBase.sol";
import "./ProductList.sol";

contract Products is ProductBase {
    
    
     function Product() {
    // constructor
    }

    
   /// ProductList public constant ens = ProductList(0x314159265dD8dbb310642f98f50C066173C1259b);
    
    uint private leaseTime = 60;
    uint private totalProduct=0;
    
    
    
    ProductList public constant ens = ProductList(0x314159265dD8dbb310642f98f50C066173C125);

    modifier timeIsUp(uint _productId) {
        
        if (Products[_productId].lockTime >= block.timestamp) {
            Products[_productId].lock = address(0);
        }
        _;
    }
    modifier checkLock(uint _productId){
        if (Products[_productId].lock != msg.sender    ) {
           revert();
        }
        _;
    }
     modifier checkIfLocked(uint _productId){
        if (Products[_productId].lock != address(0)    ) {
           revert();
        }
        _;
    }
   
   
    event productAdded(
        address owner,
        string name,
        uint price,
        uint minPrice
    );

    mapping (address => product[]) private OwnerProduct;
    mapping (uint => product) private Products;
    mapping (address => product) private Sold;
    

    struct product{
        address owner;
        uint price;
        string name;
        uint minPrice;
        address lock;
        uint lockTime;
        address[] viewers;
        uint viewCount;
        
        
    }
    
    function _generateId(uint num) private view returns (uint) {
        uint rand = uint(keccak256(num));
        return rand ;
    } 
    
    
    
    function publishProduct(uint _price,string _name,uint _minPrice)
    public
    payable
    
    {
        if (msg.value != 1* 10**17 ){//assume 0.1 ether 
            revert();
        }
        var temppro=Products[_generateId(totalProduct)];
        temppro.price=_price;
        temppro.owner=msg.sender;
        temppro.name=_name;
        temppro.minPrice=_minPrice;
        
        OwnerProduct[msg.sender].push(temppro);
        
        totalProduct=totalProduct+1;
        
    }
    
    
    
    
    function unlockProduct(uint _productId)
    public
    payable
    checkIfLocked(_productId)
    {
        if (msg.value != 1* 10**16 ){//assume 0.01 ether 
            revert();
        }
        
        var _product=Products[_productId];
        _product.lock=msg.sender;
        _product.viewCount+=1;
        _product.price-=msg.value;//change this :)
        _product.viewers.push(msg.sender);//maybe mapping
        _product.lockTime=now+60;//now is block.timestamp
    
        
    }
    
    function buyProduct(uint _productId)
    public
    payable
    checkLock(_productId)
    {
        
        var _product=Products[_productId];
          
        if (_product.price != msg.value) {
           revert();
        }
        
        //urunu aldim
        
        _product.lock=msg.sender;
        _product.lockTime=now+60;//now is block.timestamp
        
        delete Products[_productId];
    
        
    }
    
   
       
   
  function getBalance() view public returns (uint) {
        return address(this).balance ;
    }

    
    
}
