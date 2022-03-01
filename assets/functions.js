function validateLogin() {
    var username = document.getElementById("login_userName");
    var password = document.getElementById("login_password");
    var alert_null_un = document.getElementById("login_alert_un");
    var alert_null_pw = document.getElementById("login_alert_pw");
    var alert_fail = document.getElementById("login_alert_fail");
    var alert_success = document.getElementById("login_alert_success");

    alert_fail.hidden=true;
    alert_null_un.hidden=true;
    alert_null_pw.hidden=true;
    alert_success.hidden=true;

    if(username.value == "") {
        alert_null_un.hidden=false;
    } else if(password.value == "") {
        alert_null_pw.hidden=false;
    } else {
        window.location.href = "../pages/index.html";
        //db con
        //link to frontend backend
    }
}

function validateRegister() {
    var username = document.getElementById("login_userName");
    var password = document.getElementById("login_password");
    var alert_null_un = document.getElementById("login_alert_un");
    var alert_null_pw = document.getElementById("login_alert_pw");
    var alert_fail = document.getElementById("login_alert_fail");
    var alert_success = document.getElementById("login_alert_success");

    alert_fail.hidden=true;
    alert_null_un.hidden=true;
    alert_null_pw.hidden=true;
    alert_success.hidden=true;

    if(username.value == "") {
        alert_null_un.hidden=false;
    } else if(password.value == "") {
        alert_null_pw.hidden=false;
    } else {
        window.location.href = "../pages/index.html";
        //db con
        //link to frontend backend
    }
}