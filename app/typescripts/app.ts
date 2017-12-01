import 'jquery';
import 'fullcalendar';
import 'bootstrap';
import Web3 from 'web3';
import '../less/styles.less';
import truffleContract from 'truffle-contract';

var organisation = require("../../build/contracts/Organization.json");

$(function () {
    var web3Provider: any,
        web3: Web3,
        OrganisationContract: any,
        contract: any;

    if (typeof web3 !== 'undefined') {
        web3Provider = web3.currentProvider;
    } else {
        // If no injected web3 instance is detected, fallback to the TestRPC
        web3Provider = new Web3.providers.HttpProvider('http://localhost:9545');
    }
    web3 = new Web3(web3Provider);

    OrganisationContract = truffleContract(organisation);
    OrganisationContract.setProvider(web3Provider);
    OrganisationContract.deployed().then(function (data) {
        contract = data;
        contract.name().then(function (name) {
            $('#organisation-name').html(name);
        });
    });

    $("#calendar").fullCalendar({
        navLinks: true
    });
});