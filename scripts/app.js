(() => {
    "use strict";
  
    let widgetType;
    let twitterPostURL;
  
    const tweetContainer = document.getElementById("tweet-container");
    const twitterLogo = document.getElementById("twitter-logo");
  
    Squirrel.addEventListener("eventDispatch", (e) => eval(`${e.detail.name}(e)`));
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
      if (!twitterPostURL || !isValidTwitterURL(twitterPostURL)) {
        displayTwitterLogo();
        return;
      }
  
      const proxyUrl = "http://localhost:3000/";
      const apiUrl = `${proxyUrl}https://publish.twitter.com/oembed?url=${encodeURIComponent(twitterPostURL)}`;
  
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          hideTwitterLogo();
          tweetContainer.innerHTML = data.html;
            if (window.twttr) {
            window.twttr.widgets.load();
          }
        })
        .catch((error) => {
          console.error("Error fetching tweet:", error);
          displayTwitterLogo();
        });
    }
  
    function isValidTwitterURL(url) {
      const twitterURLPattern = /^https:\/\/(www\.)?twitter\.com\/[A-z0-9_]+\/status\/[0-9]+$/;
      return twitterURLPattern.test(url);
    }
  
    function displayTwitterLogo() {
      twitterLogo.style.display = "block";
      tweetContainer.innerHTML = ''; 
    }
  
    function hideTwitterLogo() {
      twitterLogo.style.display = "none";
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
  
    displayTwitterLogo();
  })();
  