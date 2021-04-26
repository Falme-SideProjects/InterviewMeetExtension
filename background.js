var lastListOfUsers = new Array();

var numberSelected = 0;

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
          title: "Ajuda/Instruções",
          contexts: ["browser_action"],
          id:"help"
    });
    chrome.contextMenus.create({
          title: "Listar usuarios",
          contexts: ["browser_action"],
          id:"loadPeople"
    });
    chrome.contextMenus.create({
          title: "Desfixar todos",
          contexts: ["browser_action"],
          id:"unpinAll"
    });
}

function CreateListOfParticipants(list)
{
    chrome.contextMenus.create({
        title: "Lista de pessoas",
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
    for(var a=0;a<26; a++) console.log();
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
    if (info.menuItemId == "loadPeople") {
        CallListOfParticipants();
    }

    if(info.menuItemId == "unpinAll")
    {
        UnpinAllUsers();
    }
    
    if(info.menuItemId.includes('person'))
    {
        var numberID = info.menuItemId.substr(6);
        var intNumberID = Number.parseInt(numberID, 16);
        
        //alert(lastListOfUsers[intNumberID]);
        ActionOnUser(intNumberID, info, tab);
    }
    
    if(info.menuItemId == "help")
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

function ShowHelp()
{

}