//Data Storage
var arrowPopupCreated = 'NO';
var arrowPopupoStatus = 0;
var arrowPopupContentHeight = 0;
var arrowPopupContentHeightDouble = 0;
var prodoContent = document.getElementById('prodoContent').innerHTML;
//Popup Templates
var arrowPopupTemplate = '<div id="arrowSlide" class="arrowSlide"><div id="arrowPopup" class="arrowPopup"><div id="popupLeftArrow" class="popupLeftArrow"></div><div id="popupRightArrow" class="popupRightArrow"></div><div id="arrowPopupContent" class="arrowPopupContent"></div></div></div>';
//Create popup from template
function createProdoPopup(prodoPopupType){
    if(prodoPopupType == 'ARROW'){
        try{
            document.getElementById('prodoBase').innerHTML = arrowPopupTemplate;
        }
        catch(err){}
        finally{
            document.getElementById('arrowPopupContent').innerHTML = prodoContent;
        }
        arrowPopupCreated = 'YES';
        return;
    }
    if(prodoPopupType == 'ALERT'){
        //Alert Type Popup
    }
}
//Cookie Management
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function createCookie(name, value, days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
}
//Open Popups
function prodoTimedTrigger(){
    if(arrowPopupoStatus == 0 && arrowPopupCreated == 'YES' ){
        showPopup();
        arrowPopupoStatus++;
    }
}function prodoTimed(triggerDelay){
    setTimeout(prodoTimedTrigger, triggerDelay*1000);
}
function prodoMouseoutTrigger(container){
    addEvent(document, "mouseout", function(e) {
        e = e ? e : window.event;
        var from = e.relatedTarget || e.toElement;
        if (!from || from.nodeName == container) {
            if(arrowPopupoStatus == 0 && arrowPopupCreated == 'YES' ){
                showPopup();
                arrowPopupoStatus++;
            }else{
            return null;
            }
        }
    });
}
function prodoScrollTrigger(){
    window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if(arrowPopupoStatus == 0 && arrowPopupCreated == 'YES' ){
                showPopup();
                arrowPopupoStatus++;
            }else{
                return null;
        }
    }
    };
}
//Close Popups - always manual
function closeProdoPopup(name, lifetime, delay){
    setTimeout(closeProdoPopupFinally, delay);
    createCookie(name, 'SHOWN', lifetime);
}
function hideProdoPopup(delay){
    setTimeout(closeProdoPopupFinally, delay);
}
function closeProdoPopupFinally(){
    hidePopup();
}


function prodoPopupInitiate(prodoPopupType){
    var name = document.getElementsByTagName('prodo')[0].getAttribute('name');
    var onetime = document.getElementsByTagName('prodo')[0].getAttribute('onetime');
    var lifetime = document.getElementsByTagName('prodo')[0].getAttribute('lifetime');
    var container = document.getElementsByTagName('prodo')[0].getAttribute('triggeringContainer');
    var triggerDelay = document.getElementsByTagName('prodo')[0].getAttribute('triggerDelay');
    
    var popUpState = getCookie(name);
    if( popUpState == "" && onetime == "YES"){
        createCookie(name, 'FRESH', lifetime);
    }
    else if( popUpState == "SHOWN" && onetime == "YES"){
        return null;
    }
    
    if(arrowPopupCreated == 'NO'){
        createProdoPopup(prodoPopupType);
    }
    
    bindTrigger(container, triggerDelay);
}

function bindTrigger(container, triggerDelay){
    prodoTimed(triggerDelay);
    prodoMouseoutTrigger(container);
    prodoScrollTrigger();
}

//---------------------SHOW_popup---------------------------------//
function showPopup(){
arrowPopupContentHeight = $('#arrowPopupContent').height();
arrowPopupContentHeightDouble = arrowPopupContentHeight + arrowPopupContentHeight;
document.getElementById('prodoBase').style.zIndex = '9999999';
document.getElementById('prodoBase').style.visibility = 'visible';
document.getElementById('popupLeftArrow').style.height = arrowPopupContentHeightDouble + 'px';
document.getElementById('popupRightArrow').style.height = arrowPopupContentHeightDouble + 'px';
setTimeout(showPopupStag1, 9);
setTimeout(showPopupStag4, 400);
}
function showPopupStag1(){
document.getElementById('prodoBase').className = "prodoBase stable";
document.getElementById('arrowSlide').className = "arrowSlide stable";
setTimeout(showPopupStag2, 10);
}
function showPopupStag2(){
document.getElementById('blurFilter').className = "blurFilter poped";
setTimeout(showPopupStag3, 300);
}
function showPopupStag3(){
document.getElementById('popupLeftArrow').className = "popupLeftArrow stable";
document.getElementById('popupRightArrow').className = "popupRightArrow stable";
document.getElementById('popupLeftArrow').style.height = arrowPopupContentHeight + 'px';
document.getElementById('popupRightArrow').style.height = arrowPopupContentHeight + 'px';
}
function showPopupStag4(){
document.getElementById('arrowPopupContent').className = "arrowPopupContent stable";
alertSound.playclip();
}
//---------------------HIDE_popup---------------------------------//
function hidePopup(){
document.getElementById('arrowPopupContent').className = "arrowPopupContent";
setTimeout(hidePopupStage1, 400);
}
function hidePopupStage1(){
document.getElementById('popupLeftArrow').className = "popupLeftArrow arrowFade";
document.getElementById('popupRightArrow').className = "popupRightArrow arrowFade";
document.getElementById('popupLeftArrow').style.height = arrowPopupContentHeightDouble + 'px';
document.getElementById('popupRightArrow').style.height = arrowPopupContentHeightDouble + 'px';
setTimeout(hidePopupStage2, 150);
}
function hidePopupStage2(){
document.getElementById('arrowSlide').className = "arrowSlide gone";
setTimeout(hidePopupStage3, 150);
}
function hidePopupStage3(){
document.getElementById('prodoBase').className = "prodoBase";
document.getElementById('blurFilter').className = "blurFilter";
setTimeout(hidePopupStage4, 200);
}
function hidePopupStage4(){
document.getElementById('prodoBase').style.visibility = 'hidden';
document.getElementById('prodoBase').style.zIndex = '-9';
}