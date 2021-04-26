var windowsLength = 0;
var windowsElements = new Array();

var elementWindowID = "J3CtX";
var elementPinID = "VXdfxd";
var contentCameraClass = "p2hjYe";
var pinElements = '[jscontroller="u36Osd"]';
var canPin = true;

var listOfCalledElementsToPin = new Array();

function Start()
{
    document.styleSheets[0].insertRule(".realocateCamera {"+
        "width: 100% !important; "+
        "height: 100% !important; "+
        "top: 0px !important; }",0);

    document.styleSheets[0].insertRule(".realocateWindow {"+
        "left: 0% !important; "+
        "top: 0px !important; "+
        "float: left; "+
        "position: relative !important; }",0);

    document.styleSheets[0].insertRule(".BodyInterview .xsj2Ff {"+
        "left: 0% !important; "+
        "top: 0px !important; "+
        "float: left; "+
        "position: relative !important; }", 0);

    document.styleSheets[0].insertRule(".BodyInterview .p2hjYe.TPpRNe {"+
        "left: 0px !important; }", 0);
}


function OnNumberWindowsChanged()
{
    windowsLength = document.querySelectorAll('[jscontroller="'+elementWindowID+'"]').length;
    windowsElements = document.querySelectorAll('[jscontroller="'+elementWindowID+'"]');

    RemoveAllPins();
}

function RemoveAllPins()
{
    if(!canPin)
    {
        for(var a=0; a<document.querySelectorAll(pinElements).length; a++)
        {
            document.querySelectorAll(pinElements)[a].style.display = "none";
        }
    }
}

function ShowAllPins()
{
    if(canPin)
    {
        for(var a=0; a<document.querySelectorAll(pinElements).length; a++)
        {
            document.querySelectorAll(pinElements)[a].style.display = "block";
        }
    }
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
        if(document.querySelectorAll('[jscontroller="'+elementWindowID+'"]').length > 1)
        {
            OnFixUser(message);
            sendResponse({fixed:true});
        } else 
        {
            sendResponse({fixed:false});
        }

    }
    else if(message.action == "unpin_user")
    { 
        canPin = true;
        listOfCalledElementsToPin = new Array();
        RefreshWindowsUI();
        RemoveAllClasses();
        ShowAllPins();
    }
    return true
});

function OnFixUser(message)
{
    canPin = false;
    if(listOfCalledElementsToPin.length == 2) listOfCalledElementsToPin = new Array();
    listOfCalledElementsToPin.push({id:message.id, userName:GetUserNameByIndex(message.id)});
    
    if(listOfCalledElementsToPin.length == 2)
        document.querySelectorAll('.EIlDfe.T3F3Rd')[0].classList.add("BodyInterview");
        
    RemoveAllPins();
}

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
        if(listOfCalledElementsToPin[a].id >= document.querySelectorAll('[jscontroller="'+elementWindowID+'"]').length)
        {
            listOfCalledElementsToPin[a].id = 0;
        }

        var elem = document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[listOfCalledElementsToPin[a].id];
        var selfName = elem.querySelectorAll("[jscontroller='GQnsGd']")[0].innerHTML;

        if(listOfCalledElementsToPin[a].userName != selfName)
        {
            console.log("Name Not Matched");
            console.log("ID :"+listOfCalledElementsToPin[0].id+", Name : "+listOfCalledElementsToPin[0].userName);
            console.log("ID :"+listOfCalledElementsToPin[1].id+", Name : "+listOfCalledElementsToPin[1].userName);
            var newId = GetUserIdByName(listOfCalledElementsToPin[a]);
            
            if(newId != -1) listOfCalledElementsToPin[a].id = newId;
        }
    }
}

function GetUserIdByName(user)
{
    for(var a=0; a<document.querySelectorAll('[jscontroller="'+elementWindowID+'"]').length; a++)
    {
        var elem = document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a];
        var selfName = elem.querySelectorAll("[jscontroller='GQnsGd']")[0].innerHTML;

        if(user.userName == selfName) return a;
    }


    return -1;
}


window.setInterval(Update, 1000);
Start();