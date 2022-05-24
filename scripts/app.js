(function () {
    "use strict";

    /**
    * handles a property change sent from Squirrel. 
    */
    function propertyChangedHandler(e) {
        const propertyName = e.detail.property
        const propertyValue = e.detail.value

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
    * handles setting the initial setate sent from Squirrel.
    */
    function initStateHandler(e) {

        //set the state from the message
        const state = e.detail.state

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

    //listen for property changes
    Squirrel.addEventListener('propertyChanged', propertyChangedHandler);

    //listing for initial state
    Squirrel.addEventListener('initState', initStateHandler);

    //initialise 
    Squirrel.initWithSquirrel();

})();