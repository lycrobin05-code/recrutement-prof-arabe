/* Formulaire de candidature professeur(e) — natif (plus d'iframe Airtable).
   Envoi → webhook Make 10010613 (→ Airtable Prof arabe Hommes / Femmes)
   puis redirection DIRECTE vers la page de remerciement systeme.io (qui fire le Lead). */
(function () {
  var WEBHOOK_URL = "https://hook.eu2.make.com/me45w2k7bobtmpdq2pmpbfhwixvd6bus";
  var MERCI_URL = "https://lyc-robin05.systeme.io/b92e6e31";
  var DISQUALIF_URL = "non-retenu.html";

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
      intro:
        "<p>Ce formulaire s'adresse exclusivement aux <strong>professeurs hommes ayant un niveau natif en français</strong> qui souhaitent enseigner la lecture et la compréhension de l'arabe du Coran à des francophones.</p>" +
        "<p>En rejoignant notre institut en ligne, notre objectif est simple : te permettre de te concentrer pleinement sur l'enseignement, pendant que nous nous chargeons de t'apporter des élèves de manière stable et prévisible.</p>" +
        "<p>Nous accompagnons des élèves <strong>adultes</strong> engagés, de manière individuelle, dans un cursus complet de l'arabe du Coran (lecture et compréhension) sur 10 mois. Nos professeurs bénéficient ainsi d'une activité régulière avec des élèves sérieux et investis dans leur progression. <strong>(Pas d'enfants.)</strong></p>" +
        "<p><strong>Rémunération :</strong></p>" +
        "<p>Dans notre institut, ce sont les élèves qui viennent à toi. Nous t'apportons des élèves au fil des inscriptions, jusqu'à un potentiel temps plein (autour de 35 heures par semaine).</p>" +
        "<p>Tu n'as pas à chercher d'élèves : tu te concentres sur l'enseignement, on s'occupe de remplir ton planning.</p>" +
        "<p>Aujourd'hui, nous assurons une rémunération <strong>autour de 8 € par heure de cours</strong>, avec une évolution vers un <strong>salaire fixe mensuel</strong> si nous nous rapprochons d'un temps plein avec toi.</p>" +
        "<p><strong>Pour cette session de recrutement, nous recherchons en priorité des professeurs disponibles le dimanche, le mercredi et généralement le soir.</strong></p>" +
        "<p>Après l'envoi de ce formulaire, tu arrives sur une page qui te demande d'effectuer l'<strong>étape 3</strong> : nous envoyer un message <strong>vocal</strong> sur WhatsApp dans lequel tu expliques, <strong>en français</strong>, le moudaf et moudaf ilayh — comment le reconnaître et comment le construire.</p>" +
        "<p>Ce message nous permettra d'évaluer ton niveau de français et tes connaissances.</p>" +
        "<p>Si tu sais que tu n'es pas en capacité de le faire, merci de ne pas remplir ce formulaire : ta candidature ne serait pas retenue.</p>" +
        "<p>Nous recevons des centaines de candidatures. Nous recherchons impérativement quelqu'un qui :<br>– a un <strong>niveau natif</strong> en français,<br>– est disponible le dimanche pour enseigner,<br>– a déjà enseigné l'arabe à des <strong>adultes</strong> francophones,<br>– est prêt à s'adapter à la méthode d'enseignement de l'institut,<br>– souhaite, à l'avenir, enseigner à temps plein dans un institut qui lui fournit des élèves et de la stabilité dans sa profession.</p>" +
        "<p><strong>Si tu ne corresponds pas à ces critères, merci de ne pas remplir ce formulaire.</strong></p>",
      tempsPlein: "Je comprends que l'institut cherche un professeur qui, dans l'avenir, puisse se libérer du temps pour enseigner à temps plein dans l'institut (autour de 35h). Si je ne remplis pas ces critères, il est inutile de postuler.",
      approche: "Quelle approche utilisez-vous pour enseigner la compréhension de l'arabe coranique ? (de quelle manière tu enseignes l'arabe pour qu'un élève comprenne l'arabe du Coran)",
      etape: "Après avoir appuyé sur « Envoyer », je vais être redirigé sur une page pour effectuer l'étape 3 (message vocal WhatsApp). Sans cette étape, ma candidature ne sera pas retenue."
    },
    femme: {
      titre: "Candidature — professeure femme",
      intro:
        "<p>Ce formulaire s'adresse exclusivement aux <strong>professeures femmes ayant un niveau natif en français</strong> qui souhaitent enseigner la lecture et la compréhension de l'arabe du Coran à des francophones.</p>" +
        "<p>En rejoignant notre institut en ligne, notre objectif est simple : te permettre de te concentrer pleinement sur l'enseignement, pendant que nous nous chargeons de t'apporter des élèves de manière stable et prévisible.</p>" +
        "<p>Nous accompagnons des élèves <strong>adultes</strong> engagés, de manière individuelle, dans un cursus complet de l'arabe du Coran (lecture et compréhension) sur 10 mois. Nos professeures bénéficient ainsi d'une activité régulière avec des élèves sérieux et investis dans leur progression. <strong>(Pas d'enfants.)</strong></p>" +
        "<p><strong>Rémunération :</strong></p>" +
        "<p>Dans notre institut, ce sont les élèves qui viennent à toi. Nous t'apportons des élèves au fil des inscriptions, jusqu'à un potentiel temps plein (autour de 35 heures par semaine).</p>" +
        "<p>Tu n'as pas à chercher d'élèves : tu te concentres sur l'enseignement, on s'occupe de remplir ton planning.</p>" +
        "<p>Aujourd'hui, nous assurons une rémunération <strong>autour de 8 € par heure de cours</strong>, avec une évolution vers un <strong>salaire fixe mensuel</strong> si nous nous rapprochons d'un temps plein avec toi.</p>" +
        "<p><strong>Pour cette session de recrutement, nous recherchons en priorité des professeures disponibles le dimanche, le mercredi et généralement le soir.</strong></p>" +
        "<p>Après l'envoi de ce formulaire, tu arrives sur une page qui te demande d'effectuer l'<strong>étape 3</strong> : nous envoyer un message <strong>vocal</strong> sur WhatsApp dans lequel tu expliques, <strong>en français</strong>, le moudaf et moudaf ilayh — comment le reconnaître et comment le construire.</p>" +
        "<p>Ce message nous permettra d'évaluer ton niveau de français et tes connaissances.</p>" +
        "<p>Si tu sais que tu n'es pas en capacité de le faire, merci de ne pas remplir ce formulaire : ta candidature ne serait pas retenue.</p>" +
        "<p>Nous recevons des centaines de candidatures. Nous recherchons impérativement une professeure qui :<br>– a un <strong>niveau natif</strong> en français,<br>– est disponible le dimanche pour enseigner,<br>– a déjà enseigné l'arabe à des <strong>adultes</strong> francophones,<br>– est prête à s'adapter à la méthode d'enseignement de l'institut,<br>– souhaite, à l'avenir, enseigner à temps plein dans un institut qui lui fournit des élèves et de la stabilité dans sa profession.</p>" +
        "<p><strong>Si tu ne corresponds pas à ces critères, merci de ne pas remplir ce formulaire.</strong></p>",
      tempsPlein: "Je comprends que l'institut cherche une professeure qui, dans l'avenir, puisse se libérer du temps pour enseigner à temps plein dans l'institut (autour de 35h). Si je ne remplis pas ces critères, il est inutile de postuler.",
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

  // Disqualification : pas de webcam ou pas de bonne connexion → candidature bloquée
  var disqualifBox = document.getElementById("form-disqualif");
  function isDisqualified() {
    var w = form.querySelector('input[name="webcam"]:checked');
    var c = form.querySelector('input[name="connexion"]:checked');
    return (w && w.value === "Non") || (c && c.value === "Non");
  }
  function updateDisqualif() {
    var dq = isDisqualified();
    disqualifBox.hidden = !dq;
    submitBtn.disabled = dq;
  }
  Array.prototype.forEach.call(form.querySelectorAll('input[name="webcam"], input[name="connexion"]'), function (r) {
    r.addEventListener("change", function () {
      updateDisqualif();
      if (!isDisqualified()) return;
      // Redirection immédiate vers la page « candidature non retenue »
      if (typeof fbq !== "undefined") fbq("trackCustom", "CandidatDisqualifie", { motif: r.name });
      setTimeout(function () { location.href = DISQUALIF_URL; }, 300);
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
    if (isDisqualified()) { location.href = DISQUALIF_URL; return; }
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
      webcam: form.querySelector('input[name="webcam"]:checked').value,
      connexion: form.querySelector('input[name="connexion"]:checked').value,
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
