(() => {
  "use strict";

  let widgetType;
  let twitterPostURL;

  function onInitState(e) {
    const state = e.detail.state;

    if (state) {
      console.log("STATE: ", state);
      twitterPostURL = state.postURL;
      widgetType = state.styleType;
      console.log("WIDGET: ", widgetType);
    }
  }

  function onPropertyChange(e) {
    const propertyName = e.detail.property;
    const propertyValue = e.detail.value;

    switch (Squirrel.getGenericProperty(propertyName)) {
      case "styleType":
        console.log("you clicked ", propertyName);
        widgetType = propertyValue;
        console.log("WIDGET: ", widgetType);
        break;
      default:
        console.log("Unknown message type: " + propertyName);
        break;
    }
  }

  // listen to Squirrel lifecycle events
  Squirrel.addEventListener("eventDispatch", (e) =>
    eval(`${e.detail.name}(e)`)
  );

  // initialise
  Squirrel.initWithSquirrel();

  /**
   * Take a string, to be shown in the HTML display, capitalise
   * the letters and then send back to Squirrel
   * @param value The string to display and return
   */
  function processData(value) {
    document.getElementById("helloWorldText").textContent = value;
    Squirrel.sendToSquirrel("helloWorldResponse", value.toUpperCase());
  }

  /**
   * Called at the end of a series of property value changes.  This can be called
   * either when a single or multiple values change at once.  This is the flag to say
   * There are no more incoming value changs to process at this time.
   */
  function onPropertyChangesComplete() {}

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
