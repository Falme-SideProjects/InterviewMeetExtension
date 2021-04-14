chrome.contextMenus.removeAll();
chrome.contextMenus.create({
      title: "List Users",
      contexts: ["browser_action"],
      onclick: function() {
        sendFirst();
    }
});

function sendFirst()
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "request_users"}, function(response) {
            
            var mesRes = "";
            for(var a=0; a<response.farewell.length; a++)
            {
                mesRes+= response.farewell[a]+",";
            }

            alert(mesRes);
        });  
    });
}