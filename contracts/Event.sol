pragma solidity ^0.4.18;

import "./Organization.sol";

contract Event {
    enum SignUpResult { OK, EventFull, AlreadySignedUp }

    string public name; // można wyciągnąć poza blockchain
    uint256 public registrationOpenFrom;
    uint256 public registrationOpenTo;

    uint16 public attendantsCount;
    uint16 public maxAttendants;
    uint256 public tokensForPresence;
    Organization public organization;

    mapping(address => uint16) attendantIds; // also acts as isSignedUp when value is >0
    mapping(uint16 => AttendantInfo) attendants;

    struct AttendantInfo {
        string nick; // opcjonalne, można poza blockchain'em
        address account;
        bool gotToken;
    }

    function Event(string _name, uint256 _registrationOpenFrom, uint256 _registrationOpenTo, uint16 _maxAttendants, uint256 _amount) public {
        name = _name;
        registrationOpenFrom = _registrationOpenFrom;
        registrationOpenTo = _registrationOpenTo;
        maxAttendants = _maxAttendants;
        tokensForPresence = _amount;
        organization = Organization(msg.sender);
    }

    modifier organizationOwnerOnly() {
        require(msg.sender == organization.owner());
        _;
    }

    modifier registrationIsOpen() {
        require(now >= registrationOpenFrom);
        require(now <= registrationOpenTo);
        _;
    }

    function signUpByAttendant() external registrationIsOpen
        returns (SignUpResult)
    {
        return signUp(msg.sender);
    }

    function signUpByOwner(address attendant) external organizationOwnerOnly
        returns (SignUpResult)
    {
        return signUp(attendant);
    }

    function confirmPresence(address attendant) external organizationOwnerOnly {
        require(isSignedUp(attendant));
        require(attendants[attendantIds[attendant]].gotToken == false);

        attendants[attendantIds[attendant]].gotToken = true;
        organization.giveToken(attendant, tokensForPresence);
    }

    function isSignedUp(address attendant) public view
        returns (bool)
    {
        return attendantIds[attendant] != 0;
    }

    function signUp(address attendant) private
        returns (SignUpResult)
    {
        if (isSignedUp(attendant))
            return SignUpResult.AlreadySignedUp;

        if (attendantsCount >= maxAttendants)
            return SignUpResult.EventFull;
            
        attendantsCount++;
        attendantIds[attendant] = attendantsCount;
        return SignUpResult.OK;
    }
}
