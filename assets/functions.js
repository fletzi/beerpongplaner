/**
 * <h3>Speichert alle values eines json Dokuments in einem Array
 * @param {json} json Dokument dessen values in Array gespeichert werden sollen
 **/
function json2array(json){
    //Erzeugen eines leeren Arrays
    var result = [];
    //Speichern einer Liste der Objektnamen aus dem übergebenen json Dokument
    var keys = Object.keys(json);
    //Für jeden Objektnamen der Liste keys
    keys.forEach(function(key){
        //Wird die entsprechende value des jeweiligen keys dem Array result angefügt
        result.push(json[key]);
    });
    //Zurückgeben des mit values gefüllten Arrays
    return result;
}

/**
 * <h3>Validiert die Nutzereingaben der Login-Maske > login.html
 **/
function validateLogin() {
    //Speichern der Login Felder in Variablen
    var username = document.getElementById("login_userName");
    var password = document.getElementById("login_password");

    //Speichern der Alerts des Logins in Variablen
    var alert_null_un = document.getElementById("login_alert_un");
    var alert_null_pw = document.getElementById("login_alert_pw");
    var alert_fail = document.getElementById("login_alert_fail");
    var alert_success = document.getElementById("login_alert_success");

    //Ausblenden aller Login Alerts (für den Fall, dass diese aus einen vorherigen Funktionsaufruf eingeblendet waren)
    alert_fail.hidden=true;
    alert_null_un.hidden=true;
    alert_null_pw.hidden=true;
    alert_success.hidden=true;

    //Falls das Feld username leer ist
    if(username.value === "") {
        //einblenden des entsprechenden Alerts
        alert_null_un.hidden=false;
    //Falls das Feld password leer ist
    } else if(password.value === "") {
        //einblenden des entsprechenden Alerts
        alert_null_pw.hidden=false;
    //Falls alle anderen Bedingungen nicht erfüllt sind (die Login Maske korrekt ausgefüllt wurde)
    } else {
        //Der Code innerhalb der document.ready Funktion wird erst ausgeführt sobald Das Document Object Model bereit ist JavaScript Code auszuführen
        $(document).ready(function() {
            //Übertrag der vom User eingetragenen Feldinhalte in das json Format
            var parsedJson = JSON.stringify({username: username.value, password: password.value});

            //Senden der vom User eingetragenen Feldinhalte im json Format an den entsprechenden Endpunkt des Backends
            $.ajax('http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/auth/login', {
                async: false,
                type: "POST",
                data: parsedJson,
                dataType: "json",
                contentType: "application/json",
                //Behandlung der unterschiedlichen Status Codes, welche vom Backend als Antwort auf das Senden des json Dokumentes kommen
                statusCode: {
                    // 400 = Bad Request
                    400: function () {
                        alert("400 - Bad Request");
                    },
                    // 403 = Forbidden (Gesendeter Username und Passwort sind in dieser Kombination nicht in der Datenbank vorhanden)
                    403: function () {
                        //Löschen der Login Feldinhalte für Korrektur der Eingabe durch den User
                        clearFields_login()
                        //Einblenden des Entsprechende Alerts
                        alert_fail.hidden=false;
                    }
                },
                // statusCode: 200 - OK (Gesendeter Username und Passwort stimmen mit Datenbankeintrag überein)
                success: function(data) {
                    //Speichern des responseTexte in ein Array
                    var arr = json2array(data);

                    //Speichern des im responseText übermittelten Authentifizierungstokens im sessionStorage
                    sessionStorage.setItem("token", "Bearer "+arr[0]);
                    //alert(sessionStorage.getItem("token"));
                    //Im sessionStorage Speichern, dass der Nutzer eingeloggt ist
                    sessionStorage.setItem("login", "true");
                    //Weiterleitung des Nutzers auf das Dashboard
                    window.location.href = "../pages/backend.html";
                }
            });
        });
    }
}

/**
 * <h3>Überprüft bei Seitenaufruf/-wechsel ob sich ein User bereits eingeloggt hat
 **/
