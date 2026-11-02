/*
 * Encrucijadas · interfaz (arquitectura heredada de Entramados)
 * Índice | escena | ficha. Rutas por ancla: #inicio, #e1…#e15, #estudio, #claves, #comentario, #tarjetas, #simulador,
 * #examen, #glosario, #bibliografia, #guia y #docente (activa el modo docente en esta pestaña).
 */
const E = window.ESTACIONES, R = window.REFERENCIAS, X = window.EXAMEN, GX = window.GLOSARIO || [];
const S = window.ESTUDIO || {}, GU = window.GUIA || {}, PAL = window.PALABRAS || [], FR = window.FRAGMENTOS || [];
const $ = (s) => document.querySelector(s);
document.documentElement.lang = "es";
const ficha = $("#ficha");
const CLAVE = "encrucijadas-v1";
const NE = E.length;
export const PARTES = {
  1: { nombre: "Aproximación crítica al canon antropológico", corto: "El canon", color: "--p1" },
  2: { nombre: "Los «primitivos» y el colonialismo", corto: "Primitivos y colonialismo", color: "--p2" },
  3: { nombre: "Las etiquetas de la identidad", corto: "Etiquetas de la identidad", color: "--p3" },
  4: { nombre: "La práctica antropológica ante las situaciones extremas", corto: "Situaciones extremas", color: "--p4" }
};
const colorParte = (p) => `var(${PARTES[p].color})`;
const ROMANO = { 1: "I", 2: "II", 3: "III", 4: "IV" };

/* ---------- estado (solo en este navegador) ---------- */
let estado = { resueltos: {}, predicciones: {}, examen: null, pestana: {}, apuntes: {}, respuestas: {}, repasadas: {}, cajas: {}, simulacro: null, comentario: { frag: "dudh", propio: "", texto: "" } };
try { const g = JSON.parse(localStorage.getItem(CLAVE) || "null"); if (g) estado = Object.assign(estado, g); } catch (e) { /* sin almacenamiento */ }
const guardar = () => { try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch (e) { /* sin almacenamiento */ } };
let temporizador = null;
const guardarPronto = () => { clearTimeout(temporizador); temporizador = setTimeout(guardar, 400); };
let docente = false;
try { docente = sessionStorage.getItem("enc-docente") === "1"; } catch (e) { /* nada */ }

const hechosDe = (est) => est.retos.filter((r) => estado.resueltos[r.id]).length;
const completa = (est) => hechosDe(est) === est.retos.length;
const estPorId = (id) => E.find((e) => e.id === id);
const parteCompleta = (p) => E.filter((e) => e.parte === p).every(completa);

/* ---------- utilidades ---------- */
function h(tag, attrs = {}, ...hijos) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") n.className = v;
    else if (k === "html") n.innerHTML = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) n.setAttribute(k, v);
  }
  hijos.flat(Infinity).forEach((c) => { if (c != null) n.append(c.nodeType ? c : document.createTextNode(c)); });
  return n;
}
const hh = (tag, attrs, html) => h(tag, Object.assign({}, attrs, { html }));
function refHTML(clave) {
  const r = R[clave]; if (!r) return "";
  let s = r.cita;
  if (r.doi) s += ` <a href="https://doi.org/${r.doi}" target="_blank" rel="noopener">https://doi.org/${r.doi}</a>`;
  else if (r.url) s += ` <a href="${r.url}" target="_blank" rel="noopener">Enlace</a>`;
  if (r.nota) s += ` <span class="nota">${r.nota}</span>`;
  return s;
}
const contarPalabras = (t) => (t.trim().match(/\S+/g) || []).length;
const barajar = (a) => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
let primeraVista = true;
function irArriba() {
  ficha.scrollTop = 0;
  if (!primeraVista && window.innerWidth <= 1100) ficha.scrollIntoView({ behavior: "smooth", block: "start" });
  primeraVista = false;
}
const botonEst = (id, texto) => { const e = estPorId(id); return h("button", { type: "button", class: "enlace", onclick: () => navegar(id) }, texto || `Estación ${e.num}: ${e.titulo}`); };
const sinEtiquetas = (s) => String(s).replace(/<[^>]+>/g, "");

/* ---------- índice ---------- */
function pintarIndice(actual) {
  const cont = $("#lista-estaciones"); cont.innerHTML = "";
  [1, 2, 3, 4].forEach((p) => {
    const sec = h("div", { class: "bloque" }, h("p", { class: "bloque-tit" }, h("span", { class: "chip-parte", style: `--c:${colorParte(p)}`, "aria-hidden": "true" }), h("strong", {}, `Parte ${ROMANO[p]}. `), PARTES[p].nombre));
    const ul = h("ul", { class: "lista" });
    E.filter((est) => est.parte === p).forEach((est) => {
      const n = hechosDe(est), t = est.retos.length, ok = n === t;
      ul.append(h("li", {}, h("button", {
        type: "button", "aria-current": actual === est.id ? "true" : "false", onclick: () => navegar(est.id)
      }, h("span", { class: "num" }, String(est.num)),
         h("span", { class: "tit" }, est.titulo, h("br"), h("span", { class: "manual" }, `Cap. ${est.cap}, ${est.paginas}`)),
         h("span", { class: "est mono" + (ok ? " hecho" : ""), "aria-label": `${n} de ${t} retos` }, ok ? "✓" : `${n}/${t}`))));
    });
    sec.append(ul); cont.append(sec);
  });
  const nComp = E.filter(completa).length;
  $("#progreso-relleno").style.width = `${(nComp / NE) * 100}%`;
  $(".barra-progreso").setAttribute("aria-valuenow", String(nComp));
  $("#pildora-progreso").textContent = `${nComp} de ${NE} hitos encendidos`;
  if (escena) escena.marcarResueltas(E.map(completa), [1, 2, 3, 4].map(parteCompleta));
}

/* ---------- inicio ---------- */
function vistaInicio() {
  ficha.innerHTML = "";
  ficha.append(
    h("p", { class: "etiqueta" }, "Antropología Social y Cultural · UNED · 70021015"),
    h("h2", {}, "Encrucijadas"),
    h("p", { class: "sub" }, "Un viaje de lo lejano a lo próximo"),
    h("p", { class: "lema" }, "Quince hitos en un camino que avanza en espiral desde las montañas lejanas hasta la encrucijada central. Cada estación que completas enciende su farol; cada parte completa ilumina un brazo del poste: cultura, naturaleza, clase y violencia."),
    hh("p", {}, "El recurso sigue el libro de texto de la asignatura, <em>De lo lejano a lo próximo: un viaje por la antropología y sus encrucijadas</em> (Moreno Feliu, 2014): una estación por capítulo, en sus cuatro partes, y las cuatro «palabras clave» de Raymond Williams con que se cierra cada una. Las referencias «MF, p.» remiten a sus páginas."),
    h("h3", {}, "Cómo se trabaja cada estación"),
    h("ol", { class: "lista-plana" },
      h("li", {}, h("strong", {}, "Predice. "), "Responde a la pregunta inicial antes de leer."),
      h("li", {}, h("strong", {}, "Comprende. "), "Lee la síntesis, los conceptos y los avisos de «Lee con cautela», donde se señalan erratas y nombres que conviene corregir."),
      h("li", {}, h("strong", {}, "Resuelve. "), "Supera los dos retos; cada acierto se explica."),
      h("li", {}, h("strong", {}, "Estudia. "), "Ideas clave, errores frecuentes y una pregunta breve para redactar con su guion."),
      h("li", {}, h("strong", {}, "Prepara la prueba. "), "En «Al examen», posibles preguntas breves con los elementos que debería contener la respuesta.")),
    h("div", { class: "reto-acciones" },
      h("button", { type: "button", class: "boton primario", onclick: () => navegar("e1") }, "Empezar por la estación 1"),
      h("button", { type: "button", class: "boton", onclick: () => navegar("estudio") }, "Guía de estudio"),
      h("button", { type: "button", class: "boton", onclick: () => navegar("comentario") }, "Taller de comentario"),
      h("button", { type: "button", class: "boton", onclick: () => navegar("simulador") }, "Simulador de la prueba")),
    h("h3", {}, "Estaciones"),
    h("div", { class: "grupo-herr" }, E.map((est) => h("button", { type: "button", class: "boton ancho", onclick: () => navegar(est.id) },
      h("span", { class: "chip-parte", style: `--c:${colorParte(est.parte)}`, "aria-hidden": "true" }),
      h("span", { class: "mono" }, `${est.num} ·`), ` ${est.titulo} — cap. ${est.cap}`))),
    hh("div", { class: "aviso" }, "El recurso resume y organiza el libro de texto; no sustituye su lectura ni la guía de la asignatura, que prevalece en contenidos, formato y fechas. El comentario de texto de la prueba versa sobre <em>En el corazón de la zona gris</em> (Moreno Feliu, 2010), que este recurso no resume: el «Taller de comentario» solo entrena el método."),
    h("p", { class: "nota-pie" }, "El progreso, las respuestas y los apuntes se guardan solo en este navegador.")
  );
  irArriba();
}

