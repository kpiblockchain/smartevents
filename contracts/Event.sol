pragma solidity ^0.4.18;

contract Event {
    uint public registrationOpenTo;

    uint public maxAttendants; // TODO: zrobić counter odliczający do zera i wtedy pozbywamy się też { address[] public attendantsAddresses }
    uint public tokensForPresence;
    address public owner;
    address public organization;

    address[] public attendantsAddresses;
    mapping(address => AttendantInfo) public attendants;

    struct AttendantInfo {
        bool isSignedUp;
        bool gotToken;
    }

    function Event(uint _registrationOpenTo, uint _maxAttendants, uint _amount) public {
        registrationOpenTo = _registrationOpenTo;
        maxAttendants = _maxAttendants;
        tokensForPresence = _amount;
        owner = tx.origin;
        organization = msg.sender;
    }

    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    modifier organizationOnly() {
        require(msg.sender == organization);
        _;
    }

    modifier registrationIsOpen() {
        require(now <= registrationOpenTo);
        _;
    }

    function signUpByAttendant() external registrationIsOpen {
        signUp(msg.sender);
    }

    function signUpByOwner(address attendant) external ownerOnly {
        signUp(attendant);
    }

    function confirmPresence(address[] attendantsToConfirm) external organizationOnly {
        for (uint i = 0; i < attendantsToConfirm.length; i++) {
            address attendant = attendantsToConfirm[i];
            require(isSignedUp(attendant));
            require(!gotToken(attendant));

            attendants[attendant].gotToken = true;
        }
    }

    function closeEvent() external ownerOnly {
        selfdestruct(address(0)); // TODO: powiadomienie organizacji
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

    function() payable public {
        revert();
    }
}