function checkLoggedIn() {
    //Speichern der zum key login gehörenden value aus dem sessionStorage in einer Variable
    var loggedIn = sessionStorage.getItem("login");
    //Speichern des Login-Buttons & des Registrieren-Buttons sowie des Buttons für eingeloggte Nutzer
    var btnLogin = document.getElementById("btn_login");
    var btnRegister = document.getElementById("btn_register");
    var btnUser = document.getElementById("btn_user");

    //Falls die value des keys "login" true ist
    if(loggedIn === "true") {
        //Ausblenden des Login- & Registrierungs-Buttons
        btnLogin.hidden=true;
        btnRegister.hidden=true;
        //Einblenden des Buttons für eingeloggte Nutzer
        btnUser.hidden=false;
    //Falls die value des keys "login" nicht "login" ist
    } else {
        //Einblenden des Login- & Registrierungs-Buttons
        btnLogin.hidden=false;
        btnRegister.hidden=false;
        //Ausblenden des Buttons für eingeloggte Nutzer
        btnUser.hidden=true;
    }
}

/**
 * <h3>Validiert die Nutzereingaben der Registrierungs-Maske > register.html
 **/
function validateRegister() {
    //Speichern Felder der Registrierung in Variablen
    var firstname = document.getElementById("reg_firstName");
    var lastname = document.getElementById("reg_lastName");
    var username = document.getElementById("reg_userName");
    var password = document.getElementById("reg_password");
    var password2 = document.getElementById("reg_password2");

    //Speichern der Alerts der Registrierung in Variablen
    var alert_vn = document.getElementById("reg_alert_fn_null");
    var alert_ln = document.getElementById("reg_alert_ln_null");
    var alert_un = document.getElementById("reg_alert_un_null");
    var alert_pw = document.getElementById("reg_alert_pw_null");
    var alert_pw2 = document.getElementById("reg_alert_pw");
    var alert_reg_success = document.getElementById("reg_success");
    var alert_un_taken = document.getElementById("reg_alert_un_taken")

    //Ausblenden aller Registrierung Alerts (für den Fall, dass diese aus einen vorherigen Funktionsaufruf eingeblendet waren)
    alert_vn.hidden = true;
    alert_ln.hidden = true;
    alert_un.hidden = true;
    alert_un_taken.hidden = true;
    alert_reg_success.hidden = true;
    alert_pw.hidden = true;
    alert_pw2.hidden = true;

    //Falls das Feld username leer ist
    if (username.value === "") {
        //einblenden des entsprechenden Alerts
        alert_un.hidden = false;
    //Falls das Feld firstname leer ist
    } else if (firstname.value === "") {
        //einblenden des entsprechenden Alerts
        alert_vn.hidden = false;
    //Falls das Feld lastname leer ist
    } else if (lastname.value === "") {
        //einblenden des entsprechenden Alerts
        alert_ln.hidden = false;
    //Falls das Feld password leer ist
    } else if (password.value === "") {
        //einblenden des entsprechenden Alerts
        alert_pw.hidden = false;
    //Falls das Feld password2 nicht mit dem Inhalt des Feldes password übereinstimmt
    } else if (password.value !== password2.value) {
        //einblenden des entsprechenden Alerts
        alert_pw2.hidden = false
    //Falls alle anderen Bedingungen nicht erfüllt sind (die Registrierung korrekt ausgefüllt wurde)
    } else {
        //Der Code innerhalb der document.ready Funktion wird erst ausgeführt sobald Das Document Object Model bereit ist JavaScript Code auszuführen
        $(document).ready(function() {
        //Übertrag der vom User eingetragenen Feldinhalte in das json Format
        var parsedJson = JSON.stringify({username: username.value, firstName: firstname.value, lastName: lastname.value, password: password.value});

        //Aufruf der ajaxPost Funktion sowie speichern der Return Value
        var statusCode = ajaxPost('http://5a3151e9-34c0-4909-b32a-c693469214dd.ma.bw-cloud-instance.org/api/auth/register', parsedJson);

        //Verhalten je nach rückgemeldetem statusCode des Backends
        switch (statusCode) {
            // 200 = OK
            case 200:
                //Einblenden des Alerts für eine erfolgreiche Registrierung
                alert_reg_success.hidden = false;
                //Leeren aller Felder
                clearFields_register();
                break;
            // 400 = Bad Request
            case 400:
                //Einblenden des entsprechenden Alerts
                alert_un_taken.hidden = false;
                //Löschen des Feldinhalts des Feldes username - für Korrektur der Eingabe
                document.getElementById("reg_userName").value = "";
                break;
            // Andere Status Codes werden von der Funktion nicht erwartet
            default:
                alert("Unerwarteter Fehler");
        }
        });
    }
}

