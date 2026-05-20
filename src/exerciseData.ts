import { Machine } from './types';

export const EXERCISES: Machine[] = [
  // ==================== PIERNA (10 Exercises) ====================
  {
    id: 'prensa-piernas',
    name: 'Prensa de Piernas Inclinada',
    muscleGroup: 'Pierna',
    videoUrl: 'IZxyjW7MPJQ',
    description: 'Excelente para aislamiento de cuádriceps, glúteos e isquiotibiales con soporte lumbar.',
    instructions: [
      'Siéntate en la máquina de prensa y apoya la espalda firmemente contra el respaldo.',
      'Coloca los pies en la plataforma a la anchura de los hombros.',
      'Empuja la plataforma con las piernas para desbloquear el mecanismo de seguridad.',
      'Dobla las rodillas para bajar el peso de forma controlada hasta un ángulo de 90 grados.',
      'Empuja la plataforma hacia arriba principalmente con los talones, asegurándote de no bloquear las rodillas al final del movimiento.'
    ],
    tips: [
      'Mantén los talones completamente planos sobre la plataforma en todo momento.',
      'Evita que las rodillas colapsen hacia adentro.',
      'No levantes la zona lumbar o los glúteos del respaldo durante la bajada.'
    ]
  },
  {
    id: 'extension-piernas',
    name: 'Extensión de Cuádriceps',
    muscleGroup: 'Pierna',
    videoUrl: 'm0fo7acO6pU',
    description: 'Aislamiento absoluto para la cara anterior del muslo (cuádriceps), ideal para esculpir definición.',
    instructions: [
      'Ajusta el respaldo para que la parte posterior de las rodillas quede al ras del borde del asiento.',
      'Coloca los tobillos detrás del rodillo acolchado inferior.',
      'Sujeta los mangos de los lados para estabilizar el torso.',
      'Extiende las piernas completamente hacia arriba contrayendo los cuádriceps de forma activa.',
      'Sostén un segundo arriba y desciende el peso lentamente a la posición inicial.'
    ],
    tips: [
      'Mantén los pies apuntando hacia arriba.',
      'Controla completamente el ritmo excéntrico (bajada).',
      'No uses el impulso ni permitas que el peso caiga de golpe.'
    ]
  },
  {
    id: 'curl-femoral',
    name: 'Curl de Piernas de Pie en Máquina',
    muscleGroup: 'Pierna',
    videoUrl: 'y77S16QGf3E',
    description: 'Aislamiento enfocado en la cadena posterior de la pierna (isquiotibiales).',
    instructions: [
      'Ajusta la altura del rodillo acolchado para que quede justo debajo de tus pantorrillas.',
      'Apoya el frente de los muslos sobre el soporte correspondiente.',
      'Sujeta las agarraderas e inclina ligeramente el torso al frente.',
      'Flexiona las rodillas tirando del peso hacia tus glúteos de forma enérgica.',
      'Regresa lentamente controlando la extensión completa de la rodilla.'
    ],
    tips: [
      'Mantén la pelvis presionada contra el soporte para evitar compensación lumbar.',
      'Haz fuerza manteniendo el abdomen firme.',
      'Contrae intensamente en la parte alta del movimiento.'
    ]
  },
  {
    id: 'sentadillas-libres',
    name: 'Sentadillas con Peso Corporal (Calistemia)',
    muscleGroup: 'Pierna',
    videoUrl: 'U3HlEF_E9fo',
    description: 'Movimiento rey funcional para el desarrollo de fuerza y masa en todo el tren inferior.',
    instructions: [
      'Párate con los pies separados a la anchura de los hombros y las puntas ligeramente hacia afuera.',
      'Inicia el movimiento empujando la cadera hacia atrás como si fueras a sentarte en una silla.',
      'Baja manteniendo el pecho elevado y la espalda recta hasta pasar los 90 grados de la rodilla.',
      'Empuja con fuerza los talones contra el suelo para volver a subir.',
      'Contrae los glúteos firmemente en la parte superior.'
    ],
    tips: [
      'No dejes que los talones se despeguen del suelo.',
      'La mirada debe ir ligeramente hacia adelante para mantener una columna neutral.',
      'Empuja las rodillas hacia afuera en la dirección de la punta de los pies.'
    ]
  },
  {
    id: 'sentadilla-bulgara',
    name: 'Sentadilla Búlgara con Mancuernas',
    muscleGroup: 'Pierna',
    videoUrl: '2C-uNgKwPLE',
    description: 'Ejercicio unilateral de altísima exigencia para cuadriceps, glúteos y balance.',
    instructions: [
      'Párate a un metro de espaldas a un banco plano.',
      'Estira un pie hacia atrás y apoya el empeine firmemente sobre el banco.',
      'Sostén una mancuerna a cada lado de tu cuerpo.',
      'Baja la cadera verticalmente hasta que la rodilla trasera casi toque el suelo.',
      'Empuja con el talón de la pierna delantera para regresar a la posición vertical.'
    ],
    tips: [
      'Mantén el torso erguido o ligeramente inclinado al frente para mayor estímulo de glúteos.',
      'La rodilla delantera no debe extenderse de forma inestable.',
      'Enfócate en un punto fijo al frente para mantener el equilibrio.'
    ]
  },
  {
    id: 'zancadas-mancuerna',
    name: 'Zancadas Estáticas con Mancuerna',
    muscleGroup: 'Pierna',
    videoUrl: 'h3F9gG4qTGo',
    description: 'Ejercicio multiarticular que desarrolla potencia, equilibrio y simetría en piernas.',
    instructions: [
      'De pie, con las manos a los costados sosteniendo mancuernas con agarre neutro.',
      'Da un paso largo hacia adelante con un pie.',
      'Baja el cuerpo doblando ambas rodillas a 90 grados.',
      'La pierna delantera debe mantener el muslo paralelo al suelo.',
      'Presiona el talón delantero para volver a la posición inicial en un solo impulso.'
    ],
    tips: [
      'Evita que la rodilla delantera sobrepase la punta del pie excesivamente.',
      'Mantén la tensión en el abdomen para estabilizar el torso.',
      'Realiza las repeticiones de un lado antes de cambiar al otro.'
    ]
  },
  {
    id: 'peso-muerto-romano',
    name: 'Peso Muerto Rumano con Mancuernas',
    muscleGroup: 'Pierna',
    videoUrl: 'Y9f_Kbyf_vA',
    description: 'Un ejercicio estelar para desarrollar la bisagra de cadera e isquiotibiales fuertes.',
    instructions: [
      'Sujeta dos mancuernas frente a tus muslos con los pies a la anchura de las caderas.',
      'Mantén las rodillas ligeramente desbloqueadas (semi-flexionadas) pero fijas.',
      'Empuja la cadera hacia atrás como si quisieras tocar la pared trasera con los glúteos.',
      'Desliza las mancuernas cerca de tus piernas hacia abajo, sintiendo estiramiento en la parte posterior.',
      'Vuelve a la posición inicial empujando la pelvis hacia el frente y apretando los glúteos.'
    ],
    tips: [
      'La espalda debe permanecer completamente recta en todo momento.',
      'No dejes caer la mirada al suelo; mantén el cuello alineado con la columna.',
      'El movimiento se genera en la cadera, no doblando las rodillas.'
    ]
  },
  {
    id: 'sentadilla-goblet',
    name: 'Sentadilla Goblet con Mancuerna',
    muscleGroup: 'Pierna',
    videoUrl: 'MeIiYGbLfQE',
    description: 'Excelente variante para profundizar el rango de movimiento cuidando la postura lumbar.',
    instructions: [
      'Sostén una mancuerna pesada de forma vertical frente a tu pecho, sujetándola por la cabeza.',
      'Coloca los pies un poco más anchos que la cadera, puntas hacia afuera.',
      'Baja en sentadilla profunda controlando que los codos pasen por el interior de tus rodillas.',
      'Mantén el pecho bien abierto y el torso vertical.',
      'Ponte de pie empujando fuertemente desde el mediopié.'
    ],
    tips: [
      'No dejes que los codos reboten contra los muslos.',
      'Mantén el peso de la mancuerna bien pegado al cuerpo.',
      'Asegúrate de bajar controlando el aire.'
    ]
  },
  {
    id: 'zancadas-laterales',
    name: 'Zancadas Laterales con Peso',
    muscleGroup: 'Pierna',
    videoUrl: 'vA67T18O0h8',
    description: 'Desarrolla fuerza en el plano frontal, fortaleciendo aductores, glúteos y muslos.',
    instructions: [
      'Párate derecho con los pies juntos y sostén una mancuerna frente al pecho.',
      'Da un paso amplio hacia un costado.',
      'Dobla la rodilla del pie que dio el paso, empujando la cadera hacia atrás, mientras la otra pierna queda estirada.',
      'La rodilla flexionada debe estar alineada con el pie central.',
      'Impúlsate firmemente para regresar a la posición erguida.'
    ],
    tips: [
      'Mantén el pie de la pierna estirada completamente apoyado en el piso.',
      'Mantén el torso erguido sin encorvarte.',
      'Siente el trabajo en los aductores al bajar.'
    ]
  },
  {
    id: 'elevacion-pantorrillas',
    name: 'Elevación de Talones de Pie',
    muscleGroup: 'Pierna',
    videoUrl: '6X_vN3N9y38',
    description: 'Ejercicio de aislamiento para fortalecer los gemelos (gastrocnemio).',
    instructions: [
      'Párate sobre el borde de un escalón o plataforma con los talones suspendidos.',
      'Apoya las manos en una pared o barandal para mantener el equilibrio.',
      'Baja los talones lentamente por debajo del nivel de la plataforma para estirar el músculo.',
      'Eleva los talones lo más alto posible, de puntillas, contrayendo las pantorrillas.',
      'Sostén durante un segundo y repite de manera controlada.'
    ],
    tips: [
      'Haz el movimiento completo, estirando al máximo abajo y apretando arriba.',
      'No rebotes en la parte inferior para no usar el tendón de Aquiles.',
      'Mantén las rodillas fijas (ligeramente flexionadas pero bloqueadas).'
    ]
  },

  // ==================== BRAZOS (10 Exercises - focus on Biceps/General Arms) ====================
  {
    id: 'curl-mancuernas',
    name: 'Curl de Bíceps con Mancuernas Alterno',
    muscleGroup: 'Brazos',
    videoUrl: 'ykJmrZ5v0W0',
    description: 'El ejercicio clásico más efectivo para construir tamaño, grosor y forma en los bíceps.',
    instructions: [
      'De pie, con las mancuernas colgando a los costados, palmas hacia adentro (agarre neutro).',
      'Eleva una mancuerna doblando el codo y gira la muñeca a mitad del camino (supinación) de modo que la palma apunte hacia arriba al final del rango.',
      'Contrae fuertemente el bíceps arriba un segundo.',
      'Desciende de manera fluida y repite de forma alternada con el otro brazo.'
    ],
    tips: [
      'Mantén los codos pegados a los costados del torso y no los adelantes.',
      'No balancees la espalda para levantar el peso.',
      'Extiende el brazo por completo antes de iniciar la siguiente repetición.'
    ]
  },
  {
    id: 'curl-martillo',
    name: 'Curl de Bíceps Martillo',
    muscleGroup: 'Brazos',
    videoUrl: 'zC3nLlEvin4',
    description: 'Enfoca la parte lateral del bíceps, el braquiorradial y los antebrazos, dando aspecto de brazos gruesos.',
    instructions: [
      'De pie o sentado, sostén mancuernas a los costados con las palmas mirándose entre sí.',
      'Eleva las mancuernas doblando los codos sin girar las muñecas en ningún momento (mantén agarre neutro).',
      'Lleva las mancuernas hasta la altura del hombro frontal.',
      'Baja lentamente resistiendo la gravedad.'
    ],
    tips: [
      'No balancees el cuerpo; si necesitas moverte, baja el peso.',
      'Mantén los hombros relajados hacia atrás y abajo.',
      'Squeeze (aprieta) el bíceps y antebrazo arriba.'
    ]
  },
  {
    id: 'curl-barra-ez',
    name: 'Curl de Bíceps con Barra EZ',
    muscleGroup: 'Brazos',
    videoUrl: 'mK7s9In8P9A',
    description: 'La barra ondulada minimiza el estrés en las muñecas permitiendo levantar cargas pesadas de forma segura.',
    instructions: [
      'Sujeta la barra EZ con un agarre supino (palmas hacia arriba) en la parte angulada de la barra.',
      'Mantén los pies al ancho de los hombros y rodillas ligeramente dobladas.',
      'Eleva la barra hacia el pecho flexionando los codos con fuerza.',
      'Siente la tensión en el bíceps y desciende de forma controlada.'
    ],
    tips: [
      'Los codos deben actuar como bisagras inmóviles en los costados.',
      'Mantén el núcleo del abdomen activo para proteger la zona lumbar.',
      'No dejes caer la barra en el pecho; mantén tensión muscular continua.'
    ]
  },
  {
    id: 'curl-concentrado',
    name: 'Curl de Bíceps Concentrado',
    muscleGroup: 'Brazos',
    videoUrl: 'X8p9wE5G_QA',
    description: 'Aislamiento extremo del bíceps para ganar el anhelado pico de contracción muscular.',
    instructions: [
      'Siéntate en el borde de un banco con las piernas abiertas.',
      'Sostén una mancuerna con un brazo y apoya el tramo posterior del codo en la cara interior de tu muslo.',
      'Flexiona el codo levantando la mancuerna hacia tu rostro sin despegar el brazo de la pierna.',
      'Aprieta con intensidad máxima el bíceps arriba durante un segundo completo.',
      'Desciende de forma extremadamente lenta.'
    ],
    tips: [
      'No empujes con el hombro del brazo libre.',
      'El movimiento debe ser lento y puro del bíceps.',
      'No estires de golpe en el final para no estresar el tendón.'
    ]
  },
  {
    id: 'curl-polea-biceps',
    name: 'Curl de Bíceps con Cable en Polea Baja',
    muscleGroup: 'Brazos',
    videoUrl: 'As7y7yB0X_Q',
    description: 'Tensión constante durante todo el rango del movimiento debido al cable.',
    instructions: [
      'Coloca una barra recta o de cuerda en la polea baja.',
      'Sujeta la barra con las palmas hacia arriba y da medio paso hacia atrás.',
      'Flexiona los brazos hacia arriba llevando la barra hasta los hombros.',
      'Siente cómo la carga te jala de forma continua hacia abajo y desciende conteniendo el peso.'
    ],
    tips: [
      'Mantén una base sólida con los pies y el pecho erguido.',
      'Evita encoger los hombros arriba.',
      'Aprovecha la fase excéntrica con un descenso lento de 3 segundos.'
    ]
  },
  {
    id: 'dominadas-supinas',
    name: 'Dominadas Supinas (Chin-ups)',
    muscleGroup: 'Brazos',
    videoUrl: '9f_vJ3c9U0_E',
    description: 'Ejercicio compuesto asombroso que recluta bíceps y espalda con enorme intensidad usando tu peso corporal.',
    instructions: [
      'Cuélgate de una barra de dominadas con las palmas mirando hacia tu cuerpo (agarre supino).',
      'Activa tu abdomen y junta los omóplatos.',
      'Tira de tu cuerpo hacia arriba flexionando los brazos hasta que tu barbilla pase la barra.',
      'Baja el torso lentamente de manera controlada hasta extender los brazos casi por completo.'
    ],
    tips: [
      'No te columpies ni uses las piernas como impulso (Kipping).',
      'Si el ejercicio es muy difícil, usa una banda elástica de asistencia.',
      'Enfócate en jalar desde los codos.'
    ]
  },
  {
    id: 'curl-spider',
    name: 'Curl Araña (Spider Curl con Barra EZ)',
    muscleGroup: 'Brazos',
    videoUrl: 'pI9Xy_X9Y8G',
    description: 'Previene cualquier inercia o trampa al colgar el torso, forzando al bíceps a trabajar al 100%.',
    instructions: [
      'Inclinación de 45 grados en un banco de predicador o sentado al revés en un banco inclinado.',
      'Apoya el pecho firmemente contra el respaldo, dejando los brazos colgar libremente frente al banco.',
      'Sostén una barra EZ con agarre supino.',
      'Eleva la barra flexionando los codos sin mover la parte superior del brazo.',
      'Exprime los bíceps arriba y desciende gradualmente.'
    ],
    tips: [
      'Asegúrate de que tus brazos permanezcan perpendiculares al suelo.',
      'No lances la cabeza al frente al subir el peso.',
      'Usa un peso moderado para cuidar la articulación del codo.'
    ]
  },
  {
    id: 'curl-inclinado-mancuernas',
    name: 'Curl Inclinado con Mancuernas',
    muscleGroup: 'Brazos',
    videoUrl: 'a8u9XF9yN0I',
    description: 'Estiramiento máximo de la porción larga del bíceps gracias a la inclinación del banco, promoviendo hipertrofia severa.',
    instructions: [
      'Ajusta un banco inclinado a un ángulo aproximado de 45 a 60 grados.',
      'Acuéstate boca arriba apoyando bien la cabeza y la espalda.',
      'Sostén mancuernas con los brazos extendidos directamente hacia el suelo.',
      'Dobla los codos elevando las mancuernas y mantén los codos fijos apuntando al piso.',
      'Siente la tensión y regresa lentamente.'
    ],
    tips: [
      'No adelantes los codos al flexionar.',
      'Mantén los hombros relajados para no involucrar el deltoides anterior.',
      'Disfruta del estiramiento profundo abajo.'
    ]
  },
  {
    id: 'curl-inverso',
    name: 'Curl de Bíceps Inverso con Barra',
    muscleGroup: 'Brazos',
    videoUrl: 'X8J_BfX_yG4',
    description: 'Combate el desequilibrio de la articulación del codo fortaleciendo el braquiorradial y los extensores de la muñeca.',
    instructions: [
      'De pie, sujeta una barra recta con agarre prono (palmas mirando hacia abajo).',
      'Mantén los codos inmóviles pegados al cuerpo.',
      'Eleva la barra flexionando los codos y llevando el dorso de tus manos hacia los hombros.',
      'Baja de forma pausada hasta la extensión completa.'
    ],
    tips: [
      'Mantén las muñecas completamente rígidas durante todo el recorrido.',
      'No abras los codos hacia afuera.',
      'Este ejercicio es excelente calentamiento para sesiones pesadas de jalón.'
    ]
  },
  {
    id: 'curl-predicador-maquina',
    name: 'Curl Predicador en Máquina (Scott Press)',
    muscleGroup: 'Brazos',
    videoUrl: 'AsD89XJ9X00',
    description: 'Soporte mecánico total que te aísla completamente del resto del cuerpo para máxima concentración en el bíceps.',
    instructions: [
      'Siéntate en la máquina de curl scott e introduce los brazos sobre la almohadilla.',
      'Sujeta el manubrio de agarre con fuerza.',
      'Inicia con los brazos extendidos y flexiona tirando del manubrio hacia los hombros con fuerza.',
      'Baja controlando la resistencia mecánica sin llegar a trabar bruscamente la articulación abajo.'
    ],
    tips: [
      'No levantes las axilas de la almohadilla durante el ejercicio.',
      'Alinea tus muñecas con los antebrazos.',
      'Exhala al ejercer la fuerza concéntrica.'
    ]
  },

  // ==================== PECHO (10 Exercises) ====================
  {
    id: 'press-banca-plano',
    name: 'Press de Banca Plano con Barra',
    muscleGroup: 'Pecho',
    videoUrl: '4y6X8UeP9fA',
    description: 'El ejercicio compuesto fundamental por excelencia para el desarrollo del fitness pectoral y tren superior.',
    instructions: [
      'Acuéstate de espaldas en el banco plano, con los pies firmes y planos en el suelo.',
      'Sujeta la barra con un agarre un poco más ancho que los hombros.',
      'Saca la barra del rack y sostenla directamente sobre tu pecho.',
      'Baja la barra lentamente hasta rozar el centro del pecho (esternón).',
      'Empuja la barra con fuerza hacia arriba y adelante, extendiendo completamente los brazos sin trabar codos.'
    ],
    tips: [
      'Mantén un arco lumbar natural sin levantar los glúteos del banco.',
      'Retrae las escápulas (junta los hombros hacia atrás) para proteger tus articulaciones.',
      'Inhala en el descenso y exhala fuerte al empujar.'
    ]
  },
  {
    id: 'press-inclinado-mancuernas',
    name: 'Press Inclinado con Mancuernas',
    muscleGroup: 'Pecho',
    videoUrl: 'IZxyjW7MPJQ',
    description: 'Enfoca el esfuerzo en la porción clavicular superior del pectoral, logrando un pecho balanceado y atlético.',
    instructions: [
      'Ajusta un banco inclinado a un ángulo de 30-45 grados.',
      'Siéntate y descansa las mancuernas sobre los muslos, luego recuéstate llevándolas a los lados del pecho.',
      'Empuja las mancuernas simultáneamente hacia el techo.',
      'Baja las mancuernas doblando los codos hacia afuera hasta que sientas el estiramiento del pecho superior.',
      'Empuja de vuelta con fuerza concentrada en tus pectorales.'
    ],
    tips: [
      'No dejes que las mancuernas choquen arriba para no perder tensión.',
      'Mantén los antebrazos verticales perpendiculares al suelo en todo momento.',
      'Controla los movimientos en la parte inferior.'
    ]
  },
  {
    id: 'chest-press-maquina',
    name: 'Prensa de Pecho Sentado en Máquina',
    muscleGroup: 'Pecho',
    videoUrl: 'CAwf7n6Luuc',
    description: 'Tensión guiada muy segura ideal para trabajar hipertrofia de pecho al fallo muscular sin riesgo de accidentes.',
    instructions: [
      'Ajusta la altura del asiento de la máquina para que las empuñaduras queden al nivel de tus pezones.',
      'Siéntate erguido con la cabeza apoyada y empuja el suelo con tus pies.',
      'Sujeta los agarres y empuja enérgicamente hacia adelante extendiendo los brazos.',
      'Regresa lentamente dejando que los pectorales se estiren por completo antes de volver a empujar.'
    ],
    tips: [
      'Mantén los hombros relajados hacia atrás integrándolos en el espaldar.',
      'No permitas que la cabeza se incline hacia adelante.',
      'No sueltes la tensión en la fase de retorno.'
    ]
  },
  {
    id: 'aperturas-mancuerna',
    name: 'Aperturas Planas con Mancuernas (Flyes)',
    muscleGroup: 'Pecho',
    videoUrl: 'm0fo7acO6pU',
    description: 'Ejercicio de aislamiento excelente para estirar las fibras cruzadas del músculo pectoral y ensancharlo.',
    instructions: [
      'Acuéstate sobre un banco plano sosteniendo mancuernas directamente sobre el pecho, palmas viéndose entre sí.',
      'Abre lentamente los brazos hacia los costados en un arco amplio, con una ligera flexión constante de codo.',
      'Desciende hasta que tus manos estén a la altura de tu torso.',
      'Contrae el pecho para juntar las mancuernas simulando un abrazo de un gran árbol gigante.'
    ],
    tips: [
      'No dobles los codos de más, de lo contrario se convertirá en un press común.',
      'Mantén los hombros inmóviles.',
      'Estira con cuidado, sintiendo la relajación cruzada en el pecho.'
    ]
  },
  {
    id: 'cruces-poleas',
    name: 'Cruces de Pecho en Poleas Altas',
    muscleGroup: 'Pecho',
    videoUrl: 'fSREhZ9-gKk',
    description: 'Brinda una contracción máxima constante y define el surco interior del pecho.',
    instructions: [
      'Coloca las poleas en la posición superior de la estación doble.',
      'Sujeta los mangos y da un paso adelante para crear tensión, inclinándote ligeramente con un pie al frente.',
      'Lleva las manos hacia abajo y al frente en un arco, encontrándose adelante de tu abdomen bajo.',
      'Cruza ligeramente una mano sobre otra para maximizar la contracción pectoral interior.',
      'Regresa en arco controlado a la posición de crucifijo.'
    ],
    tips: [
      'Controla tu torso; el único movimiento ocurre en los hombros y codos.',
      'Alterna qué mano cruza arriba en cada repetición.',
      'Mantén los hombros hacia atrás.'
    ]
  },
  {
    id: 'fondos-pecho',
    name: 'Fondos en Paralelas para Pecho',
    muscleGroup: 'Pecho',
    videoUrl: 'GzLc_UhkIdg',
    description: 'Increíble ejercicio compuesto que ataca la porción inferior del pecho y tus tríceps con enorme potencia.',
    instructions: [
      'Súbete a las barras de soporte sujetando los mangos con los brazos extendidos.',
      'Inclina tu torso de forma decidida hacia adelante y dobla las piernas por detrás.',
      'Baja lentamente doblando los codos hacia afuera en un ángulo seguro hasta sentir tensión pectoral.',
      'Empuja con fuerza reclutando el pecho para regresar a la extensión inicial.'
    ],
    tips: [
      'Si te mantienes vertical actuarás más sobre tríceps; para pecho, el secreto es la inclinación diagonal anterior.',
      'Asegúrate de no forzar los hombros bajando de forma excesiva.',
      'Mantén el cuello neutral.'
    ]
  },
  {
    id: 'aperturas-peck-deck',
    name: 'Aperturas en Contratista de Pecho (Peck Deck)',
    muscleGroup: 'Pecho',
    videoUrl: '6tWp6Z_9XvU',
    description: 'Brinda un excelente aislamiento mecánico sin el componente de inestabilidad de las mancuernas de peso libre.',
    instructions: [
      'Ajusta la máquina sentándote con la espalda plana y los brazos paralelos al suelo sobre los soportes.',
      'Sujeta los agarres laterales manteniendo los codos ligeramente curvados.',
      'Lleva los brazos hacia el centro apretando los pectorales hasta que se toquen.',
      'Sostén por un segundo abajo en tensión sostenida.',
      'Abre de forma lenta controlando la inercia de la máquina.'
    ],
    tips: [
      'Alinea la posición para que las articulaciones no sufran.',
      'Asegúrate de que los glúteos queden pegados al respaldo.',
      'Aprieta con el pecho.'
    ]
  },
  {
    id: 'press-declinado-barra',
    name: 'Press Declinado con Barra',
    muscleGroup: 'Pecho',
    videoUrl: 'XHzrS6g-sX4',
    description: 'Enfoca de lleno el pectoral inferior y disminuye la activación de los hombros, permitiendo levantar más peso.',
    instructions: [
      'Coloca tus piernas bajo los rodillos de sujeción de un banco declinado.',
      'Recuéstate bocarriba de modo que tu cabeza quede por debajo de la pelvis.',
      'Adopta un agarre de barra un poco más ancho que tus hombros.',
      'Baja la barra lentamente hacia el pecho inferior.',
      'Empuja con mucha potencia en un plano vertical.'
    ],
    tips: [
      'Es indispensable contar con un compañero o seguros en pesos pesados.',
      'No dejes rebotar la barra en las costillas.',
      'Mantén los ojos protegidos de cualquier desliz.'
    ]
  },
  {
    id: 'pullover-mancuerna',
    name: 'Pullover de Pecho con Mancuerna',
    muscleGroup: 'Pecho',
    videoUrl: 'hVRE_09G-ow',
    description: 'Ejercicio tradicional old-school que expande la caja torácica, pectoral y activa el dorsal.',
    instructions: [
      'Recuesta tus hombros y espalda superior cruzados de forma perpendicular sobre un banco plano.',
      'Apoya bien los pies y eleva la cadera en puente activo.',
      'Sostén una mancuerna con ambas manos sobre tu rostro sujetando el interior del disco superior.',
      'Desciende la mancuerna hacia atrás de tu cabeza con los brazos casi estirados sintiendo un gran estiramiento pectoral.',
      'Eleva de nuevo la mancuerna contrayendo el pecho hasta detenerte sobre tu cara.'
    ],
    tips: [
      'Mantén las caderas fijas y alineadas.',
      'No dobles ni estires los codos durante el recorrido; mantenlos estáticos con una flexión de 10 grados.',
      'Inhala profundo al descender para expandir el tórax.'
    ]
  },
  {
    id: 'flexiones-pecho-classicas',
    name: 'Flexiones de Pecho Estándar (Lagartijas)',
    muscleGroup: 'Pecho',
    videoUrl: 'iG6Y4UshZkI',
    description: 'Movimiento fantástico básico para tonificar el tren superior en cualquier lugar, estimulando pecho y tríceps.',
    instructions: [
      'Colócate en posición de tabla con las manos planas un poco más separadas de los hombros.',
      'Baja el cuerpo doblando los codos verticalmente hasta que tu nariz o pecho rozan el piso.',
      'Mantén todo tu cuerpo en una línea recta rígida sin caídas de cadera.',
      'Empuja contra el suelo de forma enérgica para regresar arriba.'
    ],
    tips: [
      'Los codos deben apuntar en un ángulo de 45 grados (como una flecha), no hacia afuera de forma horizontal (como una T).',
      'Mantén los glúteos contraídos para proteger tu zona lumbar.',
      'Si es muy retador, apoya las rodillas de forma progresiva.'
    ]
  },

  // ==================== ESPALDA (10 Exercises) ====================
  {
    id: 'jalon-al-pecho-lat',
    name: 'Jalón al Pecho en Polea Alta',
    muscleGroup: 'Espalda',
    videoUrl: '6pXNfR4pC7g',
    description: 'Esencial para desarrollar amplitud (la famosa espalda en V) y reclutar dorsales.',
    instructions: [
      'Ajusta el cojín para presionar firmemente los muslos contra el banco de la máquina.',
      'Sujeta la barra con un agarre prono ancho (más abierto que tus hombros).',
      'Siéntate y saca pecho mientras mantienes las escápulas activas.',
      'Tira de la barra hacia la parte superior del pecho con fuerza vertical.',
      'Regresa la barra estirando los dorsales por completo sin perder el control.'
    ],
    tips: [
      'No utilices el peso del cuerpo balanceándote hacia atrás para jalar.',
      'Lleva los codos hacia abajo y atrás como si quisieras meterlos a tus bolsillos trasseros.',
      'Siente la unión de las escápulas abajo.'
    ]
  },
  {
    id: 'remo-sentado-maquina',
    name: 'Remo Sentado en Polea Baja',
    muscleGroup: 'Espalda',
    videoUrl: 'm8wAsZp9sUo',
    description: 'Ataca el grosor de la espalda media, trapecios, romboides y porción posterior del hombro.',
    instructions: [
      'Siéntate con los pies apoyados en los estribos, rodillas ligeramente dobladas.',
      'Sujeta el agarre doble en V y estira los brazos manteniendo el torso recto.',
      'Tira del agarre hacia la boca de tu estómago flexionando los codos.',
      'Exprime los músculos dorsales hacia atrás al final de la trayectoria.',
      'Estira los brazos regresando lentamente con control.'
    ],
    tips: [
      'No balancees el torso adelante y atrás para evitar lesiones lumbares.',
      'Mantén los hombros deprimidos (lejos de las orejas).',
      'Mantén la tensión en el abdomen en todo momento.'
    ]
  },
  {
    id: 'dominadas-pronas',
    name: 'Dominadas Pronas (Pull-ups)',
    muscleGroup: 'Espalda',
    videoUrl: 'y77S16QGf3E',
    description: 'Un pilar fundamental de la calistenia y musculación para evaluar y desarrollar fuerza relativa de espalda superior.',
    instructions: [
      'Sujeta una barra de dominadas con las palmas apuntando hacia afuera (agarre prono ancho).',
      'Cuélgate manteniendo los brazos rectos y los pies cruzados.',
      'Tira con tus dorsales hacia arriba intentando que la parte superior de tu pecho alcance la barra.',
      'Pasa la barbilla sobre la barra y desciende lentamente controlando el descenso.'
    ],
    tips: [
      'Evita patalear o impulsarte de forma tramposa.',
      'Imagina que tus manos son ganchos y jalas directamente utilizando los codos.',
      'Si eres principiante usa soporte elástico o máquina asistida.'
    ]
  },
  {
    id: 'remo-con-barra',
    name: 'Remo con Barra de Pie (Bend Over Row)',
    muscleGroup: 'Espalda',
    videoUrl: 'r8S6-857Yj8',
    description: 'Gran ejercicio dinámico multiarticular que fortalece toda la cadena posterior, core y dorsales.',
    instructions: [
      'Sujeta una barra cargada con agarre prono a la anchura de tus hombros.',
      'Dobla ligeramente las rodillas e inclina el torso hacia adelante unos 45 grados, conservando la espalda plana.',
      'La barra debe colgar frente a tus espinillas con los brazos estirados.',
      'Jala la barra verticalmente hacia tu abdomen medio pegando los codos al cuerpo.',
      'Baja con total suavidad guiando la barra abajo.'
    ],
    tips: [
      'No dejes que tu espalda baja se jorobe; mantén la bisagra de cadera firme.',
      'Focaliza la tracción en los dorsales posteriores, no en tu cabeza.',
      'Respira de forma adecuada al tirar.'
    ]
  },
  {
    id: 'remo-mancuerna',
    name: 'Remo Unilateral con Mancuerna en Banco',
    muscleGroup: 'Espalda',
    videoUrl: '8i3VxdY4xXg',
    description: 'Desarrolla fuerza e hipertrofia unilateral aislando de gran manera los dorsales lumbares.',
    instructions: [
      'Coloca una rodilla y la mano del mismo lado sobre un banco plano.',
      'La otra pierna debe apoyarse estirada en el suelo paralela para sustentación.',
      'Sostén una mancuerna pesada con la mano libre apuntando en dirección vertical.',
      'Jala la mancuerna hacia tu cadera flexionando el codo hacia atrás en un semicírculo.',
      'Desciende de forma lineal estirando el hombro abajo lentamente.'
    ],
    tips: [
      'No gires la espalda superior arriba para levantar el peso de forma tramposa.',
      'Jala hacia tu cadera, no verticalmente al pecho; esto focaliza más el dorsal que el bíceps.',
      'Mantén la columna firme.'
    ]
  },
  {
    id: 'peso-muerto-tradicional',
    name: 'Peso Muerto Convencional con Barra',
    muscleGroup: 'Espalda',
    videoUrl: '4dF99yX7Xy4',
    description: 'El mejor compuesto constructor de masa corporal y fuerza bruta que integra espalda baja, glúteos e isquiotibiales.',
    instructions: [
      'Coloca los pies debajo de la barra a la anchura de las caderas, sintiendo que la barra cruza la mitad de tus zapatos.',
      'Inclina tu torso para agarrar la barra manteniendo los brazos verticales por fuera de tus rodillas.',
      'Baja tu cadera, saca pecho y alinea tu espalda neutra.',
      'Empuja con fuerza los talones levantando el torso de forma sinérgica hasta estar completamente erguido.',
      'Baja el peso controladamente revirtiendo la bisagra de cadera hasta rozar el suelo.'
    ],
    tips: [
      'Bajo ninguna circunstancia dobles la espalda baja arqueándola.',
      'La barra debe deslizarse rozando tu cuerpo en todo el recorrido.',
      'No realices rebotes innecesarios en el suelo.'
    ]
  },
  {
    id: 'remo-barra-t',
    name: 'Remo en Barra T Apoyada',
    muscleGroup: 'Espalda',
    videoUrl: 'U3HlEF_E9fo',
    description: 'Excelente para eliminar restricciones de estabilidad core focalizando toda la energía en estrujar la espalda alta.',
    instructions: [
      'Súbete a la plataforma de la barra T colocándote sobre el soporte acolchado de pecho.',
      'Sujeta los agarres neutros paralelos anchos.',
      'Activa tus pies y tira de la barra hacia tu esternón.',
      'Aprieta con intensidad de acero los trapecios y romboides por un segundo.',
      'Permite que el peso descienda conservando tus hombros estirados pero seguros.'
    ],
    tips: [
      'No levantes el pecho del soporte acolchado en ningún instante.',
      'Evita usar la inercia explosiva de forma acelerada.',
      'Respira lento y controlado.'
    ]
  },
  {
    id: 'pullover-polea-alta',
    name: 'Pullover de Dorsales en Polea Alta',
    muscleGroup: 'Espalda',
    videoUrl: 'pSHjTRCQxIw',
    description: 'Un aislamiento brillante que trabaja la porción lateral y lumbar del dorsal libre de fatiga del bíceps.',
    instructions: [
      'Coloca una barra recta o cuerda en una polea alta de pie.',
      'Sujeta la barra con las palmas hacia abajo, da uno o dos pasos atrás e inclínate al frente unos 30 grados.',
      'Manteniendo los brazos casi completamente rígidos, jala la barra en un gran arco hacia abajo hasta tus muslos.',
      'Exprime los dorsales laterales contrayendo los músculos.',
      'Sube los brazos de forma guiada permitiendo que las axilas se estiren arriba.'
    ],
    tips: [
      'No dejes que los codos se doblen ni cambien de ángulo en la trayectoria.',
      'Siente la tracción focalizada en los laterales altos bajo las axilas.',
      'Asegúrate de que tus deltoides no dominen la bajada.'
    ]
  },
  {
    id: 'hiperextensiones-lumbares',
    name: 'Hiperextensiones en Banco Romano (Lumbares)',
    muscleGroup: 'Espalda',
    videoUrl: '6P9XbA1-l3I',
    description: 'Desarrolla fuerza e hipertrofia en los erectores de la columna de forma segura previniendo dolores lumbares.',
    instructions: [
      'Ajusta el soporte acolchado del banco para que quede sobre tu cadera baja permitiendo flexión cómoda.',
      'Sujeta tus tobillos en las almohadillas inferiores y junta tus manos cruzadas en el pecho.',
      'Dobla tu torso hacia el piso de forma suave.',
      'Usa tu espalda lumbar para elevar tu tronco de vuelta hasta quedar en línea recta con las piernas (no te sobre-extiendas).',
      'Desciende de forma progresiva.'
    ],
    tips: [
      'No arquees el torso hiper-extendiendo la columna al final del recorrido.',
      'El movimiento debe ser lento y totalmente controlado.',
      'Puedes agregar un disco contra tu pecho para incrementar la dificultad.'
    ]
  },
  {
    id: 'remo-hammer-strength',
    name: 'Remo Convergente en Máquina Hammer',
    muscleGroup: 'Espalda',
    videoUrl: 'L_xrDAtykMI',
    description: 'Excelente trayectoria biomecánica que sigue el movimiento natural de los omóplatos de forma aislada.',
    instructions: [
      'Siéntate de frente a la máquina Hammer y apoya tu pecho contra la almohadilla.',
      'Estira tus brazos para sujetar un manillar (puedes optar por hacerlo unilateralmente).',
      'Tira de la palanca de forma explosiva llevando la mano a los costados de tus costillas.',
      'Mantén contraído tu dorsal y regresa controlando el recorrido de regreso.'
    ],
    tips: [
      'Mantén los hombros deprimidos para maximizar la tracción del dorsal.',
      'Asegúrate de que la fuerza principal provenga del codo.',
      'Sujeta el mango con un agarre firme pero concentrado.'
    ]
  },

  // ==================== HOMBROS (10 Exercises) ====================
  {
    id: 'shoulder-press-maquina',
    name: 'Prensa de Hombro en Máquina',
    muscleGroup: 'Hombros',
    videoUrl: '6tWp6Z_9XvU',
    description: 'Ejercicio de arrastre ideal para desarrollar de manera masiva la porción anterior e intermedia de los deltoides.',
    instructions: [
      'Ajusta el asiento para que los mangos laterales de la máquina queden a la altura del mentón u hombros.',
      'Siéntate con la espalda y cadera bien presionadas contra el espaldar.',
      'Sujeta las manivelas firmemente y presiona verticalmente hacia el techo de forma explosiva.',
      'Desciende el peso de forma contenida hasta que tus manos regresen al nivel de tus orejas.'
    ],
    tips: [
      'No dejes rebotar el peso en la parte baja de la máquina para no lastimar tus codos.',
      'Exhala al empujar de modo consistente.',
      'Mantén los hombros bajos reduciendo tensión en tu trapecio.'
    ]
  },
  {
    id: 'elevaciones-laterales',
    name: 'Elevaciones Laterales con Mancuernas',
    muscleGroup: 'Hombros',
    videoUrl: 'XHzrS6g-sX4',
    description: 'El ejercicio clave indispensable para ensanchar los hombros lateralmente brindando volumen y aspecto 3D.',
    instructions: [
      'Párate derecho o siéntate al borde del banco, con una mancuerna en cada mano en los laterales de tus muslos.',
      'Eleva los brazos hacia los costados en un arco de un círculo hasta la altura de tus hombros.',
      'Mantén una minúscula flexión protectora en tus codos.',
      'Baja con total lentitud soportando el peso de vuelta.'
    ],
    tips: [
      'No balancees tus hombros ni flexiones abruptamente el torso.',
      'Asegúrate de liderar el movimiento impulsando desde los codos, no levantando las muñecas primero.',
      'Arriba, vierte ligeramente tus manos como si vaciaras agua de jarras.'
    ]
  },
  {
    id: 'arnold-press-manc',
    name: 'Press de Hombros Arnold con Mancuernas',
    muscleGroup: 'Hombros',
    videoUrl: '6pXNfR4pC7g',
    description: 'Creado por Arnold Schwarzenegger, este ejercicio rota las muñecas reclutando las tres cabezas del deltoide en un único patrón.',
    instructions: [
      'Siéntate erguido en un banco de respaldo alto con dos mancuernas frente a ti a la altura de tu mentón, con palmas hacia el rostro (como si terminaras un curl de bíceps).',
      'Presiona hacia arriba mientras rotas las muñecas de forma progresiva hacia afuera 180 grados.',
      'En la parte superior, los brazos deben estar completamente extendidos y las palmas apuntando al frente.',
      'Desciende rotando de vuelta las muñecas de regreso a la postura inicial de guardia.'
    ],
    tips: [
      'El movimiento rotatorio de las mancuernas debe ser muy armónico y continuo.',
      'Alinea la zona lumbar evitando un arqueado peligroso.',
      'Mantén la tensión concéntrica arriba.'
    ]
  },
  {
    id: 'reverse-fly-pajaros',
    name: 'Pájaros con Mancuerna (Deltoide Posterior)',
    muscleGroup: 'Hombros',
    videoUrl: 'iG6Y4UshZkI',
    description: 'Fundamental para balancear la salud escapular, de hombro y corregir postura muscular anteriorizada.',
    instructions: [
      'Párate al ancho de cadera e inclina tu torso al frente de modo horizontal manteniendo espalda cóncava.',
      'Sostén mancuernas delante de tus rodillas apuntando al suelo.',
      'Eleva tus brazos hacia los costados de modo similar a batir tus alas sin modificar la flexión fija en los codos.',
      'Squeeze (aprieta) el hombro posterior al final arriba y desciende gradualmente.'
    ],
    tips: [
      'El cuello debe reposar en línea neutral con tu columna mirando de forma baja.',
      'No utilices pesos gigantescos que saboteen tu técnica de aislamiento puro.',
      'Siente el trabajo en la parte posterior del hombro.'
    ]
  },
  {
    id: 'elevaciones-frontales-manc',
    name: 'Elevaciones Frontales con Mancuerna',
    muscleGroup: 'Hombros',
    videoUrl: 'hVRE_09G-ow',
    description: 'Aislamiento frontal directo optimizando fuerza en empujes atléticos intensos del deltoides anterior.',
    instructions: [
      'Toma una mancuerna en cada mano colocándolas frente a tus muslos.',
      'Eleva un brazo apuntando al frente hasta nivel de ojos fijando el codo.',
      'Baja controlando la gravedad suavemente de regreso.',
      'Repite de modo alternado de forma rítmica.'
    ],
    tips: [
      'Conserva tu núcleo abdominal firme protegiendo el lumbar de bamboleos.',
      'Evita subir por encima de tus ojos si sufres pinzamiento de hombro.',
      'Controla la bajada para continuar la estimulación miofibrilar.'
    ]
  },
  {
    id: 'face-pulls-polea',
    name: 'Face Pulls en Polea con Cuerda',
    muscleGroup: 'Hombros',
    videoUrl: 'pSHjTRCQxIw',
    description: 'Ataca el deltoide posterior, manguito rotador y romboides, muy valorado para la salud articular.',
    instructions: [
      'Coloca una polea aproximada a nivel de tu frente con un accesorio de doble cuerda.',
      'Sujeta los agarres con palmas mirándose y da dos pasos atrás inclinando tu postura estable.',
      'Tira de la cuerda hacia tu rostro, abriendo las manos hacia los lados de tus orejas.',
      'Rotar los pulgares hacia atrás al final de la tirada.',
      'Estira los brazos lentamente regresando a la polea.'
    ],
    tips: [
      'Enfócate en mantener el plano horizontal de tus codos arriba.',
      'Visualiza doblar tus bíceps mientras exprimes la porción trasera del hombro.',
      'Excelente inicio o finalizador de rutina postural.'
    ]
  },
  {
    id: 'remo-al-cuello',
    name: 'Remo al Cuello con Barra o Mancuernas',
    muscleGroup: 'Hombros',
    videoUrl: 'wkD8rjkodUI',
    description: 'Ejercicio de tracción que construye masa compacta en deltoides medios y trapecios superiores.',
    instructions: [
      'Sujeta una barra recta con agarre prono con las manos a mitad del ancho de hombros.',
      'Párate erguido y sostén el peso descansado sobre tus muslos.',
      'Tira de la barra hacia tu mentón guiando la subida directamente desde tus codos.',
      'La barra debe subir rozando tu pecho hasta la altura del pecho superior.',
      'Desciende de forma progresiva y controlada.'
    ],
    tips: [
      'Estrechar el agarre de forma extrema puede incomodar las muñecas; mantén una distancia cómoda.',
      'Mantén los codos por encima de la barra en todo el movimiento.',
      'Mantén tu cabeza derecha y neutral.'
    ]
  },
  {
    id: 'press-militar-barra',
    name: 'Press Militar de Pie con Barra',
    muscleGroup: 'Hombros',
    videoUrl: 'l4kQd9eWclE',
    description: 'El clásico constructor de hombros masivos que desafía la estabilidad estabilizadora de todo el cuerpo.',
    instructions: [
      'Sujeta la barra en un rack a la altura de tus hombros frontales.',
      'Adopta un agarre ligeramente más ancho que los hombros apuntando los antebrazos verticales abajo.',
      'Descansa la barra sobre tus clavículas superiores y da un paso atrás separando tus pies.',
      'Presiona con fuerza barriendo el plano de la nariz hasta bloquear los brazos arriba de tu cabeza.',
      'Regresa lentamente al soporte clavicular pecho de forma ordenada.'
    ],
    tips: [
      'Aprieta los glúteos y el core fuertemente de pie para que la cadera no se adelante arqueando la espalda.',
      'No uses fuerza de piernas (si usas rebote de piernas se convierte en un Push Press).',
      'Desplaza sutilmente la cabeza hacia atrás al inicio de la trayectoria y métela al final arriba para un movimiento seguro.'
    ]
  },
  {
    id: 'cable-lateral-raises',
    name: 'Elevaciones Laterales con Cable',
    muscleGroup: 'Hombros',
    videoUrl: 'z7apbeZ0Q_A',
    description: 'Permite tensión uniforme en todo el movimiento de elevación del deltoides a diferencia de gravedad libre.',
    instructions: [
      'Ubica una polea baja individual de pie colocándote de costado a la máquina.',
      'Sujeta el mango con cruce de brazo por enfrente de tu cuerpo.',
      'Eleva lateralmente el brazo hacia un costado hasta que esté horizontal paralelo al piso.',
      'Controla de forma lenta el cable regresándolo de forma cruzada.',
      'Completa las repeticiones del brazo antes de voltearte.'
    ],
    tips: [
      'Mantén una ligera flexión de codos constante.',
      'Asegura la estabilidad con tu postura de piernas.',
      'El cable debe deslizarse libremente sin entorpecer tu calzado.'
    ]
  },
  {
    id: 'elevaciones-frontales-disco',
    name: 'Elevaciones Frontales con Disco (Hombros)',
    muscleGroup: 'Hombros',
    videoUrl: 'wiFNA3sqjCA',
    description: 'Excelente para aislamiento frontal rápido, permitiendo un gran agarre simétrico rígido.',
    instructions: [
      'Sostén un disco de peso de sus lados laterales con ambos brazos estirados apuntando hacia abajo.',
      'Mantén el torso totalmente rígido con los pies estables en el suelo.',
      'Eleva el disco hacia el frente en arco lineal hasta la altura de tus ojos.',
      'Sostén por medio segundo el estímulo arriba.',
      'Baja el disco suavemente de vuelta.'
    ],
    tips: [
      'No lances la espalda lumbar atrás para levantar la carga.',
      'Tensión en el core es prioritaria en este ejercicio.',
      'Mantén los codos semi-flexionados.'
    ]
  },

  // ==================== TRICEP (10 Exercises) ====================
  {
    id: 'extension-polea-triceps',
    name: 'Extensión de Tríceps en Polea Alta',
    muscleGroup: 'Tricep',
    videoUrl: 'MeIiYGbLfQE',
    description: 'La forma más estable de aislar las fibras del tríceps logrando un bombeo muscular brutal.',
    instructions: [
      'Asegura una barra en polea alta y sujétala con agarre prono (palmas hacia abajo).',
      'Da un paso corto colocándote cerca de la máquina e inclina sutilmente el torso hacia adelante.',
      'Fija tus codos firmemente contra los costados de tu caja torácica.',
      'Empuja la barra verticalmente hacia abajo estirando tus codos al máximo.',
      'Exprime y contrae el tríceps abajo, regresando los antebrazos con lentitud sobre el plano de tus codos.'
    ],
    tips: [
      'Tus codos deben comportarse exclusivamente como bisagras inmóviles, no los desplaces adelante ni atrás.',
      'Mantén las muñecas duras sin doblarlas.',
      'Exhala al empujar de forma consistente.'
    ]
  },
  {
    id: 'fondos-triceps-banco',
    name: 'Fondos en Banco para Tríceps',
    muscleGroup: 'Tricep',
    videoUrl: 'vA67T18O0h8',
    description: 'Movimiento potente de peso corporal que ataca tríceps, hombros y pecho superior.',
    instructions: [
      'Coloca tus manos paralelas en el borde de un banco plano detrás de ti de espaldas.',
      'Estira tus piernas hacia adelante apoyando los talones en el suelo.',
      'Inicia el descenso doblando los codos estrictamente hacia atrás de forma controlada hasta un ángulo seguro.',
      'La cadera debe descender muy pegada al banco.',
      'Empuja con furia extendiendo los codos por completo.'
    ],
    tips: [
      'Mantén los codos cerrados detrás de ti, no dejes que se abran hacia los lados.',
      'Evita arquear excesivamente los hombros bajando de más.',
      'Si deseas subir el reto, puedes colocar discos sobre tus muslos.'
    ]
  },
  {
    id: 'press-banca-cerrado',
    name: 'Press de Banca con Agarre Cerrado',
    muscleGroup: 'Tricep',
    videoUrl: '6X_vN3N9y38',
    description: 'Poderoso movimiento compuesto que permite cargar mayor peso maximizando la masa del tríceps.',
    instructions: [
      'Acuéstate boca arriba sobre el banco de press.',
      'Sujeta la barra con las palmas hacia arriba manteniendo una separación similar al ancho de tus hombros (agarre estrecho).',
      'Desmonta la barra y sostenla firme sobre tus hombros.',
      'Desciende con absoluta lentitud manteniendo tus codos muy pegados al torso de forma rozante hasta el abdomen alto.',
      'Empuja con máxima potencia focalizando en tus tríceps.'
    ],
    tips: [
      'No sujetes la barra demasiado estrecha (como tocar tus pulgares) para no forzar las muñecas.',
      'Tu codo debe desplazarse cerca de tus costados en todo momento.',
      'Apoya firmemente los pies contra el suelo.'
    ]
  },
  {
    id: 'rompecraneos-triceps',
    name: 'Press Francés con Barra EZ (Rompecráneos)',
    muscleGroup: 'Tricep',
    videoUrl: 'ykJmrZ5v0W0',
    description: 'Indiscutiblemente uno de los mejores aisladores para la cara larga posterior del tríceps hipertrofiando tus brazos.',
    instructions: [
      'Toma una barra EZ recostándote sobre un banco plano.',
      'Extiende los brazos sujetando las secciones curvas de la barra de forma vertical sobre tu mentón.',
      'Dobla los codos doblando el peso lentamente hacia tu frente o detrás de tu cabeza.',
      'Mantén los hombros apuntalados fijos bocarriba.',
      'Usa tus tríceps para retornar la barra a la extensión inicial.'
    ],
    tips: [
      'Mantén tus codos paralelos entre sí evitando que apunten hacia afuera.',
      'Bajar la barra un poco por detrás de tu cabeza mantendrá tensión continua a lo largo del movimiento.',
      'El movimiento debe ser controlado e higiénico.'
    ]
  },
  {
    id: 'kickbacks-triceps',
    name: 'Patadas de Tríceps con Mancuerna',
    muscleGroup: 'Tricep',
    videoUrl: 'zC3nLlEvin4',
    description: 'Ataca con gran precisión la cabeza más corta e interna del tríceps, logrando el tallado del músculo.',
    instructions: [
      'Apoya tu rodilla y mano izquierda sobre un banco conservando tu torso paralelo al piso.',
      'Sostén una mancuerna con la mano libre doblando el codo a 90 grados apuntando al costado de tus costillas.',
      'Manteniendo inmóvil la parte superior del brazo, extiende el codo por completo tirando de la mancuerna hacia atrás.',
      'Squeeze (aprieta) el tríceps un segundo completo atrás.',
      'Regresa lentamente al ángulo inicial flexor.'
    ],
    tips: [
      'No balancees tu hombro al ejecutar la patada; el hombro está fijo.',
      'Mantén el codo en una posición alta paralela por encima del tronco.',
      'Visualiza tensar una muelle o resorte atrás.'
    ]
  },
  {
    id: 'copa-mancuerna-onearm',
    name: 'Extensión de Tríceps Copa con Mancuerna a una Mano',
    muscleGroup: 'Tricep',
    videoUrl: 'mK7s9In8P9A',
    description: 'Enfoca de lleno el estiramiento profundo, ideal para dotar al tríceps de volumen sustancial vista de perfil.',
    instructions: [
      'Siéntate erguido en un banco de soporte bajo.',
      'Eleva una mancuerna con un brazo directamente por encima de tu cabeza de forma vertical.',
      'Flexiona el codo por detrás de tu nuca bajando la mancuerna en arco controlado.',
      'Mantén tu cabeza recta mirando al frente sin interponerse.',
      'Presiona la mancuerna de vuelta al cielo bloqueando el codo.'
    ],
    tips: [
      'Puedes abrazar con tu mano libre el codo activo si necesitas estabilización de codo.',
      'Controla la fase inferior para no forzar la articulación excesivamente.',
      'Cambia de brazo tras culminar tus repeticiones.'
    ]
  },
  {
    id: 'cuerda-polea-triceps-trans',
    name: 'Extensión de Tríceps con Cuerda sobre la Cabeza',
    muscleGroup: 'Tricep',
    videoUrl: 'X8p9wE5G_QA',
    description: 'Ofrece una enorme tensión fluida estirando las articulaciones con soporte ergonómico en la cuerda.',
    instructions: [
      'Fija una trenza o cuerda en una polea media/baja dándole la espalda a la máquina.',
      'Sujeta los extremos de la cuerda pasando tus manos por detrás de tu cabeza y da un paso adelante.',
      'Inclina tu torso al frente estirando tus hombros de pie.',
      'Extiende tus codos hacia adelante con fuerza en arco estirándolos por completo.',
      'Permite que el peso doble los brazos de vuelta hacia tu nuca con lentitud.'
    ],
    tips: [
      'Mantén tus codos apuntando en una dirección de avance constante al frente.',
      'No dejes que el cable te jale la espalda arqueándote de forma dañina.',
      'Excelente bombeo muscular de alta intensidad.'
    ]
  },
  {
    id: 'flexiones-diamante',
    name: 'Flexiones de Pecho Diamante (Piso)',
    muscleGroup: 'Tricep',
    videoUrl: 'As7y7yB0X_Q',
    description: 'Una de las mejores flexiones de calistenia que traslada toda la carga pectoral directamente a tus tríceps.',
    instructions: [
      'Colócate en el piso de rodillas o en tabla uniendo tus manos en el centro del pecho.',
      'Tus dedos índice y pulgar deben formar una silueta similar a un diamante.',
      'Baja el cuerpo doblando los codos hacia tus costados traseros.',
      'Rozar directamente con el pecho tus manos.',
      'Empuja contra el suelo de forma enérgica estirando tus codos completamente.'
    ],
    tips: [
      'No permitas que tus codos se abran horizontalmente; mantenlos orientados en ángulo de bisectriz hacia atrás.',
      'Si la opción de tabla es demasiado demandante, puedes realizar flexiones diamante apoyando rodillas.',
      'Mantén los glúteos y el core contraídos firmes.'
    ]
  },
  {
    id: 'extension-triceps-mancuernas-doble',
    name: 'Extensión de Tríceps Copa con Mancuerna a 2 Manos',
    muscleGroup: 'Tricep',
    videoUrl: '9f_vJ3c9U0_E',
    description: 'Alternativa tradicional que te permite controlar mancuernas de peso mayor de forma muy balanceada.',
    instructions: [
      'Sujeta una mancuerna pesada con ambas manos de forma vertical.',
      'Sujeta el disco superior abrazándolo con las palmas simulando un cuenco.',
      'Párate o siéntate erguido llevando la mancuerna directamente arriba de tu cabeza.',
      'Dobla tus codos por detrás de tus orejas descendiendo el peso de modo uniforme.',
      'Empuja la mancuerna verticalmente arriba de nuevo.'
    ],
    tips: [
      'Intenta mantener los codos lo más cerrados posible.',
      'Tensión en el tronco es vital para no encorvar el cuello.',
      'Exhala al levantar el peso.'
    ]
  },
  {
    id: 'extensiones-barra-fija-triceps',
    name: 'Extensiones de Tríceps en Barra Alta (Bodyweight)',
    muscleGroup: 'Tricep',
    videoUrl: 'pI9Xy_X9Y8G',
    description: 'Desafío asombroso de peso corporal que imita al rompecráneos mecánico usando pura gravedad.',
    instructions: [
      'Colócate frente a una barra o banco al nivel del pecho.',
      'Sujeta la barra con agarre prono inclinado con el cuerpo estirado hacia atrás en diagonal.',
      'Dobla tus codos bajando tu cabeza sutilmente por debajo de la barra manteniendo las manos firmes.',
      'Siente la estimulación pura en tus tríceps.',
      'Empuja el peso de tu propio cuerpo hacia atrás de vuelta extendiendo tus brazos.'
    ],
    tips: [
      'Cuanto más baja sea la barra, la resistencia e intensidad de la gravedad aumentarán de forma exponencial.',
      'Conserva tu abdomen compacto sin hundirte.',
      'Ejecuta de pie con cuidado.'
    ]
  },

  // ==================== GLÚTEOS (10 Exercises) ====================
  {
    id: 'hip-thrust-heavy',
    name: 'Hip Thrust con Barra en Banco',
    muscleGroup: 'Gluteos',
    videoUrl: '9FGkiQD07_M',
    description: 'El ejercicio indiscutible rey número uno absoluto para activar, construir y tonificar todas las fibras de los glúteos.',
    instructions: [
      'Apoya tu espalda superior en un banco plano bocarriba colocándote cómodamente en el suelo.',
      'Cruza una barra cargada con acolchado protector directamente en tu pelvis.',
      'Asegura tus rodillas flexionadas a 90 grados separando tus talones al ancho de tus caderas.',
      'Eleva la pelvis de forma enérgica despegando los glúteos del piso, empujando con fuerza tus talones.',
      'Arriba, tu cuerpo debe formar una tabla horizontal, exprime (aprieta) tus glúteos un segundo y desciende.'
    ],
    tips: [
      'Mantén tu cabeza mirando siempre hacia la base delantera, nunca mires al techo para no doblar cuello.',
      'Los talones son la única zona de fuerza motriz al suelo.',
      'En la parte superior ejerce una retroversión pélvica exprimiendo los glúteos.'
    ]
  },
  {
    id: 'abductor-maquina-glute',
    name: 'Abductores en Máquina Sentado',
    muscleGroup: 'Gluteos',
    videoUrl: 'fSREhZ9-gKk',
    description: 'Aislamiento lateral excelente enfocado en esculpir el glúteo medio y perfeccionar la estabilidad de cadera.',
    instructions: [
      'Siéntate en la máquina de abductores seleccionando el peso adecuado.',
      'Coloca las almohadillas giratorias por fuera de tus rodillas.',
      'Siéntate erguido o inclínate al frente ligeramente de acuerdo a tu variante anatómica.',
      'Empuja las piernas hacia afuera con fuerza abriendo la estructura mecánica al máximo.',
      'Cierra de forma controlada regresando sin que el bloque de peso se desplome golpeando.'
    ],
    tips: [
      'La inclinación anterior activa en mayor plano el glúteo medio superior.',
      'Mantén una tensión muscular ininterrumpida sin descansar abajo.',
      'Controla completamente la fase excéntrica lenta.'
    ]
  },
  {
    id: 'cable-kickbacks-glute',
    name: 'Patada de Glúteo en Polea Baja con Tobillera',
    muscleGroup: 'Gluteos',
    videoUrl: 'MeIiYGbLfQE',
    description: 'Ofrece tensión fluida excelente a lo largo del arco de extensión de la cadera, aislando la nalga por completo.',
    instructions: [
      'Asegura una tobillera de velcro y cuélgala en el mosquetón del cable de la polea baja.',
      'Colócate de frente a la máquina dándole la cara.',
      'Sostén el marco de la polea y mantén una ligera inclinación anterior de torso.',
      'Patea la pierna hacia atrás dibujando un arco sin arquear dolorosamente la zona lumbar.',
      'Sostén el estímulo en glúteos arriba, regresando tu pierna estirada lentamente.'
    ],
    tips: [
      'El movimiento pertenece estrictamente a la articulación de la cadera, conserva la espalda quieta.',
      'No lances la pierna de forma explosiva desordenada; prefiere contracción con control continuo.',
      'Mantén la cadera derecha alineada con la máquina para no desviarte.'
    ]
  },
  {
    id: 'glute-bridge-dumbbell',
    name: 'Puente de Glúteos con Mancuernas (Piso)',
    muscleGroup: 'Gluteos',
    videoUrl: 'vA67T18O0h8',
    description: 'Variante magnífica para trabajar glúteos en piso con carga controlada de mancuernas.',
    instructions: [
      'Túmbate bocarriba en el suelo con rodillas flectadas a 90 grados en pies planos.',
      'Apoya una mancuerna pesada sobre tu pelvis sujetándola con las manos.',
      'Empuja tus talones y levanta el glúteo firmemente del piso hasta nivelar las caderas bocarriba.',
      'Contrae con todas tus fuerzas los glúteos arriba.',
      'Baja el torso lentamente cepillando ligeramente el suelo.'
    ],
    tips: [
      'Mantén los hombros presionados contra el suelo dándote solidez.',
      'No arquees el abdomen al subir; se trata de una bisagra pélvica.',
      'Excelente para series quemadoras intensas.'
    ]
  },
  {
    id: 'curtsy-lunges-glute',
    name: 'Zancadas Cruzadas (Curtsy Lunges)',
    muscleGroup: 'Gluteos',
    videoUrl: '6X_vN3N9y38',
    description: 'Ataca los glúteos desde planos de rotación multi-direccional reclutando el glúteo mayor y menor de forma cruzada.',
    instructions: [
      'Párate erguido con los pies separados a la distancia de las caderas con mancuernas a los costados.',
      'Da un paso largo hacia atrás cruzando la pierna derecha diagonalmente por detrás de tu pierna izquierda.',
      'Baja las caderas verticalmente doblando las rodillas en una minuciosa reverencia.',
      'La rodilla izquierda delantera debe apuntar recta al frente de forma segura.',
      'Empuja con el talón de tu pierna izquierda para retornar erguido.'
    ],
    tips: [
      'Mantén tus hombros orientados hacia el frente sin rotar demasiado el torso.',
      'Siente la estimulación estirándose en el lateral exterior del glúteo delantero.',
      'Realiza las repeticiones con suavidad.'
    ]
  },
  {
    id: 'peso-muerto-sumo-glute',
    name: 'Peso Muerto Sumo con Barra o Mancuerna',
    muscleGroup: 'Gluteos',
    videoUrl: 'ykJmrZ5v0W0',
    description: 'Postura sumamente ancha que desplaza gran estimulación del cuádriceps directamente hacia los glúteos y aductores internos.',
    instructions: [
      'Párate con una postura sumamente ancha (el doble de los hombros) con puntas de pies a 45 grados.',
      'Sostén mancuernas o barra en el centro directamente de forma vertical hacia el suelo.',
      'Dobla tus rodillas e inclina la cadera bajando de modo lineal respetando la espalda neutra.',
      'Llega a una postura profunda con los muslos casi paralelos al suelo.',
      'Ponte de pie empujando fuertemente tus talones apretando los glúteos arriba.'
    ],
    tips: [
      'Tus rodillas deben seguir estrictamente la dirección diagonal de tus pies sin cerrarse.',
      'Conserva el pecho muy abierto y los hombros atrás.',
      'Ejecuta con control absoluto.'
    ]
  },
  {
    id: 'plie-squats-dumbbell',
    name: 'Sentadilla Plie con Copa',
    muscleGroup: 'Gluteos',
    videoUrl: 'zC3nLlEvin4',
    description: 'Imita el movimiento estético del ballet incrementando de gran manera el trabajo extensor de caderas y glúteos.',
    instructions: [
      'Colócate de pie con postura ancha y toma una mancuerna en su extremo superior en forma de copa colgada.',
      'Baja las caderas lentamente tirando el peso hacia abajo en perpendicular.',
      'Mantén tu torso extremadamente vertical y tus rodillas bien separadas lateralmente.',
      'Sube contrayendo glúteos y aductores de forma sinérgica.'
    ],
    tips: [
      'No desvíes el torso inclinándote demasiado hacia adelante.',
      'Mantener los talones planos es vital en la bajada.',
      'No bloquees las rodillas bruscamente arriba.'
    ]
  },
  {
    id: 'clamshells-band',
    name: 'Almejas en Piso con Banda Elástica (Clamshells)',
    muscleGroup: 'Gluteos',
    videoUrl: 'mK7s9In8P9A',
    description: 'Aísla rigurosamente los rotadores laterales de cadera y el glúteo minimizando cualquier fatiga articular.',
    instructions: [
      'Asegura una banda de resistencia de tela arriba de tus rodillas e inclínate de costado en el suelo apoyándote en tu antebrazo.',
      'Flecta las rodillas a 45 grados manteniendo los talones unidos.',
      'Levanta la rodilla de arriba separándola de la pierna base rotando tu cadera.',
      'Contrae fuertemente el glúteo medio y mantén un segundo.',
      'Une tus rodillas controladamente.'
    ],
    tips: [
      'Tus pies deben permanecer pegados uno a otro durante todo el ejercicio.',
      'Impide balancearla rotando la pelvis hacia atrás; mantén cadera estable.',
      'Te dará un gran ardor muscular.'
    ]
  },
  {
    id: 'donkey-kickbacks-floor',
    name: 'Patada de Glúteo en Cuadrupedia (Donkey Kicks)',
    muscleGroup: 'Gluteos',
    videoUrl: 'X8p9wE5G_QA',
    description: 'Movimiento icónico hipertrofiador sin requerimientos de equipamiento complejo.',
    instructions: [
      'Colócate en cuatro apoyos (manos y rodillas) cóncavos en una esterilla.',
      'Mantén tu abdomen firme y el cuello derecho neutral.',
      'Dobla una rodilla a 90 grados y eleva la pierna empujando la suela del pie con dirección directa al techo.',
      'Exprime arriba el glúteo mayor.',
      'Desciende tu rodilla sin tocar el suelo y repite de forma secuenciada.'
    ],
    tips: [
      'No permitas que la espalda lumbar se arquee o doble excesivamente en la parte de arriba.',
      'La fuerza se origina netamente en el glúteo, no con impulsos de columna.',
      'Puedes situar una mancuerna ligera sujeta detrás del pliegue de tu rodilla para agregar peso.'
    ]
  },
  {
    id: 'sentadilla-con-salto',
    name: 'Sentadillas con Salto Excéntrico (Jump Squat)',
    muscleGroup: 'Gluteos',
    videoUrl: 'As7y7yB0X_Q',
    description: 'Suma de entrenamiento de potencia pliométrica que fatiga de forma acelerada las fibras de contracción rápida en los glúteos.',
    instructions: [
      'Párate con postura estable de sentadilla.',
      'Baja de forma ordinaria controladamente.',
      'De la parte inferior, impúlsate con gran explosividad despegando enérgicamente las puntas de tus pies en un salto moderado.',
      'Aterriza de forma elástica doblando de inmediato las rodillas para disipar las fuerzas.'
    ],
    tips: [
      'Amortiguar el contacto es crítico, de las puntas hacia los talones protegiendo articulaciones.',
      'No saltes de forma desordenada incompasiva.',
      'Mantén tu abdomen apretado.'
    ]
  }
];
