$(function(){

    // $("#devices").append("<h2>Your devices are: </h2>");

    getDevices = (url)=>{
        // console.log("Devices");
        fetch(url).then(
            (response) => {
                if(response.status !== 200) {
                    alert(`Something went wrong: ${response.status}`);
                    return;
                }
                // console.log("status is 200");
                response.json().then(
                     (data) => {
                //     // console.log(data);
                //     data.forEach((element) => {

                //         var $deviceDiv = $("<div id= device" + element["id"] +"></div>");
                //         $deviceDiv.appendTo($("#devices"));

                //         for(var key in element) {
                //             $("<p></p>").text(key + ": " + element[key]).appendTo($deviceDiv);            
                //         }

                //         switch(element["status"]) {
                //             case 'online': $("#device" + element["id"]).addClass("online");
                //                             break;
                //             case 'offline': $("#device" + element["id"]).addClass("offline");
                //                             break;
                //             case 'unknown': $("#device" + element["id"]).addClass("offline");
                //                             break;
                //             default: console.log("what a weird status you have hahaha");
                //         }

                //         $("<button>Edit device</button>").appendTo($deviceDiv).click(() => {
                //             updateDevices(element.id);
                //             // location.reload();
                //         });

                //         $("<button>Delete device</button>").appendTo($deviceDiv).click(() => {
                //             deleteDevices(element.id);
                //             location.reload();
                //         });

                //         $("<hr>").appendTo($("#devices"));
                //     })
                showData(data);
                 }
               
                )
            }
        ).catch(error => {
            console.log("Something went wrong", error);
        })
    }

    showData = (arr) => {
        arr.forEach((element) => {

            var $deviceDiv = $("<div id= device" + element["id"] +"></div>");
            $deviceDiv.appendTo($("#devices"));

            for(var key in element) {

                $("<p></p>").text(key + ": " + element[key]).appendTo($deviceDiv);
                
            }

            switch(element["status"]) {
                case 'online': $("#device" + element["id"]).addClass("online");
                                break;
                case 'offline': $("#device" + element["id"]).addClass("offline");
                                break;
                case 'unknown': $("#device" + element["id"]).addClass("offline");
                                break;
                default: console.log("what a weird status you have hahaha");
                
            }

            $("<button>Edit device</button>").appendTo($deviceDiv).click(() => {
                var currentDevice = element;
                var newName = window.prompt("New name for the device:");
                currentDevice.name = newName;

                updateDevices(element.id, currentDevice);
                location.reload();
            });

            $("<button>Delete device</button>").appendTo($deviceDiv).click(() => {
                deleteDevices(element.id);
                location.reload();
            });

            $("<hr>").appendTo($("#devices"));
        })
    };

    getDevices("api/devices");

    updateDevices = (id, device) => {
        fetch(`api/devices/${id}`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(device)
        }).then((response) => {
            if(response.status !== 200) {
               console.log("Update failed");
               alert("Update failed");
            } 
        }).catch(error => {
            console.log("Update failed", error)
        })
    }

    deleteDevices = (id) => {
        console.log("Device will be deleted " + id);
        fetch(`api/devices/${id}`, {
            method: 'delete'
        }).then((response) => {
            if(response.status === 204) {
                alert(`Your device ${id} is deleted now.`);
            }
        })
    }

    getName = () => {
        console.log("before getName");
        return $("#name").val();  
    }

    getIdentifier = () => {
        console.log("before getIdentifier");
        return $("#identifier").val();
    }

    getNewDevice = () => {
        var newDevice = {
            "name": getName(),
            "uniqueId": getIdentifier(),
            "status": "offline",
            "disabled": false,
            "lastUpdate": "2019-08-24T14:15:22Z",
            "positionId": 0,
            "groupId": 0,
            "phone": "",
            "model": "",
            "contact": "",
            "category": "",
            "geofenceIds": [
            0
            ],
            "attributes": { }        
        }
        return newDevice;
    }



    $("#addDeviceBtn").click(() => {
        var newDevice = getNewDevice();
        fetch(`api/devices`, {
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newDevice)
                
            
        }).then( response => {
            if(response.status !== 200) {
                console.log("Cannot add the device");
            }
            console.log("Adding it now");
            console.log(response);
            
        }).then(function(){
            showData([newDevice]);
        })
        
    })

    
})