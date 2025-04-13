((function(){
  const p = new Game.Upgrade('YouTube Player', 'Click to open', 0, [0, 0, 'https://raw.githubusercontent.com/DeanHawley/Random-Stuff/main/Youtube.png']);
  p.pool = 'toggle';
  p.order = 1e6;
  p.unlock();
  LocalizeUpgradesAndAchievs();

  p.clickFunction = function() {
    Game.Prompt('<h3 style="text-align:center;margin-bottom:8px;">Enter YouTube link:</h3><div class="block" style="display:flex;justify-content:center;"><input type="text" style="text-align:center;width:90%;" id="youtubeLink"/></div>',[
      ['Submit',function(){
        let link = l("youtubeLink").value;
        let videoId = '';
        try {
          let url = new URL(link);
          if (url.hostname.includes("youtube.com")) {
            videoId = url.searchParams.get("v");
          } else if (url.hostname.includes("youtu.be")) {
            videoId = url.pathname.split('/')[1];
          }
        } catch (err) {
          videoId = "";
        }

        if (!videoId) {
          Game.ClosePrompt();
          Game.Prompt('<h3 style="text-align:center;">Invalid YouTube link</h3>',[['Retry',p.clickFunction],['Close']]);
          return;
        }

        let adContainer = document.getElementById("smallSupport");
        if (adContainer) {
          adContainer.innerHTML = "";
          let iframe = document.createElement("iframe");
          iframe.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
          iframe.width = "300";
          iframe.height = "250";
          iframe.allow = "autoplay; encrypted-media";
          iframe.setAttribute("frameborder", "0");
          iframe.setAttribute("allowfullscreen", "");
          adContainer.appendChild(iframe);
        }

        Game.ClosePrompt();
      }],
      ['Cancel']
    ]);
    setTimeout(() => { l("youtubeLink").focus(); }, 10);
  };
})();
