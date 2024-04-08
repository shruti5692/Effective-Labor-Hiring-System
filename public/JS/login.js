

 function  LoginSubmitClicked() {
    var InputMobile= document.getElementById("mobileNo");
    var Inputpassword = document.getElementById("passw");
    
    

    console.log(InputMobile.value);
    var BODY = JSON.stringify({
        phone: InputMobile.value,
        password: Inputpassword.value
    })
    
     fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            phone: InputMobile.value,
            password: Inputpassword.value
        })
    })
    .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                console.log("Here");
                throw Error(response.statusText);
            }
        })
        .then((jsonResponse) => {
           
            localStorage.setItem("userData", JSON.stringify(jsonResponse.userData));
            
            
            if(jsonResponse.userData[0].userType==="labour"){
                window.location.href = "http://localhost:3000/lhome";
            }
            else{
                window.location.href = "http://localhost:3000/jhome";
            }
            
        }).catch((error) => {
            
            console.log(error);
        });
}
