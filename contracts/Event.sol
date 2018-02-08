pragma solidity ^0.4.18;

import "./Organization.sol";

contract Event {
    uint public registrationOpenTo;

    uint public maxAttendants; // TODO: zrobić counter odliczający do zera i wtedy pozbywamy się też {address[] public attendantsAddresses}
    uint public tokensForPresence;
    Organization public organization;

    address[] public attendantsAddresses; // also acts as isSignedUp when value is >0
    mapping(address => AttendantInfo) public attendants;

    struct AttendantInfo {
        bool isSignedUp;
        bool gotToken;
    }

    function Event(uint _registrationOpenTo, uint _maxAttendants, uint _amount) public {
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
        require(now <= registrationOpenTo);
        _;
    }

    function signUpByAttendant() external registrationIsOpen {
        signUp(msg.sender);
    }

    function signUpByOwner(address attendant) external organizationOwnerOnly {
        signUp(attendant);
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

    function signUp(address attendant) private {
        require(!isSignedUp(attendant));
        require(attendantsAddresses.length < maxAttendants);

        attendantsAddresses.push(attendant);
        attendants[attendant] = AttendantInfo(true, false);
    }
}
