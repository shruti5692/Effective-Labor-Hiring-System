function profileLoaded() {

    var jhomeProfileNav = document.getElementById("jhomeProfileNav");
    var jhiringProfileNav = document.getElementById("jhiringProfileNav");
   

    var lhomeProfileNav = document.getElementById("lhomeProfileNav");
    var jobsearchProfileNav = document.getElementById("jobsearchProfileNav");

    var userData = JSON.parse(localStorage.getItem("userData"));
    var userType = userData[0].userType; 
    

    if (userType === "labour") {
        lhomeProfileNav.style.display = "block";
        jobsearchProfileNav.style.display = "block";

    } else {
        jhomeProfileNav.style.display = "block";
        jhiringProfileNav.style.display = "block";
    }
    assignProfile(userData[0]);
}
function assignProfile(userData){
    
      var MainContainer = document.getElementById("profileDetails");

    
        const newCard = document.createElement('div');

        newCard.innerHTML = `
        
        <p><strong>Name:</strong> ${userData.firstName +" " + userData.lastName}</p>
        <p><strong>Address:</strong> ${userData.address}</p>
        <p><strong>Phone Number:</strong> ${userData.phone}</p>
        <p><strong>User Type:</strong> ${userData.userType}</p>
        
      
          
      `;
        MainContainer.appendChild(newCard);
        
    
}
function logout() {
    // Perform any logout-related actions here, such as clearing local storage or session data
    localStorage.clear();
    // Redirect the user to the login page
    window.location.href = "/login";
  }