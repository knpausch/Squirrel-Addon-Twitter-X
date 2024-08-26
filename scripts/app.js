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
    }
  }

  function onPropertyChange(e) {
    const propertyName = e.detail.property;
    const propertyValue = e.detail.value;

    switch (Squirrel.getGenericProperty(propertyName)) {
      case "styleType":
        widgetType = propertyValue;
        break;
      case "postURL":
        twitterPostURL = propertyValue;
        break;
      default:
        console.log("Unknown message type: " + propertyName);
        break;
    }
  }

  Squirrel.addEventListener("eventDispatch", (e) =>
    eval(`${e.detail.name}(e)`)
  );

  Squirrel.initWithSquirrel();
  
  function onPropertyChangesComplete() {}

  function onSetCanvas(e) {
    const canvas = e.detail.canvas;
  }

  function onSetRuntimeMode(e) {
    const mode = e.detail.mode;
  }

  function onSetSize(e) {
    const size = e.detail.size;
  }

  function onSetPosition(e) {
    const position = e.detail.position;
  }
})();
