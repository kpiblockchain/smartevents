pragma solidity ^0.4.18;

import './Event.sol';

contract Organization {
    address public owner;
    string public name;

    mapping (address => uint) balances;

    Event[] public events;

    modifier onlyByOwnEvent() {
        require(isEventAddress(msg.sender));

        _;
    }

    function Organization(string _name) public {
        owner = msg.sender;
        name = _name;
    }

    function isEventAddress(address addr) internal view
        returns (bool) 
    {
        for (uint i = 0; i < events.length; i++) {
            if (events[i] == addr)
                return true;
        }

        return false;
    }

    function createEvent(string _name, string _date, uint16 _maxAttendants, uint8 _tokensForPresence) external
        returns (Event eventAddress) 
    {
        var e = new Event(_name, _date, _maxAttendants, _tokensForPresence);
        events.push(e);
        return e;
    }

    function giveToken(address user, uint8 tokens) onlyByOwnEvent public {
        balances[user] += tokens;
    }
}
