
//==============
//  VARIABLES
//==============

var lastListOfUsers = new Array();
var numberSelected = 0;

const LABEL_HELP = "Ajuda/Instruções";
const LABEL_LIST_USERS = "Listar usuarios";
const LABEL_UNPIN_ALL = "Desfixar todos";
const LABEL_USER_LIST = "Lista de pessoas";

const ID_HELP = "help";
const ID_LOADPEOPLE = "loadPeople";
const ID_UNPINALL = "unpinAll";

//==============
//  FUNCTIONS
//==============

CreateMainOption();

function CallListOfParticipants()
{
    CreateMainOption();

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "request_users"}, function(response) {
            
            CreateListOfParticipants(response.farewell);
        });  
    });
}

function ClearList()
{
    chrome.contextMenus.removeAll();
}

function CreateMainOption()
{
    ClearList();
    chrome.contextMenus.create({
          title: LABEL_HELP,
          contexts: ["browser_action"],
          id:ID_HELP
    });
    chrome.contextMenus.create({
          title: LABEL_LIST_USERS,
          contexts: ["browser_action"],
          id:ID_LOADPEOPLE
    });
    chrome.contextMenus.create({
          title: LABEL_UNPIN_ALL,
          contexts: ["browser_action"],
          id:ID_UNPINALL
    });
}

function CreateListOfParticipants(list)
{
    chrome.contextMenus.create({
        title: LABEL_USER_LIST,
        contexts: ["browser_action"],
        id:"parent"
    });

    CreateAZList();

    lastListOfUsers = list;
    for(var a=0; a<list.length; a++)
    {
        chrome.contextMenus.create({
            title: list[a],
            parentId: "parent"+(list[a][0].toUpperCase()),
            id:("person"+a),
            contexts: ["browser_action"]
        });
    }
}

function CreateAZList()
{
    for(var a=0;a<26; a++)
    {
        var letter = String.fromCharCode(65+a);
        chrome.contextMenus.create({
            title: ""+letter,
            contexts: ["browser_action"],
            id:"parent"+letter,
            parentId: "parent"
        });
    }
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == ID_LOADPEOPLE) {
        CallListOfParticipants();
    }
    else if(info.menuItemId == ID_UNPINALL)
    {
        UnpinAllUsers();
    }
    else if(info.menuItemId.includes('person'))
    {
        var numberID = info.menuItemId.substr(6);
        var intNumberID = Number.parseInt(numberID, 16);
        
        ActionOnUser(intNumberID, info, tab);
    }
    else if(info.menuItemId == ID_HELP)
    {
        ShowHelp();
    }
});

function ActionOnUser(user, info, tab)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "fix_user", id:user}, function(response) {
            if(response.fixed)
            {
                CheckIfNeedToEnableAllOptions();
                chrome.contextMenus.update(info.menuItemId, {enabled: false});
            }
        });  
    });
}

function UnpinAllUsers()
{
    numberSelected=2;
    CheckIfNeedToEnableAllOptions();

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "unpin_user"}, function(response) {
        });  
    });
}


function CheckIfNeedToEnableAllOptions()
{
    numberSelected++;
    if(numberSelected>=2)
    {
        CallListOfParticipants();
        numberSelected=0;
    }
}

// Go to Instructions
function ShowHelp()
{
    chrome.tabs.create({  
        url: "https://github.com/Falme/InterviewMeetExtension/blob/main/README.md"
      });
}