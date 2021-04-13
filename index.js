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

    //window.setTimeout(function()
    //{
        for(var a=0; a<windowsElements.length; a++)
        {
            if(a<2)
            {
                //document.querySelectorAll('[jscontroller="'+elementWindowID+'"] [jscontroller="'+elementPinID+'"]')[a].click();
                document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.width = "50%";
                document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.height = "100%";
                document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.left = positionsForTwoPins[a];
                document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.top = "0";
            } else {
                document.querySelectorAll('[jscontroller="'+elementWindowID+'"]')[a].style.display="none";
            }
        }
    //}, 500);
}

function Update()
{
    if(windowsLength != document.querySelectorAll('[jscontroller="'+elementWindowID+'"]').length)
        OnNumberWindowsChanged();

    RefreshWindowsFixedUI();
}

window.setInterval(Update, 1000);
