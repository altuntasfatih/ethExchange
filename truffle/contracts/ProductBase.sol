pragma solidity ^0.4.4;

contract ProductBase{
    address owner;
    
    modifier onlyOwner(){
        if (owner==msg.sender){
        _;
        }else{
            revert();
        }
    }

    function ProductBase  () public{
          owner= msg.sender;
    }
    
    function kill() public onlyOwner{
        
        selfdestruct(owner);
    }
    
    function owneraddress() public view returns(address){
        
        return owner;
    }
}