const SolarSystemController = {
  markerVisible: false,
  currentSoundEl: null,
  currentFadeTimers: [],
  audioUnlocked: false,
  selectedEl: null,

  // volumes seguros para criança
  volumeBase: 0.55,     // volume “normal”
  volumeMin: 0.25,      // início do fade-in
  volumeMax: 1.0,       // limite

  planetData: {
    sol: { name: "Sol", facts: "A nossa estrela! Dá luz e calor." },
    mercurio: { name: "Mercúrio", facts: "O mais perto do Sol!" },
    venus: { name: "Vénus", facts: "Muito quente e com muitas nuvens!" },
    terra: { name: "Terra", facts: "O nosso planeta! Onde vivemos." },
    marte: { name: "Marte", facts: "O planeta vermelho!" },
    jupiter: { name: "Júpiter", facts: "O maior planeta do Sistema Solar!" },
    saturno: { name: "Saturno", facts: "Tem anéis lindos à volta!" },
    urano: { name: "Urano", facts: "Parece azul e roda de lado!" },
    neptuno: { name: "Neptuno", facts: "Muito longe e muito frio!" }
  }
};

AFRAME.registerComponent("tap-to-pick", {
  init: function () {
    this.raycaster = new THREE.Raycaster();
    this.ndc = new THREE.Vector2();
    const sceneEl = this.el;

    const onPointer = (ev) => {
      unlockAudioOnce();
      if (!SolarSystemController.markerVisible) return;

      const canvas = sceneEl.canvas;
      if (!canvas) return;

      const threeCam = sceneEl.camera;
      if (!threeCam) return;

      const rect = canvas.getBoundingClientRect();
      const p = getClientXY(ev);
      if (!p) return;

      this.ndc.x = ((p.x - rect.left) / rect.width) * 2 - 1;
      this.ndc.y = -(((p.y - rect.top) / rect.height) * 2 - 1);

      this.raycaster.setFromCamera(this.ndc, threeCam);

      const els = Array.from(document.querySelectorAll(".clickable"))
        .filter(el => el.object3D && el.getAttribute("visible") !== false);

      const objects = els.map(el => el.object3D);
      const hits = this.raycaster.intersectObjects(objects, true);
      if (!hits.length) return;

      let hitEl = hits[0].object.el;
      while (hitEl && (!hitEl.classList || !hitEl.classList.contains("clickable"))) {
        hitEl = hitEl.parentEl;
      }
      if (!hitEl) return;

      onPlanetSelected(hitEl);
    };

    sceneEl.addEventListener("renderstart", () => {
      const canvas = sceneEl.canvas;
      if (!canvas) return;

      canvas.addEventListener("pointerdown", onPointer, { passive: true });
      canvas.addEventListener("touchstart", onPointer, { passive: true });
      canvas.addEventListener("click", onPointer, { passive: true });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const marker = document.querySelector("#solarSystemMarker");
  const solarSystem = document.querySelector("#solarSystem");

  marker.addEventListener("markerFound", () => {
    SolarSystemController.markerVisible = true;
    solarSystem.setAttribute("visible", true);
    document.querySelector("#instructions").style.display = "none";
  });

  marker.addEventListener("markerLost", () => {
    SolarSystemController.markerVisible = false;
    solarSystem.setAttribute("visible", false);

    fadeOutCurrentSound(250);
    unselectCurrentPlanet();

    hidePlanetInfo();
    document.querySelector("#instructions").style.display = "block";
  });
});

function onPlanetSelected(el) {
  const id = el.id;
  if (!id) return;

  showPlanetInfo(id);

  // desmarcar anterior
  unselectCurrentPlanet();

  // marcar novo
  SolarSystemController.selectedEl = el;
  animateScale(el, 1.0, 1.25, 160); // cresce suavemente

  // som: fade out anterior + fade in novo (volume sobe)
  fadeOutCurrentSound(220);
  fadeInSound(el, 450);
}

// ---------- UI ----------
function showPlanetInfo(id) {
  const data = SolarSystemController.planetData[id];
  if (!data) return;

  document.querySelector("#planetName").textContent = data.name;
  document.querySelector("#planetFacts").textContent = data.facts;
  document.querySelector("#planetInfo").style.display = "block";
}

function hidePlanetInfo() {
  document.querySelector("#planetInfo").style.display = "none";
}

function animateScale(el, from, to, durMs) {
  el.setAttribute("animation__scale", `property: scale; from: ${from} ${from} ${from}; to: ${to} ${to} ${to}; dur: ${durMs}; easing: easeOutQuad`);
}

function unselectCurrentPlanet() {
  const prev = SolarSystemController.selectedEl;
  if (!prev) return;
  // volta ao tamanho normal
  prev.setAttribute("animation__scale", `property: scale; to: 1 1 1; dur: 140; easing: easeOutQuad`);
  SolarSystemController.selectedEl = null;
}

// ---------- ÁUDIO ----------
function fadeInSound(el, durMs) {
  clearFadeTimers();

  const sound = el.components && el.components.sound;
  if (!sound) return;

  try {
    // começa baixo, sobe suavemente
    sound.stopSound();
    sound.setVolume(SolarSystemController.volumeMin);
    sound.playSound();

    SolarSystemController.currentSoundEl = el;

    const start = SolarSystemController.volumeMin;
    const end = SolarSystemController.volumeMax;
    const steps = Math.max(1, Math.floor(durMs / 40));
    let i = 0;

    const t = setInterval(() => {
      i++;
      const v = start + (end - start) * (i / steps);
      sound.setVolume(Math.min(end, v));
      if (i >= steps) clearInterval(t);
    }, 40);

    SolarSystemController.currentFadeTimers.push(t);
  } catch (e) {
    console.error("Erro fadeInSound:", e);
  }
}

function fadeOutCurrentSound(durMs) {
  const el = SolarSystemController.currentSoundEl;
  if (!el || !el.components || !el.components.sound) return;

  clearFadeTimers();

  const sound = el.components.sound;

  try {
    const start = sound.getVolume();
    const end = 0;
    const steps = Math.max(1, Math.floor(durMs / 35));
    let i = 0;

    const t = setInterval(() => {
      i++;
      const v = start + (end - start) * (i / steps);
      sound.setVolume(Math.max(0, v));
      if (i >= steps) {
        sound.stopSound();
        clearInterval(t);
        SolarSystemController.currentSoundEl = null;
      }
    }, 35);

    SolarSystemController.currentFadeTimers.push(t);
  } catch (e) {
    console.error("Erro fadeOutCurrentSound:", e);
  }
}

function clearFadeTimers() {
  SolarSystemController.currentFadeTimers.forEach(id => clearInterval(id));
  SolarSystemController.currentFadeTimers = [];
}

// ---------- HELPERS ----------
function getClientXY(ev) {
  if (ev.changedTouches && ev.changedTouches[0]) {
    return { x: ev.changedTouches[0].clientX, y: ev.changedTouches[0].clientY };
  }
  if (typeof ev.clientX === "number") {
    return { x: ev.clientX, y: ev.clientY };
  }
  return null;
}

function unlockAudioOnce() {
  if (SolarSystemController.audioUnlocked) return;
  try {
    if (AFRAME.audioContext && AFRAME.audioContext.state !== "running") {
      AFRAME.audioContext.resume();
    }
    SolarSystemController.audioUnlocked = true;
  } catch (e) {
    console.warn("Unlock áudio falhou:", e);
  }
}
