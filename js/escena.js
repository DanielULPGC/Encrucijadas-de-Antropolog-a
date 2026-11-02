/*
 * Encrucijadas · escena 3D (Three.js 0.160.0)
 * Un camino en espiral desciende desde las montañas lejanas (estación 1) hasta la encrucijada central (estación 15).
 * Cada estación es un pedestal con un objeto procedural y un farol que se enciende al completarla.
 * En el centro, un poste con cuatro brazos —cultura, naturaleza, clase, violencia— que se iluminan al completar cada parte.
 * API: crearEscena(contenedor, { estaciones, palabras, onSeleccion, onCentro, onHover })
 *      → { irA(i), irCentro(), vistaGeneral(), marcarResueltas(est[], partes[]), getPausa(), setPausa(b), aplicarTema() }
 */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { ParametricGeometry } from "three/addons/geometries/ParametricGeometry.js";

const css = (n, d) => (getComputedStyle(document.documentElement).getPropertyValue(n).trim() || d);
function paleta() {
  return {
    fondo: css("--sc-fondo", "#e3dccd"), suelo: css("--sc-suelo", "#cfc4ad"), camino: css("--sc-camino", "#ece3cf"),
    piedra: css("--sc-piedra", "#f2ece1"), laton: css("--sc-laton", "#b07a2a"), tinta: css("--sc-tinta", "#2a231c"),
    monte: css("--sc-monte", "#b8ad98"),
    partes: [css("--p1", "#b0532c"), css("--p2", "#2c6688"), css("--p3", "#7a5698"), css("--p4", "#4b7656")]
  };
}
const MADERA = "#7d5a3a", HIERRO = "#4a4744", TELA = ["#c9a227", "#a3483a", "#3f6f8f", "#e9e1cf"];

