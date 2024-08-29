(() => {
  "use strict";

  let widgetType;
  let twitterPostURL;
  let twitterUsername;

  const tweetContainer = document.getElementById("tweet-container");
  const twitterLogoContainer = document.getElementById(
    "twitter-logo-container"
  );
  const twitterLogo = document.getElementById("twitter-logo");

  Squirrel.addEventListener("eventDispatch", (e) => eval(`${e.detail.name}(e)`));
  Squirrel.initWithSquirrel();

  function onInitState(e) {
    const state = e.detail.state;

    if (state) {
      console.log("STATE: ", state);
      twitterPostURL = state.postURL;
      widgetType = state.styleType;
      twitterUsername = state.xUsername;
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
        break;
      case "xUsername":
        twitterUsername = propertyValue;
        break;
      default:
        console.log("Unknown message type: " + propertyName);
        break;
    }
    render();
  }

  function renderTwitterPost(){
    console.log("single post")
    if (twitterPostURL && isValidTwitterURL(twitterPostURL)) {
      hideTwitterLogo();

      tweetContainer.innerHTML = "";
      tweetContainer.style.overflow = "hidden";
      tweetContainer.style.height = "auto";

      const blockquote = document.createElement("blockquote");
      blockquote.className = "twitter-tweet";

      const tweetLink = document.createElement("a");
      tweetLink.href = twitterPostURL;
      tweetLink.innerText = "Loading X Post...";
      tweetLink.target = "_blank";

      blockquote.appendChild(tweetLink);
      tweetContainer.appendChild(blockquote);

      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      } 
      else {
        console.error("Twitter widgets script not loaded or `twttr` is not defined");
      }
    } 
    else {
      displayTwitterLogo();
    }
  }

  function renderTwitterTimeline(){
    console.log("timeline for ", twitterUsername)

    if (twitterUsername) {
      hideTwitterLogo();

      tweetContainer.innerHTML = "";
      tweetContainer.style.overflow = "auto";
      tweetContainer.style.height = "100vh";

      const tweetLink = document.createElement("a");
      tweetLink.className = "twitter-timeline";
      tweetLink.href = "https://twitter.com/" + twitterUsername;
      tweetLink.innerText = "Loading X Timeline...";
      tweetLink.target = "_blank";

      tweetContainer.appendChild(tweetLink);

      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      } 
      else {
        console.error("Twitter widgets script not loaded or `twttr` is not defined");
      }
    } 
    else {
      displayTwitterLogo();
    }
  }

  function render() {
    switch (widgetType) {
      case "singlePost":
        renderTwitterPost();
        break;
      case "timeline":
        renderTwitterTimeline();
        break;
      default:
        console.log("Unknown widget type: " + propertyName);
        break;
    }
  }

  function isValidTwitterURL(url) {
    const twitterURLPattern =
      /^https:\/\/(www\.)?twitter\.com\/[A-z0-9_]+\/status\/[0-9]+$/;
    return twitterURLPattern.test(url);
  }

  function displayTwitterLogo() {
    twitterLogo.style.visibility = "visible";
    twitterLogoContainer.style.visibility = "visible";
    twitterLogoContainer.style.height = "100vh";
    tweetContainer.innerHTML = "";
  }

  function hideTwitterLogo() {
    twitterLogo.style.visibility = "hidden";
    twitterLogoContainer.style.visibility = "hidden";
    twitterLogoContainer.style.height = "0";
  }

  function onPropertyChangesComplete() {}
  function onSetCanvas(e) {const canvas = e.detail.canvas;}
  function onSetRuntimeMode(e) {const mode = e.detail.mode;}
  function onSetSize(e) {const size = e.detail.size;}
  function onSetPosition(e) {const position = e.detail.position;}
})();
