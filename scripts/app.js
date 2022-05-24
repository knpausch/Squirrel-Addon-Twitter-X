(function () {
    "use strict";

    /**
    * handles a property change sent from Squirrel. 
    */
    function propertyChangedHandler(e) {
        var propertyName = e.detail.property
        var propertyValue = e.detail.value

        switch (Squirrel.getGenericProperty(propertyName)) {
            case 'helloWorldData':
                processData(propertyValue)
                break;
            default:
                console.log("Unknown message type: " + propertyName);
                break;
        }
    }

    /**
    * handles setting the initial setate sent] from Squirrel.
    * 
    */
    function initStateHandler(e) {

        var state = e.detail.state									//set the state from the message
        if (state != null) {
            processData(state.helloWorldData);
        }
    }

    /**
   * Take a string, to be shown in the HTML display, capitalise 
   * the letters and then send back to Squirrel
   * @param value The string to display and return
   */
    function processData(value) {
        document.getElementById('helloWorldText').textContent = value;
        Squirrel.sendToSquirrel('helloWorldResponse', value.toUpperCase());

    }

    //create a squrrelHelper object

    Squirrel.addEventListener('propertyChanged', propertyChangedHandler);				//listem for propoerty changes
    Squirrel.addEventListener('initState', initStateHandler);							//listing for initial state
    Squirrel.initWithSquirrel();														//initialise 

})();