/* ---------- estación ---------- */
function vistaEstacion(i, pestana) {
  const est = E[i];
  const actual = pestana || estado.pestana[est.id] || "saber";
  ficha.innerHTML = "";
  ficha.append(
    h("p", { class: "etiqueta" }, `Estación ${est.num} de ${NE} · Parte ${ROMANO[est.parte]} · MF, ${est.paginas}`),
    h("h2", { class: "parte-tit", style: `--c:${colorParte(est.parte)}` }, est.titulo),
    h("p", { class: "sub" }, est.sub),
    h("p", { class: "lema" }, est.lema)
  );
  const fs = h("fieldset", { class: "prediccion" }, h("legend", {}, "Predice"), h("p", {}, est.prediccion.q));
  const ops = h("div", { class: "opciones" });
  est.prediccion.o.forEach((o, k) => {
    const id = `${est.id}-pred-${k}`;
    const inp = h("input", { type: "radio", name: `${est.id}-pred`, id, value: String(k) });
    if (estado.predicciones[est.id] === k) inp.checked = true;
    inp.addEventListener("change", () => { estado.predicciones[est.id] = k; guardar(); });
    ops.append(h("label", { for: id }, inp, o));
  });
  fs.append(ops);
  if (completa(est)) fs.append(h("p", { class: "fb bien" }, "Estación completada. ¿Mantienes tu predicción? Justifícala con lo aprendido y con una página del manual."));
  ficha.append(fs);

  const nombres = { saber: "Saber", estudiar: "Estudiar", retos: `Retos ${hechosDe(est)}/${est.retos.length}`, examen: "Al examen", fuentes: "Fuentes" };
  const tl = h("div", { class: "pestanas", role: "tablist", "aria-label": "Secciones de la estación" });
  const paneles = {};
  Object.keys(nombres).forEach((k) => {
    const b = h("button", { type: "button", role: "tab", id: `tab-${k}`, "aria-controls": `panel-${k}`, "aria-selected": k === actual ? "true" : "false", tabindex: k === actual ? "0" : "-1" }, nombres[k]);
    b.addEventListener("click", () => activar(k, true));
    b.addEventListener("keydown", (ev) => {
      const ks = Object.keys(nombres), p = ks.indexOf(k);
      if (ev.key === "ArrowRight") { activar(ks[(p + 1) % ks.length], true); ev.preventDefault(); }
      if (ev.key === "ArrowLeft") { activar(ks[(p + ks.length - 1) % ks.length], true); ev.preventDefault(); }
    });
    tl.append(b);
  });
  ficha.append(tl);
  function activar(k, foco) {
    tl.querySelectorAll("button").forEach((b) => { const s = b.id === `tab-${k}`; b.setAttribute("aria-selected", s); b.tabIndex = s ? 0 : -1; if (s && foco) b.focus(); });
    Object.entries(paneles).forEach(([n, p]) => { p.hidden = n !== k; });
    estado.pestana[est.id] = k; guardar();
  }
  const panel = (k) => { const p = h("div", { class: "panel", role: "tabpanel", id: `panel-${k}`, "aria-labelledby": `tab-${k}` }); paneles[k] = p; ficha.append(p); return p; };

  // saber
  const pS = panel("saber");
  pS.append(h("p", { class: "idea" }, est.idea));
  est.sintesis.forEach((p) => pS.append(hh("p", {}, p)));
  pS.append(h("h3", {}, "Conceptos clave"));
  const dl = h("dl", { class: "conceptos" });
  est.conceptos.forEach((c) => dl.append(h("div", {}, hh("dt", {}, c.t), hh("dd", {}, c.d))));
  pS.append(dl);
  pS.append(h("blockquote", { class: "cita" }, h("p", {}, `«${est.cita.texto}»`), h("footer", {}, est.cita.fuente)));
  pS.append(h("h3", {}, "Lee con cautela"));
  est.matices.forEach((m) => pS.append(h("div", { class: "matiz" }, h("strong", {}, m.t), hh("span", {}, " " + m.d))));
  pS.append(h("div", { class: "navegacion" }, h("button", { type: "button", class: "boton primario", onclick: () => activar("retos", true) }, "Ir a los retos")));

  // estudiar
  const pE = panel("estudiar");
  const st = S[est.id];
  if (st) {
    pE.append(h("h3", {}, "Ideas clave"), h("ul", { class: "lista-plana claves" }, st.claves.map((c) => hh("li", {}, c))));
    pE.append(h("h3", {}, "Errores frecuentes"));
    st.errores.forEach((x) => pE.append(hh("div", { class: "matiz" }, x)));
    pE.append(h("h3", {}, "Pregunta breve para redactar"), hh("p", { class: "lema" }, st.desarrollo.q),
      h("p", { class: "nota-pie" }, "En la prueba, cada pregunta breve vale hasta 3 puntos y todo el examen cabe en un folio por las dos caras: entrena la síntesis. Escribe sin mirar y compara después con el guion."));
    const idR = `resp-${est.id}`;
    const ta = h("textarea", { id: idR, rows: "8", class: "area", placeholder: "Redacta aquí tu respuesta antes de ver el guion." });
    const cnt = h("span", { class: "contador", "aria-live": "polite" });
    const actualiza = () => { const w = contarPalabras(ta.value); cnt.textContent = `${w} palabras (orientativo: 180-260)`; cnt.classList.toggle("exceso", w > 300); };
    ta.value = estado.respuestas[est.id] || ""; actualiza();
    ta.addEventListener("input", () => { estado.respuestas[est.id] = ta.value; actualiza(); guardarPronto(); });
    pE.append(h("div", { class: "campo" }, h("label", { for: idR }, "Tu respuesta"), ta, cnt));
    pE.append(h("details", { class: "guion" }, h("summary", {}, "Ver guion de respuesta"),
      h("ol", { class: "lista-plana" }, st.desarrollo.guion.map((g) => hh("li", {}, g))),
      h("p", { class: "nota-pie" }, "Criterio de la guía: síntesis y competencia teórica y etnográfica. Cada punto debe llevar un autor, un caso etnográfico o una categoría.")));
  }
  const idA = `apuntes-${est.id}`;
  const ap = h("textarea", { id: idA, rows: "5", class: "area", placeholder: "Dudas, ejemplos propios, conexiones con otras estaciones…" });
  ap.value = estado.apuntes[est.id] || "";
  ap.addEventListener("input", () => { estado.apuntes[est.id] = ap.value; guardarPronto(); });
  pE.append(h("h3", {}, "Mis apuntes"), h("div", { class: "campo" }, h("label", { for: idA }, "Notas de esta estación (se guardan en este navegador)"), ap));
  const idC = `repasada-${est.id}`;
  const chk = h("input", { type: "checkbox", id: idC });
  chk.checked = !!estado.repasadas[est.id];
  chk.addEventListener("change", () => { estado.repasadas[est.id] = chk.checked; guardar(); });
  pE.append(h("label", { for: idC, class: "casilla" }, chk, "He repasado esta estación"));
  pE.append(h("div", { class: "reto-acciones" },
    h("button", { type: "button", class: "boton", onclick: () => navegar("tarjetas") }, "Repasar con tarjetas"),
    h("button", { type: "button", class: "boton", onclick: () => navegar("estudio") }, "Guía de estudio")));

  // retos
  const pR = panel("retos");
  est.retos.forEach((r) => {
    Retos.render(r, pR, {
      docente, resuelto: !!estado.resueltos[r.id],
      onResuelto: () => {
        const antes = completa(est), antesParte = parteCompleta(est.parte);
        estado.resueltos[r.id] = true; guardar();
        const tab = tl.querySelector("#tab-retos"); if (tab) tab.textContent = `Retos ${hechosDe(est)}/${est.retos.length}`;
        pintarIndice(est.id);
        if (!antes && completa(est)) pR.append(h("p", { class: "fb bien", role: "status" }, `Hito ${est.num} encendido: su farol ya brilla en el camino.`));
        if (!antesParte && parteCompleta(est.parte)) {
          const pal = PAL.find((x) => x.parte === est.parte);
          pR.append(h("p", { class: "fb bien", role: "status" }, `Parte ${ROMANO[est.parte]} completa: se ilumina el brazo «${pal ? pal.palabra : ""}» de la encrucijada.`));
        }
      }
    });
  });

  // al examen
  const pX = panel("examen");
  pX.append(h("h3", {}, "Posibles preguntas breves"),
    h("p", { class: "nota-pie" }, "Cada pregunta breve vale de 0 a 3 puntos. Intenta enumerar los elementos antes de desplegarlos: delimitación, autor y obra, caso etnográfico y consecuencia analítica."));
  est.examen.forEach((p) => pX.append(h("div", { class: "corta" }, hh("p", {}, p.q),
    h("details", {}, h("summary", {}, "Elementos que debería contener"), h("ul", { class: "lista-plana" }, p.claves.map((c) => hh("li", {}, c)))))));
  pX.append(h("h3", {}, "Conecta con otras estaciones"));
  est.conexiones.forEach(([id, motivo]) => pX.append(h("p", { class: "conexion" }, botonEst(id), hh("span", {}, motivo))));
  pX.append(h("div", { class: "reto-acciones" }, h("button", { type: "button", class: "boton primario", onclick: () => navegar("simulador") }, "Practicar en el Simulador")));
  if (docente) {
    pX.append(h("div", { class: "docente-caja" },
      h("p", { class: "etiqueta" }, "Notas para tutoría"),
      h("p", {}, h("strong", {}, "Duración orientativa: "), est.docente.duracion),
      hh("p", {}, "<strong>Dinámica: </strong>" + est.docente.dinamica),
      h("p", {}, h("strong", {}, "Preguntas para el debate:")),
      h("ul", { class: "lista-plana" }, est.docente.preguntas.map((q) => h("li", {}, q)))));
  }

  // fuentes
  const pF = panel("fuentes");
  pF.append(h("h3", {}, "Referencias de esta estación"),
    h("p", { class: "nota-pie" }, "Se citan, cuando ha sido posible, en la edición que recoge la bibliografía del manual; las de ampliación se identifican como tales. DOI solo cuando se ha contrastado."));
  pF.append(h("ul", { class: "refs" }, est.refs.map((k) => hh("li", {}, refHTML(k) + (R[k] && R[k].tipo === "amplia" ? '<span class="nota">Amplía, no sustituye al manual.</span>' : "")))));

  ficha.append(h("div", { class: "navegacion" },
    h("button", { type: "button", class: "boton", disabled: i === 0, onclick: () => navegar(E[i - 1].id) }, "← Anterior"),
    h("button", { type: "button", class: "boton", onclick: () => navegar("inicio") }, "Inicio"),
    h("button", { type: "button", class: "boton", disabled: i === E.length - 1, onclick: () => navegar(E[i + 1].id) }, "Siguiente →")));
  activar(actual, false);
  irArriba();
}

