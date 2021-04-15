var lastListOfUsers = new Array();

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
          title: "List Users",
          contexts: ["browser_action"],
          id:"loadPeople"
    });
    chrome.contextMenus.create({
          title: "Unpin All",
          contexts: ["browser_action"],
          id:"unpinAll"
    });
}

function CreateListOfParticipants(list)
{
    chrome.contextMenus.create({
        title: "List Of People",
        contexts: ["browser_action"],
        id:"parent"
    });

    lastListOfUsers = list;
    for(var a=0; a<list.length; a++)
    {
        chrome.contextMenus.create({
            title: list[a],
            parentId: "parent",
            id:("person"+a),
            contexts: ["browser_action"]
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
        var numberID = info.menuItemId[info.menuItemId.length-1];
        var intNumberID = Number.parseInt(numberID, 16);
        
        //alert(lastListOfUsers[intNumberID]);
        ActionOnUser(intNumberID);
    }
});

function ActionOnUser(user)
{
    alert(lastListOfUsers[user]);

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "fix_user", id:user}, function(response) {
        });  
    });
}

function UnpinAllUsers()
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "unpin_user"}, function(response) {
        });  
    });
}