pragma solidity ^0.4.4;


contract Product {

    struct Product {
        address owner;
        uint price;
        string name;
        uint minPrice;
        address lock;
        uint lockTime;
        mapping (address => uint) viewers;
        address[] viewerlist;                   //adress of viewers for pay back
        uint viewCount;
        uint64 createdOn;                   // Time when product was created

    }

    enum  State { Initial, Available, Locked, Selled }

    State public cState;

    Product private product;
   //Buyer public constant ens = Buyer(0x314159265dD8dbb310642f98f50C066173C1259b);

    address public Buyer;
    address public Seller;

    modifier timeIsUp() {

        if (product.lockTime >= block.timestamp) {
            product.lock = address(0);
            cState=State.Available;
        }
        _;
    }

   modifier onlyBuyerOrOwner(){
     //this is not correct fix this
     if (msg.sender == Buyer || msg.sender== product.owner)
     {
          _;

     }else{
        revert();
     }


   }

   modifier checkLock(address msgSender){
       if (product.lock != msgSender) {
          revert();
       }
       _;
   }
    modifier checkLocked(){
       if (checkLockable()) {
          revert();
       }
       _;
   }

   function checkLockable() public view returns (bool){
       if (product.lock != address(0) ) {
          return false;
       }
       return true;
   }

   function checkBuyable(address _msgSender,uint _value)
   public
   timeIsUp
   returns (bool)
   {
       //require(product.lock == msgsender && product.price == value);
       if (product.lock != _msgSender || product.lock == address(0) ||  product.price != _value || cState != State.Locked ) {
          return false;
       }
       return true;
   }


    function construct(
        string _name,
        address _owner,
        uint _minPrice,
        uint _price
    )
        external
    {
        //add modifier this function restrict only callable from merchants contracts

        require(product.createdOn == 0);               // Prevent constructing multiple times
        product.name = _name;
        product.owner=msg.sender;
        product.owner = _owner;
        product.minPrice = _minPrice;
        product.createdOn = uint64(now);
        product.price = _price;
        cState=State.Available;
    }


   function lockProduct(address viewer)
   public
   timeIsUp()
   checkLocked()
   {
        //add modifier this function restrict only callaable from merchants contracts

       require(checkLockable());
       require(product.price >= product.minPrice);
       product.lock=viewer;
       product.viewCount+=1;
       product.price-=1;//change this :)
       product.viewerlist.push(viewer);//maybe mapping
       product.viewers[viewer]+=1000 ;//in wei
       product.lockTime=now+60;//now is block.timestamp
       cState=State.Locked;


   }

   function generalInfo() public
   view
   returns(address,string,uint,uint64) //owner,name
   {
     return (product.owner,product.name,product.viewCount,product.createdOn);
   }


   function pricelInfo(address locker)
   public
   timeIsUp
   checkLock(locker)
   returns(uint,string) //owner,name
   {
     return (product.price,product.name);
   }

   function getOwner()public
   view
   returns(address) //owner,name
   {
     return (product.owner);
   }


    function destroyProduct()external
    //add modifier only seller contract can call this,name
    onlyBuyerOrOwner()
    {
      selfdestruct(product.owner);
    }


    function getBalance() view public returns ( uint) {
        return address(this).balance ;
    }


}