/* ---------- autoevaluación ---------- */
const N_EXAMEN = 15;
function sorteo() {
  const porEst = E.map((e) => barajar(X.filter((p) => p.est === e.id)));
  const elegidas = porEst.map((l) => l[0]).filter(Boolean);
  const resto = barajar(X.filter((p) => !elegidas.includes(p)));
  return barajar(elegidas.concat(resto.slice(0, Math.max(0, N_EXAMEN - elegidas.length)))).slice(0, N_EXAMEN);
}
function vistaExamen() {
  const Q = sorteo();
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Herramienta"), h("h2", {}, "Autoevaluación"),
    h("p", { class: "sub" }, `${N_EXAMEN} preguntas sorteadas de un banco de ${X.length}, una por estación. Cada fallo indica qué estación repasar.`),
    h("div", { class: "aviso" }, "La prueba presencial no es de tipo test: este ejercicio solo comprueba conceptos. Para entrenar la redacción, usa el Simulador y el Taller de comentario."));
  if (estado.examen != null) ficha.append(h("p", { class: "idea" }, `Tu mejor resultado en este navegador: ${estado.examen} de ${N_EXAMEN}.`));
  const form = h("form", {});
  Q.forEach((p, qi) => {
    const fs = h("fieldset", { class: "pregunta" }, hh("legend", {}, `${qi + 1}. ${p.q}`));
    const ops = h("div", { class: "opciones" });
    p.o.forEach((o, oi) => { const id = `ex-${qi}-${oi}`; const lab = h("label", { for: id }, h("input", { type: "radio", name: `ex-${qi}`, id, value: String(oi) })); lab.insertAdjacentHTML("beforeend", o); ops.append(lab); });
    fs.append(ops, h("div", { class: "resultado-item", id: `ex-r-${qi}` }));
    form.append(fs);
  });
  const res = h("div", { class: "resultado", role: "status" });
  form.append(h("div", { class: "reto-acciones" }, h("button", { type: "submit", class: "boton primario" }, "Corregir"),
    h("button", { type: "button", class: "boton", onclick: () => vistaExamen() }, "Nuevo sorteo"),
    docente ? h("button", { type: "button", class: "boton", onclick: () => { Q.forEach((p, qi) => { form.querySelector(`#ex-${qi}-${p.c}`).checked = true; }); } }, "Marcar solución") : null), res);
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    let ok = 0; const fallos = {};
    Q.forEach((p, qi) => {
      const m = form.querySelector(`input[name="ex-${qi}"]:checked`), out = form.querySelector(`#ex-r-${qi}`);
      const bien = m && Number(m.value) === p.c; if (bien) ok++; else fallos[p.est] = (fallos[p.est] || 0) + 1;
      const est = estPorId(p.est);
      out.innerHTML = "";
      out.append(h("div", { class: "fb " + (bien ? "bien" : "mal") }, bien ? `Correcto. ${sinEtiquetas(p.e)}` : (m ? "No es correcta. " : "Sin responder. "),
        bien ? null : h("button", { type: "button", class: "boton", onclick: () => navegar(p.est) }, `Repasar estación ${est.num}`)));
    });
    estado.examen = Math.max(estado.examen || 0, ok); guardar();
    const rep = Object.keys(fallos).map(estPorId).sort((a, b) => a.num - b.num).map((e) => `${e.num}. ${e.titulo}`).join("; ");
    res.innerHTML = "";
    res.append(h("div", { class: `fb ${ok >= 11 ? "bien" : "mal"}` }, `${ok} de ${N_EXAMEN} correctas.${ok >= 11 ? " Buen dominio de los conceptos." : ""}${rep ? " Repasa: " + rep + "." : ""}`));
  });
  ficha.append(form);
  irArriba();
}

