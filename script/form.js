

document.addEventListener("DOMContentLoaded", function () {
  // Configuration pour web3mail
  const apiUrl = "https://api.web3forms.com/submit"; // URL de l'API Web3Forms
  const accessKey = "c0137336-7bb2-4794-a686-97a69f5ae7c2"; // Remplacez par votre clé d'accès

  document
    .getElementById("contact-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Récupération des champs
      let surname = document.getElementById("first-name").value.trim();
      let name = document.getElementById("last-name").value.trim();
      let email = document.getElementById("email").value.trim();
      let subject = document.getElementById("objet").value.trim();
      let message = document.getElementById("message").value.trim();
      let keys = document.getElementById("access_key");
      keys.value = accessKey;

      // Effacer les messages d'erreur précédents
      document.querySelectorAll(".error-msg").forEach((el) => el.remove());

      let isValid = true;

      // Fonction pour afficher une erreur
      function showError(input, message) {
        let error = document.createElement("p");
        error.classList.add("error-msg");
        error.style.color = "red";
        error.style.fontSize = "14px";
        error.textContent = message;
        input.parentNode.appendChild(error);
      }

      // Vérification des champs
      if (surname === "") {
        showError(
          document.getElementById("first-name"),
          "⚠️ Le prénom est requis."
        );
        isValid = false;
      }
      if (name === "") {
        showError(
          document.getElementById("last-name"),
          "⚠️ Le nom est requis."
        );
        isValid = false;
      }
      if (email === "") {
        showError(document.getElementById("email"), "⚠️ L'email est requis.");
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        showError(document.getElementById("email"), "⚠️ L'email est invalide.");
        isValid = false;
      }
      if (subject === "") {
        showError(document.getElementById("objet"), "⚠️ L'objet est requis.");
        isValid = false;
      }
      if (message === "") {
        showError(
          document.getElementById("message"),
          "⚠️ Le message est requis."
        );
        isValid = false;
      }

      // Si un champ est invalide, on arrête l'envoi
      if (!isValid) return;

      const formData = {
        access_key: accessKey,
        email: `Vous venez de recevoir un message de ${surname} ${name} - ${email}`,
        subject: `Nouveau Message depuis le Formulaire de Contact`,
        details: `

👤 Nom de l'expéditeur : ${surname}

👤 Prénom de l'expéditeur : ${name}

📧 Email de l'expéditeur : ${email}

📌 Objet du message : ${subject}
`,
        message: `
📩 Message de l'expéditeur :

${message}
`,
        date: `       
📅 Date et heure d'envoi : ${new Date().toLocaleString("fr-FR")}
`,
        source: `

Ce message a été envoyé automatiquement via le formulaire de contact de https://canada-credit.fr.
`,
      };

      // Envoi du formulaire via Web3Forms
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(async (response) => {
          let json = await response.json();
          if (response.ok) { // Change response.status == 200 to response.ok
            document.getElementById("contact-form").reset();
            window.location.href = "thanks";
          } else {
            alert("Erreur lors de l'envoi du message ❌");
            console.error("Erreur: ", json.message);
          }
        })
        .catch((error) => {
          console.error("Erreur: ", error);
        });
    });

  });

  
  // Validation du formulaire de la newsletter
  document.addEventListener("DOMContentLoaded", function () {
    // Configuration pour web3mail
    const apiUrl = "https://api.web3forms.com/submit"; // URL de l'API Web3Forms
    const accessKey = "c0137336-7bb2-4794-a686-97a69f5ae7c2"; // Remplacez par votre clé
    const newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let email = document.getElementById("email-address").value.trim();
        let keys = document.getElementById("access_key_newsletter");
        keys.value = accessKey;
        document.querySelectorAll(".error-msg").forEach((el) => el.remove());

        let isValid = true;

        // Fonction pour afficher une erreur
        function showError(input, message) {
          let error = document.createElement("p");
          error.classList.add("error-msg");
          error.style.color = "red";
          error.style.fontSize = "14px";
          error.textContent = message;
          input.parentNode.appendChild(error);
        }
        if (email === "") {
          showError(
            document.getElementById("email-address"),
            "⚠️ L'email est requis."
          );
          isValid = false;
          return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          showError(
            document.getElementById("email-address"),
            "⚠️ L'email est invalide."
          );
          isValid = false;
          return;
        }
        if (!isValid) return;

        const newsletterData = {
          access_key: accessKey,
          subject: "Nouvel Abonné à la Newsletter 📩",
          email: email,
          details: `
Bonjour,

Vous avez un nouvel abonné :
- 📧 Email de l'abonné : ${email}

Nous lui souhaitons la bienvenue dans notre communauté ! 🎉
`,
          source: `
Cet email a été envoyé automatiquement via le formulaire Newsletter de https://canada-credit.fr.
`,
        };

        // Envoi de l'inscription via Web3Forms
        fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(newsletterData),
        })
          .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
              newsletterForm.reset();
              window.location.href = "thanks";
            } else {
              console.error("Erreur: ", json.message);
            }
          })
          .catch((error) => {
            console.error("Erreur: ", error);
          });
      });
    }
  });
