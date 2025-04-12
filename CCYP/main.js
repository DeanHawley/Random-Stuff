javascript:(function(){
  const p = new Game.Upgrade('YouTube Player', 'Click to open', 0, [0, 0, 'https://raw.githubusercontent.com/DeanHawley/Random-Stuff/main/Youtube.png']);
  p.pool = 'toggle';
  p.order = 1e6;
  p.unlock();
  LocalizeUpgradesAndAchievs();

  p.clickFunction = function() {
    let linkInputContainer = document.createElement("div");
    linkInputContainer.style = "position:fixed;top:40%;left:50%;transform:translate(-50%, -50%);padding:20px;background-color:rgba(0,0,0,0.7);border:2px solid #fff;color:#fff;font-size:16px;text-align:center;border-radius:5px;z-index:10000;";

    let closeX = document.createElement("div");
    closeX.textContent = "×";
    closeX.style = "position:absolute;top:5px;right:10px;cursor:pointer;font-size:20px;";
    closeX.onclick = () => linkInputContainer.remove();
    linkInputContainer.appendChild(closeX);

    let linkPrompt = document.createElement("input");
    linkPrompt.type = "text";
    linkPrompt.placeholder = "Enter YouTube link...";
    linkPrompt.style = "padding:10px;width:80%;border:2px solid #fff;border-radius:5px;margin-bottom:10px;font-size:16px;color:#fff;background-color:rgba(0,0,0,0.5);";

    let submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.style = "padding:10px 20px;background-color:rgba(0, 0, 0, 0.8);color:#fff;border:none;cursor:pointer;border-radius:5px;";
    submitButton.onclick = function() {
      let link = linkPrompt.value;
      if (!link) return;

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
        linkInputContainer.remove();

        let errBox = document.createElement("div");
        errBox.style = "position:fixed;top:40%;left:50%;transform:translate(-50%, -50%);padding:20px;background-color:rgba(0,0,0,0.7);border:2px solid #fff;color:#fff;font-size:16px;text-align:center;border-radius:5px;z-index:10000;";

        let closeErr = document.createElement("div");
        closeErr.textContent = "×";
        closeErr.style = "position:absolute;top:5px;right:10px;cursor:pointer;font-size:20px;";
        closeErr.onclick = () => errBox.remove();
        errBox.appendChild(closeErr);

        let msg = document.createElement("div");
        msg.textContent = "Invalid link";
        errBox.appendChild(msg);

        let retryBtn = document.createElement("button");
        retryBtn.textContent = "Retry";
        retryBtn.style = "margin-top:10px;padding:10px 20px;background-color:rgba(0, 0, 0, 0.8);color:#fff;border:none;cursor:pointer;border-radius:5px;";
        retryBtn.onclick = function() {
          errBox.remove();
          p.clickFunction();
        };
        errBox.appendChild(retryBtn);
        document.body.appendChild(errBox);
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

      linkInputContainer.remove();
    };

    linkInputContainer.appendChild(linkPrompt);
    linkInputContainer.appendChild(submitButton);
    document.body.appendChild(linkInputContainer);
  };
})();