/* ---------- comentario de texto: piezas compartidas ---------- */
const PASOS_COMENTARIO = [
  ["Sitúa el fragmento", "Autora, obra, capítulo y contexto (qué problema trata esa parte del libro)."],
  ["Tema e idea central", "Formula en una o dos frases de qué trata y qué sostiene."],
  ["Estructura", "Partes del fragmento y cómo avanza el argumento."],
  ["Contexto antropológico", "Conceptos, autores y casos del manual con que dialoga (enlaza con las estaciones)."],
  ["Argumentación y valoración", "Qué aporta, qué silencios o tensiones señala, con precisión terminológica."],
  ["Cierre", "Conclusión breve que devuelva el fragmento a la pregunta antropológica de fondo."]
];
function pasosComentario() {
  return h("ol", { class: "pasos-comentario" }, PASOS_COMENTARIO.map(([t, d]) => h("li", {}, h("strong", {}, t + ". "), d)));
}
function selectorFragmento(alCambiar) {
  const c = estado.comentario;
  const sel = h("select", { id: "frag-sel" },
    FR.map((f) => h("option", { value: f.id }, f.titulo)),
    h("option", { value: "propio" }, "Mi fragmento de «En el corazón de la zona gris»"));
  sel.value = c.frag || "dudh";
  const caja = h("div", {});
  const pinta = () => {
    caja.innerHTML = "";
    if (sel.value === "propio") {
      const ta = h("textarea", { id: "frag-propio", rows: "6", class: "area", placeholder: "Copia aquí, de tu ejemplar, el fragmento que quieras comentar (indica la página)." });
      ta.value = c.propio || "";
      ta.addEventListener("input", () => { c.propio = ta.value; guardarPronto(); });
      caja.append(h("div", { class: "campo" }, h("label", { for: "frag-propio" }, "Fragmento propio"), ta),
        hh("p", { class: "nota-pie" }, "El comentario del examen versa sobre un fragmento de <em>En el corazón de la zona gris</em>, que puedes llevar a la prueba. Este recurso no reproduce el libro: practica con tu ejemplar."));
    } else {
      const f = FR.find((x) => x.id === sel.value);
      caja.append(h("div", { class: "fragmento", tabindex: "0", role: "region", "aria-label": `Fragmento: ${f.titulo}` }, f.texto),
        h("p", { class: "nota-pie" }, f.fuente),
        h("p", {}, h("strong", {}, "Pistas: ")), h("ul", { class: "lista-plana" }, f.pistas.map((p) => h("li", {}, p))),
        h("p", { class: "nota-pie" }, "Estaciones relacionadas: ", f.estaciones.map((id, i) => [i ? ", " : "", botonEst(id, `${estPorId(id).num}. ${estPorId(id).titulo}`)])));
    }
  };
  sel.addEventListener("change", () => { c.frag = sel.value; guardar(); pinta(); if (alCambiar) alCambiar(); });
  pinta();
  return { nodo: h("div", {}, h("div", { class: "campo" }, h("label", { for: "frag-sel" }, "Fragmento"), sel), caja), sel };
}

/* ---------- taller de comentario ---------- */
function vistaComentario() {
  const c = estado.comentario;
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Estudio"), h("h2", {}, "Taller de comentario de texto"),
    h("p", { class: "sub" }, "El comentario vale hasta 4 de los 10 puntos de la prueba. Aquí se entrena el método con textos documentales del manual o con tu propio fragmento de la monografía."),
    hh("div", { class: "aviso" }, "Criterios de la guía 2025/2026: <strong>comprensión del texto, contexto antropológico, argumentación y precisión</strong>. El examen real comenta un fragmento de <em>En el corazón de la zona gris</em> (Moreno Feliu, 2010); el concepto de «zona gris» procede de Primo Levi (<em>Los hundidos y los salvados</em>, 1986)."),
    h("h3", {}, "Seis pasos"), pasosComentario());
  const { nodo } = selectorFragmento();
  ficha.append(h("h3", {}, "Elige el texto"), nodo);
  const ta = h("textarea", { id: "com-texto", rows: "14", class: "area", placeholder: "Redacta tu comentario siguiendo los seis pasos." });
  const cnt = h("span", { class: "contador", "aria-live": "polite" });
  const act = () => { const w = contarPalabras(ta.value); cnt.textContent = `${w} palabras (orientativo: 300-420)`; cnt.classList.toggle("exceso", w > 450); };
  ta.value = c.texto || ""; act();
  ta.addEventListener("input", () => { c.texto = ta.value; act(); guardarPronto(); });
  ficha.append(h("h3", {}, "Tu comentario"), h("div", { class: "campo" }, h("label", { for: "com-texto" }, "Comentario"), ta, cnt));
  const lista = h("ul", { class: "lista-plana" });
  [["com-c1", "He situado el fragmento (obra, capítulo, problema)."], ["com-c2", "He enunciado el tema y la idea central sin parafrasear todo el texto."], ["com-c3", "He relacionado al menos dos conceptos o autores del manual."], ["com-c4", "He aportado un caso etnográfico o histórico pertinente."], ["com-c5", "He valorado el texto con argumentos, no con opiniones sueltas."], ["com-c6", "He revisado la precisión de nombres, fechas y términos."]]
    .forEach(([id, t]) => { const k = h("input", { type: "checkbox", id }); lista.append(h("li", {}, h("label", { for: id, class: "casilla" }, k, t))); });
  ficha.append(h("details", { class: "guion" }, h("summary", {}, "Lista de autocorrección"), lista));
  irArriba();
}

