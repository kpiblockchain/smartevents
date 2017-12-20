pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/BasicToken.sol";
import "./Event.sol";


contract Organization is BasicToken {
    using SafeMath for uint256;

    address public owner;
    string public name;

    Event[] public events;

    modifier onlyByOwner() {
        require(owner == msg.sender);

        _;
    }

    modifier onlyByOwnerOrEvent() {
        require(owner == msg.sender || isEventAddress(msg.sender));

        _;
    }

    function Organization(string _name) public {
        owner = msg.sender;
        name = _name;
    }

    function createEvent(string _name, uint _registrationOpenFrom, uint _registrationOpenTo, uint16 _maxAttendants, uint256 _amountForPresence) external onlyByOwner
    returns (Event eventAddress)
    {
        var e = new Event(_name, _registrationOpenFrom, _registrationOpenTo, _maxAttendants, _amountForPresence);
        events.push(e);
        return e;
    }

    function getEventsCount() public view
    returns (uint256)
    {
        return events.length;
    }

    function giveToken(address _to, uint256 _amount) public onlyByOwnerOrEvent {
        totalSupply = totalSupply.add(_amount);
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
}
