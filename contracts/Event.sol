pragma solidity ^0.4.18;

import "./Organization.sol";

contract Event {
    enum SignUpResult { OK, EventFull, AlreadySingUp }

    string public name;
    string public date;

    uint16 currentSignedUpAttendants;
    uint16 maxAttendants;
    uint8 tokensForPresence;
    Organization organization;
    
    struct AttendantInfo {
        bool isSignedUp;
        bool wasPresent;
    }

    mapping (address=>AttendantInfo) attendantsPresence;
    
    function Event(string _name, string _date, uint16 _maxAttendants, uint8 _tokensForPresence) public {
        name = _name;
        date = _date;
        maxAttendants = _maxAttendants;
        tokensForPresence = _tokensForPresence;
        organization = Organization(msg.sender);
    }

    modifier organizationOwnerOnly() {
        require(msg.sender == organization.owner());
        _;
    }

    function signUp() external 
        returns (SignUpResult)
    {       
        return signUpInternal(msg.sender);
    }  

    function signUp(address attendant) organizationOwnerOnly external 
        returns (SignUpResult)
    {       
        return signUpInternal(attendant);
    }  

    function signUpInternal(address attendant) private
        returns (SignUpResult)
    {
        if (currentSignedUpAttendants > maxAttendants)
            return SignUpResult.EventFull;

        if (attendantsPresence[attendant].isSignedUp)
            return SignUpResult.AlreadySingUp;

        attendantsPresence[attendant].isSignedUp = true;
        currentSignedUpAttendants++;
                
        return SignUpResult.OK;
    }

    function confirmPresence(address attendant) organizationOwnerOnly external {
        require(attendantsPresence[attendant].isSignedUp == true);
        require(attendantsPresence[attendant].wasPresent == false);
        
        attendantsPresence[attendant].wasPresent = true;

        organization.giveToken(attendant, tokensForPresence);
    }
}
