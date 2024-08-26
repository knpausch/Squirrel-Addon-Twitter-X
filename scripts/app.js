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
    }
    renderTweet();
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
    renderTweet();
  }

  function renderTweet() {
    document.addEventListener("DOMContentLoaded", () => {
      const tweetUrl = "https://x.com/Squirrel_365/status/1813136575007433144";
      const proxyUrl = "http://localhost:3000/";
      const apiUrl = `${proxyUrl}https://publish.twitter.com/oembed?url=${encodeURIComponent(tweetUrl)}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.html); 
          tweetContainer.innerHTML = data.html; 
        })
        .catch((error) => {
          console.error("Error fetching tweet:", error); 
        });
    });
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
