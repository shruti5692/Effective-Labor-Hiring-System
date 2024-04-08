function JobSearchLoaded() {


    fetch("http://localhost:3000/jobprovider/getall", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then((jsonResponse) => {
            assigntopage(jsonResponse.userData);
        }).catch((error) => {
            console.log(error);
        });



}

function assigntopage(userData) {
    var MainContainer = document.getElementById("jobList");

    let currentIndex = 0 ;
    userData.forEach(element => {
        const newCard = document.createElement('div');
        newCard.className = 'job-item';

        newCard.innerHTML = `
        <div class="card-content">
            <div class="labor-info">
                <h3>${element.firstName+" "+element.lastName}</h3>
                <p>Address: ${element.address}</p>
                <p>Workstation: ${element.workstation}</p>
                <p>${element.workDescription}</p>
            </div>
            <button class="apply-button">Apply</button>
        </div>
      
          
      `;
        MainContainer.appendChild(newCard);
        currentIndex+=1;
    });

}

function hireClicked(Index){
    console.log(Index);
}