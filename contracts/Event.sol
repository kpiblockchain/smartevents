pragma solidity ^0.4.18;

import "./Organization.sol";


contract Event {
    string public name; // można wyciągnąć poza blockchain
    uint public registrationOpenFrom;
    uint public registrationOpenTo;

    uint16 public maxAttendants;
    uint256 public tokensForPresence;
    Organization public organization;

    address[] public attendantsAddresses; // also acts as isSignedUp when value is >0
    mapping(address => AttendantInfo) public attendants;

    struct AttendantInfo {
        string nick; // opcjonalne, można poza blockchain'em
        bool isSignedUp;
        bool gotToken;
    }

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

    function signUpByAttendant(string nick) external registrationIsOpen
    {
        signUp(nick, msg.sender);
    }

    function signUpByOwner(string nick, address attendant) external organizationOwnerOnly
    {
        signUp(nick, attendant);
    }

    function confirmPresence(address[] attendantsToConfirm) external organizationOwnerOnly {
        for (uint i = 0; i < attendantsToConfirm.length; i++) {
            address attendant = attendantsToConfirm[i];
            require(isSignedUp(attendant));
            require(!gotToken(attendant));

            attendants[attendant].gotToken = true;
            organization.giveToken(attendant, tokensForPresence);
        }
    }

    function attendantsCount() public view
        returns (uint)
    {
        return attendantsAddresses.length;
    }

    function isSignedUp(address attendant) public view
        returns (bool)
    {
        return attendants[attendant].isSignedUp;
    }

    function gotToken(address attendant) public view
        returns (bool)
    {
        return attendants[attendant].gotToken;
    }

    function signUp(string nick, address attendant) private
    {
        require(!isSignedUp(attendant));
        require(attendantsAddresses.length < maxAttendants);

        attendantsAddresses.push(attendant);
        attendants[attendant] = AttendantInfo(nick, true, false);
    }
}
