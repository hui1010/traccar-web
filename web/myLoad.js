window.onload = e=> {
    console.log("should prevent the default now");
    e.preventDefault();
};



var loginPage = document.getElementById("loginForm");
var mainPage = document.getElementById("container");



location.reload = function () {
    console.log("reloading.....");   
    if (!mainPage.hasAttribute("hide")){
        loginPage.classList.add(hide);
    }
}



loginClick = function(){
    //document.getElementById("container").classList.toggle("hide");
    loginPost('api/session');

}

//Need a logout button
logoutClick = function(){
    logout('api/session');
    document.getElementById("loginForm").classList.toggle("hide");
    document.getElementById("container").classList.toggle("hide");
}

loginPost = function(url){
    fetch(url, {
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: "email=" + document.getElementById("email").value + "&password=" + document.getElementById("password").value
    })
    .then(function(response){
        if (response.status !== 200){
            alert("ahhhh " + response.status);
            return;            
        }
        
        //hide login and show main page
        document.getElementById("container").classList.toggle("hide");//remove the hide class
        document.getElementById("loginForm").classList.toggle("hide"); //add the hide class
        
        getDevices('api/devices');
    }).catch(function(error){
        console.log("Request failed: ", error);
        //Add error message around the login fields instead of console
        
    });
}

getDevices = function(url){
    fetch(url)
        .then(
            function(response){
                if (response.status !== 200) {
                    console.log("Error, status code: " + response.status);
                    return;
                }
            
                response.json().then(function(data){
                    
                    console.log(data);
                  
                    //Display the data
                    data.forEach(element => {

                       for (var key in element) {
                           if (key === 'id' || key === 'name' || key === 'status') {
                               var node = document.createElement("P");
                                var textnode = document.createTextNode(key + ": " + element[key]);
                                node.appendChild(textnode);
                                document.getElementById("info").appendChild(node);
                           }
                        
                       }
                    });

                });
            })
        .catch(function(err){
            console.log("Fetch error: ", err);
        });    
}

logout = function(url){
    fetch(url, {
        method: 'delete'
    }).then(function(response){

        window.location.reload();

        if (response.status >= 500) {
            console.log("Server error, status code: " + response.status)
            return;
        }

        //Hide main page and show login page
    })
}


selectItems = function () {
    var choice = document.getElementById("selectItems").value;
    var notiSlected = false;
    var geoSlected = false;
    if(choice === "notifications") {
        
        openNotifications("api/notifications", notiSlected);
        notiSlected = true;
    }
    if (choice === "geofence") {
        
        openGeoFences("api/geofences", geoSlected);
        geoSlected = true;
    }
}


openNotifications = function (url, hasClicked) {
    fetch(url).then(function(response){
        if(response.status !== 200) {
            return;
        }
       // var hasClicked = false;
       /*
        if (!hasClicked) {
            var title = document.createElement("h2");
            var titleContent = document.createTextNode("Your notifications are:");
            title.appendChild(titleContent);
            document.getElementById("info").appendChild(title);
            response.json().then(data=>{
                data.forEach(element=>{
                    for(var key in element) {
                        var node = document.createElement("p");
                        var textnode = document.createTextNode(key + "-" + element[key]);
                        node.appendChild(textnode);
                        document.getElementById("info").appendChild(node);
                    }
                });
            })
            hasClicked = true;
        }
        */  

       if(!hasClicked) {
        showData(response, "notifications", "notifications");
        hasClicked = true;
        }
    })

}


openGeoFences = function (url, hasClicked) {
    fetch(url).then(function(response){
        if(response.status !== 200) {
            return;
        }
     //   var hasClicked = false; 
    /*    if (!hasClicked) {
            var title = document.createElement("h2");
            var titleContent = document.createTextNode("Your GeoFences are:");
            title.appendChild(titleContent);
            document.getElementById("info").appendChild(title);
            response.json().then(data=>{
                data.forEach(element=>{
                    for(var key in element) {
                        var node = document.createElement("p");
                        var textnode = document.createTextNode(key + "-" + element[key]);
                        node.appendChild(textnode);
                        document.getElementById("info").appendChild(node);
                    }
                });
            })
            hasClicked = true;
        }  */
        if(!hasClicked) {
            showData(response, "GeoFences", "geofences");
            hasClicked = true;
        }
        
    })
}


showData = function(response, attr, divId){
    
        var title = document.createElement("h2");
        var titleContent = document.createTextNode(`Your ${attr} are:`);
        title.appendChild(titleContent);
        document.getElementById("info").appendChild(title);
        response.json().then(data=>{
            data.forEach(element=>{
                for(var key in element) {
                    var node = document.createElement("p");
                    var textnode = document.createTextNode(key + "-" + element[key]);
                    node.appendChild(textnode);
                    document.getElementById(divId).appendChild(node);
                }
            });
        })
       
} 





