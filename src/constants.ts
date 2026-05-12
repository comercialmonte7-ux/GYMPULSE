import { Machine, Routine } from './types';

export const MACHINES: Machine[] = [
  {
    id: 'chest-press',
    name: 'Chest Press',
    muscleGroup: 'Pecho',
    videoUrl: '4y6X8UeP9fA',
    description: 'Excelente para desarrollar fuerza en el pectoral y tríceps.',
    instructions: [
      'Ajusta la altura del asiento para que los agarres estén al nivel del pecho.',
      'Siéntate con la espalda bien apoyada en el respaldo.',
      'Empuja los agarres hacia adelante sin bloquear los codos.',
      'Regresa lentamente a la posición inicial.'
    ],
    tips: [
      'Mantén los pies apoyados en el suelo.',
      'No arquees la espalda.',
      'Exhala al empujar, inhala al regresar.'
    ]
  },
  {
    id: 'leg-press',
    name: 'Prensa de Piernas',
    muscleGroup: 'Piernas',
    videoUrl: 'IZxyjW7MPJQ',
    description: 'Máquina fundamental para cuádriceps y glúteos.',
    instructions: [
      'Siéntate y apoya los pies en la plataforma a la anchura de los hombros.',
      'Empuja la plataforma y desbloquea los seguros.',
      'Baja la plataforma lentamente doblando las rodillas.',
      'Empuja de nuevo hacia arriba sin estirar las piernas del todo.'
    ],
    tips: [
      'Nunca bloquees las rodillas arriba.',
      'Mantén los talones pegados a la plataforma.',
      'Controla el peso en el descenso.'
    ]
  },
  {
    id: 'lat-pulldown',
    name: 'Jalón al Pecho',
    muscleGroup: 'Espalda',
    videoUrl: 'CAwf7n6Luuc',
    description: 'Ideal para ensanchar la espalda y trabajar dorsales.',
    instructions: [
      'Ajusta el cojín de las piernas para que estés firme.',
      'Sujeta la barra con las manos más abiertas que tus hombros.',
      'Tira de la barra hacia la parte superior del pecho.',
      'Sube la barra de forma controlada.'
    ],
    tips: [
      'No uses el impulso del cuerpo para bajar la barra.',
      'Siente como se juntan tus escápulas.',
      'Saca pecho al bajar la barra.'
    ]
  },
  {
    id: 'leg-extension',
    name: 'Extensión de Piernas',
    muscleGroup: 'Cuádriceps',
    videoUrl: 'm0fo7acO6pU',
    description: 'Aislamiento para la parte frontal del muslo.',
    instructions: [
      'Ajusta el respaldo para que tu rodilla coincida con el eje de la máquina.',
      'Coloca los pies detrás del rodillo inferior.',
      'Extiende las piernas por completo.',
      'Baja lentamente hasta la posición inicial.'
    ],
    tips: [
      'Sujeta bien los agarres laterales.',
      'Mantén el torso erguido.',
      'Asegúrate de que el peso no baje de golpe.'
    ]
  },
  {
    id: 'abductor-machine',
    name: 'Abductor / Adductor',
    muscleGroup: 'Piernas / Glúteos',
    videoUrl: 'fSREhZ9-gKk',
    description: 'Enfocada en la parte externa e interna del muslo y glúteo medio.',
    instructions: [
      'Siéntate y ajusta las almohadillas según el ejercicio (hacia afuera para abductores).',
      'Sujeta los agarres laterales.',
      'Abre o cierra las piernas de forma controlada.',
      'Regresa sin que las placas de peso se toquen.'
    ],
    tips: [
      'Mantén la espalda recta.',
      'Realiza el movimiento completo.',
      'Glúteo bien apoyado siempre.'
    ]
  },
  {
    id: 'rowing-machine',
    name: 'Remo Sentado',
    muscleGroup: 'Espalda / Brazos',
    videoUrl: 'GzLc_UhkIdg',
    description: 'Desarrolla el grosor de la espalda y fortalece bíceps.',
    instructions: [
      'Apoya los pies y sujeta el agarre.',
      'Tira hacia tu abdomen llevando los codos hacia atrás.',
      'Estira los brazos lentamente sin encoger los hombros.',
      'Mantén el torso casi vertical.'
    ],
    tips: [
      'No balancees la espalda hacia adelante y atrás.',
      'Siente el estiramiento de la espalda al soltar.',
      'Espalda siempre recta.'
    ]
  },
  {
    id: 'shoulder-press',
    name: 'Shoulder Press',
    muscleGroup: 'Hombros',
    videoUrl: '6tWp6Z_9XvU',
    description: 'Máquina de prensa para hombros robustos y fuertes.',
    instructions: [
      'Ajusta el asiento para que los agarres estén a la altura de los hombros.',
      'Sujeta los agarres y mantén la espalda contra el respaldo.',
      'Empuja hacia arriba sin bloquear los codos.',
      'Baja de forma controlada hasta la altura de las orejas.'
    ],
    tips: [
      'No arquees la zona lumbar.',
      'Mantén los pies firmes en el suelo.',
      'Mira siempre al frente.'
    ]
  },
  {
    id: 'lateral-raises',
    name: 'Elevaciones Laterales',
    muscleGroup: 'Hombros',
    videoUrl: 'XHzrS6g-sX4',
    description: 'El ejercicio clave para ganar anchura en los hombros (deltoide medio).',
    instructions: [
      'De pie, con una mancuerna en cada mano a los costados.',
      'Eleva los brazos hacia los lados con una ligera flexión de codo.',
      'Sube hasta que los brazos estén paralelos al suelo.',
      'Baja lentamente controlando el peso.'
    ],
    tips: [
      'No balancees el cuerpo.',
      'Imagina que estás vertiendo agua de una jarra al llegar arriba.',
      'Mantén el cuello relajado.'
    ]
  },
  {
    id: 'front-raises',
    name: 'Elevaciones Frontales',
    muscleGroup: 'Hombros',
    videoUrl: 'hVRE_09G-ow',
    description: 'Enfocado en la parte delantera del hombro (deltoide anterior).',
    instructions: [
      'De pie, sujeta las mancuernas frente a tus muslos.',
      'Eleva un brazo (o ambos) hacia adelante hasta la altura de los ojos.',
      'Mantén una ligera flexión en el codo.',
      'Baja de forma controlada.'
    ],
    tips: [
      'Evita usar el impulso de la espalda.',
      'Mantén el abdomen contraído.',
      'Alternar brazos ayuda a mantener la estabilidad.'
    ]
  },
  {
    id: 'reverse-fly',
    name: 'Pájaros (Face Pull / Posterior)',
    muscleGroup: 'Hombros',
    videoUrl: 'iG6Y4UshZkI',
    description: 'Crucial para la postura y el hombro posterior.',
    instructions: [
      'Inclina el torso hacia adelante manteniendo la espalda recta.',
      'Eleva las mancuernas hacia los lados como si fueran alas.',
      'Junta las escápulas al final del movimiento.',
      'Regresa lentamente.'
    ],
    tips: [
      'Mira hacia el suelo para mantener el cuello alineado.',
      'No dejes que los hombros suban hacia las orejas.',
      'Controla la fase de bajada.'
    ]
  },
  {
    id: 'arnold-press',
    name: 'Arnold Press',
    muscleGroup: 'Hombros',
    videoUrl: '6pXNfR4pC7g',
    description: 'Variante de press que trabaja todas las cabezas del hombro.',
    instructions: [
      'Siéntate con mancuernas frente a tus hombros, palmas hacia ti.',
      'Empuja hacia arriba mientras giras las muñecas 180 grados.',
      'Termina con las palmas hacia adelante arriba.',
      'Revierte el movimiento al bajar.'
    ],
    tips: [
      'Mantén el movimiento fluido.',
      'No bloquees los codos arriba.',
      'Usa un peso que puedas controlar en todo el giro.'
    ]
  },
  {
    id: 'bicep-curl-machine',
    name: 'Bicep Curl',
    muscleGroup: 'Brazos',
    videoUrl: 'm8wAsZp9sUo',
    description: 'Aislamiento perfecto para los bíceps.',
    instructions: [
      'Ajusta el asiento para apoyar los tríceps en la almohadilla.',
      'Sujeta los agarres con las palmas hacia arriba.',
      'Flexiona los brazos llevando las manos hacia los hombros.',
      'Baja lentamente extendiendo los brazos casi por completo.'
    ],
    tips: [
      'Mantén los codos pegados a la almohadilla.',
      'No uses el cuerpo para balancearte.',
      'Controla el peso en la bajada.'
    ]
  },
  {
    id: 'leg-curl',
    name: 'Leg Curl Sentado',
    muscleGroup: 'Isquios / Piernas',
    videoUrl: 'y77S16QGf3E',
    description: 'Enfoque en la parte posterior del muslo (isquiotibiales).',
    instructions: [
      'Ajusta el rodillo para que quede sobre tus tobillos.',
      'Asegura el cojín sobre tus muslos.',
      'Flexiona las piernas hacia abajo.',
      'Regresa lentamente a la posición inicial.'
    ],
    tips: [
      'Mantén el torso erguido.',
      'Sujeta los agarres laterales para mayor estabilidad.',
      'No dejes que el peso golpee al subir.'
    ]
  },
  {
    id: 'bicycle',
    name: 'Bicicleta Estática',
    muscleGroup: 'Cardio',
    videoUrl: 'r8S6-857Yj8',
    description: 'Bajo impacto, ideal para calentar o quemar calorías.',
    instructions: [
      'Ajusta el sillín a la altura de tu cadera.',
      'Mantén la espalda recta y el abdomen contraído.',
      'Pedalea a un ritmo constante.',
      'Aumenta la resistencia para mayor intensidad.'
    ],
    tips: [
      'No bloquees los codos.',
      'Mantén el peso centrado sobre los pedales.',
      'Asegúrate de que tus rodillas tengan una ligera flexión al estirar.'
    ]
  },
  {
    id: 'treadmill',
    name: 'Cinta de Correr',
    muscleGroup: 'Cardio',
    videoUrl: '8i3VxdY4xXg',
    description: 'Perfecta para caminar, trotar o correr intensamente.',
    instructions: [
      'Empieza caminando a una velocidad baja (3-4 km/h).',
      'Sujeta los pasamanos solo para equilibrio inicial.',
      'Aumenta la inclinación para simular subidas.',
      'Usa el clip de seguridad siempre.'
    ],
    tips: [
      'Mira siempre al frente.',
      'Aterriza con la parte media del pie.',
      'Mantén los hombros relajados.'
    ]
  },
  {
    id: 'push-ups',
    name: 'Flexiones de Pecho',
    muscleGroup: 'Pecho / Brazos',
    videoUrl: '4dF99yX7Xy4',
    description: 'Ejercicio fundamental de peso corporal para el tren superior.',
    instructions: [
        'Colócate en posición de plancha con las manos a la anchura de los hombros.',
        'Baja el cuerpo hasta que el pecho casi toque el suelo.',
        'Mantén los codos en un ángulo de 45 grados.',
        'Empuja hacia arriba manteniendo el cuerpo recto.'
    ],
    tips: [
        'Mantén el abdomen contraído.',
        'No dejes que la cadera caiga.',
        'Si es muy difícil, apoya las rodillas.'
    ]
  },
  {
    id: 'bodyweight-squats',
    name: 'Sentadillas',
    muscleGroup: 'Piernas / Glúteos',
    videoUrl: 'U3HlEF_E9fo',
    description: 'El mejor ejercicio de peso corporal para fortalecer piernas.',
    instructions: [
        'Pies a la anchura de los hombros.',
        'Baja la cadera como si fueras a sentarte en una silla.',
        'Mantén la espalda recta y el pecho arriba.',
        'Sube empujando desde los talones.'
    ],
    tips: [
        'Las rodillas no deben sobrepasar excesivamente las puntas de los pies.',
        'Mira hacia adelante.',
        'Inhala al bajar, exhala al subir.'
    ]
  },
  {
    id: 'plank',
    name: 'Plancha Abdominal',
    muscleGroup: 'Core / Abdomen',
    videoUrl: 'pSHjTRCQxIw',
    description: 'Excelente para la estabilidad y fuerza del core.',
    instructions: [
        'Apóyate en los antebrazos y las puntas de los pies.',
        'Mantén el cuerpo en una línea recta de pies a cabeza.',
        'Contrae activamente el abdomen.',
        'Sostén la posición respirando con calma.'
    ],
    tips: [
        'No levantes demasiado la cadera.',
        'Mantén el cuello neutral.',
        'Empuja el suelo con los antebrazos.'
    ]
  },
  {
    id: 'leg-stretch',
    name: 'Estiramiento de Piernas',
    muscleGroup: 'Flexibilidad',
    videoUrl: '6P9XbA1-l3I',
    description: 'Estiramiento de isquiotibiales y cuádriceps.',
    instructions: [
        'De pie, dobla una rodilla y toma tu pie por detrás.',
        'Mantén las rodillas juntas para estirar el cuádriceps.',
        'Para isquiotibiales, intenta tocar la punta de tus pies sin doblar rodillas.',
        'Mantén cada posición al menos 20 segundos.'
    ],
    tips: [
        'No rebotes.',
        'Respira profundo para relajar el músculo.',
        'Siente la tensión, no dolor.'
    ]
  },
  {
    id: 'back-stretch',
    name: 'Estiramiento de Espalda',
    muscleGroup: 'Espalda / Postura',
    videoUrl: 'L_xrDAtykMI',
    description: 'Relaja la columna y libera tensión lumbar.',
    instructions: [
        'Posición del gato/vaca: en cuatro puntos, arquea y redondea la espalda.',
        'Posición del niño: siéntate sobre tus talones y estira los brazos al frente.',
        'Realiza movimientos lentos y controlados.',
        'Sincroniza con tu respiración.'
    ],
    tips: [
        'Relaja los hombros.',
        'No fuerces el cuello.',
        'Ideal para después de trabajar sentado.'
    ]
  },
  {
    id: 'russian-twists',
    name: 'Giros Rusos',
    muscleGroup: 'Core / Oblicuos',
    videoUrl: 'wkD8rjkodUI',
    description: 'Excelente para los oblicuos y la estabilidad rotacional.',
    instructions: [
      'Siéntate con las rodillas dobladas y los pies ligeramente elevados.',
      'Inclina el torso hacia atrás 45 grados.',
      'Gira el torso de un lado a otro tocando el suelo con las manos.',
      'Mantén el abdomen contraído en todo momento.'
    ],
    tips: [
      'No muevas las piernas, solo el torso.',
      'Si es muy fácil, sostén un peso.',
      'Sigue las manos con la mirada.'
    ]
  },
  {
    id: 'leg-raises',
    name: 'Elevación de Piernas',
    muscleGroup: 'Core / Abdominal Inferior',
    videoUrl: 'l4kQd9eWclE',
    description: 'Enfocado en la parte baja del abdomen.',
    instructions: [
      'Tumbado boca arriba con las manos bajo los glúteos.',
      'Eleva las piernas rectas hasta que estén perpendiculares al suelo.',
      'Baja las piernas lentamente sin tocar el suelo.',
      'Mantén la zona lumbar pegada al suelo.'
    ],
    tips: [
      'Si te duele la espalda, dobla ligeramente las rodillas.',
      'Controla la bajada, es la parte más importante.',
      'No uses el impulso.'
    ]
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    muscleGroup: 'Core / Cardio',
    videoUrl: 'z7apbeZ0Q_A',
    description: 'Abdominales dinámicos que también elevan el pulso.',
    instructions: [
      'Posición de plancha alta con los brazos estirados.',
      'Lleva una rodilla hacia el pecho.',
      'Alterna piernas rápidamente simulando una carrera en el suelo.',
      'Mantén la cadera baja.'
    ],
    tips: [
      'Mantén los hombros sobre las muñecas.',
      'No levantes el glúteo.',
      'Respira de forma rítmica.'
    ]
  },
  {
    id: 'outdoor-running',
    name: 'Trote en Exterior',
    muscleGroup: 'Cardio',
    videoUrl: '_kGESn8GprU',
    description: 'Trote o carrera al aire libre. Ideal para ganar resistencia aeróbica real.',
    instructions: [
      'Busca una superficie plana o terreno controlado.',
      'Mantén una postura erguida y hombros relajados.',
      'Controla tu respiración (debe ser profunda y rítmica).',
      'Usa calzado adecuado para correr.'
    ],
    tips: [
      'Prioriza la cadencia sobre la zancada larga.',
      'Mantén la vista al frente.',
      'Hidrátate bien antes y después.'
    ]
  },
  {
    id: 'dead-bug',
    name: 'Dead Bug',
    muscleGroup: 'Core / Estabilidad',
    videoUrl: 'g_byZe6S6xs',
    description: 'Ejercicio de estabilidad profunda del core sin impacto.',
    instructions: [
      'Túmbate boca arriba con brazos extendidos al techo y rodillas dobladas a 90 grados.',
      'Baja el brazo derecho hacia atrás y la pierna izquierda hacia adelante simultáneamente.',
      'Mantén la espalda lumbar pegada al suelo en todo momento.',
      'Regresa al centro y alterna de lado.'
    ],
    tips: [
      'El secreto es la lentitud y el control.',
      'No dejes que la espalda se arquee.',
      'Respira de forma fluida.'
    ]
  },
  {
    id: 'bird-dog',
    name: 'Bird Dog',
    muscleGroup: 'Core / Estabilidad',
    videoUrl: 'wiFNA3sqjCA',
    description: 'Mejora el equilibrio y fortalece la musculatura estabilizadora de la columna.',
    instructions: [
      'Colócate en cuatro puntos (manos y rodillas).',
      'Extiende el brazo derecho hacia adelante y la pierna izquierda hacia atrás.',
      'Mantén el cuerpo en línea recta y paralelo al suelo.',
      'Mantén 2 segundos, regresa al centro y alterna.'
    ],
    tips: [
      'No levantes la pierna más arriba de la cadera.',
      'Mantén la mirada al suelo para alinear el cuello.',
      'Imagina que tienes una taza de agua en la espalda y no debe derramarse.'
    ]
  },
  {
    id: 'bicycle-crunches',
    name: 'Bicycle Crunches',
    muscleGroup: 'Core / Oblicuos',
    videoUrl: '9FGkiQD07_M',
    description: 'Uno de los ejercicios más efectivos para el abdomen completo.',
    instructions: [
      'Túmbate boca arriba con las manos tras la nuca.',
      'Lleva el codo derecho hacia la rodilla izquierda mientras estiras la pierna derecha.',
      'Alterna lados simulando el pedaleo de una bicicleta.',
      'Mantén el torso elevado y gira desde la cintura.'
    ],
    tips: [
      'No tires del cuello con las manos.',
      'Toca la rodilla con el codo de forma controlada.',
      'Extiende las piernas por completo para mayor dificultad.'
    ]
  }
];