/* ---------- simulador de la prueba presencial ---------- */
let relojSim = null;
function nuevoSimulacro() {
  // dos preguntas breves de partes distintas del libro
  const breves = [];
  E.forEach((e) => e.examen.forEach((p, k) => breves.push({ est: e.id, k, parte: e.parte })));
  const a = barajar(breves)[0];
  const b = barajar(breves.filter((x) => x.parte !== a.parte))[0];
  estado.simulacro = { breves: [a, b].map((x) => ({ est: x.est, k: x.k })), resp: ["", "", ""], inicio: null };
  guardar();
}
const preguntaBreve = (x) => estPorId(x.est).examen[x.k];
function vistaSimulador() {
  if (!estado.simulacro || !estado.simulacro.breves) nuevoSimulacro();
  const sim = estado.simulacro;
  clearInterval(relojSim);
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Herramienta"), h("h2", {}, "Simulador de la prueba presencial"),
    h("p", { class: "sub" }, "Dos preguntas breves (0-3 puntos cada una) y un comentario de texto (0-4 puntos), en 120 minutos y un folio por las dos caras en total."),
    hh("div", { class: "aviso" }, "Una cara de folio manuscrita da para unas 300-450 palabras según la letra: el contador total es solo orientativo. En el examen real el comentario es de un fragmento de <em>En el corazón de la zona gris</em>, que puedes llevar; elige «Mi fragmento» para practicar con tu ejemplar. Formato según la guía 2025/2026: compruébalo en la vigente."));
  const reloj = h("span", { class: "reloj", "aria-live": "off" }, "120:00");
  const bReloj = h("button", { type: "button", class: "boton primario" }, sim.inicio ? "Reiniciar reloj" : "Empezar (120 min)");
  const pintaReloj = () => {
    if (!sim.inicio) { reloj.textContent = "120:00"; return; }
    const rest = Math.max(0, 120 * 60 - Math.floor((Date.now() - sim.inicio) / 1000));
    reloj.textContent = `${String(Math.floor(rest / 60)).padStart(2, "0")}:${String(rest % 60).padStart(2, "0")}`;
    reloj.classList.toggle("alerta", rest < 600);
    if (rest === 0) clearInterval(relojSim);
  };
  bReloj.addEventListener("click", () => { sim.inicio = Date.now(); guardar(); bReloj.textContent = "Reiniciar reloj"; clearInterval(relojSim); relojSim = setInterval(pintaReloj, 1000); pintaReloj(); });
  if (sim.inicio) relojSim = setInterval(pintaReloj, 1000);
  pintaReloj();
  const bNuevo = h("button", { type: "button", class: "boton", onclick: () => { nuevoSimulacro(); vistaSimulador(); } }, "Nuevo simulacro");
  const total = h("span", { class: "contador-total", "aria-live": "polite" });
  const actTotal = () => { const w = sim.resp.reduce((a, t) => a + contarPalabras(t || ""), 0); total.textContent = `Total: ${w} palabras (folio por las dos caras ≈ 600-900)`; total.classList.toggle("exceso", w > 900); };
  ficha.append(h("div", { class: "sim-cab" }, reloj, bReloj, bNuevo, h("span", { class: "nota-pie" }, "Reparto sugerido: 30 min por pregunta breve, 50 para el comentario y 10 de revisión.")), total);

  const bloque = (n, titulo, enunciadoNodo, extra) => {
    const id = `sim-${n}`;
    const ta = h("textarea", { id, rows: n === 2 ? "14" : "9", class: "area", placeholder: "Escribe sin consultar el manual." });
    const cnt = h("span", { class: "contador", "aria-live": "polite" });
    const act = () => { cnt.textContent = `${contarPalabras(ta.value)} palabras`; actTotal(); };
    ta.value = sim.resp[n] || ""; act();
    ta.addEventListener("input", () => { sim.resp[n] = ta.value; act(); guardarPronto(); });
    return h("section", { class: "sim-preg" }, h("h3", {}, titulo), enunciadoNodo, extra || null,
      h("div", { class: "campo" }, h("label", { for: id }, "Respuesta"), ta, cnt));
  };
  sim.breves.forEach((x, k) => ficha.append(bloque(k, `Pregunta breve ${k + 1} · hasta 3 puntos`, hh("p", { class: "lema" }, preguntaBreve(x).q), h("p", { class: "nota-pie" }, "Procede de ", botonEst(x.est), "."))));
  const { nodo } = selectorFragmento();
  ficha.append(bloque(2, "Comentario de texto · hasta 4 puntos", h("div", {}, h("p", { class: "lema" }, "Comenta el siguiente fragmento."), nodo), h("details", { class: "guion" }, h("summary", {}, "Recordar los seis pasos"), pasosComentario())));
  actTotal();

  const corr = h("div", {});
  const bCorr = h("button", { type: "button", class: "boton primario" }, "Terminar y ver criterios");
  bCorr.addEventListener("click", () => {
    clearInterval(relojSim);
    corr.innerHTML = "";
    corr.append(h("h3", {}, "Criterios de autocorrección"),
      h("p", { class: "nota-pie" }, "Preguntas breves: síntesis y competencia teórica y etnográfica. Comentario: comprensión, contexto antropológico, argumentación y precisión."));
    sim.breves.forEach((x, k) => { const p = preguntaBreve(x); corr.append(h("div", { class: "corta" }, h("p", {}, h("strong", {}, `Pregunta breve ${k + 1}. `), sinEtiquetas(p.q)), h("ul", { class: "lista-plana" }, p.claves.map((c) => hh("li", {}, c))),
      h("p", { class: "contador" }, `Tu respuesta: ${contarPalabras(sim.resp[k] || "")} palabras`))); });
    corr.append(h("div", { class: "corta" }, h("p", {}, h("strong", {}, "Comentario. "), "¿Has recorrido los seis pasos?"), pasosComentario(),
      h("p", { class: "contador" }, `Tu comentario: ${contarPalabras(sim.resp[2] || "")} palabras`)));
    const frag = estado.comentario.frag === "propio" ? "Fragmento propio de «En el corazón de la zona gris»" : (FR.find((f) => f.id === estado.comentario.frag) || FR[0]).titulo;
    const txt = ["SIMULACRO · ENCRUCIJADAS", ""].concat(sim.breves.map((x, k) => `PREGUNTA BREVE ${k + 1}: ${sinEtiquetas(preguntaBreve(x).q)}\n${sim.resp[k] || "(sin responder)"}\n`), [`COMENTARIO (${frag}):\n${sim.resp[2] || "(sin responder)"}`]).join("\n");
    const salida = h("pre", { class: "salida", tabindex: "0", "aria-label": "Respuestas del simulacro" }, txt);
    const aviso = h("span", { class: "nota-pie", role: "status" });
    corr.append(h("div", { class: "reto-acciones" }, h("button", { type: "button", class: "boton", onclick: () => copiarTexto(txt, salida, aviso) }, "Copiar mis respuestas"), aviso), salida);
    corr.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  ficha.append(h("div", { class: "reto-acciones" }, bCorr), corr);
  irArriba();
}

/* ---------- palabras clave de Williams ---------- */
function vistaClaves() {
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Estudio"), h("h2", {}, "Los trabajos y los días"),
    hh("p", { class: "sub" }, "Cada parte del manual se cierra con una «palabra clave» de Raymond Williams (<em>Keywords</em>) y una selección de lecturas comentadas. Son los cuatro brazos del poste de la encrucijada."));
  PAL.forEach((p) => {
    const sec = h("section", { class: "palabra", style: `--c:${colorParte(p.parte)}`, "aria-labelledby": `pal-${p.id}` },
      h("p", { class: "etiqueta" }, `Parte ${ROMANO[p.parte]} · MF, ${p.paginas}`),
      h("h3", { id: `pal-${p.id}` }, p.palabra),
      hh("p", {}, p.sintesis), hh("p", { class: "nota-pie" }, p.porque),
      h("p", {}, h("strong", {}, "Lecturas comentadas (selección): ")), h("ul", { class: "lista-plana" }, p.lecturas.map((l) => hh("li", {}, l))),
      h("p", { class: "nota-pie" }, "Estaciones: ", p.estaciones.map((id, i) => [i ? ", " : "", botonEst(id, `${estPorId(id).num}. ${estPorId(id).titulo}`)])),
      h("p", { class: "nota-pie" }, parteCompleta(p.parte) ? "Brazo iluminado: has completado esta parte." : "Completa las estaciones de esta parte para iluminar su brazo."));
    ficha.append(sec);
  });
  ficha.append(hh("p", { class: "nota-pie" }, "Síntesis propias. El manual incluye la traducción de las cuatro entradas (P. Rodas Riley). Las lecturas se citan según los encabezados del manual; consulta allí los títulos completos."));
  irArriba();
}

