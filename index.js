var windowsLength = 0;
var windowsElements = new Array();

var elementWindowID = "J3CtX";
var elementPinID = "VXdfxd";

var positionsForTwoPins = ["0%", "50%"];

var listOfCalledElementsToPin = new Array();

function ReturnTwentyFour()
{
    return 24;
}

function OnNumberWindowsChanged()
{
    windowsLength = document.querySelectorAll('[jscontroller="'+elementWindowID+'"]').length;
    windowsElements = document.querySelectorAll('[jscontroller="'+elementWindowID+'"]');
}

function RefreshWindowsFixedUI()
{
    if(listOfCalledElementsToPin.length < 2) return;

    for(var a=0; a<windowsElements.length; a++)
    {
        if(a==listOfCalledElementsToPin[0] || a==listOfCalledElementsToPin[1])
        {
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.width = "50%";
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.height = "100%";
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.left = positionsForTwoPins[a];
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.top = "0";
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.opacity = "1";
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.display="block";
        } else {
            document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.display="none";
        }
    }
}

function RefreshWindowsUI()
{
    for(var a=0; a<windowsElements.length; a++)
        document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.display="block";
    
    window.dispatchEvent(new Event('resize'));
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
    }
    return true
});

window.setInterval(Update, 1000);
