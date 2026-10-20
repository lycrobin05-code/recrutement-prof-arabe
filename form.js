/* Formulaire de candidature professeur(e) — natif (plus d'iframe Airtable).
   Envoi → webhook Make 10010613 (→ Airtable Prof arabe Hommes / Femmes)
   puis redirection DIRECTE vers la page de remerciement systeme.io (qui fire le Lead). */
(function () {
  var WEBHOOK_URL = "https://hook.eu2.make.com/me45w2k7bobtmpdq2pmpbfhwixvd6bus";
  var MERCI_URL = "https://lyc-robin05.systeme.io/b92e6e31";

  var form = document.getElementById("form-prof");
  var wrap = document.getElementById("form-wrapper");
  if (!form || !wrap) return;

  var genreBtns = document.querySelectorAll(".genre-btn");
  var submitBtn = document.getElementById("submit-btn");
  var errorBox = document.getElementById("form-error");
  var genre = null;

  // Textes qui changent selon le genre
  var TXT = {
    homme: {
      titre: "Candidature — professeur homme",
      intro: "Ce formulaire s'adresse exclusivement aux <strong>professeurs hommes</strong> qui enseignent la lecture et la compréhension de l'arabe du Coran à des francophones, et qui souhaitent intégrer un institut en ligne structuré pour se concentrer <strong>à temps plein</strong> sur l'enseignement.",
      tempsPlein: "Je comprends que l'institut cherche un professeur qui, dans l'avenir, puisse se libérer du temps pour enseigner à temps plein dans l'institut (35h).",
      approche: "Quelle approche utilisez-vous pour enseigner la compréhension de l'arabe coranique ? (de quelle manière tu enseignes l'arabe pour qu'un élève comprenne l'arabe du Coran)",
      etape: "Après avoir appuyé sur « Envoyer », je vais être redirigé sur une page pour effectuer l'étape 3 (message vocal WhatsApp). Sans cette étape, ma candidature ne sera pas retenue."
    },
    femme: {
      titre: "Candidature — professeure femme",
      intro: "Ce formulaire s'adresse exclusivement aux <strong>professeures femmes</strong> qui enseignent la lecture et la compréhension de l'arabe du Coran à des francophones, et qui souhaitent intégrer un institut en ligne structuré pour se concentrer <strong>à temps plein</strong> sur l'enseignement.",
      tempsPlein: "Je comprends que l'institut cherche une professeure qui, dans l'avenir, puisse se libérer du temps pour enseigner à temps plein dans l'institut (35h).",
      approche: "Quelle approche utilisez-vous pour enseigner la compréhension de l'arabe coranique ? (de quelle manière tu enseignes l'arabe pour qu'une élève comprenne l'arabe du Coran)",
      etape: "Après avoir appuyé sur « Envoyer », je vais être redirigée sur une page pour effectuer l'étape 3 (message vocal WhatsApp). Sans cette étape, ma candidature ne sera pas retenue."
    }
  };

  function applyGenre(g) {
    genre = g;
    var t = TXT[g];
    document.getElementById("form-titre").textContent = t.titre;
    document.getElementById("form-intro").innerHTML = t.intro;
    document.getElementById("lbl-temps-plein").textContent = t.tempsPlein;
    document.getElementById("lbl-approche").textContent = t.approche;
    document.getElementById("lbl-etape").textContent = t.etape;
    var radio = form.querySelector('input[name="genre"][value="' + g + '"]');
    if (radio) radio.checked = true;
    wrap.hidden = false;
  }

  Array.prototype.forEach.call(genreBtns, function (btn) {
    btn.addEventListener("click", function () {
      var g = btn.getAttribute("data-genre");
      Array.prototype.forEach.call(genreBtns, function (b) { b.classList.toggle("active", b === btn); });
      applyGenre(g);
      if (typeof fbq !== "undefined") fbq("trackCustom", "GenreChoisi", { genre: g });
      wrap.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Si le candidat change la réponse Homme/Femme dans le formulaire, on suit.
  Array.prototype.forEach.call(form.querySelectorAll('input[name="genre"]'), function (r) {
    r.addEventListener("change", function () {
      if (r.checked && r.value !== genre) {
        Array.prototype.forEach.call(genreBtns, function (b) {
          b.classList.toggle("active", b.getAttribute("data-genre") === r.value);
        });
        applyGenre(r.value);
      }
    });
  });

  // Jours : « Tous les jours » exclusif des jours individuels
  var dayBoxes = form.querySelectorAll('input[name="jours"]');
  Array.prototype.forEach.call(dayBoxes, function (box) {
    box.addEventListener("change", function () {
      if (!box.checked) return;
      var isAll = box.value === "Tous les jours";
      Array.prototype.forEach.call(dayBoxes, function (other) {
        if (other === box) return;
        if (isAll || other.value === "Tous les jours") other.checked = false;
      });
    });
  });

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.hidden = false;
    errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorBox.hidden = true;

    // anti-bot : champ caché qui doit rester vide
    if (form.website && form.website.value) return;

    if (!genre) { showError("Choisis d'abord : Homme ou Femme."); return; }
    if (!form.checkValidity()) { form.reportValidity(); return; }

    var jours = [];
    Array.prototype.forEach.call(dayBoxes, function (b) { if (b.checked) jours.push(b.value); });
    if (!jours.length) { showError("Indique au moins un jour de disponibilité."); return; }

    var v = function (name) { return (form[name].value || "").trim(); };

    // Numéro WhatsApp au format international (+213…) via le sélecteur d'indicatif
    var whatsapp = v("whatsapp");
    if (window.itiPhone) {
      if (!window.itiPhone.isValidNumber()) {
        showError("Ce numéro ne semble pas valide pour le pays choisi. Vérifie l'indicatif et le numéro.");
        form.whatsapp.focus();
        return;
      }
      whatsapp = window.itiPhone.getNumber();
    }
    var payload = {
      genre: genre,
      prenom: v("prenom"),
      nom: v("nom"),
      whatsapp: whatsapp,
      video_vue: form.video_vue.checked,
      temps_plein: form.temps_plein.checked,
      francais: form.francais.checked,
      methode_lecture: v("methode_lecture"),
      approche_comprehension: v("approche_comprehension"),
      activite_principale: v("activite_principale"),
      heures_semaine: v("heures_semaine"),
      jours: jours,
      tarif_horaire: v("tarif_horaire"),
      infos: v("infos"),
      etape_vocal: form.etape_vocal.checked,
      source_url: location.href
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi en cours…";

    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      // Redirection directe : pas d'écran intermédiaire, le Lead part sur la page merci
      location.href = MERCI_URL;
    }).catch(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = "Envoyer ma candidature";
      showError("Oups, un souci à l'envoi. Vérifie ta connexion et réessaie dans un instant.");
    });
  });
})();
