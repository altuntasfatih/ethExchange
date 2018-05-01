pragma solidity ^0.4.4;

contract Product {

    struct Item {
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

    Item private product;
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
        require(msg.sender == product.owner);
        _;
    }

    modifier checkLock(address msgSender){
        require(product.lock == msgSender);
        _;
    }
    modifier checkLocked(){
        require(checkLockable());
        _;
    }

    function checkLockable() public view returns (bool){
        if (product.lock == address(0) ) {
            return true;
        }
        return false;
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
    function lockProduct()
    public
    payable
    timeIsUp
    checkLocked()
    {
        //add modifier this function restrict only callaable from merchants contracts

        //require(checkLockable());
        require(product.price >= product.minPrice);

        require(msg.value == (1* 10**17));

        product.lock=msg.sender;
        product.viewCount+=1;
        product.price-=1;//change this :)
        product.viewerlist.push(msg.sender);//maybe mapping
        product.viewers[msg.sender]+=1000 ;//in wei
        product.lockTime=now+60;//now is block.timestamp
        cState=State.Locked;

    }
    function generalInfo() public
    view
    returns(address,string,uint,uint64,State)
    {
        return (product.owner,product.name,product.viewCount,product.createdOn,cState);
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

    function getLock()public
    view
    returns(address) //owner,name
    {
        return (product.lock);
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
