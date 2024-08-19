(() => {
    "use strict";

    // listen to Squirrel lifecycle events
    Squirrel.addEventListener('eventDispatch', (e) => eval(`${e.detail.name}(e)`));

    // initialise 
    Squirrel.initWithSquirrel();

    /**
   * Take a string, to be shown in the HTML display, capitalise 
   * the letters and then send back to Squirrel
   * @param value The string to display and return
   */
    function processData(value) {
        document.getElementById('helloWorldText').textContent = value;
        Squirrel.sendToSquirrel('helloWorldResponse', value.toUpperCase());

    }

    document.getElementById('embedTweetBtn').addEventListener('click', function() {
        const tweetUrl = document.getElementById('tweetUrl').value;
        const tweetContainer = document.getElementById('tweetContainer');
    
        // Clear previous tweet if any
        tweetContainer.innerHTML = '';
    
        // Extract the Tweet ID from the URL
        const tweetId = tweetUrl.split('/').pop().split('?')[0];
    
        // Create the blockquote element manually (alternative to createTweetEmbed)
        const blockquote = document.createElement('blockquote');
        blockquote.className = 'twitter-tweet';
        const anchor = document.createElement('a');
        anchor.href = tweetUrl;
        blockquote.appendChild(anchor);
        tweetContainer.appendChild(blockquote);
    
        // Re-load Twitter's widgets.js to render the new tweet
        twttr.widgets.load();
    });
    

    // handles a property change sent from Squirrel. 
    function onPropertyChange(e) {
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

    // handles setting the initial setate sent from Squirrel.
    function onInitState(e) {
        //set the state from the message
        const state = e.detail.state

        if (state != null) {
            processData(state.helloWorldData);
        }
    }

    /**
     * Called at the end of a series of property value changes.  This can be called
     * either when a single or multiple values change at once.  This is the flag to say
     * There are no more incoming value changs to process at this time.
     */
    function onPropertyChangesComplete() { }

    // Called when a setCanvas event is received from Squirrel
    function onSetCanvas(e) {
        const canvas = e.detail.canvas;
    }

    // Called when a setRuntimeMode event is received from Squirrel
    function onSetRuntimeMode(e) {
        const mode = e.detail.mode;
    }

    // Called when a setSize event is received from Squirrel
    function onSetSize(e) {
        const size = e.detail.size;
    }

    // Called when a setPosition event is received from Squirrel
    function onSetPosition(e) {
        const position = e.detail.position;
    }



})();