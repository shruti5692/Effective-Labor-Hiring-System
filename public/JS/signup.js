function toggleOptions() {
    var userType = document.getElementById("userType").value;
    var workstationOption = document.getElementById("workstationOption");
    var laborOption = document.getElementById("laborOption");
    if (userType === "jobProvider") {
        workstationOption.style.display = "block";
    } else {
        workstationOption.style.display = "none";
    }
    if (userType === "labour") {
        laborOption.style.display = "block";
    } else {
        laborOption.style.display = "none";
    }
}

function signUpSubmitClicked() {
    var InputfirstName = document.getElementById("first-Name");
    var InputlastName = document.getElementById("last-Name");
    var Inputphone = document.getElementById("phone");
    var Inputadress = document.getElementById("adress");
    var InputuserType = document.getElementById("userType");
    var InputskillDescription = document.getElementById("skillDescription");
    var Inputworkstation = document.getElementById("workstation");
    var InputworkDescription = document.getElementById("workDescription");
    var Inputpassword = document.getElementById("password");


    
    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            firstName: InputfirstName.value,
            lastName: InputlastName.value,
            phone: Inputphone.value,
            address: Inputadress.value,
            userType: InputuserType.value,
            skillDescription: InputskillDescription.value,
            workstation: Inputworkstation.value,
            workDescription: InputworkDescription.value,
            password: Inputpassword.value
        })
    })
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                // Redirect to the login page
                window.location.href = "/login";
            } else {
                throw Error(response.statusText);
            }
        }).catch((error) => {
            console.log(error);
        });
}

