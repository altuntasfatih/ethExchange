pragma solidity ^0.4.4;
import "./ProductRegistry.sol";

contract Base{
    
    address owner;
    ProductRegistry public  productDb;


    modifier onlyOwner(){
        if (owner==msg.sender){
            _;
        }else{
            revert();
        }
    }

    function Base  () public{
        owner = msg.sender ;
    }

    function getDb() public view onlyOwner returns  (address){
        return address(productDb);
    }

    function transferOwner(uint64 _value)
    public
    onlyOwner
    returns (bool){
        bool sent = owner.send(_value);
        return sent;
    }

    function kill() public onlyOwner{

        selfdestruct(owner);
    }

    function owneraddress() public view returns(address){

        return owner;
    }
}
