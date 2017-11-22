declare var require: any;

import 'expose-loader?$!expose-loader?jQuery!jquery';
import 'fullcalendar';
import 'bootstrap';
import 'web3';
import '../less/styles.less';

var truffleContract = require('truffle-contract');
var organisation = require('../../build/contracts/Organization.json');

declare var $: any;
declare var Web3: any;

$(function () {
    var web3Provider: any,
        web3: any,
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