export const ROUTINES: Routine[] = [
  {
    id: 'running-plan-w1',
    name: 'Plan 10K - Semana 1: Consolidación',
    description: 'Objetivo: Estabilizar los 5km en Zona 2 y empezar a tocar los 6km suave.',
    type: 'running',
    target: 'general',
    exercises: [
      { machineId: 'outdoor-running', sets: 1, reps: '40 min', note: 'Rodaje Z2 (Conversacional). Pulso bajo.' },
      { machineId: 'outdoor-running', sets: 1, reps: '45 min', note: 'Progresivo: 10 min Z2 + 25 min Z3 + 10 min Z2.' },
      { machineId: 'outdoor-running', sets: 1, reps: '6 km', note: 'Largo Suave. Mantener ritmo estable 8:30-8:50.' },
      { machineId: 'plank', sets: 3, reps: '45 seg', note: 'Core para estabilidad de carrera' }
    ]
  },
  {
    id: 'running-plan-w2',
    name: 'Plan 10K - Semana 2: Progresión Volumen',
    description: 'Objetivo: Aumentar el tiempo bajo tensión y consolidar los 7km.',
    type: 'running',
    target: 'general',
    exercises: [
      { machineId: 'outdoor-running', sets: 1, reps: '45 min', note: 'Z2 Recuperación activa.' },
      { machineId: 'outdoor-running', sets: 1, reps: '50 min', note: 'Controlado: Intervalos de 8 min Z3 / 2 min Z2.' },
      { machineId: 'outdoor-running', sets: 1, reps: '7 km', note: 'Largo Suave. El objetivo es terminar con energía.' },
      { machineId: 'plank', sets: 3, reps: '60 seg' }
    ]
  },
  {
    id: 'running-plan-w3',
    name: 'Plan 10K - Semana 3: Pico de Carga',
    description: 'Objetivo: Máxima distancia antes de la descarga. Tocar los 8km.',
    type: 'running',
    target: 'general',
    exercises: [
      { machineId: 'outdoor-running', sets: 1, reps: '50 min', note: 'Todo en Zona 2 estricta.' },
      { machineId: 'outdoor-running', sets: 1, reps: '55 min', note: 'Negative Splits: la segunda mitad más rápida que la primera.' },
      { machineId: 'outdoor-running', sets: 1, reps: '8 km', note: 'Largo de Resistencia. Sin prisa, solo sumar KM.' },
      { machineId: 'bodyweight-squats', sets: 3, reps: '15', note: 'Fuerza de piernas para soporte' }
    ]
  },
  {
    id: 'running-plan-w4',
    name: 'Plan 10K - Semana 4: Descarga y Test',
    description: 'Objetivo: Recuperar y testear los 10km o consolidar los 7km a ritmo estable.',
    type: 'running',
    target: 'general',
    exercises: [
      { machineId: 'outdoor-running', sets: 1, reps: '35 min', note: 'Suave para limpiar fatiga.' },
      { machineId: 'outdoor-running', sets: 1, reps: '40 min', note: 'Ritmo estable 5km (Objetivo 8:15). Enfoque técnica.' },
      { machineId: 'outdoor-running', sets: 1, reps: '10 km', note: 'EL RETO: Intenta llegar a los 10km cami-trote si es necesario, priorizando salud.' }
    ]
  },
  {
    id: 'home-fullbody',
    name: 'Rutina en Casa (Sin Equipo)',
    description: 'Sesión de 45-60 min para hacer en casa. Solo necesitas tu propio peso corporal.',
    type: 'localizado',
    target: 'general',
    exercises: [
      { machineId: 'bodyweight-squats', sets: 4, reps: '15-20', note: 'Enfoque en forma' },
      { machineId: 'push-ups', sets: 4, reps: '10-15', note: 'Controla el descenso' },
      { machineId: 'plank', sets: 3, reps: '45 seg', note: 'Mantén el cuerpo recto' },
      { machineId: 'bodyweight-squats', sets: 3, reps: '15', note: 'Zancadas alternativas' },
      { machineId: 'push-ups', sets: 3, reps: '10', note: 'Manos más cerradas si puedes' },
      { machineId: 'plank', sets: 3, reps: '60 seg' },
      { machineId: 'leg-stretch', sets: 2, reps: '30 seg', note: 'Recuperación' },
      { machineId: 'back-stretch', sets: 2, reps: '30 seg', note: 'Relajación final' }
    ]
  },
  {
    id: 'full-body-adapt',
    name: 'Adaptación Total (Mes 1)',
    description: 'Sesión integral de 75-90 minutos. Activa cada grupo muscular para preparar tu cuerpo.',
    type: 'adaptacion',
    target: 'general',
    exercises: [
      { machineId: 'leg-press', sets: 3, reps: '12-15', note: 'Calentamiento piernas' },
      { machineId: 'chest-press', sets: 3, reps: '10-12', note: 'Enfoque en pecho' },
      { machineId: 'lat-pulldown', sets: 3, reps: '10-12', note: 'Enfoque en espalda' },
      { machineId: 'shoulder-press', sets: 3, reps: '12' },
      { machineId: 'leg-extension', sets: 3, reps: '15', note: 'Aislamiento cuádriceps' },
      { machineId: 'rowing-machine', sets: 3, reps: '12', note: 'Espalda media' },
      { machineId: 'bicep-curl-machine', sets: 2, reps: '15' },
      { machineId: 'leg-curl', sets: 2, reps: '15' }
    ]
  },
  {
    id: 'leg-day-focus',
    name: 'Fuerza de Piernas (Él)',
    description: 'Sesión enfocada de 90 min en potencia y volumen de piernas.',
    type: 'localizado',
    target: 'hombre',
    exercises: [
      { machineId: 'leg-press', sets: 4, reps: '10', note: 'Pesado' },
      { machineId: 'leg-extension', sets: 4, reps: '12', note: 'Super-set con leg curl' },
      { machineId: 'leg-curl', sets: 4, reps: '12' },
      { machineId: 'abductor-machine', sets: 3, reps: '15' },
      { machineId: 'leg-press', sets: 3, reps: '20', note: 'Bombardeo final (peso medio)' },
      { machineId: 'shoulder-press', sets: 3, reps: '12', note: 'Mantenimiento hombros' },
      { machineId: 'lat-pulldown', sets: 3, reps: '12' }
    ]
  },
  {
    id: 'glute-focus-her',
    name: 'Esculpir Glúteos (Ella)',
    description: 'Sesión de 80 min. Enfoque en tonificación de glúteos y piernas.',
    type: 'localizado',
    target: 'mujer',
    exercises: [
      { machineId: 'abductor-machine', sets: 4, reps: '25', note: 'Activación' },
      { machineId: 'leg-press', sets: 4, reps: '15', note: 'Pies altos para glúteo' },
      { machineId: 'leg-curl', sets: 4, reps: '15', note: 'Isquios' },
      { machineId: 'leg-extension', sets: 3, reps: '15' },
      { machineId: 'abductor-machine', sets: 3, reps: '20', note: 'Enfoque aductores' },
      { machineId: 'lat-pulldown', sets: 3, reps: '15', note: 'Tren superior ligero' },
      { machineId: 'rowing-machine', sets: 3, reps: '15' }
    ]
  },
  {
    id: 'warm-up-cardio',
    name: 'Calentamiento & Cardio',
    description: 'Perfecto para empezar tu sesión o para días de descanso activo.',
    type: 'adaptacion',
    target: 'general',
    exercises: [
      { machineId: 'treadmill', sets: 1, reps: '10 min', note: 'Ritmo suave para calentar' },
      { machineId: 'bicycle', sets: 1, reps: '10 min', note: 'Aumenta la resistencia cada 2 min' },
      { machineId: 'treadmill', sets: 1, reps: '5 min', note: 'Trote ligero' }
    ]
  },
  {
    id: 'advanced-athlete-adapt',
    name: 'Adaptación Avanzada (Ciclistas/Runners)',
    description: 'Sesión de 80 min para deportistas constantes. Fortalece todos los grupos musculares, enfocándose en potencia y estabilidad para mejorar en el asfalto o la bici.',
    type: 'adaptacion',
    target: 'general',
    exercises: [
      { machineId: 'leg-press', sets: 3, reps: '10-12', note: 'Potencia base piernas' },
      { machineId: 'lat-pulldown', sets: 3, reps: '12', note: 'Tracción espalda superior' },
      { machineId: 'chest-press', sets: 3, reps: '12', note: 'Empuje tren superior' },
      { machineId: 'leg-curl', sets: 3, reps: '12-15', note: 'Vital para prevenir lesiones de rodilla' },
      { machineId: 'rowing-machine', sets: 3, reps: '12', note: 'Postura y espalda media' },
      { machineId: 'shoulder-press', sets: 3, reps: '12' },
      { machineId: 'bodyweight-squats', sets: 3, reps: '20', note: 'Movilidad funcional' },
      { machineId: 'plank', sets: 3, reps: '60 seg', note: 'Core sólido para estabilidad' }
    ]
  },
  {
    id: 'full-body-power',
    name: 'Fuerza Total: Máquinas',
    description: 'Sesión integral de 90 min diseñada para deportistas. Cubre piernas, brazos, pecho, hombros y espalda con alta intensidad.',
    type: 'localizado',
    target: 'general',
    exercises: [
      { machineId: 'leg-press', sets: 4, reps: '10-12', note: 'Base de potencia inferior' },
      { machineId: 'chest-press', sets: 3, reps: '10-12', note: 'Fuerza de empuje' },
      { machineId: 'lat-pulldown', sets: 3, reps: '12', note: 'Amplitud de espalda' },
      { machineId: 'shoulder-press', sets: 3, reps: '12', note: 'Estabilidad de hombros' },
      { machineId: 'bicep-curl-machine', sets: 3, reps: '15', note: 'Aislamiento de brazos' },
      { machineId: 'rowing-machine', sets: 3, reps: '12', note: 'Grosor de espalda y bíceps' },
      { machineId: 'leg-curl', sets: 3, reps: '15', note: 'Balance femoral' },
      { machineId: 'plank', sets: 3, reps: '60 seg', note: 'Core para transferencia de fuerza' }
    ]
  },
  {
    id: 'foc-piernas',
    name: 'Solo Piernas: Potencia',
    description: 'Enfoque total en el tren inferior. Ideal para ganar fuerza base y soporte post-carrera.',
    type: 'localizado',
    target: 'general',
    exercises: [
      { machineId: 'leg-press', sets: 4, reps: '10-12', note: 'Empuje pesado' },
      { machineId: 'leg-extension', sets: 3, reps: '15', note: 'Aislamiento de cuádriceps' },
      { machineId: 'leg-curl', sets: 3, reps: '15', note: 'Fortalecimiento de isquios' },
      { machineId: 'abductor-machine', sets: 3, reps: '20', note: 'Estabilidad lateral' },
      { machineId: 'bodyweight-squats', sets: 3, reps: '20', note: 'Bombardeo final' }
    ]
  },
  {
    id: 'foc-brazos',
    name: 'Solo Brazos: Definición',
    description: 'Trabajo específico de bíceps y tríceps para mejorar la fuerza de agarre y soporte.',
    type: 'localizado',
    target: 'general',
    exercises: [
      { machineId: 'bicep-curl-machine', sets: 4, reps: '12-15', note: 'Control total' },
      { machineId: 'push-ups', sets: 3, reps: '12-15', note: 'Tríceps (manos cerradas)' },
      { machineId: 'chest-press', sets: 3, reps: '12', note: 'Empuje controlado' },
      { machineId: 'bicep-curl-machine', sets: 3, reps: '10', note: 'Series lentas' }
    ]
  },
  {
    id: 'foc-pecho',
    name: 'Solo Pecho: Empuje',
    description: 'Enfoque en pectorales para mejorar la postura y la fuerza de empuje.',
    type: 'localizado',
    target: 'general',
    exercises: [
      { machineId: 'chest-press', sets: 4, reps: '10-12', note: 'Máxima contracción' },
      { machineId: 'push-ups', sets: 4, reps: '15-20', note: 'Amplitud normal' },
      { machineId: 'chest-press', sets: 3, reps: '15', note: 'Peso moderado, alta repetición' }
    ]
  },
  {
    id: 'foc-hombros',
    name: 'Hombros Blindados Pro',
    description: 'Sesión completa de 60 min. Trabaja las 3 cabezas del deltoide para un aspecto 3D y estabilidad máxima.',
    type: 'localizado',
    target: 'general',
    exercises: [
      { machineId: 'shoulder-press', sets: 4, reps: '10-12', note: 'Potencia base' },
      { machineId: 'arnold-press', sets: 3, reps: '12', note: 'Enfoque completo' },
      { machineId: 'lateral-raises', sets: 4, reps: '15', note: 'Bombeo lateral (anchura)' },
      { machineId: 'front-raises', sets: 3, reps: '12', note: 'Control anterior' },
      { machineId: 'reverse-fly', sets: 3, reps: '15', note: 'Postura y deltoide posterior' }
    ]
  },
  {
    id: 'foc-espalda',
    name: 'Solo Espalda: Tracción',
    description: 'Mejora tu tracción y ensanchamiento de espalda. Vital para una buena postura.',
    type: 'localizado',
    target: 'general',
    exercises: [
      { machineId: 'lat-pulldown', sets: 4, reps: '10-12', note: 'Jalón vertical' },
      { machineId: 'rowing-machine', sets: 4, reps: '12', note: 'Remo horizontal' },
      { machineId: 'lat-pulldown', sets: 3, reps: '15', note: 'Control de escapulas' }
    ]
  },
  {
    id: 'foc-core',
    name: 'Core & Estabilidad',
    description: 'Fortalece tu centro de gravedad. Vital para corredores y levantadores pesados.',
    type: 'localizado',
    target: 'general',
    exercises: [
      { machineId: 'plank', sets: 3, reps: '60 seg', note: 'Base de estabilidad' },
      { machineId: 'dead-bug', sets: 3, reps: '12 (total)', note: 'Control lumbar' },
      { machineId: 'russian-twists', sets: 3, reps: '20-30', note: 'Trabajo de oblicuos' },
      { machineId: 'bird-dog', sets: 3, reps: '12 (total)', note: 'Estabilidad cruzada' },
      { machineId: 'leg-raises', sets: 3, reps: '15', note: 'Abdomen inferior' },
      { machineId: 'bicycle-crunches', sets: 3, reps: '20', note: 'Quemazón abdominal' },
      { machineId: 'mountain-climbers', sets: 3, reps: '45 seg', note: 'Activación dinámica' }
    ]
  }
];
