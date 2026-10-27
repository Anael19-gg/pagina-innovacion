(() => {
  "use strict";

  const root = document.documentElement;

  // Año del pie de página
  const year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  // Revelado de bloques al entrar en el viewport
  const reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      }
    );

    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add("is-visible"));
  }

  // PWA: registro del service worker
  const isLocalhost =
    location.hostname === "localhost" || location.hostname === "127.0.0.1";
  const canRegisterServiceWorker =
    "serviceWorker" in navigator &&
    (location.protocol === "https:" || isLocalhost);

  if (canRegisterServiceWorker) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {
        // Sin service worker el sitio sigue funcionando en línea.
      });
    });
  }

  // Portafolio: impresión o guardado como PDF
  const printButton = document.getElementById("print-portfolio");
  if (printButton) {
    printButton.addEventListener("click", () => window.print());
  }

  // PWA: instalación desde el navegador
  const installTriggers = document.querySelectorAll("[data-install-trigger]");
  const installDialog = document.getElementById("install-dialog");
  let deferredPrompt = null;

  const isStandalone = () =>
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  const hideInstallTriggers = () => {
    installTriggers.forEach((button) => {
      button.hidden = true;
    });
  };

  const closeInstallDialog = () => {
    if (!installDialog) return;

    if (typeof installDialog.close === "function") {
      installDialog.close();
    } else {
      installDialog.removeAttribute("open");
    }
  };

  const openInstallDialog = () => {
    if (!installDialog) return;

    if (typeof installDialog.showModal === "function") {
      installDialog.showModal();
    } else {
      installDialog.setAttribute("open", "");
    }
  };

  if (isStandalone()) {
    hideInstallTriggers();
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
  });

  installTriggers.forEach((button) => {
    button.addEventListener("click", async () => {
      if (isStandalone()) {
        hideInstallTriggers();
        return;
      }

      if (!deferredPrompt) {
        openInstallDialog();
        return;
      }

      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      deferredPrompt = null;

      if (choice.outcome === "accepted") {
        hideInstallTriggers();
      }
    });
  });

  document.querySelectorAll("[data-close-install]").forEach((button) => {
    button.addEventListener("click", closeInstallDialog);
  });

  if (installDialog) {
    installDialog.addEventListener("click", (event) => {
      if (event.target === installDialog) {
        closeInstallDialog();
      }
    });
  }

  window.addEventListener("appinstalled", () => {
    hideInstallTriggers();
    closeInstallDialog();
    deferredPrompt = null;
  });

  // Aviso discreto cuando no hay conexión
  const offlineBadge = document.getElementById("offline-badge");

  const updateConnectionState = () => {
    if (!offlineBadge) return;
    offlineBadge.hidden = navigator.onLine;
  };

  window.addEventListener("online", updateConnectionState);
  window.addEventListener("offline", updateConnectionState);
  updateConnectionState();

  if (root.classList.contains("no-js")) {
    root.classList.remove("no-js");
    root.classList.add("js");
  }
})();
