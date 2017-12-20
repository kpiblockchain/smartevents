pragma solidity ^0.4.18;

import "./Organization.sol";


contract Event {
    enum SignUpResult { OK, EventFull, AlreadySingUp }

    string public name;
    uint public registrationOpenFrom;
    uint public registrationOpenTo;

    uint16 public currentSignedUpAttendants;
    uint16 public maxAttendants;
    uint256 public tokensForPresence;
    Organization public organization;

    struct AttendantInfo {
        bool isSignedUp;
        bool wasPresent;
    }

    mapping (address=>AttendantInfo) attendantsPresence;

    function Event(string _name, uint _registrationOpenFrom, uint _registrationOpenTo, uint16 _maxAttendants, uint256 _amount) public {
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

    function signUpByAttendant() external
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
        require(attendantsPresence[attendant].isSignedUp == true);
        require(attendantsPresence[attendant].wasPresent == false);

        attendantsPresence[attendant].wasPresent = true;

        organization.giveToken(attendant, tokensForPresence);
    }

    function isSignedUp(address attendant) public view
        returns (bool)
    {
        return attendantsPresence[attendant].isSignedUp;
    }

    function signUp(address attendant) private
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
}
