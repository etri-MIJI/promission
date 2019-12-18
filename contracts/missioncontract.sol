pragma solidity ^0.4.25;

contract MissionContract {
    address contractOwner;
    
    struct killStruct {
      uint aboveKill; //몇 킬 이상시
      uint perKill; //몇 킬당
      uint killAmount; //보낼 이더의 양입니다. 
    }

    struct rankStrcut {
        uint rank; //몇 등시
        uint rankAmount;
    }

    //계좌주소로 킬 미션지 내용을 저장,검색합니다.
    mapping (address => killStruct) killStructs;
    mapping (address => rankStrcut) rankStructs;
    address[] public instructorAccts;

    constructor() public {        
        contractOwner = msg.sender;
    }
    
    //킬미션 신청자의 주소와 신청내용을 저장합니다.
    function setInstructorKill(address _address, uint _abovekill, uint _perkill, uint _killAmount) public {
        var killInstructor = killStructs[_address];

        killInstructor.aboveKill = _abovekill;
        killInstructor.perKill = _perkill;
        killInstructor.killAmount = _killAmount;
        
        instructorAccts.push(_address) -1;
    }

    //등수미션 신청자의 주소와 신청내용을 저장합니다.
    function setInstructorRank(address _address, uint _rank, uint _rankAmount) public {
        var rankInstructor = rankStructs[_address];

        rankInstructor.rank = _rank;
        rankInstructor.rankAmount = _rankAmount;
        
        instructorAccts.push(_address) -1;
    }
    
    //address의 수를 셉니다.
    function getInstructors() view public returns(address[]) {
        return instructorAccts;
    }
    
     //킬미션 신청자의 주소를 입력하면 신청내용을 호출합니다.
    function getInstructorKill(address _address) view public returns (uint, uint, uint) {
        return (killStructs[_address].aboveKill, killStructs[_address].perKill, killStructs[_address].killAmount);
    }

    //등수미션 신청자의 주소를 입력하면 신청내용을 호출합니다.
    function getInstructorRank(address _address) view public returns (uint, uint) {
        return (rankStructs[_address].rank, rankStructs[_address].rankAmount);
    }
    
    //컨트랙트를 삭제합니다.
    function deleteContract() public {
        if(contractOwner == msg.sender)
            selfdestruct(contractOwner);
    }
}