var windowsLength = 0;
var windowsElements = new Array();

var elementWindowID = "J3CtX";
var elementPinID = "VXdfxd";
var contentCameraClass = "p2hjYe";

var listOfCalledElementsToPin = new Array();

function Start()
{
    document.styleSheets[0].insertRule(".realocateCamera {width: 100% !important; height: 100% !important; top: 0px !important; }",0);
    document.styleSheets[0].insertRule(".realocateWindow {left: 0% !important; top: 0px !important; float: left; position: relative !important; }",0);
    document.styleSheets[0].insertRule(".BodyInterview .xsj2Ff {left: 0% !important; top: 0px !important; float: left; position: relative !important; }", 0);
    document.styleSheets[0].insertRule(".BodyInterview .p2hjYe.TPpRNe {left: 0px !important; }", 0);
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
        var outerWindowElem = document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a];
        var innerWindowElem = document.querySelectorAll('[jscontroller="'+elementWindowID+'"] .'+contentCameraClass)[a];

        
        if(a==listOfCalledElementsToPin[0].id || a==listOfCalledElementsToPin[1].id)
        {
            CheckNameAndIndexMatch();

            outerWindowElem.style.width = "50%";
            outerWindowElem.style.height = "100%";
            outerWindowElem.style.top = "0";
            outerWindowElem.style.opacity = "1";
            outerWindowElem.style.display="block";

            outerWindowElem.classList.add("realocateWindow");
            innerWindowElem.classList.add("realocateCamera");
            innerWindowElem.style.left="0px";
            
            b++;
        } else {
            outerWindowElem.style.display="none";
            outerWindowElem.style.width = "0%";
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
    var pinned = document.querySelectorAll('.realocateWindow');
    var cameraPins = document.querySelectorAll('.realocateCamera');

    document.body.classList.remove("BodyInterview");

    for(var a=0; a<pinned.length; a++)
        pinned[a].classList.remove("realocateWindow");

    for(var a=0; a<cameraPins.length; a++)
        cameraPins[a].classList.remove("realocateCamera");
}

function FixUserById(id)
{
    for(var a=0; a<windowsElements.length; a++)
    {
        var elem = document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a];
        if(a==id)
        {
            elem.style.width = "50%";
            elem.style.height = "100%";
            elem.style.left = positionsForTwoPins[a];
            elem.style.top = "0";
            elem.style.opacity = "1";
        } else {
            elem.style.display="none";
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
        listOfCalledElementsToPin.push({id:message.id, userName:GetUserNameByIndex(message.id)});
        
        if(listOfCalledElementsToPin.length == 2)
            document.querySelectorAll('.EIlDfe.T3F3Rd')[0].classList.add("BodyInterview");
            
    }
    else if(message.action == "unpin_user")
    {   
        listOfCalledElementsToPin = new Array();
        RefreshWindowsUI();
        RemoveAllClasses();
    }
    return true
});

function GetUserNameByIndex(index)
{
    var elem = document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[index];
    var selfName = elem.querySelectorAll("[jscontroller='GQnsGd']")[0].innerHTML;
    return selfName;
}

function CheckNameAndIndexMatch()
{
    for(var a=0; a<listOfCalledElementsToPin.length; a++)
    {
        if(listOfCalledElementsToPin[a].id >= document.querySelectorAll('[jscontroller="'+elementWindowID+'"]').length) listOfCalledElementsToPin[a].id = 0;

        var elem = document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[listOfCalledElementsToPin[a].id];
        var selfName = elem.querySelectorAll("[jscontroller='GQnsGd']")[0].innerHTML;

        if(listOfCalledElementsToPin[a].userName != selfName)
        {
            console.log("Name Not Matched");
            var newId = GetUserIdByName(selfName);
            
            if(newId != -1) listOfCalledElementsToPin[a].id = newId;
        }
    }
}

function GetUserIdByName(nameUser)
{
    for(var a=0; a<document.querySelectorAll('[jscontroller="'+elementWindowID+'"]').length; a++)
    {
        var elem = document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[listOfCalledElementsToPin[a].id];
        var selfName = elem.querySelectorAll("[jscontroller='GQnsGd']")[0].innerHTML;

        if(nameUser == selfName) return a;
    }


    return -1;
}


window.setInterval(Update, 1000);
Start();