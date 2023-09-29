const butInstall = document.getElementById("buttonInstall");
let installPrompt = null;

// Logic for installing the PWA

//an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  butInstall.style.visibility = "visible";
});

// click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  const result = await installPrompt.prompt();
  butInstall.setAttribute("disabled", true);
  installPrompt = null;
});

// handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("👍", "appinstalled", event);
  butInstall.textContent = "Installed!";
});
