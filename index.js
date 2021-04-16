var windowsLength = 0;
var windowsElements = new Array();

var elementWindowID = "J3CtX";
var elementPinID = "VXdfxd";
var contentCameraClass = "p2hjYe";

var positionsForTwoPins = ["realocateWindowLeft", "realocateWindowRight"];

var listOfCalledElementsToPin = new Array();

function ReturnTwentyFour()
{
    return 24;
}

function Init()
{
    document.styleSheets[0].insertRule(".realocateCamera {width: 100% !important; height: 100% !important; top: 0px !important; }",0);
    document.styleSheets[0].insertRule(".realocateWindowLeft {left: 0% !important; top: 0px !important;}",0);
    document.styleSheets[0].insertRule(".realocateWindowRight {left: 50% !important; }",0);
}

function OnNumberWindowsChanged()
{
    windowsLength = document.querySelectorAll('[jscontroller="'+elementWindowID+'"]').length;
    windowsElements = document.querySelectorAll('[jscontroller="'+elementWindowID+'"]');
}

function RefreshWindowsFixedUI()
{
    if(listOfCalledElementsToPin.length < 2) return;

    for(var a=0,b=0; a<windowsElements.length; a++)
    {
        if(a==listOfCalledElementsToPin[0] || a==listOfCalledElementsToPin[1])
        {
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.width = "50%";
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.height = "100%";
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.top = "0";
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.opacity = "1";
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.display="block";

            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].classList.add(positionsForTwoPins[b]);
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"] .'+contentCameraClass)[a].classList.add("realocateCamera");
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"] .'+contentCameraClass)[a].style.left="0px";
            
            b++;
        } else {
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.display="none";
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.width = "0%";
        }
    }
}

window.onresize = function()
{
    RefreshWindowsFixedUI();
}

function RefreshWindowsUI()
{
    for(var a=0; a<windowsElements.length; a++)
        document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.display="block";
    
    window.dispatchEvent(new Event('resize'));
}

function RemoveAllClasses()
{
    var pinnedOne = document.querySelectorAll('.'+positionsForTwoPins[0]);
    var pinnedTwo = document.querySelectorAll('.'+positionsForTwoPins[1]);
    var cameraPins = document.querySelectorAll('.realocateCamera');

    for(var a=0; a<pinnedOne.length; a++)
        pinnedOne[a].classList.remove(positionsForTwoPins[0]);
        
    for(var a=0; a<pinnedTwo.length; a++)
        pinnedTwo[a].classList.remove(positionsForTwoPins[1]);

    for(var a=0; a<cameraPins.length; a++)
        cameraPins[a].classList.remove("realocateCamera");
}

function FixUserById(id)
{
    for(var a=0; a<windowsElements.length; a++)
    {
        if(a==id)
        {
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.width = "50%";
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.height = "100%";
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.left = positionsForTwoPins[a];
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.top = "0";
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.opacity = "1";
        } else {
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.display="none";
        }
    }
}

function Update()
{
    if(windowsLength != document.querySelectorAll('[jscontroller="'+elementWindowID+'"]').length)
        OnNumberWindowsChanged();

    RefreshWindowsFixedUI();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);

    if(message.action == "request_users")
    {
        var responseArray = new Array();
        
        for(var a=0; a<windowsElements.length; a++)
        responseArray[a] = windowsElements[a].querySelectorAll('[jscontroller="GQnsGd"]')[0].innerHTML;
        
        sendResponse({farewell:responseArray});
    }
    else if(message.action == "fix_user")
    {
        if(listOfCalledElementsToPin.length == 2) listOfCalledElementsToPin = new Array();
        listOfCalledElementsToPin.push(message.id);
    }
    else if(message.action == "unpin_user")
    {
        listOfCalledElementsToPin = new Array();
        RefreshWindowsUI();
        RemoveAllClasses();
    }
    return true
});

window.setInterval(Update, 100);
Init();


//var listenerAleatorio = getEventListeners(document.getElementsByTagName("body")[0]).mouseout[0].listener
//document.getElementsByTagName("body")[0].removeEventListener('mouseout', listenerAleatorio)