/**
 * <h3> Sendet das übergebene json Dokument per "post-request" and die übergebene URL
 *
 * @param {url} url Endpunkt welcher von der jquery Funktion .ajax angesprochen werden soll
 * @param {json} parsedJson json Dokument welches gesendet werden soll
 **/
function ajaxPost(url, parsedJson) {
    var statusCode = 0;
        //Senden der vom User eingetragenen Feldinhalte im json Format an den entsprechenden Endpunkt des Backends
        $.ajax(url, {
            async: false,
            type: "POST",
            data: parsedJson,
            dataType: "json",
            contentType: "application/json",
            //Behandlung der unterschiedlichen Status Codes, welche vom Backend als Antwort auf das Senden des json Dokumentes kommen
            statusCode: {
                // 200 = OK
                200: function () {
                    statusCode = 200;
                },
                // 400 = Bad Request
                400: function () {
                    statusCode = 400;
                },
                // 403 - Forbidden
                403: function () {
                    statusCode =403;
                }
            }
        });
    //Rückgabe des statusCodes
    return statusCode;
}

/**
 * <h3> Löscht die Feldinhalte der Registrierung
 **/
function clearFields_register() {
    document.getElementById("reg_firstName").value="";
    document.getElementById("reg_lastName").value="";
    document.getElementById("reg_userName").value="";
    document.getElementById("reg_password").value="";
    document.getElementById("reg_password2").value="";
}

/**
 * <h3> Löscht die Feldinhalte des Logins
 **/
function clearFields_login() {
    document.getElementById("login_userName").value="";
    document.getElementById("login_password").value="";
}

/**
 * <h3> Stellt die eingegebenen Passwörter in der Registrierungsmaske in Klartext dar
 **/
function showPw() {
    //Speichern der Buttons zum Ein- & Ausblenden der Passwörter als Klartext in Variablen
    var btn_show = document.getElementById("button_sp")
    var btn_hide = document.getElementById("button_sp_null")

    //Ändern des Feldtyps der Felder "Passwort" und "Passwort Wiederholen" zum Typ text - Feldinhalt wird in Klartext dargestellt
    document.getElementById("reg_password").type="text"
    document.getElementById("reg_password2").type="text"
    //Ausblenden des Buttons zum Einblenden der Passwörter
    btn_show.hidden=true;
    //Einblenden des Buttons zum Ausblenden der Passwörter
    btn_hide.hidden=false;
}

/**
 * <h3> Stellt die eingegebenen Passwörter in der Registrierungsmaske als Punkte dar
 **/
function hidePw() {
    //Speichern der Buttons zum Ein- & Ausblenden der Passwörter als Klartext in Variablen
    var btn_show = document.getElementById("button_sp")
    var btn_hide = document.getElementById("button_sp_null")

    //Ändern des Feldtyps der Felder "Passwort" und "Passwort Wiederholen" zum Typ password - Feldinhalt wird durch Punkte dargestellt
    document.getElementById("reg_password").type="password"
    document.getElementById("reg_password2").type="password"
    //Einblenden des Buttons zum Einblenden der Passwörter
    btn_show.hidden=false;
    //Ausblenden des Buttons zum Ausblenden der Passwörter
    btn_hide.hidden=true;
}


/**
 * <h3> Funktion des Teamgenerators:
 * <p> Befüllt eine Liste mit dem vom User eingegebenen Spielernamen
 **/
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

