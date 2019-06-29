// form variable is not actually needed, there
// are multiple ways of doing this kind of things

const form = {
    username: document.getElementById('username'),
    password: document.getElementById('password'),
    submit: document.getElementById('btn-submit'),
    messages: document.getElementById('form-messages'),
};

const myForm = document.getElementById('form');

myForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(myForm);

    //let responseObject = null;

    fetch('check-login.php', {
        method: 'post',
        body: formData
    })
    .then((res) => res.json())
    .then((data) => {
        handleResponse(data);
    })
    .catch((err) => {
        console.error("Could not parse JSON!");
    })

    const requestData = `username=${form.username.value}&password=${form.password.value}`;
    console.log(requestData);

});


function handleResponse(responseObject) {
    function createAlertMsg(alertType) {
        while(form.messages.firstChild) {
            form.messages.removeChild(form.messages.firstChild);
        }

        responseObject.messages.forEach((message) => {
            const div = document.createElement('div');
            const li = document.createElement('li');
            li.textContent = message;
            div.appendChild(li);
            div.classList.add("alert");
            div.classList.add(`alert-${alertType}`);
            div.style.marginLeft = "-2.5rem";
            form.messages.appendChild(div);
        });

        form.messages.style.display = "block";
    }


    if(responseObject.ok) {

        createAlertMsg("success");

        setTimeout(() => {
            //document.querySelector('.alert-success').remove();
            location.href = 'dashboard.html';
        }, 1450);

    } else {
        createAlertMsg("danger");
    }
}
