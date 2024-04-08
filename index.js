const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const feedbacks = document.querySelectorAll('.feedback');
const popup = document.querySelector('.success--wrapper');
const close = document.querySelector('.popup-close');
const mainContent = document.querySelector('.herobox__2');

//Output
const cardNumberOutput = document.querySelector('.cardNumber--data');
const cardHolderOutput = document.querySelector('.cardHolder--data');
const expiryMonthOutput = document.querySelector('.expMonth--data');
const expiryYearOutput = document.querySelector('.expYear--data');
const cvcOutput = document.querySelector('.cvc--data');


//Reguler expressions for the testing
const patterns = {
  cardHolderName: /^([a-zA-Z\s]+)(-[a-zA-Z]+)?$/,
  cardNumber: /^([0-9\s]{19})$/,
  expMonth: /^([0-9]{2})$/,
  expYear: /^([0-9]{2})$/,
  cvc: /^([0-9]{3})$/
};

//Validation function
function validate(field, regex){
    if (regex.test(field.value)) {
      field.className = null;
    } else if (field.value === "") {
      field.className = "invalid";
      feedbacks[inputs.indexOf(field)].textContent= "Can't be blank";
    } else {
      field.className = 'invalid';
      feedbacks[0].textContent= "Wrong Format, letters only";
      feedbacks[3].textContent= "Wrong Format";
      feedbacks[4].textContent= "Wrong Format, numbers only";
  
      if (inputs[1].value.length < 19) {
        feedbacks[1].textContent= "Must be 16 digits long";
      } else {
        feedbacks[1].textContent= "Wrong Format, numbers only";
      }
      
      if (Number(inputs[2].value) < 1 || Number(inputs[2].value) > 12) {
        feedbacks[2].textContent= "Must be a valid month";
      } else {
      feedbacks[2].textContent= "Wrong Format";
      }

    }
     
}

//Adding spaces to the card digits
function cardSpace(input){
    //Remove any existing spaces
    let value = input.value.replace(/\s/g, '');
    //Format the value with spaces after every 4 characters
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    //Update the input value
    input.value = formattedValue;
}


// Only allows form to submit when all values are valid
form.addEventListener('submit', e => {
    e.preventDefault();//Prevent page from refreshing by default after submiting

    let allFiiled = true;
    let inputFields = document.querySelectorAll('input[type="text"]');

    inputFields.forEach(inputField => {
      if (inputField.value === '') {
        allFiiled = false;
        return;
      }
    });

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
          inputs[i].className = 'invalid';
          feedbacks.textContent= "Can't be blank";
          popup.style.display= 'none';
        } 
        else if(inputs.value !== "" && patterns[inputs[i].attributes.name.value].test(inputs[i].value) && allFiiled) {
          inputs[i].className = null;
          mainContent.style.display= 'none';
          popup.style.display= 'block';
          //output values
          cardHolderOutput.textContent= inputs[0].value;  
          cardNumberOutput.textContent= inputs[1].value;  
          expiryMonthOutput.textContent= inputs[2].value;  
          expiryYearOutput.textContent= inputs[3].value;  
          cvcOutput.textContent= inputs[4].value;

          console.log(inputs[4].value, cvcOutput.textContent)
        } 
      };
    });
    
//Match each input field against a particular pattern
inputs.forEach(input => {
  input.addEventListener('keyup', e => {
    validate(e.target, patterns[e.target.attributes.name.value]);
  });
});
  
//popup close
close.addEventListener('click', () => {
  popup.style.display= 'none';
  mainContent.style.display= 'block';
  cardHolderOutput.textContent= "Jane Appleseed";  
  expiryMonthOutput.textContent= "MM";  
  cardNumberOutput.textContent= "1234 5678 9123 0000";  
  cvcOutput.textContent= "123"; 
  expiryYearOutput.textContent= "YY";  
});