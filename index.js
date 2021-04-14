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

    /*var parent = windowsElements[0].parentElement;

    for(var a=0; a<windowsElements.length; a++)
    {
        parent.innerHTML+="<button interviewmeet='btn-pin' onclick='javascript:alert(\"Alerted\")'>AAAAA</button>";
    }*/
}

function RefreshWindowsFixedUI()
{

    for(var a=0; a<windowsElements.length; a++)
    {
        if(a<2)
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

window.setInterval(Update, 1000);
