function aboutLoaded() {

    var jhomeAboutNav = document.getElementById("jhomeAboutNav");
    var jobsearchAboutNav = document.getElementById("jobsearchAboutNav");
    var lhomeAboutNav = document.getElementById("lhomeAboutNav");
    var jhiringAboutNav = document.getElementById("jhiringAboutNav");

    var userData = JSON.parse(localStorage.getItem("userData"));
    var userType = userData[0].userType; 
    
    console.log(userType);

    if (userType === "labour") {
        lhomeAboutNav.style.display = "block";
        jobsearchAboutNav.style.display = "block";

    } else {
        jhomeAboutNav.style.display = "block";
        jhiringAboutNav.style.display = "block";
    }

}