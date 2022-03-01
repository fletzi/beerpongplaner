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
    var firstname = document.getElementById("reg_firstName");
    var lastname = document.getElementById("reg_lastName");
    var username = document.getElementById("reg_userName");
    var password = document.getElementById("reg_password");

    var alert_fail = document.getElementById("login_alert_fail");
    var alert_success = document.getElementById("login_alert_success");

    alert_fail.hidden=true;
    alert_success.hidden=true;

    if(firstname.value == "") {
        alert_null_un.hidden=false;
    } else if(lastname.value == "") {
        alert_null_pw.hidden=false;
    } else if(username.value == "") {

    } else if(password.value == "") {

    }
}

function showPw() {
    var btn_show = document.getElementById("button_sp")
    var btn_hide = document.getElementById("button_sp_null")

    document.getElementById("reg_password").type="text"
    document.getElementById("reg_password2").type="text"
    btn_show.hidden=true;
    btn_hide.hidden=false;
}

function hidePw() {
    var btn_show = document.getElementById("button_sp")
    var btn_hide = document.getElementById("button_sp_null")

    document.getElementById("reg_password").type="password"
    document.getElementById("reg_password2").type="password"
    btn_show.hidden=false;
    btn_hide.hidden=true;
}