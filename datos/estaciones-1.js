/*
 * Encrucijadas · estaciones 1-5 (Moreno Feliu, 2014, Primera parte: Aproximación crítica al canon antropológico)
 * Redacción propia a partir del manual. Las citas literales son breves y llevan página («MF, p.» = paginación impresa).
 * Las páginas de cada idea remiten a la sección del índice del manual en que se trata.
 *
 * Esquema de estación:
 *   id, num, parte, cap, paginas, titulo, sub, lema, idea, prediccion{q,o[]}, sintesis[], conceptos[{t,d}],
 *   cita{texto,fuente}, matices[{t,d}], examen[{q,claves[]}], conexiones[[id, motivo]], docente{duracion,dinamica,preguntas[]},
 *   refs[], retos[]
 */
window.ESTACIONES = [

/* ===================================================================== 1 */
{
  id: "e1", num: 1, parte: 1, cap: 1, paginas: "pp. 21-46",
  titulo: "Mirar al otro",
  sub: "Cap. 1 · Diversidad de las sociedades y culturas humanas",
  lema: "¿Desde cuándo y cómo han descrito los pueblos a quienes no eran como ellos?",
  idea: "La antropología estudia y compara la diversidad de las sociedades humanas a partir de la etnografía; pero mirar al otro es mucho más antiguo que la disciplina, y siempre se ha hecho desde algún lugar de poder.",
  prediccion: {
    q: "Antes de leer: ¿es el etnocentrismo un rasgo exclusivo de las sociedades occidentales?",
    o: ["Sí: nace con la expansión europea", "No: casi todos los pueblos han pensado a los otros desde sus propias categorías", "No existe: es una invención de los antropólogos"]
  },
  sintesis: [
    "La etimología de «antropología» (estudio de lo humano) y la sentencia de Terencio «hombre soy, nada de lo humano me es ajeno» dan una definición tan amplia que desorienta. Las fronteras con la geografía, la historia, la economía o la sociología proceden de una división del trabajo académico del siglo XIX que el conservadurismo universitario ha endurecido. Los manuales coinciden en que el objeto es el análisis y la comparación de la diversidad de sociedades y culturas a partir de estudios etnográficos de la vida cotidiana, con una precisión que la autora subraya: no se estudian cosas, sino sujetos con quienes compartimos la humanidad (MF, pp. 21-24).",
    "Los anaqueles de antropología muestran un desplazamiento: de las monografías sobre aldeas pequeñas y lejanas, escritas por autores de apellido europeo, a etiquetas como género, economía política, etnohistoria, poscolonialismo, identidades o globalización, que estudian también «nuestros pueblos y barrios» a distintas escalas. Es el viaje que da título al libro: <strong>de lo lejano a lo próximo</strong> (MF, pp. 23-24).",
    "Salvo en islas recónditas, los pueblos han vivido en contacto y han percibido semejanzas y diferencias. El <strong>etnocentrismo</strong> no es exclusivo de un pueblo ni la única manera de percibir al otro. La diversidad se expresa de tres modos: <strong>oposición</strong> (nosotros frente a los otros), <strong>asimilación</strong> (lo desconocido se interpreta mediante lo conocido, como cuando los cronistas de Indias comparan la grandeza de aztecas e incas con Roma, o las mujeres guerreras amazónicas con las amazonas clásicas) y <strong>superposición</strong>, por la que un «nosotros» se dota de solera con añadidos heterogéneos: la «civilización occidental» como heredera imaginaria de Grecia y Roma (MF, pp. 25-30).",
    "Esa continuidad improbable se construye con capas: escuelas medievales de las tres religiones monoteístas, recreación renacentista, modelos clásicos en las conquistas, teorías ilustradas del buen salvaje. Su uso político llega a <em>Olympia</em>, donde Leni Riefenstahl superpone los Juegos del Berlín nacionalsocialista (1936) a imágenes de la Grecia clásica para presentar a los «arios» como herederos del mundo antiguo (MF, pp. 29-30). La autora invita a aplicar la «mirada distante» también a nuestros modelos de superioridad.",
    "Las expansiones imperiales —no solo europeas: aztecas, chinos, persas, el islam, Benín o los mongoles— van acompañadas de funcionarios, religiosos y comerciantes que redactan informes sobre los pueblos incorporados. Tres <strong>precursores</strong>, periféricos respecto a sus centros de poder, ilustran esa mirada: <strong>Heródoto</strong>, que explica la guerra entre griegos y persas y describe las costumbres persas en contraste con las griegas; <strong>Ibn Battuta</strong>, que recorre un mundo islámico unido por la religión y el comercio y se detiene en lo que le extraña; y el jesuita <strong>José de Acosta</strong>, que quiere deshacer «la falsa opinión» que tiene a los indios por gente sin entendimiento y propone gobernarlos por sus propias leyes en lo que no contradigan la ley cristiana (MF, pp. 30-41). El capítulo cierra con las narrativas de pueblos lejanos y monstruosos y con el paso a la etnohistoria (MF, pp. 41-46)."
  ],
  conceptos: [
    { t: "Etnocentrismo", d: "Tendencia a juzgar a otros pueblos desde las categorías y valores propios; no es exclusivo de una sociedad ni la única forma de percibir al otro (MF, p. 25)." },
    { t: "Oposición, asimilación y superposición", d: "Tres modos de expresar la diversidad: contraste nosotros/otros; interpretación de lo nuevo por lo conocido; construcción de un «nosotros» mediante añadidos ideológicos heterogéneos (MF, pp. 26-30)." },
    { t: "Mirada distante", d: "Actitud antropológica que aplica a la propia sociedad el extrañamiento con que se observa a las ajenas (MF, p. 28)." },
    { t: "Precursores de la antropología", d: "Autores que, antes de la disciplina, describieron sistemáticamente otros pueblos desde situaciones de contacto y poder: Heródoto, Ibn Battuta, Acosta (MF, pp. 31-41)." },
    { t: "Etnohistoria", d: "Estudio histórico de los pueblos a partir de crónicas, documentos y testimonios, que la antropología incorpora para romper con el presente intemporal (MF, pp. 43-46)." }
  ],
  cita: { texto: "No estudiamos cosas, sino sujetos con quienes compartimos la humanidad.", fuente: "MF, pp. 22-23" },
  matices: [
    { t: "Terencio no hablaba de solidaridad", d: "En la comedia de Terencio, Cremes pronuncia la frase para justificar su intromisión en los asuntos domésticos de su vecino; el sentido moral actual es posterior (MF, p. 21, n. 2)." },
    { t: "Tucídides, no «Tucídedes»", d: "El manual escribe «Tucídedes» en varios lugares y en la bibliografía. La grafía normativa en español es Tucídides." },
    { t: "Precursores, no antropólogos", d: "Heródoto, Ibn Battuta y Acosta no hacen antropología en sentido disciplinar: el manual los presenta como precursores. En un examen, conviene subrayar qué comparten (contacto, poder, descripción contrastada) y no proyectar la disciplina sobre ellos." }
  ],
  examen: [
    { q: "Explica los tres modos de expresar la diversidad (oposición, asimilación y superposición) con un ejemplo de cada uno.", claves: ["Contexto: contacto entre pueblos como norma; el etnocentrismo no es exclusivo de Occidente (MF, p. 25).", "Oposición: nosotros/otros, civilizados/bárbaros.", "Asimilación: cronistas que comparan aztecas e incas con Roma; amazonas.", "Superposición: la «civilización occidental» heredera de Grecia; <em>Olympia</em> de Riefenstahl.", "Cierre: aplicar la mirada distante a nuestros propios modelos de superioridad."] },
    { q: "¿Por qué el manual considera a Heródoto, Ibn Battuta y José de Acosta precursores de la antropología?", claves: ["Escriben en contextos de expansión, contacto y poder; los tres son periféricos respecto a los centros.", "Heródoto: guerra greco-persa; costumbres persas contrastadas con las griegas.", "Ibn Battuta: mundo islámico unido por religión y comercio; atención a lo que le extraña (mujeres en Crimea, China).", "Acosta: refutar que los indios carezcan de entendimiento y gobernarlos por sus leyes; tipología de sociedades.", "Matiz: precursores, no antropólogos."] },
    { q: "¿Qué significa que la antropología haya viajado «de lo lejano a lo próximo»?", claves: ["Objeto clásico: sociedades pequeñas, lejanas, «primitivas».", "Desde finales de los setenta: instituciones propias, escalas local-regional-internacional, interconexiones.", "Nuevas etiquetas: género, economía política, etnohistoria, identidades, globalización.", "No se estudian cosas sino sujetos; la mirada distante se vuelve sobre nosotros."] }
  ],
  conexiones: [["e8", "Acosta reaparece en la tipología de la desigualdad: reinos, behetrías y «sin ley, ni rey, ni asiento»."], ["e7", "Las representaciones del salvaje prolongan las narrativas de pueblos monstruosos."], ["e12", "La superposición «griegos-arios» anticipa el uso político de la raza."]],
  docente: {
    duracion: "50 minutos",
    dinamica: "Cada grupo elige una frase de Heródoto, Ibn Battuta o Acosta y la clasifica como oposición, asimilación o superposición; después se busca un ejemplo actual (prensa, publicidad, turismo).",
    preguntas: ["¿Qué modelos de superioridad usamos hoy para hablar de «Occidente»?", "¿Puede una descripción ser a la vez etnocéntrica y valiosa como fuente?"]
  },
  refs: ["mf2014", "herodoto", "battuta", "acosta"],
  retos: [
    {
      id: "r1a", tipo: "clasificar", titulo: "Tres modos de expresar la diversidad",
      consigna: "Clasifica cada ejemplo según el modo de expresar la diversidad que ilustra.",
      categorias: ["Oposición", "Asimilación", "Superposición"],
      items: [
        { t: "Griegos frente a bárbaros", c: 0, e: "Contraste nosotros/otros." },
        { t: "Cronistas que comparan la grandeza de aztecas e incas con la de Roma", c: 1, e: "Se interpreta lo nuevo mediante lo conocido (MF, p. 26)." },
        { t: "Las mujeres guerreras del gran río sudamericano reciben el nombre de las amazonas clásicas", c: 1, e: "Asimilación a una figura conocida." },
        { t: "La «civilización occidental» presentada como heredera directa de Grecia y Roma", c: 2, e: "Continuidad construida con capas heterogéneas (MF, pp. 29-30)." },
        { t: "Riefenstahl enlaza los Juegos de Berlín de 1936 con la Grecia clásica", c: 2, e: "Uso político de la superposición." },
        { t: "«Nosotros, civilizados; ellos, salvajes»", c: 0, e: "Oposición jerárquica." }
      ]
    },
    {
      id: "r1b", tipo: "test", titulo: "Tres precursores",
      preguntas: [
        { q: "El tema central de la obra de Heródoto es…", o: ["la conversión de los pueblos de Asia", "explicar qué llevó a griegos y persas a la guerra", "la descripción del mundo islámico"], c: 1, e: "Y para ello compara sistemas políticos y costumbres (MF, pp. 32-35)." },
        { q: "Ibn Battuta describe un mundo unido sobre todo por…", o: ["la religión y el comercio", "un imperio único", "la lengua árabe y la escritura"], c: 0, e: "China es la excepción, sin las redes musulmanas habituales (MF, pp. 35-38)." },
        { q: "Uno de los fines de Acosta al describir las costumbres de los indios es…", o: ["demostrar su inferioridad natural", "gobernarlos por sus propias leyes cuando no contradigan la ley cristiana", "justificar su esclavitud"], c: 1, e: "Además de deshacer la opinión de que carecían de entendimiento (MF, pp. 38-41)." }
      ]
    }
  ]
},

/* ===================================================================== 2 */
{
  id: "e2", num: 2, parte: 1, cap: 2, paginas: "pp. 47-74",
  titulo: "Una disciplina, muchos nombres",
  sub: "Cap. 2 · La antropología y sus nombres",
  lema: "¿Por qué la misma disciplina se llama antropología social, cultural o etnología según el país?",
  idea: "Las tradiciones nacionales han marcado el nombre, el objeto, los métodos y el lugar de estudio de la antropología más que en ninguna otra ciencia social: dónde se investiga y a quién depende de cada metrópoli.",
  prediccion: {
    q: "Antes de leer: ¿qué explica mejor las diferencias entre la antropología británica, la francesa, la alemana y la norteamericana?",
    o: ["Las preferencias personales de sus fundadores", "La historia de cada país: su imperio, sus instituciones y su relación con los «otros» internos y externos", "El grado de desarrollo científico de cada universidad"]
  },
  sintesis: [
    "Las culturas no son fotografías congeladas: se recombinan, y la antropología ha ampliado su campo a las transformaciones de esas sociedades y a las propias, algo que Lévi-Strauss no considera una «solución de repliegue» (MF, pp. 47-49). Los nombres varían: en Estados Unidos <em>anthropology</em> engloba cuatro subdisciplinas (sociocultural, arqueológica, biológica y lingüística), herencia de Boas; en el Reino Unido domina la <em>social anthropology</em> (MF, pp. 49-50).",
    "<strong>Tradición británica.</strong> El primer paradigma fue evolucionista, con una división del trabajo entre una red de aficionados repartidos por el imperio, que respondían cuestionarios, y los <strong>teóricos de sillón</strong>, que ordenaban los datos para caracterizar cada etapa de la humanidad y buscaban «supervivencias» de estadios anteriores. El trabajo de campo funcionalista cambió el paradigma: la magia tenía sentido en su contexto y las formas políticas descentralizadas no eran inferiores, sino distintas. En Radcliffe-Brown, apodado «Anarchy Brown» en su juventud, se aprecia, junto a Durkheim, la huella de la ayuda mutua de Kropotkin (MF, pp. 51-55).",
    "<strong>Tradición francesa.</strong> Durkheim dirige con mano firme <em>L'Année sociologique</em> (1896/1898-1912), un trabajo en equipo. En su segunda época aparece el <em>Ensayo sobre el don</em> (1925) de Mauss, estudio comparativo de las tres obligaciones de dar, recibir y devolver, inspirado en el potlatch descrito por Boas, que destruye la ilusión de una «economía natural». En 1925 Lévy-Bruhl, Rivet y Mauss crean el Institut d'Ethnologie: la disciplina se declara útil para la administración colonial y se convierte en materia académica oficial, aunque Mauss mantuvo reticencias hacia esa colaboración (MF, pp. 55-60).",
    "<strong>Tradición germánica.</strong> <em>Anthropologie</em> designaba la antropología física; <em>Völkerkunde</em>, la etnología de otros pueblos; <em>Volkskunde</em>, el folclore propio. El asociacionismo burgués impulsó la arqueología y los museos; Bastian defendió la unidad psíquica del género humano y la cultura material. Tras la «revuelta difusionista» (1907-1918), en los años treinta la purga de izquierdistas, críticos y judíos orientó la disciplina hacia una antropología aplicada a las políticas raciales del Reich, mientras otros se exiliaban (MF, pp. 60-65).",
    "<strong>Tradición norteamericana.</strong> Morgan funda el estudio del parentesco con <em>Systems of consanguinity and affinity</em> (1870), que distingue parientes consanguíneos y afines, y propone un modelo de evolución sociocultural. Boas, desde su expedición ártica de 1883-1884 y su cátedra en Columbia (1896), impone el trabajo de campo, el aprendizaje de las lenguas, el nativo como colaborador y el <strong>relativismo cultural</strong>: ninguna cultura es intrínsecamente superior. El capítulo concluye con apuntes sobre la tradición española, desde la imagen romántica de Andalucía hasta el Museo de Antropología, la Institución Libre de Enseñanza (1876) y las encuestas del Ateneo de Madrid (MF, pp. 65-74)."
  ],
  conceptos: [
    { t: "Teóricos de sillón", d: "Evolucionistas británicos que elaboraban generalizaciones en su gabinete con datos enviados por una red de aficionados desde el imperio (MF, pp. 52-53)." },
    { t: "Supervivencias", d: "Para el evolucionismo, rasgos de estadios anteriores que perviven en sociedades «avanzadas», por ejemplo entre campesinos; el folclore debía registrarlos antes de que desaparecieran (MF, p. 53)." },
    { t: "Don (tres obligaciones)", d: "Para Mauss, dar, recibir y devolver regalos son obligaciones que se encuentran en sociedades «primitivas», arcaicas y, de forma restringida, en la nuestra (MF, pp. 57-58)." },
    { t: "Potlatch", d: "Ciclo invernal de banquetes entre grupos de la costa noroeste (kwakiutl, tlingit, haida) en el que los jefes competían exhibiendo, regalando y destruyendo riqueza (MF, pp. 45-47, nota)." },
    { t: "Völkerkunde / Volkskunde", d: "En la tradición germánica, estudio de otros pueblos frente a estudio del pueblo propio (folclore) (MF, pp. 60-61)." },
    { t: "Relativismo cultural (Boas)", d: "Principio según el cual cada cultura debe entenderse en sus propios términos y ninguna es intrínsecamente superior a otra (MF, pp. 67-70)." }
  ],
  cita: { texto: "Investigaciones que tienen su importancia intrínseca… la urgencia se inclinaba por estas últimas.", fuente: "Lévi-Strauss y Eribon (1990, p. 201), citados en MF, pp. 48-49, sobre el estudio de las sociedades propias frente a las exóticas" },
  matices: [
    { t: "No hay una «tradición nacional» pura", d: "Las tradiciones se cruzan: Redfield asistió en Chicago a los cursos de Radcliffe-Brown y el <em>Ensayo sobre el don</em> se apoya en el potlatch de Boas (MF, p. 58, notas 11 y 12). En el examen, señala los préstamos." },
    { t: "El don no es «regalo desinteresado»", d: "El interés de Mauss está en la obligación de dar, recibir y devolver; confundirlo con generosidad gratuita es un error frecuente." },
    { t: "Erratas de escaneo", d: "En el ejemplar aportado aparecen grafías como «Margan» o «Durkhelm», debidas al reconocimiento óptico del escaneado, no al manual impreso." }
  ],
  examen: [
    { q: "Compara la tradición británica y la norteamericana en su relación con el trabajo de campo y con los pueblos estudiados.", claves: ["Británica: del evolucionismo de sillón a la observación funcionalista en el imperio.", "Norteamericana: Morgan y el parentesco; Boas, lenguas, nativo como colaborador, relativismo.", "Lugar de estudio: colonias frente a pueblos amerindios del propio territorio.", "Consecuencias éticas y teóricas: cuatro campos frente a antropología social."] },
    { q: "¿Qué aporta el <em>Ensayo sobre el don</em> de Mauss y en qué contexto institucional aparece?", claves: ["<em>L'Année sociologique</em>, segunda época; 1925.", "Tres obligaciones: dar, recibir, devolver; comparación de sociedades.", "Fin de la ilusión de una «economía natural»; base en el potlatch de Boas.", "Mismo año: Institut d'Ethnologie, utilidad colonial y academización; reticencias de Mauss."] },
    { q: "Explica cómo derivó la tradición germánica hacia una antropología aplicada a las políticas raciales.", claves: ["Distinción Anthropologie (física) / Völkerkunde / Volkskunde.", "Asociacionismo, arqueología y museos; Bastian y la unidad psíquica.", "Revuelta difusionista (1907-1918).", "Años treinta: purgas, exilios y servicio a las políticas raciales del Reich."] }
  ],
  conexiones: [["e3", "El trabajo de campo de Boas y Malinowski funda el modelo clásico."], ["e12", "Boas y la reacción antropológica contra el racismo científico."], ["e15", "El relativismo boasiano explica el rechazo de la AAA a la Declaración de 1948."]],
  docente: {
    duracion: "60 minutos",
    dinamica: "Cuatro grupos, uno por tradición, preparan una «ficha de identidad»: nombre de la disciplina, objeto, método, lugar de estudio y relación con el Estado. Puesta en común en un cuadro.",
    preguntas: ["¿Qué tradición pesa más en la antropología española actual?", "¿Hasta qué punto define el imperio de cada país a su antropología?"]
  },
  refs: ["mf2014", "kuklick2008", "mauss", "morgan1870", "boas"],
  retos: [
    {
      id: "r2a", tipo: "clasificar", titulo: "¿De qué tradición es?",
      consigna: "Asigna cada autor, obra o institución a la tradición nacional en la que el manual lo sitúa.",
      categorias: ["Británica", "Francesa", "Germánica", "Norteamericana", "Española"],
      items: [
        { t: "Teóricos de sillón y cuestionarios desde el imperio", c: 0, e: "Evolucionismo británico (MF, p. 52)." },
        { t: "«Anarchy Brown» y la ayuda mutua de Kropotkin", c: 0, e: "Radcliffe-Brown (MF, p. 55)." },
        { t: "<em>L'Année sociologique</em>", c: 1, e: "Durkheim y Mauss (MF, pp. 56-57)." },
        { t: "Institut d'Ethnologie (1925)", c: 1, e: "Lévy-Bruhl, Rivet y Mauss (MF, p. 58)." },
        { t: "Bastian y la unidad psíquica del género humano", c: 2, e: "Tradición germánica (MF, pp. 61-63)." },
        { t: "Columbia y el relativismo cultural", c: 3, e: "Boas (MF, pp. 67-70)." },
        { t: "Encuestas del Ateneo de Madrid", c: 4, e: "Apuntes sobre la tradición española (MF, pp. 71-74)." }
      ]
    },
    {
      id: "r2b", tipo: "test", titulo: "Nombres, obligaciones y parientes",
      preguntas: [
        { q: "Las tres obligaciones del don según Mauss son…", o: ["producir, intercambiar y consumir", "dar, recibir y devolver", "pedir, aceptar y agradecer"], c: 1, e: "MF, pp. 57-58." },
        { q: "Con <em>Systems of consanguinity and affinity</em> (1870), Morgan…", o: ["inicia el estudio antropológico del parentesco", "funda la antropología física", "critica el evolucionismo"], c: 0, e: "Distingue consanguíneos y afines (MF, pp. 65-67)." },
        { q: "En Estados Unidos, la herencia de Boas se aprecia en…", o: ["la división entre etnología y folclore", "la antropología general de cuatro subdisciplinas", "la prioridad de la antropología aplicada"], c: 1, e: "Sociocultural, arqueológica, biológica y lingüística (MF, pp. 49-50)." }
      ]
    }
  ]
},

/* ===================================================================== 3 */
{
  id: "e3", num: 3, parte: 1, cap: 3, paginas: "pp. 75-88",
  titulo: "El granero zande",
  sub: "Cap. 3 · El modelo clásico, 1920-1970",
  lema: "Si unas termitas derriban un granero, ¿por qué cae justo cuando hay alguien debajo?",
  idea: "El modelo clásico estudió «primitivos» en comunidades pequeñas y homogéneas, con trabajo de campo intensivo y vocación holista; su gran fruto es mostrar la racionalidad de sistemas como la brujería azande, y su límite, un relativismo que puede callar ante la violencia.",
  prediccion: {
    q: "Antes de leer: para los azande, la brujería explica…",
    o: ["por qué las termitas debilitan los soportes de un granero", "por qué el granero cae precisamente sobre esas personas en ese momento", "nada: es una superstición sin lógica"]
  },
  sintesis: [
    "En la división del trabajo de las ciencias sociales, a la antropología le correspondió el estudio de los «pueblos primitivos» en tres versiones: los primitivos abstractos de los estadios evolucionistas; los pueblos de los territorios colonizados; y los «primitivos» como supervivencias del propio pasado europeo entre campesinos y clases subalternas. Ni siquiera Boas y Malinowski alteraron ese acuerdo de fondo (MF, pp. 76-77).",
    "La distinción de Tönnies (1887) entre <em>Gemeinschaft</em> (comunidad: relaciones cara a cara basadas en el estatus) y <em>Gesellschaft</em> (sociedad: relaciones impersonales basadas en el contrato) y la de Durkheim (1893) entre solidaridad mecánica y orgánica orientaron a los antropólogos clásicos hacia la pequeña escala de unas «comunidades» internamente homogéneas (MF, pp. 77-79).",
    "De ahí surgen las especialidades —parentesco, antropología económica, política, de la religión, psicológica— y, a la vez, el <strong>holismo</strong>: en esas sociedades las instituciones están «incrustadas» unas en otras (Polanyi) o forman «hechos sociales totales» (Mauss). Malinowski publica sobre los trobriandeses <em>Los argonautas del Pacífico occidental</em> (1922, el kula), <em>La vida sexual de los salvajes</em> (1929) y <em>Los jardines de coral</em> (MF, pp. 79-81).",
    "El equilibrio entre especialidad y holismo se ve en Evans-Pritchard ([1937] 1976): la brujería azande penetra en la subsistencia, la vida doméstica, la ley y la religión. Si un granero minado por las termitas cae sobre quienes descansan a su sombra, el zande sabe que las termitas debilitaron los soportes; la brujería explica por qué ambos hechos coinciden en ese lugar y momento. Las creencias, concluye, «forman un sistema racional» (MF, pp. 81-84).",
    "Boas y Malinowski fijan la tarea: contrastar hipótesis con datos mediante la <strong>observación participante</strong>, interpretar los datos y comparar transculturalmente (MF, pp. 84-86). El relativismo cultural, con raíces en Montaigne, se convierte en código de conducta; sus críticos le reprochan indiferencia moral ante mutilaciones, violaciones, torturas o genocidios. Como recuerda Hinton, la AAA no suscribió la Declaración Universal de 1948 (MF, pp. 86-88)."
  ],
  conceptos: [
    { t: "Comunidad / sociedad", d: "Tönnies (1887): relaciones directas basadas en el estatus frente a relaciones impersonales basadas en el contrato (MF, pp. 77-78)." },
    { t: "Solidaridad mecánica y orgánica", d: "Durkheim (1893): cohesión por semejanza en sociedades «primitivas y arcaicas» frente a cohesión por interdependencia en sociedades con división del trabajo (MF, p. 78)." },
    { t: "Holismo", d: "Perspectiva que estudia las instituciones como un todo integrado, «incrustadas» unas en otras (MF, pp. 79-81)." },
    { t: "Observación participante", d: "Técnica del trabajo de campo intensivo: integrarse en una cultura para observar, preguntar y participar en sus actividades (MF, pp. 84-86)." },
    { t: "Brujería azande", d: "Sistema que explica la coincidencia desgraciada de causas conocidas y regula las relaciones sociales; para Evans-Pritchard, un sistema racional (MF, pp. 81-84)." },
    { t: "Relativismo cultural (crítica)", d: "Exigencia de comprender cada cultura en sus términos; sus críticos le atribuyen pasividad ante la violencia y las atrocidades (MF, pp. 86-88)." }
  ],
  cita: { texto: "No hay nicho ni rincón de la cultura zande en que no penetre.", fuente: "Evans-Pritchard sobre la brujería, citado en MF, pp. 82-83" },
  matices: [
    { t: "Holismo no es homogeneidad", d: "El holismo es una perspectiva analítica; la homogeneidad de la comunidad es un supuesto del modelo clásico que el capítulo 4 desmonta. No los confundas." },
    { t: "Relativismo metodológico y moral", d: "Suspender el juicio para comprender no obliga a aprobar todo. El manual expone las críticas al relativismo, pero el debate se cierra en el capítulo 15." },
    { t: "Fechas de Malinowski", d: "1922 (<em>Argonautas</em>) y 1929 (<em>La vida sexual</em>) figuran en el manual; para <em>Los jardines de coral</em> no se da año en el pasaje: su edición original es de 1935." }
  ],
  examen: [
    { q: "Explica la brujería azande según Evans-Pritchard y qué muestra sobre el método antropológico.", claves: ["La brujería impregna todos los ámbitos de la vida zande.", "Ejemplo del granero: causa natural conocida + coincidencia explicada por la brujería.", "«Sistema racional»: racionalidad en su contexto.", "Equilibrio especialidad-holismo; trabajo de campo intensivo."] },
    { q: "¿Qué tres versiones del «primitivo» se asignaron a la antropología en la división del trabajo de las ciencias sociales?", claves: ["Primitivos abstractos de los estadios evolucionistas.", "Pueblos de los territorios colonizados.", "Supervivencias del pasado entre campesinos y clases subalternas europeas.", "Continuidad del acuerdo incluso tras Boas y Malinowski."] },
    { q: "Relativismo cultural y derechos humanos: ¿qué críticas recibe el relativismo en el modelo clásico?", claves: ["Origen en Montaigne y en Boas; código de conducta.", "Crítica: indiferencia moral ante violencias, mutilaciones, genocidios.", "Hinton; la AAA no suscribió la Declaración de 1948.", "Remite al debate del capítulo 15."] }
  ],
  conexiones: [["e4", "El modelo de comunidad homogénea entra en crisis con Tepoztlán."], ["e6", "La brujería reaparece en la modernidad africana y sus monstruos."], ["e15", "El rechazo de la AAA a la Declaración de 1948."]],
  docente: {
    duracion: "45 minutos",
    dinamica: "Se plantea una desgracia cotidiana propia (un accidente) y se pide al grupo que la explique como lo haría un zande; después, que identifique nuestros equivalentes de «¿por qué a mí?».",
    preguntas: ["¿Qué ganamos y qué perdemos al estudiar «comunidades» como si fueran mundos cerrados?", "¿Es posible un relativismo que no sea indiferencia?"]
  },
  refs: ["mf2014", "tonnies", "malinowski1922", "evans1937", "polanyi"],
  retos: [
    {
      id: "r3a", tipo: "ordenar", titulo: "Las fases de la investigación clásica",
      consigna: "Ordena las fases que, según el manual, establecieron por separado Boas y Malinowski.",
      items: [
        { t: "Formular hipótesis iniciales", e: "Punto de partida del contraste." },
        { t: "Integrarse en la cultura mediante la observación participante", e: "Observar, indagar, preguntar y participar (MF, p. 85)." },
        { t: "Elaborar e interpretar los datos", e: "Segunda fase." },
        { t: "Realizar comparaciones transculturales", e: "Cierre del método (MF, p. 85)." }
      ],
      explicacion: "La tarea fundamental consiste en contrastar las hipótesis con los datos obtenidos en cada fase."
    },
    {
      id: "r3b", tipo: "test", titulo: "Comunidad, holismo y brujería",
      preguntas: [
        { q: "En la <em>Gemeinschaft</em> de Tönnies, las relaciones se basan en…", o: ["el contrato", "el estatus y el trato cara a cara", "el mercado"], c: 1, e: "MF, pp. 77-78." },
        { q: "En el ejemplo del granero, la brujería explica…", o: ["que las termitas coman la madera", "la coincidencia del derrumbe con la presencia de esas personas", "el calor del mediodía"], c: 1, e: "MF, pp. 82-83." },
        { q: "El holismo supone que, en las sociedades estudiadas, las instituciones…", o: ["están separadas en esferas autónomas", "están incrustadas unas en otras", "no existen"], c: 1, e: "Polanyi, Mauss (MF, pp. 79-81)." }
      ]
    }
  ]
},

/* ===================================================================== 4 */
{
  id: "e4", num: 4, parte: 1, cap: 4, paginas: "pp. 89-102",
  titulo: "Dos Tepoztlanes",
  sub: "Cap. 4 · La crisis del modelo clásico",
  lema: "Dos antropólogos estudian el mismo pueblo con veinte años de diferencia: uno ve armonía; el otro, conflicto. ¿Quién tiene razón?",
  idea: "Desde los años setenta, la antropología cuestiona la validez de su conocimiento y su ética: el «presente etnográfico», la comunidad homogénea y el silencio sobre el colonialismo dejan de ser evidentes.",
  prediccion: {
    q: "Antes de leer: Redfield describió un Tepoztlán armónico (1930) y Lewis uno conflictivo (1951). La diferencia se explica sobre todo por…",
    o: ["los cambios del pueblo en veinte años", "los paradigmas y preguntas que cada uno llevó al campo", "la mayor honradez de uno de ellos"]
  },
  sintesis: [
    "A partir de los años setenta se produce una <strong>doble crisis</strong>: de la validez del conocimiento antropológico y de ciertas prácticas éticas, en un contexto de luchas por los derechos civiles, reivindicaciones feministas, oposición a la guerra de Vietnam y revueltas estudiantiles (MF, p. 89). Fabian (1983) señala la contradicción del modelo clásico: escribir en un <strong>presente etnográfico</strong> que sitúa a los «otros» en un tiempo distinto del nuestro, como si no fuéramos contemporáneos (MF, pp. 89-92).",
    "La primera señal fue Tepoztlán (Morelos). Redfield (1930) describió una comunidad tradicional, armónica y casi utópica, antimodelo del Chicago conflictivo de los años veinte, y desarrolló el <strong>continuo folk-urbano</strong>, aplicado después en Chan Kom (Yucatán). Lewis (1951) encontró conflictos donde Redfield veía paz, y explotación donde veía homogeneidad. La respuesta no está en la subjetividad de cada uno, sino en el bagaje teórico que llevaron al campo: las diferencias no estaban en el pueblo, sino en los paradigmas (MF, pp. 92-95).",
    "Los trabajos de campo se adaptan: no se anula el modelo Boas-Malinowski, pero cambian las técnicas y las fuentes, en contextos dominados por la escritura y los medios audiovisuales e informáticos (MF, pp. 95-96). La fórmula de Kroeber y Redfield —las sociedades campesinas son «en parte sociedad, en parte cultura»— y la oposición entre pequeña y gran tradición obligan a reconocer que el campesino forma parte de un mundo más amplio: es el <strong>adiós a la comunidad homogénea</strong> (MF, pp. 96-99).",
    "La relación con el colonialismo se hace explícita. Leach critica que se estudiara a las tribus «como si» fueran ajenas a los contactos, cuando los antropólogos llegaban a «sus» pueblos tras el establecimiento del dominio colonial, en un entorno nuevo hecho de relaciones entre grupos con poder desigual. Lévi-Strauss reconoce que la antropología es hija de un proceso histórico de dominación de una parte de la humanidad sobre otra (MF, pp. 99-102)."
  ],
  conceptos: [
    { t: "Doble crisis", d: "Cuestionamiento, desde los años setenta, de la validez del conocimiento antropológico y de su ética (MF, p. 89)." },
    { t: "Presente etnográfico", d: "Convención de escribir las etnografías en un presente intemporal que niega la contemporaneidad y la historia de los pueblos estudiados (Fabian, 1983; MF, pp. 89-92)." },
    { t: "Continuo folk-urbano", d: "Tipología ideal de Redfield que sitúa la sociedad folk entre lo primitivo y lo civilizado (MF, pp. 93-94)." },
    { t: "Pequeña y gran tradición", d: "Oposición entre la vida cotidiana de la comunidad local y la tradición letrada de la civilización de la que forma parte (MF, pp. 96-99)." },
    { t: "Sociedad campesina", d: "«En parte sociedad, en parte cultura» (Kroeber y Redfield): comunidad vinculada a ciudades, Estados y religiones universales (MF, p. 97)." }
  ],
  cita: { texto: "Las diferencias no estaban en el pueblo, sino en los paradigmas que ambos habían llevado a Tepoztlán.", fuente: "MF, p. 95 (paráfrasis cercana)" },
  matices: [
    { t: "No es un duelo entre buen y mal antropólogo", d: "El manual insiste en que la discrepancia no se explica por preferencias personales: es un ejemplo de cómo la teoría orienta lo que se observa." },
    { t: "Crisis no es abandono", d: "El modelo Boas-Malinowski no se anula; se matiza con nuevas técnicas y fuentes (MF, pp. 95-96)." }
  ],
  examen: [
    { q: "Explica la polémica Redfield-Lewis sobre Tepoztlán y su significado para la disciplina.", claves: ["Redfield (1930): comunidad armónica, homogénea; continuo folk-urbano.", "Lewis (1951): conflicto, explotación.", "Interpretación: paradigmas y preguntas, no subjetividad.", "Primera señal de la crisis del modelo de comunidad homogénea."] },
    { q: "¿Qué es el «presente etnográfico» y por qué se critica?", claves: ["Convención de escritura en presente intemporal.", "Fabian (1983): niega la contemporaneidad entre antropólogo y «otros».", "Ignora el entorno colonial y la historia.", "Relación con la doble crisis de los setenta."] },
    { q: "¿Por qué la crisis del modelo clásico obliga a hablar del colonialismo?", claves: ["Los antropólogos llegaban tras el dominio colonial.", "Leach: el «como si» de tribus aisladas.", "Nuevo entorno de relaciones desiguales.", "Lévi-Strauss: la antropología, hija de una era de dominación."] }
  ],
  conexiones: [["e5", "Roseberry regresa a Tepoztlán para pensar historia y escalas."], ["e6", "Antropología y colonialismo en la práctica: los bemba."], ["e8", "Leach y los kachin rompen la idea de tribus delimitadas."]],
  docente: {
    duracion: "50 minutos",
    dinamica: "Dos grupos describen el mismo espacio del campus: uno buscando armonía y otro, conflicto. Se comparan los textos y se identifica qué preguntas previas guiaron cada mirada.",
    preguntas: ["¿Qué paradigmas llevamos hoy al campo sin advertirlo?", "¿Es posible una etnografía sin presente etnográfico?"]
  },
  refs: ["mf2014", "redfield1930", "lewis1951", "fabian1983"],
  retos: [
    {
      id: "r4a", tipo: "clasificar", titulo: "Redfield o Lewis",
      consigna: "Atribuye cada rasgo a la monografía de Redfield (1930) o a la de Lewis (1951).",
      categorias: ["Redfield (1930)", "Lewis (1951)"],
      items: [
        { t: "Comunidad tradicional, armónica y casi utópica", c: 0, e: "Antimodelo del Chicago de los años veinte (MF, p. 93)." },
        { t: "Conflictos y explotación", c: 1, e: "MF, pp. 94-95." },
        { t: "Continuo folk-urbano", c: 0, e: "Aplicado después en Chan Kom (MF, pp. 93-94)." },
        { t: "Reestudio veinte años después", c: 1, e: "<em>Life in a Mexican village: Tepoztlán restudied</em>." },
        { t: "Homogeneidad cultural", c: 0, e: "Donde Lewis vería desigualdad (MF, p. 94)." }
      ]
    },
    {
      id: "r4b", tipo: "test", titulo: "Señales de la crisis",
      preguntas: [
        { q: "Según Fabian, el presente etnográfico…", o: ["sitúa a los «otros» en un tiempo distinto del del antropólogo", "garantiza la objetividad", "solo afecta a la antropología física"], c: 0, e: "MF, pp. 89-92." },
        { q: "La fórmula «en parte sociedad, en parte cultura» se refiere a…", o: ["las tribus aisladas", "las sociedades campesinas", "las metrópolis coloniales"], c: 1, e: "Kroeber y Redfield (MF, p. 97)." },
        { q: "La crítica de Leach al modelo clásico es que…", o: ["se estudiaba a las tribus como si fueran ajenas a los contactos coloniales", "se hacía demasiado trabajo de campo", "se estudiaban ciudades"], c: 0, e: "MF, pp. 99-100." }
      ]
    }
  ]
},

/* ===================================================================== 5 */
{
  id: "e5", num: 5, parte: 1, cap: 5, paginas: "pp. 103-120",
  titulo: "Lo local en lo global",
  sub: "Cap. 5 · La cultura como proceso dinámico de intersección entre lo global y lo local",
  lema: "¿Qué une una camisa donada en Europa con un mercado al aire libre de Zambia?",
  idea: "La cultura no es un todo cerrado, sino un proceso en el que se cruzan escalas: para entender una fiesta o un mercado hay que reconstruir la historia y las conexiones que los atraviesan.",
  prediccion: {
    q: "Antes de leer: según el manual, la «globalización»…",
    o: ["es un fenómeno nuevo que borra lo local", "es un término problemático que conviene usar con cautela y conectar con escalas concretas", "es lo mismo que la expansión griega o la británica"]
  },
  sintesis: [
    "Roseberry (1989) imagina una fiesta de la Santísima en Tepoztlán en 1981. El sistema de <strong>mayordomías</strong> obliga a un encargado a costear la fiesta del santo; la mayoría de los antropólogos, de Sol Tax a Eric Wolf, lo interpretan como redistribución: para unos, nivelador de la riqueza; para Wolf, de la pobreza, porque acaba por convertir a todos en desposeídos. Si un comerciante celebra el mismo día otra fiesta, comprender el conflicto exige preguntas que la comunidad cerrada no responde (MF, pp. 103-106).",
    "Funcionalistas y boasianos ignoraron la historicidad de las personas y de las sociedades (MF, pp. 106-108). Eric Wolf, en <em>Europa y la gente sin historia</em>, rompe con la concepción de sociedades separadas: desde 1400 el mundo está interconectado y las respuestas de los pueblos al dominio europeo no fueron pasivas. No se trata de una historia global paralela a la local, sino de estudiar la <strong>microhistoria</strong>: las respuestas cotidianas a procesos originados lejos (MF, pp. 108-110).",
    "El <strong>problema de las escalas</strong> obliga a conectar lo local y lo global; hay quien habla de <em>glocalización</em> para nombrar esa doble dinámica (MF, pp. 110-113). La viñeta de <em>Salaula</em> (Hansen, 2000) sigue la ropa usada desde las donaciones y las ONG hasta los mercados de Zambia: un negocio lucrativo encubierto por la imagen de la caridad, en el que los bemba reinterpretan la moda europea. Ya en los años treinta, Godfrey Wilson (Rhodes-Livingstone Institute) observaba la importancia de la ropa para definir el lugar social, y Powdermaker comparaba en el Cinturón del Cobre los hábitos de consumo zambianos y norteamericanos (MF, pp. 113-117).",
    "La ropa expresa también desigualdad y género: los hombres pueden ser más atrevidos; las mujeres buscan decencia y respetabilidad. El análisis vincula producción globalizada y consumo local (MF, pp. 116-117). Por último, Massey critica la idealización reaccionaria del «lugar» como comunidad homogénea, y Cooper señala los dos problemas del término: ¿«global» significa todo el globo?, ¿«-ización» supone un proceso único y dirigido? (MF, pp. 117-120)."
  ],
  conceptos: [
    { t: "Mayordomía", d: "Cargo rotatorio que obliga a costear la fiesta del santo patrón; interpretado como redistribución o nivelación (MF, pp. 104-106)." },
    { t: "Microhistoria", d: "Estudio minucioso de las respuestas cotidianas de la gente a procesos y conflictos originados lejos (MF, pp. 109-110)." },
    { t: "Escalas", d: "Niveles —local, regional, internacional— que el análisis debe conectar para entender un fenómeno (MF, pp. 110-113)." },
    { t: "Glocalización", d: "Término propuesto para nombrar la doble dinámica de globalización y localización (MF, p. 113)." },
    { t: "Salaula", d: "Comercio de ropa usada en los mercados de Zambia, que Hansen (2000) estudia como intersección de escalas global y local (MF, pp. 113-117)." }
  ],
  cita: { texto: "La idealización reaccionaria y etnocéntrica [del pasado].", fuente: "Massey, citada en MF, p. 119, sobre la idea de «lugar» como comunidad homogénea" },
  matices: [
    { t: "Wolf: título y edición", d: "El manual escribe «Europa y los pueblos sin historia» y cita la edición de FCE de 1995; la traducción española lleva por título <em>Europa y la gente sin historia</em> (original de 1982). La guía la recomienda, pero no entra en el examen." },
    { t: "Globalización no es una etiqueta universal", d: "El manual advierte contra periodizar como «globalización» las redes griegas, portuguesas o británicas (Hannerz; MF, p. 108)." }
  ],
  examen: [
    { q: "¿Qué aporta Eric Wolf a la concepción antropológica de la cultura y de la historia?", claves: ["Rechazo de sociedades como unidades separadas.", "Interconexión mundial desde 1400; respuestas no pasivas.", "Microhistoria frente a historia global paralela.", "Consecuencia: la cultura como proceso de intersección."] },
    { q: "Explica la viñeta de <em>Salaula</em> como ejemplo del problema de las escalas.", claves: ["Hansen (2000): ropa usada, donaciones, ONG, mercados de Zambia.", "Escala global (origen, negocio) y local (significado bemba).", "Antecedentes: Rhodes-Livingstone, Godfrey Wilson, Powdermaker.", "Desigualdad y género en el vestir."] },
    { q: "Redistribución en Tepoztlán: ¿nivelador de la riqueza o de la pobreza?", claves: ["Mayordomías y gasto ceremonial.", "Tax y otros: nivelación de la riqueza.", "Wolf: convierte a todos en desposeídos.", "Roseberry: el conflicto exige historia y escalas."] }
  ],
  conexiones: [["e6", "Los bemba: de los vampiros coloniales al mercado de ropa usada."], ["e10", "La danza kalela y la ropa europea como marca de estatus."], ["e9", "Los modos de producción de Wolf ordenan los modelos coloniales."]],
  docente: {
    duracion: "50 minutos",
    dinamica: "Cada estudiante rastrea el recorrido de una prenda propia (etiqueta, fabricación, venta, posible donación) y lo representa en tres escalas.",
    preguntas: ["¿Qué escalas quedan fuera de nuestras explicaciones habituales?", "¿Es útil el término «globalización»?"]
  },
  refs: ["mf2014", "roseberry", "wolf", "hansen2000"],
  retos: [
    {
      id: "r5a", tipo: "clasificar", titulo: "¿Qué escala?",
      consigna: "Clasifica cada elemento de la viñeta de <em>Salaula</em> según la escala en que se sitúa principalmente.",
      categorias: ["Global", "Local"],
      items: [
        { t: "Donaciones de ropa en países occidentales", c: 0, e: "Origen de las prendas (MF, p. 114)." },
        { t: "ONG y empresas que comercian la ropa", c: 0, e: "Negocio encubierto por la imagen de la caridad." },
        { t: "Significado que los bemba atribuyen a la ropa europea", c: 1, e: "MF, pp. 114-116." },
        { t: "Equilibrio femenino entre decencia y respetabilidad", c: 1, e: "Género en el vestir (Hansen, 2000; MF, p. 116)." },
        { t: "Mercados al aire libre de Zambia", c: 1, e: "Punto de llegada de las redes." }
      ]
    },
    {
      id: "r5b", tipo: "test", titulo: "Historia, escalas y discursos",
      preguntas: [
        { q: "Para Wolf, las fiestas de mayordomía funcionan como…", o: ["nivelador de la pobreza", "acumulación privada", "ritual sin efectos económicos"], c: 0, e: "Acaban por convertir a todos en desposeídos (MF, p. 106)." },
        { q: "Según Cooper, el término «globalización» plantea un problema con…", o: ["«global» y con «-ización»", "su origen francés", "su uso solo en economía"], c: 0, e: "MF, p. 120." },
        { q: "Massey critica…", o: ["la idea de lugar como comunidad homogénea idealizada", "el estudio de los mercados", "la microhistoria"], c: 0, e: "MF, p. 119." }
      ]
    }
  ]
}
];
