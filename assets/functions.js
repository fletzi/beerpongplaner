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
        clearFields_login();
        sessionStorage.setItem("login", "true");
        window.location.href = "../pages/backend.html";
        //db con
        //link to frontend backend
    }
}

function checkLoggedIn() {
    var loggedIn = sessionStorage.getItem("login");
    var btnLogin = document.getElementById("btn_login");
    var btnRegister = document.getElementById("btn_register");
    var btnUser = document.getElementById("btn_user");

    if(loggedIn == "true") {
        btnLogin.hidden=true;
        btnRegister.hidden=true;
        btnUser.hidden=false;
    } else {
        btnLogin.hidden=false;
        btnRegister.hidden=false;
        btnUser.hidden=true;
    }
}

function validateRegister() {
    var firstname = document.getElementById("reg_firstName");
    var lastname = document.getElementById("reg_lastName");
    var username = document.getElementById("reg_userName");
    var password = document.getElementById("reg_password");
    var password2 = document.getElementById("reg_password2");

    var alert_vn = document.getElementById("reg_alert_fn_null");
    var alert_ln = document.getElementById("reg_alert_ln_null");
    var alert_un = document.getElementById("reg_alert_un_null");
    var alert_un2 = document.getElementById("reg_alert_un");
    var alert_pw = document.getElementById("reg_alert_pw_null");
    var alert_pw2 = document.getElementById("reg_alert_pw");
    var alert_success = document.getElementById("reg_success");

    alert_vn.hidden=true;
    alert_ln.hidden=true;
    alert_un.hidden=true;
    alert_pw.hidden=true;
    alert_pw2.hidden=true;

    if(username.value == "") {
        alert_un.hidden=false;
    } else if(!username.value) {
        alert_un2.hidden=false;
    } else if(firstname.value == "") {
        alert_vn.hidden=false;
    } else if(lastname.value == "") {
        alert_ln.hidden=false;
    } else if(password.value == "") {
        alert_pw.hidden=false;
    } else if(password.value != password2.value) {
        alert_pw2.hidden=false
    } else {
        alert_success.hidden=false;
        clearFields_register();
    }
}

function clearFields_register() {
    document.getElementById("reg_firstName").value="";
    document.getElementById("reg_lastName").value="";
    document.getElementById("reg_userName").value="";
    document.getElementById("reg_password").value="";
    document.getElementById("reg_password2").value="";
}

function clearFields_login() {
    document.getElementById("login_userName").value="";
    document.getElementById("login_password").value="";
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

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})


//<-- Start Team Generator
function gatherTeam() {
    //Variable der zu füllenden Liste
    var ul = document.getElementById("generator_playerList");
    //Variable für erstelltes Listenelement
    var li = document.createElement("li");
    //Variable für den vom User eingebenen Spielernamen
    var playerName = document.getElementById("generator_playerName").value;

    //Falls der User keinen Namen eingegeben hat soll nichts passieren.
    if(playerName !== "") {
        //Ansonsten:
        //Erweitern der zu füllenden Liste um neues Listenelement
        ul.appendChild(li);
        //Befüllen des Listenelements mit vom User eingegebenen Spielernamen
        li.innerHTML = playerName;
        //Löschen der Eingabe des Users - Feld Reset
        document.getElementById("generator_playerName").value="";
    } else {}
}

function generateTeams() {
    //Array der vom User eingegebenen Spielernamen
    let arr = (Array.from(document.querySelectorAll("#generator_playerList > li")).map(el => el.innerHTML));
    //MittelIndex des Arrays aus eingegebenen Spielernamen
    let middleIndex = Math.ceil(arr.length / 2);
    //Variable der zu füllenden Liste für TeamA
    let ulTeamA = document.getElementById("generator_teamA");
    //Variable der zu füllenden Liste für TeamB
    let ulTeamB = document.getElementById("generator_teamB");

    //Generieren von Teams macht erst ab 2 oder mehr Spielern Sinn
    if(arr.length >= 2) {
        //Moderne Version des Fisher–Yates shuffle
        //Mischt das Array aus Spielernamen
        function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a; //Gibt das gemischte Array zurück
        }

        //Aufruf der Misch Funktion
        shuffle(arr);
        //Neues Array teamA wird mit dem Inhalt des gemischten Arrays (Inhalt von Stelle [0] bis zum Mittelpunkt) befüllt
        let teamA = arr.splice(0, middleIndex);
        //Neues Array teamB wird mit dem Inhalt des gemischten Arrays (ab dem Mittelpunkt) befüllt
        let teamB = arr.splice(-middleIndex);

        //Für jede Stelle des Arrays von teamA
        for (let i=0; i<teamA.length; i++) {
            //Wird ein neues Listenelement erstellt
            let liTeamA = document.createElement("li");
            //Und der zu befüllenden Liste für TeamA angefügt
            ulTeamA.appendChild(liTeamA);
            //Das innerHTML, also der Teil des Listenelements der für den Nutzer angezeigt wird bekommt den Wert, welcher an der entsprechenden Stelle im Array steht (bspw. Spieler1)
            liTeamA.innerHTML = teamA[i];
        }

        //Für jede Stelle des Arrays von teamB
        for (let j=0; j<teamB.length; j++) {
            //Wird ein neues Listenelement erstellt
            let liTeamB = document.createElement("li");
            //Und der zu befüllenden Liste für TeamB angefügt
            ulTeamB.appendChild(liTeamB);
            //Das innerHTML, also der Teil des Listenelements der für den Nutzer angezeigt wird bekommt den Wert, welcher an der entsprechenden Stelle im Array steht (bspw. Spieler1)
            liTeamB.innerHTML = teamB[j];
        }

        //Die Eingabe der Spielername in der Turniergenerator Card wird ausgeblendet
        document.getElementById("generator_1").hidden=true;
        //Die Anzeige der beiden generierten Teams wird eingeblendet
        document.getElementById("generator_2").hidden=false;
    } else {
        //Spieleranzahl < 2: Fehlermeldung wird angezeigt - "Du brauchst mindestens 2 Spieler!"
        document.getElementById("generator_alert_fail").hidden=false;
    }


}

function resetTeams() {
    //Die Eingabe der Spielername in der Turniergenerator Card wird eingeblendet
    document.getElementById("generator_1").hidden=false;
    //Die Anzeige der beiden generierten Teams wird ausgeblendet
    document.getElementById("generator_2").hidden=true;
    //Der Inhalt der Liste an vom Nutzer eingegebenen Spielernamen wird gelöscht
    document.getElementById("generator_playerList").innerHTML="";
    //Der Inhalt der Liste des generierten Teams A wird gelöscht
    document.getElementById("generator_teamA").innerHTML="";
    //Der Inhalt der Liste des generierten Teams B wird gelöscht
    document.getElementById("generator_teamB").innerHTML="";
}

function hideGeneratorAlert() {
    //Ggf. vorhandene Fehlermeldung wir mit Klick in Feld für Spielername (im Moment der Fehlerkorrektur) ausgeblendet
    document.getElementById("generator_alert_fail").hidden=true;
}
//--> Ende Team Generator

function validateTournament() {
    var create_tour_name = document.getElementById("create_tour_name");
    var create_tour_date = document.getElementById("create_tour_date");
    var create_tour_time = document.getElementById("create_tour_time");



}