export function crearEscena(cont, op) {
  const E = op.estaciones;
  let P = paleta();
  const reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let pausa = reducir;

  /* ---------- renderer, cámara, controles ---------- */
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  cont.append(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(P.fondo);
  scene.fog = new THREE.Fog(P.fondo, 70, 150);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
  camera.position.set(0, 44, 54);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.maxPolarAngle = Math.PI * 0.46; controls.minDistance = 5; controls.maxDistance = 110;
  controls.target.set(0, 0, 0);

  const hemi = new THREE.HemisphereLight("#fff8ec", "#6b5f50", 0.9);
  scene.add(hemi);
  const sol = new THREE.DirectionalLight("#fff4e0", 1.6);
  sol.position.set(18, 30, 12);
  sol.castShadow = true;
  sol.shadow.mapSize.set(1024, 1024);
  Object.assign(sol.shadow.camera, { left: -32, right: 32, top: 32, bottom: -32, near: 1, far: 90 });
  scene.add(sol);

  /* ---------- materiales reutilizables ---------- */
  const mats = [];
  const M = (color, extra = {}) => { const m = new THREE.MeshStandardMaterial(Object.assign({ color, roughness: 0.85, metalness: 0.05, flatShading: true }, extra)); mats.push(m); return m; };
  const mSuelo = M(P.suelo, { flatShading: false, roughness: 1 });
  const mCamino = M(P.camino, { roughness: 0.95 });
  const mPiedra = M(P.piedra);
  const mLaton = M(P.laton, { metalness: 0.45, roughness: 0.45 });
  const mTinta = M(P.tinta);
  const mMonte = M(P.monte, { roughness: 1 });
  const mMadera = M(MADERA);
  const mHierro = M(HIERRO, { metalness: 0.4, roughness: 0.5 });
  const mPartes = P.partes.map((c) => M(c));
  const malla = (g, m, sombra = true) => { const o = new THREE.Mesh(g, m); o.castShadow = sombra; o.receiveShadow = true; return o; };

  /* ---------- suelo y montañas lejanas ---------- */
  const suelo = malla(new THREE.CircleGeometry(48, 96), mSuelo, false);
  suelo.rotation.x = -Math.PI / 2; scene.add(suelo);
  let semilla = 7; const rnd = () => { semilla = (semilla * 16807) % 2147483647; return semilla / 2147483647; };
  for (let k = 0; k < 34; k++) {
    const a = (k / 34) * Math.PI * 2 + rnd() * 0.12, r = 33 + rnd() * 5, hgt = 4 + rnd() * 7;
    const cono = malla(new THREE.ConeGeometry(2.6 + rnd() * 2.4, hgt, 5 + Math.floor(rnd() * 3)), mMonte);
    cono.position.set(Math.cos(a) * r, hgt / 2 - 0.2, Math.sin(a) * r);
    cono.rotation.y = rnd() * Math.PI;
    scene.add(cono);
  }

  /* ---------- camino en espiral ---------- */
  const R0 = 25, R1 = 6.2, VUELTAS = 1.18, A0 = Math.PI * 0.5;
  const pts = [];
  for (let k = 0; k <= 600; k++) {
    const t = k / 600, th = A0 + t * VUELTAS * Math.PI * 2, r = R0 + (R1 - R0) * t;
    pts.push(new THREE.Vector3(Math.cos(th) * r, 0, Math.sin(th) * r));
  }
  const acum = [0]; for (let k = 1; k < pts.length; k++) acum.push(acum[k - 1] + pts[k].distanceTo(pts[k - 1]));
  const L = acum[acum.length - 1];
  const puntoEn = (s) => { let k = acum.findIndex((a) => a >= s); if (k <= 0) return { p: pts[0].clone(), k: 0 }; const f = (s - acum[k - 1]) / (acum[k] - acum[k - 1]); return { p: pts[k - 1].clone().lerp(pts[k], f), k }; };
  function cinta(desde, hasta, ancho, y, mat) {
    const v = [], idx = [];
    const n = Math.max(2, Math.round((hasta - desde) / 0.4));
    for (let j = 0; j <= n; j++) {
      const s = desde + (hasta - desde) * (j / n), a = puntoEn(s).p, b = puntoEn(Math.min(L, s + 0.05)).p;
      const dir = b.clone().sub(a).normalize(), nor = new THREE.Vector3(-dir.z, 0, dir.x).multiplyScalar(ancho / 2);
      v.push(a.x + nor.x, y, a.z + nor.z, a.x - nor.x, y, a.z - nor.z);
      if (j < n) { const q = j * 2; idx.push(q, q + 1, q + 2, q + 1, q + 3, q + 2); }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(v, 3)); g.setIndex(idx); g.computeVertexNormals();
    const m = new THREE.Mesh(g, mat); m.receiveShadow = true; return m;
  }
  scene.add(cinta(0, L, 1.3, 0.02, mCamino));

  /* ---------- texturas de texto ---------- */
  function texturaTexto(texto, { ancho = 256, alto = 128, fondo = null, color = "#fff", fuente = "700 64px Fraunces, Georgia, serif", circulo = false } = {}) {
    const c = document.createElement("canvas"); c.width = ancho; c.height = alto;
    const x = c.getContext("2d");
    if (circulo) { x.fillStyle = fondo; x.beginPath(); x.arc(ancho / 2, alto / 2, alto / 2 - 4, 0, Math.PI * 2); x.fill(); x.lineWidth = 6; x.strokeStyle = color; x.stroke(); }
    else if (fondo) { x.fillStyle = fondo; x.fillRect(0, 0, ancho, alto); }
    x.fillStyle = color; x.font = fuente; x.textAlign = "center"; x.textBaseline = "middle";
    x.fillText(texto, ancho / 2, alto / 2 + 4);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
  }

  /* ---------- objetos de cada estación (modelos procedurales) ---------- */
  const animables = [];
  const G = () => new THREE.Group();
  const O = {
    1() { // esfera armilar: los viajeros precursores
      const g = G(), mc = mLaton;
      const pie = malla(new THREE.CylinderGeometry(0.08, 0.3, 0.5, 8), mMadera); pie.position.y = 0.25; g.add(pie);
      const s = G(); s.position.y = 1.15;
      [0, Math.PI / 2, Math.PI / 4].forEach((r, k) => { const t = malla(new THREE.TorusGeometry(0.62, 0.035, 8, 40), mc); t.rotation.set(k === 2 ? Math.PI / 2 : 0, r, k === 2 ? 0.4 : 0); s.add(t); });
      s.add(malla(new THREE.SphereGeometry(0.2, 16, 12), mPartes[0]));
      g.add(s); animables.push((t) => { s.rotation.y = t * 0.3; }); return g;
    },
    2() { // cuatro libros: cuatro tradiciones
      const g = G(); const cols = ["#8e3b2e", "#2f5f7e", "#5a6b3a", "#9a7a2a"];
      cols.forEach((c, k) => { const b = malla(new THREE.BoxGeometry(0.28, 1.0 + k * 0.1, 0.8), M(c)); b.position.set(-0.45 + k * 0.3, (1.0 + k * 0.1) / 2, 0); b.rotation.z = k === 3 ? -0.25 : 0; if (k === 3) b.position.x += 0.12; g.add(b); });
      return g;
    },
    3() { // granero zande sobre pilares
      const g = G();
      [[-0.4, -0.4], [0.4, -0.4], [-0.4, 0.4], [0.4, 0.4]].forEach(([x, z]) => { const p = malla(new THREE.CylinderGeometry(0.06, 0.07, 0.7, 6), mMadera); p.position.set(x, 0.35, z); g.add(p); });
      const cuerpo = malla(new THREE.CylinderGeometry(0.62, 0.55, 0.75, 10), M("#b9895a")); cuerpo.position.y = 1.07; g.add(cuerpo);
      const techo = malla(new THREE.ConeGeometry(0.9, 0.8, 10), M("#c9a85c")); techo.position.y = 1.85; g.add(techo);
      return g;
    },
    4() { // dos campanarios: dos Tepoztlanes
      const g = G();
      [[-0.45, mPiedra], [0.45, mTinta]].forEach(([x, m]) => {
        const t = malla(new THREE.BoxGeometry(0.55, 1.3, 0.55), m); t.position.set(x, 0.65, 0); g.add(t);
        const c = malla(new THREE.ConeGeometry(0.42, 0.55, 4), mPartes[0]); c.position.set(x, 1.58, 0); c.rotation.y = Math.PI / 4; g.add(c);
      });
      return g;
    },
    5() { // tendedero de ropa usada y pequeño globo
      const g = G();
      [-0.7, 0.7].forEach((x) => { const p = malla(new THREE.CylinderGeometry(0.04, 0.04, 1.6, 6), mMadera); p.position.set(x, 0.8, 0); g.add(p); });
      const cuerda = malla(new THREE.CylinderGeometry(0.012, 0.012, 1.4, 4), mTinta, false); cuerda.rotation.z = Math.PI / 2; cuerda.position.y = 1.5; g.add(cuerda);
      const prendas = [];
      [-0.42, 0, 0.42].forEach((x, k) => { const pr = malla(new THREE.BoxGeometry(0.32, 0.45, 0.03), M(TELA[k])); pr.position.set(x, 1.24, 0); g.add(pr); prendas.push(pr); });
      const globo = malla(new THREE.SphereGeometry(0.28, 16, 12), mPartes[1]); globo.position.set(0, 0.3, 0.35); g.add(globo);
      animables.push((t) => { prendas.forEach((p, k) => { p.rotation.x = Math.sin(t * 1.4 + k) * 0.18; }); globo.rotation.y = t * 0.5; });
      return g;
    },
    6() { // cáliz y cauri
      const g = G();
      const perfil = [[0, 0], [0.42, 0], [0.42, 0.06], [0.1, 0.12], [0.07, 0.75], [0.12, 0.85], [0.42, 1.05], [0.48, 1.45], [0.44, 1.45], [0.38, 1.12], [0, 1.0]].map(([x, y]) => new THREE.Vector2(x, y));
      g.add(malla(new THREE.LatheGeometry(perfil, 20), mLaton));
      const vino = malla(new THREE.CircleGeometry(0.43, 20), M("#7a1d24")); vino.rotation.x = -Math.PI / 2; vino.position.y = 1.38; g.add(vino);
      const cauri = malla(new THREE.SphereGeometry(0.2, 12, 8), M("#efe4cf")); cauri.scale.set(1.4, 0.7, 1); cauri.position.set(0.62, 0.14, 0.2); g.add(cauri);
      return g;
    },
    7() { // proyector de cine
      const g = G();
      const cuerpo = malla(new THREE.BoxGeometry(0.9, 0.55, 0.5), mTinta); cuerpo.position.y = 0.55; g.add(cuerpo);
      const bobinas = [];
      [-0.22, 0.28].forEach((x) => { const b = malla(new THREE.CylinderGeometry(0.33, 0.33, 0.08, 20), mHierro); b.rotation.x = Math.PI / 2; b.position.set(x, 1.15, 0); g.add(b); bobinas.push(b); });
      const lente = malla(new THREE.CylinderGeometry(0.1, 0.12, 0.3, 12), mLaton); lente.rotation.z = Math.PI / 2; lente.position.set(0.58, 0.58, 0); g.add(lente);
      const haz = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.4, 16, 1, true), new THREE.MeshBasicMaterial({ color: "#fff3c9", transparent: true, opacity: 0.18, depthWrite: false, side: THREE.DoubleSide }));
      haz.rotation.z = Math.PI / 2; haz.position.set(1.4, 0.58, 0); g.add(haz);
      animables.push((t) => { bobinas.forEach((b, k) => { b.rotation.y = t * (k ? 1.2 : 1); }); });
      return g;
    },
    8() { // pirámide escalonada y carcaj
      const g = G();
      [1.0, 0.75, 0.5, 0.25].forEach((w, k) => { const b = malla(new THREE.BoxGeometry(w, 0.28, w), mPiedra); b.position.set(-0.25, 0.14 + k * 0.28, 0); g.add(b); });
      const carcaj = malla(new THREE.CylinderGeometry(0.12, 0.1, 0.8, 8), M("#8a5a32")); carcaj.position.set(0.6, 0.4, 0.15); carcaj.rotation.z = -0.12; g.add(carcaj);
      [-0.04, 0.04, 0].forEach((d, k) => { const f = malla(new THREE.CylinderGeometry(0.012, 0.012, 0.75, 4), mMadera); f.position.set(0.62 + d, 0.95, 0.15 + (k - 1) * 0.04); f.rotation.z = -0.12; g.add(f); });
      return g;
    },
    9() { // carabela
      const g = G();
      const casco = malla(new THREE.BoxGeometry(1.4, 0.38, 0.5), mMadera); casco.position.y = 0.35; g.add(casco);
      const proa = malla(new THREE.ConeGeometry(0.27, 0.45, 4), mMadera); proa.rotation.z = -Math.PI / 2; proa.rotation.x = Math.PI / 4; proa.position.set(0.9, 0.38, 0); g.add(proa);
      [[-0.3, 1.1], [0.25, 1.35]].forEach(([x, hgt]) => {
        const m = malla(new THREE.CylinderGeometry(0.03, 0.03, hgt, 6), mMadera); m.position.set(x, 0.5 + hgt / 2, 0); g.add(m);
        const v = malla(new THREE.PlaneGeometry(0.6, hgt * 0.55), M("#efe6d2", { side: THREE.DoubleSide })); v.position.set(x, 0.62 + hgt * 0.5, 0.02); v.rotation.y = Math.PI / 2; g.add(v);
      });
      const cruz = malla(new THREE.BoxGeometry(0.02, 0.22, 0.06), M("#a3483a")); cruz.position.set(0.25, 1.35, 0.06); g.add(cruz);
      animables.push((t) => { g.rotation.z = Math.sin(t * 0.9) * 0.04; });
      return g;
    },
    10() { // anillos apilados de identidades
      const g = G(); const anillos = [];
      P.partes.concat([P.laton]).forEach((c, k) => { const a = malla(new THREE.TorusGeometry(0.55 - k * 0.07, 0.07, 8, 30), M(c)); a.rotation.x = Math.PI / 2; a.position.y = 0.25 + k * 0.28; g.add(a); anillos.push(a); });
      animables.push((t) => { anillos.forEach((a, k) => { a.rotation.z = t * (0.3 + k * 0.2) * (k % 2 ? -1 : 1); a.position.x = Math.sin(t * 0.7 + k) * 0.06; }); });
      return g;
    },
    11() { // banda de Möbius: fluidez de las categorías
      const g = G();
      const geo = new ParametricGeometry((u, v, tgt) => {
        u *= Math.PI * 2; v = v * 2 - 1; const r = 0.55, w = 0.2;
        tgt.set((r + w * v * Math.cos(u / 2)) * Math.cos(u), w * v * Math.sin(u / 2), (r + w * v * Math.cos(u / 2)) * Math.sin(u));
      }, 60, 6);
      const mb = malla(geo, M(P.partes[2], { side: THREE.DoubleSide, flatShading: false })); mb.position.y = 1.0; mb.rotation.x = 0.5; g.add(mb);
      const peana = malla(new THREE.CylinderGeometry(0.05, 0.2, 0.5, 8), mMadera); peana.position.y = 0.25; g.add(peana);
      animables.push((t) => { mb.rotation.y = t * 0.45; });
      return g;
    },
    12() { // calibrador: la falsa medida
      const g = G();
      const base = malla(new THREE.BoxGeometry(1.3, 0.08, 0.12), mLaton); base.position.y = 0.2; g.add(base);
      const b1 = malla(new THREE.BoxGeometry(0.08, 1.1, 0.1), mLaton); b1.position.set(-0.55, 0.75, 0); g.add(b1);
      const b2 = malla(new THREE.BoxGeometry(0.08, 0.6, 0.1), mLaton); b2.position.set(0.45, 0.5, 0); g.add(b2);
      const roto = malla(new THREE.BoxGeometry(0.08, 0.5, 0.1), mLaton); roto.position.set(0.52, 1.0, 0); roto.rotation.z = -0.5; g.add(roto);
      const arco = malla(new THREE.TorusGeometry(0.5, 0.025, 6, 24, Math.PI), mTinta); arco.position.set(0, 0.25, -0.05); g.add(arco);
      return g;
    },
    13() { // estelas de memoria y una llama
      const g = G();
      [[-0.55, 0.9], [-0.18, 1.3], [0.2, 1.05], [0.55, 0.7], [-0.35, 0.6], [0.38, 1.25]].forEach(([x, hgt], k) => {
        const s = malla(new THREE.BoxGeometry(0.22, hgt, 0.22), M(k % 2 ? "#6f6a63" : "#8b857c")); s.position.set(x, hgt / 2, (k % 3 - 1) * 0.3); g.add(s);
      });
      const llama = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.25, 8), new THREE.MeshBasicMaterial({ color: "#ffb347" })); llama.position.set(0, 0.2, 0.55); g.add(llama);
      animables.push((t) => { llama.scale.y = 1 + Math.sin(t * 7) * 0.15; });
      return g;
    },
    14() { // pozo
      const g = G();
      const brocal = malla(new THREE.CylinderGeometry(0.6, 0.62, 0.55, 14, 1, true), M("#9c9184", { side: THREE.DoubleSide })); brocal.position.y = 0.28; g.add(brocal);
      const agua = malla(new THREE.CircleGeometry(0.58, 20), M("#3d6b74", { roughness: 0.2, metalness: 0.2 })); agua.rotation.x = -Math.PI / 2; agua.position.y = 0.38; g.add(agua);
      [-0.55, 0.55].forEach((x) => { const p = malla(new THREE.BoxGeometry(0.08, 1.2, 0.08), mMadera); p.position.set(x, 0.85, 0); g.add(p); });
      const travesano = malla(new THREE.CylinderGeometry(0.05, 0.05, 1.2, 8), mMadera); travesano.rotation.z = Math.PI / 2; travesano.position.y = 1.35; g.add(travesano);
      const tejado = malla(new THREE.ConeGeometry(0.85, 0.45, 4), M("#8e3b2e")); tejado.position.y = 1.65; tejado.rotation.y = Math.PI / 4; g.add(tejado);
      return g;
    },
    15() { // atril con declaración
      const g = G();
      const pie = malla(new THREE.CylinderGeometry(0.06, 0.25, 1.0, 8), mMadera); pie.position.y = 0.5; g.add(pie);
      const tabla = malla(new THREE.BoxGeometry(0.9, 0.06, 0.6), mMadera); tabla.position.y = 1.08; tabla.rotation.x = -0.45; g.add(tabla);
      const hoja = malla(new THREE.BoxGeometry(0.78, 0.015, 0.5), M("#f4ecd8")); hoja.position.set(0, 1.12, 0.02); hoja.rotation.x = -0.45; g.add(hoja);
      [-0.39, 0.39].forEach((x) => { const r = malla(new THREE.CylinderGeometry(0.05, 0.05, 0.55, 10), M("#efe2c4")); r.rotation.x = Math.PI / 2 - 0.45; r.position.set(x, 1.13, 0.02); g.add(r); });
      return g;
    }
  };

  /* ---------- estaciones ---------- */
  const estaciones = [], objetivos = [];
  const n = E.length;
  E.forEach((e, i) => {
    const s = L * (0.025 + 0.95 * (i / (n - 1)));
    const { p } = puntoEn(s);
    const g = G(); g.position.copy(p);
    const mp = mPartes[e.parte - 1];
    const ped = malla(new THREE.CylinderGeometry(1.05, 1.2, 0.45, 6), mPiedra); ped.position.y = 0.22; g.add(ped);
    const aro = malla(new THREE.TorusGeometry(1.08, 0.06, 6, 6), mp); aro.rotation.x = Math.PI / 2; aro.rotation.z = Math.PI / 6; aro.position.y = 0.45; g.add(aro);
    const obj = O[e.num](); obj.position.y = 0.45; obj.scale.setScalar(1.05);
    obj.rotation.y = Math.atan2(-p.x, -p.z) * 0 + Math.PI * 0.25; g.add(obj);
    // farol
    const poste = malla(new THREE.CylinderGeometry(0.04, 0.05, 1.7, 6), mHierro); poste.position.set(1.0, 0.85 + 0.2, 0.7); g.add(poste);
    const matLuz = new THREE.MeshStandardMaterial({ color: "#7a7066", emissive: new THREE.Color(P.partes[e.parte - 1]), emissiveIntensity: 0, roughness: 0.4 });
    mats.push(matLuz);
    const luz = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 10), matLuz); luz.position.set(1.0, 1.95, 0.7); g.add(luz);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaHalo(), color: P.partes[e.parte - 1], transparent: true, opacity: 0, depthWrite: false }));
    halo.scale.setScalar(1.3); halo.position.copy(luz.position); g.add(halo);
    // número
    const etiqueta = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaTexto(String(e.num), { ancho: 128, alto: 128, fondo: P.partes[e.parte - 1], color: "#ffffff", fuente: "700 66px Fraunces, Georgia, serif", circulo: true }), depthWrite: false }));
    etiqueta.scale.setScalar(0.75); etiqueta.position.set(0, 2.9, 0); g.add(etiqueta);
    // objetivo de selección
    const hit = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 3.2, 8), new THREE.MeshBasicMaterial({ visible: false }));
    hit.position.y = 1.6; hit.userData.i = i; g.add(hit); objetivos.push(hit);
    scene.add(g);
    // tramo de camino iluminado hasta la siguiente estación
    const sSig = i < n - 1 ? L * (0.025 + 0.95 * ((i + 1) / (n - 1))) : L;
    const mTramo = new THREE.MeshBasicMaterial({ color: P.partes[e.parte - 1], transparent: true, opacity: 0 });
    const tramo = cinta(s, sSig, 0.5, 0.04, mTramo); scene.add(tramo);
    estaciones.push({ g, p, luz, matLuz, halo, mTramo, etiqueta, parte: e.parte });
  });
  function texturaHalo() {
    const c = document.createElement("canvas"); c.width = c.height = 64; const x = c.getContext("2d");
    const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, "rgba(255,255,255,1)"); gr.addColorStop(1, "rgba(255,255,255,0)");
    x.fillStyle = gr; x.fillRect(0, 0, 64, 64); const t = new THREE.CanvasTexture(c); return t;
  }

  /* ---------- encrucijada central ---------- */
  const centro = G();
  const plaza = malla(new THREE.CylinderGeometry(3.4, 3.6, 0.12, 32), mPiedra); plaza.position.y = 0.06; centro.add(plaza);
  for (let k = 0; k < 4; k++) { const c = malla(new THREE.BoxGeometry(1.1, 0.05, 4.2), mCamino, false); const a = k * Math.PI / 2; c.position.set(Math.sin(a) * 2.2, 0.13, Math.cos(a) * 2.2); c.rotation.y = a; centro.add(c); }
  const poste = malla(new THREE.CylinderGeometry(0.11, 0.14, 4.4, 8), mMadera); poste.position.y = 2.3; centro.add(poste);
  const remate = malla(new THREE.ConeGeometry(0.2, 0.35, 8), mLaton); remate.position.y = 4.65; centro.add(remate);
  const palabras = op.palabras || ["Cultura", "Naturaleza", "Clase", "Violencia"];
  const brazos = palabras.map((w, k) => {
    const a = -k * Math.PI / 2, y = 4.0 - k * 0.5;
    const grupo = G(); grupo.position.y = y; grupo.rotation.y = a;
    const mat = new THREE.MeshStandardMaterial({ color: P.partes[k], emissive: new THREE.Color(P.partes[k]), emissiveIntensity: 0, roughness: 0.7, flatShading: true });
    mats.push(mat);
    const tabla = malla(new THREE.BoxGeometry(2.3, 0.42, 0.1), mat); tabla.position.x = 1.25; grupo.add(tabla);
    const punta = malla(new THREE.ConeGeometry(0.21, 0.3, 3), mat); punta.rotation.z = -Math.PI / 2; punta.position.x = 2.55; grupo.add(punta);
    const tex = texturaTexto(w.toUpperCase(), { ancho: 512, alto: 96, color: "#ffffff", fuente: "700 58px Fraunces, Georgia, serif" });
    [0.056, -0.056].forEach((z, j) => { const pl = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 0.39), new THREE.MeshBasicMaterial({ map: tex, transparent: true })); pl.position.set(1.22, 0, z); if (j) pl.rotation.y = Math.PI; grupo.add(pl); });
    centro.add(grupo);
    return { mat };
  });
  const hitCentro = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 5, 12), new THREE.MeshBasicMaterial({ visible: false }));
  hitCentro.position.y = 2.5; hitCentro.userData.centro = true; centro.add(hitCentro); objetivos.push(hitCentro);
  scene.add(centro);

  /* ---------- interacción ---------- */
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
  let abajo = null, ultimoHover = -2;
  const tocar = (ev) => {
    const r = renderer.domElement.getBoundingClientRect();
    ptr.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const h = ray.intersectObjects(objetivos, false)[0];
    if (!h) return -1;
    return h.object.userData.centro ? 99 : h.object.userData.i;
  };
  renderer.domElement.addEventListener("pointermove", (ev) => {
    if (ev.pointerType !== "mouse") return;
    const i = tocar(ev);
    renderer.domElement.style.cursor = i >= 0 ? "pointer" : "";
    if (i === 99) op.onHover && op.onHover(-1, ev, "Encrucijada: cultura, naturaleza, clase y violencia");
    else op.onHover && op.onHover(i, ev);
    ultimoHover = i;
  });
  renderer.domElement.addEventListener("pointerleave", () => { op.onHover && op.onHover(-1, null); });
  renderer.domElement.addEventListener("pointerdown", (ev) => { abajo = { x: ev.clientX, y: ev.clientY }; });
  renderer.domElement.addEventListener("pointerup", (ev) => {
    if (!abajo || Math.hypot(ev.clientX - abajo.x, ev.clientY - abajo.y) > 6) { abajo = null; return; }
    abajo = null;
    const i = tocar(ev);
    if (i === 99) op.onCentro && op.onCentro();
    else if (i >= 0) op.onSeleccion && op.onSeleccion(i);
  });

  /* ---------- transiciones de cámara ---------- */
  let vuelo = null;
  function volar(pos, tgt, ms = 1100) {
    if (pausa) { camera.position.copy(pos); controls.target.copy(tgt); controls.update(); return; }
    vuelo = { p0: camera.position.clone(), t0: controls.target.clone(), p1: pos, t1: tgt, ini: performance.now(), ms };
  }
  const suave = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  function irA(i) {
    const e = estaciones[i]; if (!e) return;
    const fuera = e.p.clone().setY(0).normalize();
    volar(e.p.clone().add(fuera.multiplyScalar(9.5)).add(new THREE.Vector3(0, 6, 0)), e.p.clone().add(new THREE.Vector3(0, 1.3, 0)));
  }
  const general = () => { const a = Math.min(1.3, camera.aspect || 1), d = 58 / Math.pow(a, 0.75); return new THREE.Vector3(0, d * 0.72, d * 0.86); };
  const vistaGeneral = () => volar(general(), new THREE.Vector3(0, 0, 2));
  const irCentro = () => volar(new THREE.Vector3(6, 8, 12), new THREE.Vector3(0, 2.8, 0));

  /* ---------- estado de progreso ---------- */
  let hechas = E.map(() => false), partes = [false, false, false, false];
  function marcarResueltas(est, prt) {
    hechas = est.slice(); if (prt) partes = prt.slice();
    estaciones.forEach((e, i) => {
      e.matLuz.emissiveIntensity = hechas[i] ? 1.6 : 0;
      e.matLuz.color.set(hechas[i] ? "#fff6dd" : "#7a7066");
      e.halo.material.opacity = hechas[i] ? 0.55 : 0;
      e.mTramo.opacity = hechas[i] ? 0.85 : 0;
    });
    brazos.forEach((b, k) => { b.mat.emissiveIntensity = partes[k] ? 0.55 : 0; });
  }

  /* ---------- tema ---------- */
  function aplicarTema() {
    P = paleta();
    scene.background.set(P.fondo); scene.fog.color.set(P.fondo);
    mSuelo.color.set(P.suelo); mCamino.color.set(P.camino); mPiedra.color.set(P.piedra);
    mLaton.color.set(P.laton); mTinta.color.set(P.tinta); mMonte.color.set(P.monte);
    mPartes.forEach((m, k) => m.color.set(P.partes[k]));
    estaciones.forEach((e) => { const c = P.partes[e.parte - 1]; e.matLuz.emissive.set(c); e.halo.material.color.set(c); e.mTramo.color.set(c); });
    brazos.forEach((b, k) => { b.mat.color.set(P.partes[k]); b.mat.emissive.set(P.partes[k]); });
    const oscuro = matchMedia("(prefers-color-scheme: dark)").matches && document.documentElement.dataset.theme !== "light" || document.documentElement.dataset.theme === "dark";
    hemi.intensity = oscuro ? 0.55 : 0.9; sol.intensity = oscuro ? 0.9 : 1.6;
  }
  aplicarTema();

  /* ---------- tamaño y bucle ---------- */
  function ajustar() {
    const w = cont.clientWidth || 600, hgt = cont.clientHeight || 400;
    renderer.setSize(w, hgt, false); renderer.domElement.style.width = "100%"; renderer.domElement.style.height = "100%";
    camera.aspect = w / hgt; camera.updateProjectionMatrix();
    if (!iniciado) { camera.position.copy(general()); controls.target.set(0, 0, 2); }
  }
  let iniciado = false;
  new ResizeObserver(ajustar).observe(cont); ajustar(); iniciado = true;
  const reloj = new THREE.Clock(); let t = 0;
  function bucle() {
    requestAnimationFrame(bucle);
    const dt = reloj.getDelta();
    if (!pausa) {
      t += dt;
      animables.forEach((f) => f(t));
      estaciones.forEach((e, i) => { if (hechas[i]) e.halo.material.opacity = 0.45 + Math.sin(t * 2.2 + i) * 0.1; });
    }
    if (vuelo) {
      const f = Math.min(1, (performance.now() - vuelo.ini) / vuelo.ms), k = suave(f);
      camera.position.lerpVectors(vuelo.p0, vuelo.p1, k); controls.target.lerpVectors(vuelo.t0, vuelo.t1, k);
      if (f >= 1) vuelo = null;
    }
    controls.update();
    renderer.render(scene, camera);
  }
  bucle();

  return {
    irA, irCentro, vistaGeneral, marcarResueltas, aplicarTema,
    getPausa: () => pausa, setPausa: (b) => { pausa = b; }
  };
}
