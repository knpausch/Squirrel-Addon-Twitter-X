(() => {
  "use strict";

  let widgetType;
  let twitterPostURL;

  const tweetContainer = document.getElementById("tweet-container");

  Squirrel.addEventListener("eventDispatch", (e) =>
    eval(`${e.detail.name}(e)`)
  );
  Squirrel.initWithSquirrel();

  function onInitState(e) {
    const state = e.detail.state;

    if (state) {
      console.log("STATE: ", state);
      twitterPostURL = state.postURL;
      widgetType = state.styleType;
      render();
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
        render();
        break;
      default:
        console.log("Unknown message type: " + propertyName);
        break;
    }
  }

  function render(){
    tweetContainer.innerHTML = '';
    const blockquote = document.createElement('blockquote');
    blockquote.className = 'twitter-tweet';

    const tweetLink = document.createElement('a');
    tweetLink.href = twitterPostURL;
    tweetLink.innerText = 'Loading Tweet...'; // Optional placeholder text
    tweetLink.target = '_blank'; // Open link in a new tab

    blockquote.appendChild(tweetLink);
    tweetContainer.appendChild(blockquote);

    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    } else {
      console.error('Twitter widgets script not loaded or `twttr` is not defined');
    }
  }

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
