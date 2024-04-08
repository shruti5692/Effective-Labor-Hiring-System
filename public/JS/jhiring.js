function jHiringLoaded() {


    fetch("http://localhost:3000/labours/getall", {
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
    var MainContainer = document.getElementById("ListContainer");

    let currentIndex = 0 ;
    userData.forEach(element => {
        const newCard = document.createElement('div');
        newCard.className = 'card';

        newCard.innerHTML = `
            <img class="labor-image" src="../IMAGES/profileimg.png" alt="Laborer 1">
            <div class="card-content">
              <div class="labor-info">
                <h2>${element.firstName + " " +element.lastName }</h2>
                <p>${element.skillDescription}</p>
                <p>${element.address}</p>
                <div class="available"> Available</div>
              </div>
             
              <div class="hire-section">
                <div class="ratings">
                  <span class="rating">4.5</span>
                  <span class="stars">⭐⭐⭐⭐⭐</span>
                </div>
                <button class="hire-button" onclick="hireClicked(${currentIndex})">Hire</button>
                <div class="message-status" style="display: none;">
                    <i class="fas fa-check-circle checkmark-icon"></i>
                </div>
              </div>
            </div>
          
      `;
        MainContainer.appendChild(newCard);
        currentIndex+=1;
    });

}

function hireClicked(Index){
    console.log(Index);
    fetch("http://localhost:3000/sendsms", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            phoneNumber: "+918767896477",                   //
            message: "आमच्याकडे कामाची संधी आहे, तुम्ही इच्छुक असाल तर खालील नंबरवर संपर्क साधा. ८९८३४९४४०३"
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
           
            console.log(jsonResponse);
            // Show the checkmark icon for the corresponding card
            const hireSection = document.getElementsByClassName('hire-section')[Index];
            const messageStatus = hireSection.querySelector('.message-status');
            messageStatus.style.display = 'block';
            
        }).catch((error) => {
            
            console.log(error);
        });
}

