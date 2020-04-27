window.onload = function(){
    this.getRes()
}

var input = document.getElementById("input");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("myBtn").click();
        }
});

function getRes(){

fetch("https://api.covid19api.com/summary")
.then(res => {
    if(res.ok){
        console.log('Success')
    }
    else{console.log("Not Successful")}
    return res.json();
})
.then( data => {

    let country = getInput();

    cntry = getCountry(data, data.Countries,country);
    
    if(cntry.Country == undefined){ 
        getContainer("c").innerHTML = "Global"; 
    }
    else{
    getContainer("c").innerHTML = cntry.Country;
    }
    console.log(cntry.Country);
    getContainer("nc").innerHTML = cntry.NewConfirmed;
    getContainer("tc").innerHTML = cntry.TotalConfirmed;
    getContainer("nd").innerHTML = cntry.NewDeaths;
    getContainer("td").innerHTML = cntry.TotalDeaths;
    getContainer("nr").innerHTML = cntry.NewRecovered;
    getContainer("tr").innerHTML = cntry.TotalRecovered;
}
)
.catch(error => console.log('ERROR'));
}

let getContainer = (con) => {
    return document.getElementById(con);
}
let getInput = () => {
    return document.getElementById('input').value;
}

let getCountry = (data, countries, country) => {
        
        let i;
        for(i=0; i<countries.length;i++){
            if(countries[i].Country.toUpperCase().
            localeCompare(country.toUpperCase()) == 0 ){
                return countries[i];
            }
        }

        return data.Global;
    };
   
