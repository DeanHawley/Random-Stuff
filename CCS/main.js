javascript:(function(){
    let a=new Audio("https://raw.githubusercontent.com/DeanHawley/Random-Stuff/refs/heads/main/hover.mp3");a.loop=true;a.play();let b=false;document.getElementById("bigCookie").addEventListener("click",function(){if(b)return;b=true;a.pause();let c=new Audio("https://raw.githubusercontent.com/DeanHawley/Random-Stuff/refs/heads/main/click.mp3");c.loop=true;c.play();});setInterval(function(){const noteDiv=Array.from(document.querySelectorAll('.listing')).find(div=>div.textContent.includes('Note: if you find a new bug after an update and you\'re using a 3rd-party add-on, make sure it\'s not just your add-on causing it!'));if(noteDiv){noteDiv.style.marginBottom='15px';}},1);setInterval(function(){var supportSection=document.getElementById('supportSection');if(supportSection)supportSection.remove();var warningSections=document.querySelectorAll('.listing.warning');if(warningSections.length>1)warningSections[1].remove();var buffs=document.getElementById('buffs');if(buffs)buffs.style.marginTop='20px';var ad=document.getElementById('support');if(ad)ad.remove();var shadow=document.querySelector('#store').previousElementSibling;if(shadow)shadow.remove();var store=document.getElementById('store');if(store){store.style.position='relative';store.style.marginTop='0';store.style.zIndex='100';}var linksBar=document.getElementById('topBar');if(linksBar){Array.from(linksBar.children).forEach(function(child){if(child.id!=='heralds'){child.remove();}});}var metaTag=document.createElement('meta');metaTag.name='viewport';metaTag.content='width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no';document.getElementsByTagName('head')[0].appendChild(metaTag);var heralds=document.getElementById('heralds');if(heralds){heralds.style.position='absolute';heralds.style.top='36px';heralds.style.left='29.4%';heralds.style.fontWeight='bold';heralds.style.zIndex='9999';heralds.style.border='none';heralds.style.boxShadow='none';heralds.style.transform='translateX(-3px)';}} ,1);Game.heralds=100;l('heraldsAmount').textContent=Game.heralds;Game.externalDataLoaded=true;Game.recalculateGains=1;const interval=setInterval(()=>{const heraldsAmount=document.getElementById('heraldsAmount');if(heraldsAmount){heraldsAmount.style.top=parseInt(window.getComputedStyle(heraldsAmount).top)-4+'px';clearInterval(interval);}},10);

    let inject=function(){
        if(document.getElementById('customSaveQuitButton')) return;
        let btn=document.createElement('a');
        btn.id='customSaveQuitButton';
        btn.className='option smallFancyButton';
        btn.textContent='Save & Quit';
        btn.onclick=function(){
            Game.toSave=true;
            PlaySound('snd/tick.mp3');
            window.location.href='https://www.google.com';
        };
        btn.style.marginBottom='7px';
        btn.style.marginTop='0px';
        let br=document.createElement('br');
        let saveBtn=document.querySelector('a.option.smallFancyButton[onclick*="Game.toSave"]');
        if(saveBtn){
            saveBtn.parentNode.insertBefore(br,saveBtn);
            saveBtn.parentNode.insertBefore(btn,br);
        }
        let fileSaveBtn=document.querySelector('a.option.smallFancyButton[onclick*="Game.FileSave"]');
        if(fileSaveBtn) fileSaveBtn.remove();
        let fileLoadInput=document.getElementById('FileLoadInput');
        if(fileLoadInput) fileLoadInput.parentNode.remove();
        let backupLabel=document.evaluate("//label[contains(text(),'Use this to keep backups on your computer')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
        if(backupLabel) backupLabel.remove();
        let warnLabel=document.evaluate("//label[contains(text(),'the game will ask you to confirm when you close the window')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
        if(warnLabel) warnLabel.remove();
        let warnButton=document.getElementById('warnButton');
        if(warnButton) warnButton.remove();
        let modLabel=document.evaluate("//label[contains(text(),'view and delete save data created by mods')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
        if(modLabel) modLabel.remove();

        let srLabel=document.evaluate("//label[contains(text(),'allows optimizations for screen readers')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
        if(srLabel){
            let subsection=document.createElement('div');
            subsection.className='subsection';
            subsection.style.padding='0px';
            let title=document.createElement('div');
            title.className='title';
            title.textContent='Mods';
            let listing=document.createElement('div');
            listing.className='listing';
            let wrapper=document.createElement('div');
            wrapper.style.display='flex';
            wrapper.style.justifyContent='center';
            wrapper.style.gap='8px';
            
            let left=document.createElement('a');
            left.className='option smallFancyButton';
            left.textContent='Manage mods';
            left.onclick=function(){
                PlaySound('snd/tick.mp3');
            };

            let checkModDataBtn = document.querySelector('a.option.smallFancyButton[onclick*="Game.CheckModData"]');
            if (checkModDataBtn) {
                wrapper.appendChild(left);
                wrapper.appendChild(checkModDataBtn);
            }
            
            let right=document.createElement('a');
            right.className='option smallFancyButton';
            right.textContent='Publish mods';
            right.onclick=function(){
                PlaySound('snd/tick.mp3');
            };

            wrapper.appendChild(right);
            listing.appendChild(wrapper);
            subsection.appendChild(title);
            subsection.appendChild(listing);
            srLabel.parentNode.insertBefore(subsection, srLabel.nextSibling);
        }

        let musicWrapper=document.createElement('div');
        musicWrapper.style.display='inline-flex';
        musicWrapper.style.alignItems='center';
        musicWrapper.style.gap='0px';
        musicWrapper.style.flexWrap='nowrap';
        musicWrapper.style.whiteSpace='normal';
        let musicBtn=document.createElement('a');
        musicBtn.id='customMusicButton';
        musicBtn.className='smallFancyButton prefButton option';
        musicBtn.onclick=function(){
            Game.Sound=!Game.Sound;
            updateMusicBtn();
            PlaySound('snd/tick.mp3');
        };
        let updateMusicBtn=()=>{ 
            musicBtn.textContent=Game.Sound?'Music in background ON':'Music in background OFF';
            musicBtn.style.opacity=Game.Sound?'1':'0.5';
        };
        updateMusicBtn();
        let musicLabel=document.createElement('label');
        musicLabel.textContent="(music will keep playing even when the game window isn't focused)";
        musicWrapper.appendChild(musicBtn);
        musicWrapper.appendChild(musicLabel);

        let fullBtn=document.createElement('a');
        fullBtn.id='customFullscreenButton';
        fullBtn.className='smallFancyButton prefButton option';
        fullBtn.style.display='block';
        fullBtn.style.marginBottom='2px';
        fullBtn.style.whiteSpace='nowrap';
        fullBtn.onclick=function(){
            if(!document.fullscreenElement){
                document.documentElement.requestFullscreen();
            }else{
                document.exitFullscreen();
            }
            PlaySound('snd/tick.mp3');
        };
        let updateFullBtn=()=>{
            fullBtn.textContent=document.fullscreenElement?'Fullscreen ON':'Fullscreen OFF';
            fullBtn.style.opacity=document.fullscreenElement?'1':'0.5';
        };
        document.addEventListener('fullscreenchange',updateFullBtn);
        updateFullBtn();
        let fancy=document.getElementById('fancyButton');
        if(fancy){
            fancy.parentNode.insertBefore(fullBtn,fancy);
            fancy.parentNode.insertBefore(musicWrapper,fullBtn);
        }
    };
    let observeMenu=function(){
        new MutationObserver(function(){
            if(Game.onMenu==='prefs'){
                inject();
            }
        }).observe(document.getElementById('menu'),{childList:true,subtree:true});
    };
    if(typeof Game!=='undefined'&&Game.UpdateMenu){
        inject();
        observeMenu();
    } else {
        let wait=setInterval(function(){
            if(typeof Game!=='undefined'&&Game.UpdateMenu&&document.getElementById('menu')){
                clearInterval(wait);
                inject();
                observeMenu();
            }
        },100);
    }
})();