/**
 * <h3> Funktion des Teamgenerators:
 * <p> Generiert zwei zufällig zusammengesetze Teams aus den eingegebene Spielernamen
 * <p> und stellt diese in zwei Listen dar
 **/
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

/**
 * <h3> Funktion des Teamgenerators:
 * <p> Versetzt den Teamgenerator in den Ausgangsstatus
 **/
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

/**
 * <h3> Funktion des Teamgenerators:
 * <p> Versteckt Alert im Moment der Fehlerkorrektur durch den User
 **/
function hideGeneratorAlert() {
    //Ggf. vorhandene Fehlermeldung wir mit Klick in Feld für Spielername (im Moment der Fehlerkorrektur) ausgeblendet
    document.getElementById("generator_alert_fail").hidden=true;
}
//--> Ende Team Generator

/**
 * <h3> Validiert die Eingaben der Turnieranlage
 **/
function validateTournament() {
    //Speichern der Date Validation Flag mit dem Wert false - "Das eingegeben Datum ist noch nicht validiert"
    var dateVal = false;

    //Speichern des heutigen Datums
    var now = new Date();

    //Aufteilen des Datums in Jahr, Monat & Tag
    var y = now.getFullYear().valueOf();
    var m = now.getMonth().valueOf();
    var d = now.getDate().valueOf();
    m = m+1;

    //Speichern des vom User eingegebenen Datums
    var create_tour_date = document.getElementById("create_tour_date").value.split("-");

    //Aufteilen des Datums in Jahr, Monat & Tag
    var y2 = parseInt(create_tour_date[0]);
    var m2 = parseInt(create_tour_date[1]);
    var d2 = parseInt(create_tour_date[2]);

    //Speichern des vom User eingegebenen Turniertitels
    var create_tour_name = document.getElementById("create_tour_name");

    //Speichern der Alerts der Turnieranlage in Variablen
    var create_tour_alert_name = document.getElementById("create_tour_alert_name");
    var create_tour_alert_date = document.getElementById("create_tour_alert_date");
    var create_tour_alert_nodate = document.getElementById("create_tour_alert_nodate");
    var create_tour_alert_time = document.getElementById("create_tour_alert_time");
    var create_tour_alert_notime = document.getElementById("create_tour_alert_notime");

    //Wenn das Feld Turniername leer ist
    if(create_tour_name.value === "") {
        //Einblenden des entsprechenden Alerts
        create_tour_alert_name.hidden = false;
    //Wenn das Feld Datum leer ist
    } else if(create_tour_date[0] === ""){
        //Einblenden des entsprechenden Alerts
        create_tour_alert_nodate.hidden = false;
    //Wenn das eingegeben Jahr in der Vergangenheit liegt
    } else if(y2 < y) {
        //Einblenden des entsprechenden Alerts
        create_tour_alert_date.hidden = false;
    //Wenn das eingegebene Jahr größer ist als das jetzige
    } else if(y2 > y) {
        //Setzen der Date Validation Flag auf true, da das eingegebene Datum nicht mehr in der Vergangenheit liegen kann (egal welcher Monat oder Tag)
        dateVal = true;
    //Wenn das eingegebene Jahr dem jetzigen entspricht
    } else if(y2 === y) {
        //Wenn der eingegebene Monat dem jetzigen entspricht
        if (m2 === m) {
            //Und der eingegebenen Tag kleiner ist als der jetzige
            if (d2 < d) {
                //Einblenden des entsprechenden Alerts (Datum liegt in der Vergangenheit)
                create_tour_alert_date.hidden = false;
            } else {
                //Ansonsten: Setzen der Date Validation Flag auf true, da das eingegebene Datum nicht in der Vergangenheit liegt
                dateVal = true;
            }
        //Wenn der eingegebene Monat kleiner ist als der jetzige
        } else if(m2 < m) {
            //Einblenden des entsprechenden Alerts (Datum liegt in der Vergangenheit)
            create_tour_alert_date.hidden = false;
        } else {
            //Ansonsten: Setzen der Date Validation Flag auf true, da das eingegebene Datum nicht mehr in der Vergangenheit liegen kann (egal welcher Tag)
            dateVal = true;
        }
    }

    //Aktuelle Uhrzeit in Stunden ud Minuten aufteilen
    var hh = now.getHours().valueOf();
    var mm = now.getMinutes().valueOf();

    //Vom User eingegebene Uhrzeit speichern
    var create_tour_time = document.getElementById("create_tour_time").value.split(":");

    //Eingegebene Uhrzeit in Stunden ud Minuten aufteilen
    var hh2 = parseInt(create_tour_time[0]);
    var mm2 = parseInt(create_tour_time[1]);

    //Wenn das eingegebene Datum nicht in der Vergangenheit liegt: überprüfen der eingebenden Uhrzeit
    if(dateVal === true) {
        //Wenn die eingegebene Uhrzeit leer ist
        if(create_tour_time[0] === "") {
            //Einblenden des entsprechenden Alerts
            create_tour_alert_notime.hidden = false;
        //Wenn das eingegebene Datum dem heutigen Entspricht
        } else if(y2 === y && m2 === m && d2 === d) {
            //Überprüfen ob Uhrzeit in der Vergangenheit liegt
            //Wenn die eingegebene Stunde kleiner ist als die Aktuelle
            if(hh2 < hh ) {
                //Einblenden des entsprechenden Alerts (Uhrzeit liegt in der Vergangenheit)
                create_tour_alert_time.hidden = false;
            //Wenn die eingegebene Stunde größer oder gleich der Aktuellen ist
            } else if(hh2 >= hh) {
                //Und wenn die eingegebene Minute kleiner ist als die Aktuelle
                if(mm2 <= mm) {
                    //Einblenden des entsprechenden Alerts (Uhrzeit liegt in der Vergangenheit)
                    create_tour_alert_time.hidden = false;
                //Ansonsten sind die eingegebenen Daten korrekt
                } else {
                    alert("Success");
                }
            }
        //Uhrzeit kann nicht in der Vergangenheit liegen und ist nicht leer - die eingegebenen Daten sind korrekt
        } else {
            alert("Success");
        }
    }
}

