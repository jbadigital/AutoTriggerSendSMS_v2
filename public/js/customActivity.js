define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';


    var connection = new Postmonger.Session();
	
    var authTokens = {};
    var payload = {};
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', save);
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

    }

    function initialize(data) {
        console.log(data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log(inArguments);

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                
              
            });
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function save() {
    	
		// get the Key field from the Interactions API call for the journey
        var eventDefinitionKey = "DEAudience-704063f8-9789-bf37-b143-b24d2b1770f4";
        
        payload['arguments'].execute.inArguments = [
            {"LetterRefId":"{{Event."+ eventDefinitionKey + ".LetterRefId}}"},
            {"EventInstanceID":"{{Event."+ eventDefinitionKey + ".EventInstanceID}}"},
            {"cloupra__Person__c":"{{Event."+ eventDefinitionKey + ".cloupra__Person__c}}"},
            {"FUNDID":"{{Event."+ eventDefinitionKey + ".FUNDID}}"},          
            {"template":"{{Event."+ eventDefinitionKey + ".template}}"},
            {"TemplateType":"{{Event."+ eventDefinitionKey + ".TemplateType}}"},
            {"Communication_Name":"{{Event."+ eventDefinitionKey + ".Communication_Name}}"}];
        
        payload['metaData'].isConfigured = true;

        console.log(payload);
        connection.trigger('updateActivity', payload);
    }


});
