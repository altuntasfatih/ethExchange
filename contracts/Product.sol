pragma solidity ^0.4.4;

contract Product {


   struct Product{
       address owner;
       uint price;
       string name;
       uint minPrice;
       address lock;
       uint lockTime;
       address[] viewers;                   //adress of viewers for pay back
       uint viewCount;
       uint64 createdOn;                   // Time when product was created

   }

   Product public product;


   modifier timeIsUp() {

       if (product.lockTime >= block.timestamp) {
           product.lock = address(0);
       }
       _;
   }

   modifier checkLock(){
       if (product.lock != msg.sender) {
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

   function checkLockable() public returns (bool){
       if (product.lock != address(0) ) {
          return false;
       }
       return true;
   }

   function checkBuyable(address msgsender)
   public
   timeIsUp
   returns (bool)
   {
       require(product.lock == msgsender);
       if (product.lock != address(0) ) {
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
        public
    {

        //add modifier this function restrict only callaable from merchants contracts
        
        require(product.createdOn == 0);               // Prevent constructing multiple times
        product.name = _name;
        product.owner=msg.sender;
        product.owner = _owner;
        product.minPrice = _minPrice;
        product.createdOn = uint64(now);
        product.price = _price;


    }


   function lockProduct(address viewer)
   public
   checkLocked()
   {

        //add modifier this function restrict only callaable from merchants contracts

       require(checkLockable());
       product.lock=viewer;
       product.viewCount+=1;
       product.price-=1;//change this :)
       product.viewers.push(viewer);//maybe mapping
       product.lockTime=now+60;//now is block.timestamp


   }


 function getBalance() view public returns (uint) {
       return address(this).balance ;
   }


}