/* ---------- glosario ---------- */
function glosarioCompleto() {
  const vistos = new Set(), g = [];
  E.forEach((e) => e.conceptos.forEach((c) => { const k = sinEtiquetas(c.t).toLowerCase(); if (!vistos.has(k)) { vistos.add(k); g.push({ t: c.t, d: c.d, e: e.id }); } }));
  GX.forEach((c) => { const k = sinEtiquetas(c.t).toLowerCase(); if (!vistos.has(k)) { vistos.add(k); g.push(c); } });
  return g.sort((a, b) => sinEtiquetas(a.t).localeCompare(sinEtiquetas(b.t), "es"));
}
function vistaGlosario() {
  const G = glosarioCompleto();
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Herramienta"), h("h2", {}, "Glosario"),
    h("p", { class: "sub" }, `${G.length} términos ordenados alfabéticamente, con la estación donde se trabajan.`));
  const filtro = h("input", { type: "search", id: "g-filtro", class: "area", placeholder: "Buscar término…" });
  const dl = h("dl", { class: "glosario" });
  const pinta = () => {
    const q = filtro.value.trim().toLowerCase();
    dl.innerHTML = "";
    G.filter((g) => !q || sinEtiquetas(g.t + " " + g.d).toLowerCase().includes(q)).forEach((g) => {
      const est = estPorId(g.e);
      dl.append(h("div", {}, hh("dt", {}, g.t), h("dd", {}, hh("span", {}, g.d + " "), h("button", { type: "button", class: "boton", onclick: () => navegar(g.e), "aria-label": `${sinEtiquetas(g.t)}: ir a la estación ${est.num}` }, `Estación ${est.num}`))));
    });
  };
  filtro.addEventListener("input", pinta);
  ficha.append(h("div", { class: "campo" }, h("label", { for: "g-filtro" }, "Filtrar"), filtro), dl);
  pinta();
  irArriba();
}

/* ---------- bibliografía ---------- */
function vistaBibliografia() {
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Herramienta"), h("h2", {}, "Bibliografía y créditos"));
  const grupos = [["base", "Libro de texto, monografía y guía"], ["obra", "Obras citadas por el manual"], ["amplia", "Ampliación (no sustituye al manual)"]];
  grupos.forEach(([t, nombre]) => {
    const claves = Object.keys(R).filter((k) => R[k].tipo === t).sort((a, b) => sinEtiquetas(R[a].cita).localeCompare(sinEtiquetas(R[b].cita), "es"));
    ficha.append(h("h3", {}, nombre), h("ul", { class: "refs" }, claves.map((k) => hh("li", {}, refHTML(k)))));
  });
  ficha.append(h("h3", {}, "Créditos y advertencias"),
    hh("p", {}, "Recurso de estudio para la asignatura Antropología Social y Cultural (Grado en Antropología Social y Cultural, UNED, 70021015), elaborado con asistencia de un modelo de inteligencia artificial (Claude, Anthropic) en la redacción y la programación. Los textos son síntesis propias; las citas literales son breves y llevan página. Las páginas se tomaron del ejemplar escaneado aportado el 2 de noviembre de 2026 (reconocimiento óptico con errores): salvo en las citas, remiten a la sección del índice donde se trata cada idea. Los avisos «Lee con cautela» señalan erratas o nombres que conviene corregir. Versión 1.0."),
    hh("p", {}, "La guía 2025/2026 describe un libro de texto cuya segunda parte sería una guía de estilo y la tercera, textos de la ONU y la UNESCO; el ejemplar aportado (2014) tiene cuatro partes y «Textos documentales». Compruébese qué edición o reimpresión corresponde al curso vigente."),
    hh("p", {}, "Requiere revisión docente antes de su uso con alumnado. DOI incluidos solo cuando se han contrastado en la página del editor; el resto se cita sin DOI, como admite APA 7.ª. Escena 3D modelada por código con Three.js 0.160.0 (licencia MIT). Tipografías Fraunces, Atkinson Hyperlegible y JetBrains Mono (SIL Open Font License)."));
  irArriba();
}

/* ---------- guía de uso ---------- */
function vistaGuia() {
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Herramienta"), h("h2", {}, "Guía de uso"),
    h("h3", {}, "Para estudiar"),
    h("ul", { class: "lista-plana" },
      h("li", {}, "Recorre el camino en orden: del canon antropológico (1-5) al colonialismo (6-9), las etiquetas de la identidad (10-12) y las situaciones extremas (13-15)."),
      h("li", {}, "Responde a la predicción antes de leer y vuelve a ella al terminar."),
      h("li", {}, "En «Estudiar», redacta la pregunta breve antes de abrir el guion; en «Al examen», enumera los elementos antes de desplegarlos."),
      h("li", {}, "Practica el comentario con el Taller y con tu ejemplar de la monografía; usa el Simulador, con reloj, para entrenar el folio por las dos caras."),
      h("li", {}, "Tu progreso se guarda solo en este navegador; la Guía de estudio permite copiar tus apuntes.")),
    h("h3", {}, "Para tutoría"),
    h("ul", { class: "lista-plana" },
      h("li", {}, "«Presentar» oculta el índice y amplía la ficha para proyectar."),
      h("li", {}, "El modo docente muestra notas de tutoría, dinámicas, preguntas de debate y botones de solución. Se activa con el ancla #docente o con el botón de abajo y dura mientras la pestaña siga abierta."),
      h("li", {}, "Anclas directas: #e1 a #e15, #estudio, #claves, #comentario, #tarjetas, #simulador, #examen, #glosario, #bibliografia.")),
    h("div", { class: "reto-acciones" },
      h("button", { type: "button", class: "boton" + (docente ? " activo" : ""), "aria-pressed": docente ? "true" : "false", onclick: () => { ponerDocente(!docente); vistaGuia(); } }, docente ? "Desactivar modo docente" : "Activar modo docente")),
    h("h3", {}, "Accesibilidad"),
    h("p", {}, "Todo el contenido de la escena 3D está también en el índice y en la ficha; los retos se resuelven con teclado. La animación se detiene si el sistema pide reducir el movimiento o con el botón «Pausar movimiento»."));
  irArriba();
}

