pragma solidity ^0.4.25;

contract MissionContract {
    address contractOwner;
    
    struct killStruct {
      uint aboveKill; //몇 킬 이상시
      uint perKill; //몇 킬 당
      uint killAmount; //보낼 이더의 양입니다. 
    }

    //계좌주소로 킬 미션지 내용을 저장합니다.
    mapping (address => killStruct) killStructs;
    address[] public instructorAccts;

    constructor() public {        
        contractOwner = msg.sender;
    }
    
    function setInstructor(address _address, uint _abovekill, uint _perkill, uint _killAmount) public {
        var instructor = killStructs[_address];

        instructor.aboveKill = _abovekill;
        instructor.perKill = _perkill;
        instructor.killAmount = _killAmount;
        
        instructorAccts.push(_address) -1;
    }
    
    function getInstructors() view public returns(address[]) {
        return instructorAccts;
    }
    
    function getInstructor(address _address) view public returns (uint, uint, uint) {
        return (killStructs[_address].aboveKill, killStructs[_address].perKill, killStructs[_address].killAmount);
    }
    
    //컨트랙트를 삭제합니다.
    function killContract() public {
        if(contractOwner == msg.sender)
            selfdestruct(contractOwner);
    }
}