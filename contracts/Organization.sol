pragma solidity ^0.4.18;

import "../node_modules/zeppelin-solidity/contracts/token/ERC20/BasicToken.sol";
import "./Event.sol";

contract Organization is BasicToken {
    using SafeMath for uint256;

    address public owner;
    Event[] public events;
    // mapping (address => bool) public isEvent; // TODO: można użyc mapping jeśli będziemy mieli bazę danych

    modifier onlyByOwner() {
        require(owner == msg.sender);
        _;
    }

    modifier onlyByOwnerOrEvent() {
        require(owner == msg.sender || isEventAddress(msg.sender));
        _;
    }

    function Organization() public {
        owner = msg.sender;
    }

    function createEvent(uint _registrationOpenTo, uint _maxAttendants, uint _amountForPresence) external onlyByOwner()
        returns (Event)
    {
        var eventAddress = new Event(_registrationOpenTo, _maxAttendants, _amountForPresence);
        events.push(eventAddress);
        return eventAddress;
    }

    function removeThisEventFromStorage() external {
        for (uint i = events.length - 1; i >= 0; i--) {
            if (events[i] == msg.sender)
                delete events[i];
                break;
        }
    }

    function getEventsCount() public view
        returns (uint256)
    {
        return events.length;
    }

    function giveToken(address _to, uint256 _amount) public onlyByOwnerOrEvent() {
        require(_to != address(0));
        require(_amount > 0);

        totalSupply_ = totalSupply_.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        Transfer(address(0), _to, _amount);
    }

    function isEventAddress(address _address) internal view
        returns (bool)
    {
        for (uint i = events.length - 1; i >= 0; i--) {
            if (events[i] == _address)
                return true;
        }

        return false;
    }

    function confirmPresenceOnEvent(Event _event, address[] _attendantsToConfirm) external onlyByOwner() {
        _event.confirmPresence(_attendantsToConfirm);
        var tokensForPresence = _event.tokensForPresence();
        for (uint i = 0; i < _attendantsToConfirm.length; i++) {
            giveToken(_attendantsToConfirm[i], tokensForPresence);
        }
    }

    function() payable public {
        revert();
    }
}