/* ---------- guía de estudio ---------- */
function mapaSVG() {
  const col = (p) => getComputedStyle(document.documentElement).getPropertyValue(PARTES[p].color).trim() || "#888";
  const caja = (x, y, w, hh2, lineas, dest, p) => {
    const t = lineas.map((l, i) => `<tspan x="${x + w / 2}" dy="${i === 0 ? 0 : 14}">${l}</tspan>`).join("");
    const y0 = y + hh2 / 2 - ((lineas.length - 1) * 14) / 2 + 4;
    const r = `<rect x="${x}" y="${y}" width="${w}" height="${hh2}" rx="6" class="n"/>${p ? `<rect x="${x}" y="${y}" width="5" height="${hh2}" rx="2" fill="${col(p)}"/>` : ""}<text x="${x + w / 2}" y="${y0}" text-anchor="middle" class="t">${t}</text>`;
    return dest ? `<a href="#${dest}">${r}</a>` : r;
  };
  const enc = (x, y, w, txt) => `<rect x="${x}" y="${y}" width="${w}" height="24" rx="12" class="n-fuerte"/><text x="${x + w / 2}" y="${y + 16}" text-anchor="middle" class="t-fuerte">${txt}</text>`;
  const l = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="ar" marker-end="url(#pf)"/>`;
  const fila = (y, ids, w) => { const n = ids.length, gap = 6, ancho = (390 - gap * (n - 1)) / n; return ids.map((id, i) => { const e = estPorId(id); return caja(5 + i * (ancho + gap), y, ancho, 44, [`${e.num}. ${e.titulo.length > 16 ? e.titulo.slice(0, 15) + "…" : e.titulo}`, `cap. ${e.cap}`], id, e.parte); }).join(""); };
  return `<svg viewBox="0 0 400 560" role="group" aria-labelledby="mapa-t" aria-describedby="mapa-d" class="mapa">
  <title id="mapa-t">Mapa del libro de texto</title>
  <desc id="mapa-d">Cuatro partes encadenadas: el canon antropológico (estaciones 1 a 5), los primitivos y el colonialismo (6 a 9), las etiquetas de la identidad (10 a 12) y las situaciones extremas (13 a 15). Cada parte se cierra con una palabra clave de Williams. Cada caja enlaza con su estación.</desc>
  <defs><marker id="pf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="pf"/></marker></defs>
  ${enc(40, 6, 320, "I · El canon antropológico → cultura")}
  ${fila(38, ["e1", "e2", "e3"])}
  ${fila(88, ["e4", "e5"])}
  ${l(200, 134, 200, 156)}
  ${enc(40, 158, 320, "II · Primitivos y colonialismo → naturaleza")}
  ${fila(190, ["e6", "e7"])}
  ${fila(240, ["e8", "e9"])}
  ${l(200, 286, 200, 308)}
  ${enc(40, 310, 320, "III · Etiquetas de la identidad → clase")}
  ${fila(342, ["e10", "e11", "e12"])}
  ${l(200, 388, 200, 410)}
  ${enc(40, 412, 320, "IV · Situaciones extremas → violencia")}
  ${fila(444, ["e13", "e14", "e15"])}
  ${l(200, 490, 200, 506)}
  ${caja(40, 508, 320, 46, ["Comentario: «En el corazón de la zona gris»", "(monografía que se lleva al examen)"], "comentario", null)}
</svg>`;
}
function tabla(t) {
  return h("div", { class: "tabla-envoltura", tabindex: "0", role: "region", "aria-label": t.titulo }, h("table", { class: "tabla" },
    h("caption", {}, t.titulo),
    h("thead", {}, h("tr", {}, t.cab.map((c) => h("th", { scope: "col" }, c)))),
    h("tbody", {}, t.filas.map((f) => h("tr", {}, f.map((c, i) => i === 0 ? hh("th", { scope: "row" }, c) : hh("td", {}, c)))))));
}
function textoApuntes() {
  const lineas = ["ENCRUCIJADAS · MIS APUNTES DE ANTROPOLOGÍA SOCIAL Y CULTURAL", ""];
  E.forEach((e) => {
    lineas.push(`${e.num}. ${e.titulo.toUpperCase()} (cap. ${e.cap}, ${e.paginas})`);
    if (S[e.id]) { lineas.push("Ideas clave:"); S[e.id].claves.forEach((c) => lineas.push(`- ${sinEtiquetas(c)}`)); }
    if (estado.apuntes[e.id]) lineas.push("Mis apuntes:", estado.apuntes[e.id]);
    if (S[e.id] && estado.respuestas[e.id]) lineas.push(`Pregunta breve: ${sinEtiquetas(S[e.id].desarrollo.q)}`, "Mi respuesta:", estado.respuestas[e.id]);
    lineas.push("");
  });
  return lineas.join("\n");
}
function copiarTexto(texto, nodo, aviso) {
  const sel = () => { const rg = document.createRange(); rg.selectNodeContents(nodo); const s = getSelection(); s.removeAllRanges(); s.addRange(rg); aviso.textContent = "Texto seleccionado: cópialo con Ctrl+C o ⌘+C."; };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(texto).then(() => { aviso.textContent = "Copiado."; }, sel);
  else sel();
}
function vistaGuiaEstudio() {
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Estudio"), h("h2", {}, "Guía de estudio"),
    h("p", { class: "sub" }, "Formato de la prueba, plan de doce semanas, mapa del libro, cuadros comparativos, cronología y tus apuntes reunidos."));
  const nav = h("nav", { class: "indice-guia", "aria-label": "Apartados de la guía" });
  [["g-formato", "Formato de la prueba"], ["g-plan", "Plan de estudio"], ["g-mapa", "Mapa"], ["g-tablas", "Cuadros comparativos"], ["g-autores", "Cronología"], ["g-progreso", "Mi progreso y apuntes"]]
    .forEach(([id, t]) => nav.append(h("button", { type: "button", class: "boton", onclick: () => document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" }) }, t)));
  ficha.append(nav);
  if (GU.formato) ficha.append(h("h3", { id: "g-formato" }, "Formato de la prueba y de la PEC"),
    h("ul", { class: "lista-plana" }, GU.formato.puntos.map((p) => hh("li", {}, p))), h("p", { class: "nota-pie" }, GU.formato.nota));
  ficha.append(h("h3", { id: "g-plan" }, "Plan de estudio sugerido (primer semestre)"),
    tabla({ titulo: "Doce semanas en el orden del libro", cab: ["Semana", "Lectura", "Producto propio"], filas: GU.plan || [] }),
    h("p", { class: "nota-pie" }, "La monografía del comentario debe leerse en paralelo desde el principio si se presenta la PEC (entrega hacia el 10 de enero). Si hay que recortar, recorta lectura complementaria, nunca los simulacros."));
  ficha.append(h("h3", { id: "g-mapa" }, "Mapa del libro"), h("div", { class: "mapa-caja", html: mapaSVG() }),
    h("p", { class: "nota-pie" }, "Las cuatro partes del programa coinciden con las del libro de texto. Pulsa una caja para ir a su estación."));
  const tb = h("div", { id: "g-tablas" }, h("h3", {}, "Cuadros comparativos"));
  (GU.tablas || []).forEach((t) => tb.append(tabla(t)));
  ficha.append(tb);
  ficha.append(h("h3", { id: "g-autores" }, "Cronología de autores, obras y hechos"),
    h("p", { class: "nota-pie" }, "Fechas de las ediciones originales; cuando el manual da otra, se indica en la estación."),
    h("ol", { class: "cronologia" }, (GU.autores || []).map(([f, a, idea, e]) => h("li", {},
      h("span", { class: "mono fecha" }, f), h("span", {}, h("strong", {}, a), ". ", hh("span", {}, idea), " ", botonEst(e, `Estación ${e.slice(1)}`))))));
  ficha.append(h("h3", { id: "g-progreso" }, "Mi progreso y apuntes"));
  ficha.append(tabla({ titulo: "Estado de cada estación en este navegador", cab: ["Estación", "Retos", "Repasada", "Apuntes", "Pregunta breve"],
    filas: E.map((e) => [`${e.num}. ${e.titulo}`, `${hechosDe(e)}/${e.retos.length}`, estado.repasadas[e.id] ? "Sí" : "No", estado.apuntes[e.id] ? "Sí" : "—", estado.respuestas[e.id] ? "Redactada" : "—"]) }));
  const salida = h("pre", { class: "salida", tabindex: "0", "aria-label": "Apuntes reunidos" }, textoApuntes());
  const aviso = h("span", { class: "nota-pie", role: "status" });
  ficha.append(h("p", {}, "Reúne en un solo texto las ideas clave, tus apuntes y tus respuestas para pegarlos en tu documento de estudio."),
    h("div", { class: "reto-acciones" }, h("button", { type: "button", class: "boton primario", onclick: () => copiarTexto(salida.textContent, salida, aviso) }, "Copiar mis apuntes"), aviso), salida);
  irArriba();
}

/* ---------- tarjetas (cajas de Leitner) ---------- */
function vistaTarjetas() {
  const cartas = glosarioCompleto();
  const caja = (c) => estado.cajas[sinEtiquetas(c.t)] || 1;
  let filtro = "todas", actual = null, girada = false;
  ficha.innerHTML = "";
  ficha.append(h("p", { class: "etiqueta" }, "Estudio"), h("h2", {}, "Tarjetas de repaso"),
    h("p", { class: "sub" }, `${cartas.length} conceptos. Define el término en voz alta, con su autor y un caso, antes de girar la tarjeta. «La sé» la sube de caja; «Repasar» la devuelve a la caja 1.`));
  const sel = h("select", { id: "t-filtro" }, h("option", { value: "todas" }, "Todas las estaciones"), E.map((e) => h("option", { value: e.id }, `Estación ${e.num}: ${e.titulo}`)), h("option", { value: "pendientes" }, "Solo las de la caja 1"));
  sel.addEventListener("change", () => { filtro = sel.value; siguiente(); });
  const cont = h("div", { class: "cajas mono", "aria-live": "polite" });
  const tarjeta = h("button", { type: "button", class: "tarjeta", "aria-pressed": "false" });
  tarjeta.addEventListener("click", () => { girada = !girada; pintar(); });
  const bSe = h("button", { type: "button", class: "boton primario" }, "La sé");
  const bRep = h("button", { type: "button", class: "boton" }, "Repasar");
  const bSig = h("button", { type: "button", class: "boton" }, "Siguiente");
  const bReinicio = h("button", { type: "button", class: "boton" }, "Reiniciar cajas");
  bSe.addEventListener("click", () => { if (!actual) return; estado.cajas[sinEtiquetas(actual.t)] = Math.min(3, caja(actual) + 1); guardar(); siguiente(); });
  bRep.addEventListener("click", () => { if (!actual) return; estado.cajas[sinEtiquetas(actual.t)] = 1; guardar(); siguiente(); });
  bSig.addEventListener("click", siguiente);
  bReinicio.addEventListener("click", () => { estado.cajas = {}; guardar(); siguiente(); });
  ficha.append(h("div", { class: "campo" }, h("label", { for: "t-filtro" }, "Qué repasar"), sel), cont, tarjeta,
    h("div", { class: "reto-acciones" }, bSe, bRep, bSig), h("div", { class: "reto-acciones" }, bReinicio));
  const lista = () => cartas.filter((c) => filtro === "todas" || (filtro === "pendientes" ? caja(c) === 1 : c.e === filtro));
  function contar() { const l = lista(), n = [1, 2, 3].map((k) => l.filter((c) => caja(c) === k).length); cont.textContent = `Caja 1: ${n[0]} · Caja 2: ${n[1]} · Caja 3: ${n[2]}`; }
  function siguiente() {
    const l = lista(); girada = false;
    if (!l.length) { actual = null; pintar(); return; }
    const min = Math.min(...l.map(caja));
    const cand = l.filter((c) => caja(c) === min && c !== actual);
    const base = cand.length ? cand : l;
    actual = base[Math.floor(Math.random() * base.length)];
    pintar();
  }
  function pintar() {
    contar();
    tarjeta.innerHTML = "";
    if (!actual) { tarjeta.append(h("span", { class: "frente" }, "No quedan tarjetas con este filtro.")); return; }
    const e = estPorId(actual.e);
    tarjeta.setAttribute("aria-pressed", girada ? "true" : "false");
    tarjeta.append(h("span", { class: "etiqueta" }, `Estación ${e.num} · caja ${caja(actual)}`),
      hh("span", { class: "frente" }, actual.t),
      girada ? hh("span", { class: "dorso" }, actual.d) : h("span", { class: "pista nota-pie" }, "Pulsa para girar"));
  }
  siguiente();
  irArriba();
}

/* ---------- navegación ---------- */
let escena = null;
function navegar(destino, desdeHash) {
  if (!desdeHash && location.hash.slice(1) !== destino) { location.hash = destino; return; }
  if (destino !== "simulador") clearInterval(relojSim);
  const i = E.findIndex((e) => e.id === destino);
  if (i >= 0) { vistaEstacion(i); pintarIndice(destino); escena && escena.irA(i); return; }
  pintarIndice(null);
  const vista = { estudio: vistaGuiaEstudio, claves: vistaClaves, comentario: vistaComentario, tarjetas: vistaTarjetas, simulador: vistaSimulador, examen: vistaExamen, glosario: vistaGlosario, bibliografia: vistaBibliografia, guia: vistaGuia }[destino];
  if (vista) { vista(); if (destino === "claves" && escena) escena.irCentro(); }
  else { vistaInicio(); if (escena) escena.vistaGeneral(); }
}
function ponerDocente(v) {
  docente = v; $("#pildora-docente").hidden = !v;
  try { sessionStorage.setItem("enc-docente", v ? "1" : "0"); } catch (e) { /* nada */ }
}
function leerHash() {
  let d = location.hash.slice(1);
  if (d === "docente") { ponerDocente(true); d = "guia"; }
  navegar(d || "inicio", true);
}
window.addEventListener("hashchange", leerHash);

/* ---------- barra ---------- */
$("#btn-inicio").addEventListener("click", () => navegar("inicio"));
$("#btn-guia").addEventListener("click", () => navegar("guia"));
$("#btn-simulador").addEventListener("click", () => navegar("simulador"));
$("#btn-comentario").addEventListener("click", () => navegar("comentario"));
$("#btn-claves").addEventListener("click", () => navegar("claves"));
$("#btn-examen").addEventListener("click", () => navegar("examen"));
$("#btn-glosario").addEventListener("click", () => navegar("glosario"));
$("#btn-estudio").addEventListener("click", () => navegar("estudio"));
$("#btn-tarjetas").addEventListener("click", () => navegar("tarjetas"));
$("#btn-bibliografia").addEventListener("click", () => navegar("bibliografia"));
$("#btn-presentar").addEventListener("click", (ev) => {
  const on = document.body.classList.toggle("presentar");
  ev.currentTarget.setAttribute("aria-pressed", on ? "true" : "false");
});
$("#btn-general").addEventListener("click", () => escena && escena.vistaGeneral());
$("#btn-movimiento").addEventListener("click", (ev) => {
  if (!escena) return;
  const p = !escena.getPausa(); escena.setPausa(p);
  ev.currentTarget.setAttribute("aria-pressed", p ? "true" : "false");
  ev.currentTarget.textContent = p ? "Reanudar movimiento" : "Pausar movimiento";
});

/* ---------- arranque ---------- */
ponerDocente(docente);
leerHash();

async function iniciarEscena() {
  const carga = $("#carga");
  try {
    await Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 1500))]);
    const { crearEscena } = await import("./escena.js");
    const rot = $("#rotulo");
    escena = crearEscena($("#lienzo"), {
      estaciones: E, palabras: PAL.map((p) => p.palabra),
      onSeleccion: (i) => navegar(E[i].id),
      onCentro: () => navegar("claves"),
      onHover: (i, ev, texto) => {
        if ((i < 0 && !texto) || !ev) { rot.hidden = true; return; }
        const r = $("#lienzo").getBoundingClientRect();
        rot.textContent = texto || `${E[i].num}. ${E[i].titulo} (cap. ${E[i].cap})`; rot.hidden = false;
        rot.style.left = `${ev.clientX - r.left}px`; rot.style.top = `${ev.clientY - r.top}px`;
      }
    });
    carga.remove();
    if (escena.getPausa()) { const b = $("#btn-movimiento"); b.setAttribute("aria-pressed", "true"); b.textContent = "Reanudar movimiento"; }
    pintarIndice(location.hash.slice(1));
    const i = E.findIndex((e) => e.id === location.hash.slice(1)); if (i >= 0) escena.irA(i);
    const tema = () => escena.aplicarTema();
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", tema);
    new MutationObserver(tema).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  } catch (err) {
    console.warn("Escena 3D no disponible:", err);
    carga.textContent = "La escena 3D no está disponible en este navegador. Todo el contenido sigue accesible desde el índice y la ficha.";
  }
}
iniciarEscena();
