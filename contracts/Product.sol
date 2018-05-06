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
    bool private ontheBazaar=false;

    address private buyer;
    uint64 private timeofSale;

    bool private dispute=false;
    bool private validated=false;

    modifier timeIsUp() {

        if (product.lockTime >= block.timestamp) {
            product.lock = address(0);
            cState=State.Available;
        }
        _;
    }

    modifier onlyOwner(){
        require(msg.sender == product.owner);
        _;
    }
    modifier ontheBazzar(){
        require(ontheBazaar);
        _;
    }

    modifier checkLock(){
        require(product.lock == msg.sender);
        _;
    }
    modifier checkLocked(){
        require(product.lock == address(0));
        _;
    }
    modifier checkBuyable(){
        require(timeofSale!=0 && product.lock != address(0));
        _;
    }

    function construct(
        string _name,
        address _owner,
        uint _minPrice,
        uint _price,
        bool _ontheBazzar
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
        ontheBazaar=_ontheBazzar;
    }
    function lockProduct()
    public
    ontheBazzar
    checkLocked
    payable
    {

        //timeIsUp
        //checkLocked
        //ontheBazzar
        //require(msg.value == (1* 10**17)); //check 0.1 ether
        //require(product.price+ (1*10**18) >= (product.minPrice+(1* 10**17)));

        product.lock=msg.sender;
        product.viewCount+=1;
        product.price-=(1* 10**17);         //0.1 ether  this :)
        product.viewerlist.push(msg.sender);//maybe mapping
        product.viewers[msg.sender]+=1000 ;//in wei
        product.lockTime=now+60;//now is block.timestamp
        cState=State.Locked;

    }
    //is there any posibliy msg.sender is 0x00
    function buyProduct()
    external
    payable
    timeIsUp
    ontheBazzar
    returns(bool){

        require(product.lock == msg.sender &&  product.price == msg.value && cState == State.Locked);
        buyer=msg.sender;
        timeofSale=uint64(now);

    }
    // user validate  product is received
    function validateProduct()
    external
    ontheBazzar
    returns(bool){
        require(msg.sender==buyer);
        validated=true;
    }
    function withDraw()
    onlyOwner
    external
    returns(bool){
        require(validated==true && dispute==false);
        product.owner.transfer(product.price);//if is it fail ,throws on failure
    }
    function openDispute()public
    ontheBazzar
    returns(bool){
        require(msg.sender==buyer && validated==false);
        dispute=true;

    }

    function generalInfo() public
    timeIsUp
    returns(address,string,uint,uint64,State,bool)
    {
        return (product.owner,product.name,product.viewCount,product.createdOn,cState,ontheBazaar);
    }

    function pricelInfo()
    public
    timeIsUp
    checkLock
    ontheBazzar
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
    onlyOwner()
    {
        selfdestruct(product.owner);
    }

    function getBalance() view public returns ( uint) {
        return address(this).balance ;
    }


}
