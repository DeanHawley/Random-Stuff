if (ccsm === undefined) var ccsm = {};
Game.registerMod("ccsm", {
  info: {
    Name: "CCSM",
    Description: "Meant to replicate cookie clicker for steam"
  },
  init: function () {
    ccsm.version = "1.01";
    ccsm.active = 0;

    (async function () {
      let b = false,
        c = l("bigCookie");
      if (c) c.addEventListener("click", function () { if (b) return; b = true; });

      let d = l("supportSection");
      if (d) d.remove();

      let e = document.querySelectorAll(".listing.warning");
      if (e.length > 1) e[1].remove();

      let f = l("buffs");
      if (f) {
        f.style.marginTop = "20px";
        f.style.top = "16px";
      }

      let g = document.querySelector("#store").previousElementSibling;
      if (g) g.remove();

      let h = l("store");
      if (h) {
        h.style.position = "relative";
        h.style.marginTop = "0";
        h.style.zIndex = "100";
      }

      let i = l("heralds");
      if (i) document.body.appendChild(i);

      if (Game.wrapper) {
        Game.wrapper.className = "offWeb";
        window.dispatchEvent(new Event("resize"));
      }

      async function j() {
        try {
          let k = await fetch(
            "https://api.allorigins.win/get?url=" +
              encodeURIComponent(
                "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1454400"
              )
          ),
            m = await k.json(),
            n = JSON.parse(m.contents).response.player_count;
          if (typeof Game !== "undefined") {
            Game.heralds = Math.min(100, Math.floor(n / 100));
            let o = l("heraldsAmount");
            if (o) {
              o.textContent = Game.heralds;
              o.style.fontSize = "12px";
            }
          }
        } catch {}
      }

      j();
      setInterval(j, 1e4);

      if (typeof Game !== "undefined") {
        Game.externalDataLoaded = true;
        Game.recalculateGains = 1;
      }
    })();

    if (App) l("heralds").style.display = "inline-block";

    let J = l("heralds");
    J.style.paddingTop = "4px";
    J.style.position = "absolute";
    J.style.top = "0px";
    J.style.right = "0px";
    J.style.width = "28px";
    J.style.textAlign = "center";
    l("leftBeam").appendChild(J);
  }
});