/**
 * <h3>
 **/
function show_tournaments() {
    document.getElementById("dashboard_div").hidden=true;
    document.getElementById("tournament_tree_div").style.display="block";
    document.getElementById("statistik_div").style.display="none";
    document.getElementById("btn_tournaments").classList.add("active", "bg-primary");
    document.getElementById("btn_tournaments").classList.remove("text-white");
    document.getElementById("btn_dashboard").classList.remove("active", "bg-primary");
    document.getElementById("btn_dashboard").classList.add("nav-link", "text-white");
    document.getElementById("btn_statistik").classList.remove("active", "bg-primary");
    document.getElementById("btn_statistik").classList.add("nav-link", "text-white");
}

/**
 * <h3>
 **/
function show_dashboard() {
    document.getElementById("dashboard_div").hidden=false;
    document.getElementById("tournament_tree_div").style.display="none";
    document.getElementById("statistik_div").style.display="none";
    document.getElementById("btn_dashboard").classList.add("active", "bg-primary");
    document.getElementById("btn_dashboard").classList.remove("text-white");
    document.getElementById("btn_tournaments").classList.remove("active", "bg-primary");
    document.getElementById("btn_tournaments").classList.add("nav-link", "text-white");
    document.getElementById("btn_statistik").classList.remove("active", "bg-primary");
    document.getElementById("btn_statistik").classList.add("nav-link", "text-white");
}

/**
 * <h3>
 **/
function show_statistik() {
    document.getElementById("dashboard_div").hidden=true;
    document.getElementById("tournament_tree_div").style.display="none";
    document.getElementById("statistik_div").style.display="block";
    document.getElementById("btn_statistik").classList.add("active", "bg-primary");
    document.getElementById("btn_statistik").classList.remove("text-white");
    document.getElementById("btn_tournaments").classList.remove("active", "bg-primary");
    document.getElementById("btn_tournaments").classList.add("nav-link", "text-white");
    document.getElementById("btn_dashboard").classList.remove("active", "bg-primary");
    document.getElementById("btn_dashboard").classList.add("nav-link", "text-white");
}
