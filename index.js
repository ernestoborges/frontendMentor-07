let tip = 0;
let bill = 0;
let nPeople = 0;

// remove refresh event on enter key pressed from form inputs
$('form input').on('keypress', function(e) {
    return e.which !== 13;
});

// money mask for bill input 
$(function() {
    $('#bill-input').maskMoney();
  });

// control the colors of selected tip button
for (var i = 0; i < $(".tip-item").length; i++) {
    $(".tip-item")[i].addEventListener("click", function(){
        for(var j = 0; j < $(".tip-item").length; j++){
            $(".tip-item")[j].classList.remove("tip-item-selected");
        }
        this.classList.add("tip-item-selected");
    });
}

// check if number of people is zero, show red text and change style if true
function checkNumber(value){
    if(value == 0){
        document.getElementById("text-input-id").classList.add("n-people-invalid");
        document.querySelector('.label-invalid').style.visibility = "visible";
    }else{
        document.getElementById("text-input-id").classList.remove("n-people-invalid");
        document.querySelector('.label-invalid').style.visibility = "hidden";
    }
};

// show and hide tip Custom Input on click 
const radioButtons = document.querySelectorAll("input[name=tipInput]");
radioButtons.forEach(function(radio){
    radio.addEventListener("click", function(){
        if(this.value == "custom"){
            document.querySelector(".tip-custom-label").style.display = "none";
            document.querySelector(".tip-text-input").style.display = "block";
        }else{
            document.querySelector(".tip-custom-label").style.display = "block";
            document.querySelector(".tip-text-input").style.display = "none";
            tip = this.value;
        }
        calcTip();
    });
});

// update tip value to Custom Tip input every time a key is pressed 
function checkCustom(value){
    tip = value;
};


// tip calc
function calcTip() {
    bill = document.getElementById("bill-input").value;
    nPeople = document.getElementById("n-people-input").value;

    tipList = document.getElementsByName("tipInput");
    
    for(let i = 0; i < tipList.length; i++){
        if(tipList[i].checked){
            if(tipList[i].value != "custom"){
                tip = tipList[i].value;
            }else{
                tip = document.querySelector(".tip-text-input").value;
            }
        }
    }

    bill = Number(bill.replace(/,/g, ''));
    tip = Number(tip);
    nPeople = Number(nPeople);

    let tipAmount = bill * ( tip / 100 ) / nPeople ;
    let totalBill = ( bill / nPeople ) + tipAmount; 

    if(nPeople > 0 && tipAmount >= 0 && totalBill >=0){
        document.getElementById("tip-amount").innerHTML = "$"+(Math.floor(tipAmount * 100) / 100).toFixed(2);
        document.getElementById("total-bill").innerHTML = "$"+totalBill.toFixed(2);
    }else{
        document.getElementById("tip-amount").innerHTML = "$-.--";
        document.getElementById("total-bill").innerHTML = "$-.--";
    }
    
}   

// calc the tip when enter is pressed
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        calcTip();
    }
});