(function(){
    showAds = false;
    Music = false;
    WindowFocus = true;
    Steam = {};
    App = Steam;
    Steam.cloud = false;
    Steam.cloudQuota = '?';
    Steam.allowSteamAchievs = true;
    Steam.mods = {};
    Steam.modList = [];

    Steam.writeCloudUI = () => {
        return '<div class="listing" style="margin-bottom:-8px;">'
            + Game.WritePrefButton('cloudSave','cloudSaveButton',"Cloud saving ON","Cloud saving OFF",'')
            + '<label>(allow use of Steam Cloud for save backups)</label></div>'
            + '<div id="cloudIsOn" class="listing" style="display:none;">'
            + '<a class="option" style="font-size:11px;margin-left:12px;">Purge Cloud</a>'
            + '<label>Current Cloud use: <b>?</b></label></div>'
            + '<div id="cloudIsOff" class="listing" style="display:inline-block;font-size:11px;margin-left:12px;color:#c00;">No Cloud access at the moment.</div>'
            + '<div class="listing">'
            + Game.WritePrefButton(
                'discordPresence',
                'discordPresenceButton',
                "Discord status ON",
                "Discord status OFF",
                'Steam.toggleRichPresence(Game.prefs.discordPresence);'
            )
            + '<label>(if Discord is on, show your game info as activity status)</label></div>';
    };

    Steam.writeModUI = () => {
        return `<div style="text-align:center;">
            <a style="text-align:center;margin:4px;" class="option smallFancyButton" onclick="Steam.modsPopup();PlaySound('snd/tick.mp3');">${loc("Manage mods")}</a>
            <a style="text-align:center;margin:4px;" class="option smallFancyButton" onclick="Game.CheckModData();PlaySound('snd/tick.mp3');">${loc("Check mod data")}</a>
            <a style="text-align:center;margin:4px;" class="option smallFancyButton" onclick="Steam.workshopPopup();PlaySound('snd/tick.mp3');">${loc("Publish mods")}</a>
        </div>`;
    };

    Steam.modsPopup = function() {
        let mods = [];
        for (let id in Game.mods) {
            let mod = Game.mods[id];
            mods.push({
                name: mod.info?.Name || id,
                id: id,
                desc: mod.info?.Description || "",
                dependencies: mod.dependencies || [],
                disabled: mod.disabled || false,
                loc: true,
                workshop: true
            });
        }

        function renderModList(selectedIndex = -1) {
            let listEl = l("modList");
            if (!mods.length) {
                listEl.innerHTML = `<div style="font-size:11px;opacity:0.5;margin:8px;">(${loc("No mods loaded")})</div>`;
                return;
            }
            let html = "";
            mods.forEach((mod, i) => {
                html += `<div class="zebra mouseOver${i === selectedIndex ? ' selected pucker' : ''}" style="padding:4px;${mod.disabled ? 'opacity:0.5;background:rgba(255,0,0,0.2);' : ''}" id="mod-${i}"><b>${mod.name}</b></div>`;
            });
            listEl.innerHTML = html;
            mods.forEach((mod, i) => {
                AddEvent(l(`mod-${i}`), "click", () => {
                    renderModOptions(mod, i);
                });
            });
        }

        function renderModOptions(mod, index) {
            let el = l("modOptions");
            el.innerHTML = `
                <div class="name">${mod.name}</div>
                <div class="tag">ID: ${mod.id}</div>
                <div class="line"></div>
                <a class="option" id="modDisable">${mod.disabled ? loc("Enable") : loc("Disable")}</a>
                <a class="halfLeft option off">${loc("Priority up")}</a>
                <a class="halfRight option off">${loc("Priority down")}</a>
                ${mod.loc ? `<a class="option" id="modOpenFolder">${loc("Open folder")}</a>` : ""}
                ${mod.desc ? '<textarea readonly style="margin:4px;padding:4px 8px;width:80%;box-sizing:border-box;height:80px;font-size:11px;">' + mod.desc + '</textarea>' : ""}
                <div class="line" style="clear:both;"></div>
                ${mod.workshop ? `
                    <a class="option" id="modOpenWorkshop">${loc("Open Workshop page")}</a>
                    <a class="option" id="modUnsubscribeWorkshop">${loc("Unsubscribe")}</a>
                ` : `<div style="opacity:0.5;margin:4px;">${loc("Local mod")}</div>`}
            `;
            // The event listeners for the buttons have been removed
        }

        Game.Prompt(`
            <id ManageMods>
            <h3>${loc("Manage mods")}</h3>
            <div class="line"></div>
            <div style="overflow:hidden;clear:both;">
                <a class="option" style="float:left;">${loc("Open /mods folder")}</a>
                <a class="option" style="float:right;">${loc("Open Workshop")}</a>
            </div>
            <div style="font-size:11px;opacity:0.7;">${loc("Mods are loaded from top to bottom.")}</div>
            <div class="line"></div>
            <div style="height:300px;width:100%;position:relative;margin:12px 0px;">
                <div class="inner" style="font-size:11px;height:100%;width:50%;overflow-y:scroll;position:absolute;left:0px;" id="modList"></div>
                <div class="tight" style="font-size:11px;height:100%;width:50%;overflow-y:auto;position:absolute;right:0px;padding-left:10px;" id="modOptions">
                    ${loc("Select a mod.")}
                </div>
            </div>
        `, [[loc("Restart with new changes"), 0, 'display:none;'], loc("Back")], 0, 'widePrompt');
        renderModList();
    };

    Steam.workshopPopup = function() {
        Game.Prompt(`
            <id PublishMods>
            <h3>${loc("Publish mods")}</h3>
            <div class="line"></div>
            <div class="block" id="modDisplay">
                <div style="font-size:11px;">
                    ${tinyIcon([16,5])}<div></div>
                    ${loc("This tool allows you to upload new mods to the Steam Workshop.<br>You need to select a mod folder containing a properly-formatted %1 file.<br>See the included sample mods for examples.",'<b>info.txt</b>')}
                </div>
                <div class="line"></div>
                <div style="overflow:hidden;clear:both;">
                    <a class="option" style="display:block;font-weight:bold;">${loc("New mod")} - ${loc("Select folder")}</a>
                    <a class="option" style="display:block;font-weight:bold;">${loc("Update published mods")}...</a>
                </div>
            </div>
        `, [[loc("Back"), 'Steam.workshopPopup();', 'display:none;'], loc("Cancel")], 0, 'widePrompt');
    };
})();
