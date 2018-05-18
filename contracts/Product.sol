pragma solidity ^0.4.4;
// price unit is miliether ,1000 milli ether is 1 ether
contract Product {

    struct Item {
        string name;
        address owner;
        uint price;
        uint minPrice;
        address lock;
        uint lockTime;
        string imageHash;
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

        if (product.lockTime < block.timestamp ) {
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
        bool _ontheBazzar,
        string _imageHash
    )
        external
    {
        //add modifier this function restrict only callable from merchants contracts

        require(product.createdOn == 0);               // Prevent constructing multiple times
        product.name = _name;
        product.owner=msg.sender;
        product.owner = _owner;
        product.minPrice = _minPrice;
        product.imageHash=_imageHash;
        product.createdOn = uint64(now);
        product.price = _price;
        cState=State.Available;
        ontheBazaar=_ontheBazzar;
    }
    function lockProduct()
    public
    ontheBazzar
    checkLocked
    timeIsUp
    payable
    {

        //timeIsUp
        //checkLocked
        //ontheBazzar
        require(msg.value == (100* 10**15)); //check 100 mili ether(0.1 ether)
        require(product.price  >= (product.minPrice+100));

        product.lock=msg.sender;
        product.viewCount+=1;
        product.price-=100;         //100 milli ether is 0.1 ether
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

    function generalInfo() public view
    returns(address,string,string,uint,uint64,State,bool,uint)
    {
        if(msg.sender==product.lock)
            return (product.owner,product.name,product.imageHash,product.viewCount,product.createdOn,cState,ontheBazaar,product.price);
        else
            return (product.owner,product.name,product.imageHash,product.viewCount,product.createdOn,cState,ontheBazaar,0);
    }

    function priceInfo()
    public
    checkLock
    ontheBazzar
    view
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
    function getTime() public view  returns ( uint64) {
        return uint64(now) ;
    }


}
