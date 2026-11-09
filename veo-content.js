// Local editorial draft. Historical prompt proposals are not execution logs.
export const VEO_ID='veo3-flow';
export const VEO_VERSION='silverado-v1';
export const historicalPrompt="Scene: A silver 2025 Chevrolet Silverado High Country with a matte black Chevrolet emblem drives along a winding snow-covered mountain trail. The truck moves steadily between frosted pine forests and snowy cliffs, leaving faint tire tracks behind.  \n\nAction: The camera performs a wide aerial shot, descending slowly in a diagonal path while following the truck from above. The movement is smooth and cinematic, revealing the vast scale of the winter landscape and the vehicle's path cutting through it.  \n\nCamera: High drone shot, slow descending dolly from rear quarter angle, capturing long shadows and wide scenery.  \n\nLighting: Golden hour with soft sunlight reflecting off the silver body and casting elongated shadows on the snow. Cold ambient tones balance the warmth of the sun.  \n\nMood: Majestic, quiet, and awe-inspiring, highlighting solitude and strength in nature.  \n\nSound: Wind across the valley, distant engine hum, crunching snow echoing faintly.  \n\nMusic: Cinematic ambient score with layered strings and open harmonies, evoking scale and introspection.  \n\nInspired by: Aerial shots from “Planet Earth”, overland vehicle ads, and the cinematic tone of “Into the Wild”.";
export const veoSteps=[
 {title:'Lee la continuidad',body:'Una camioneta, varios planos. Mira el montaje y separa lo que se mantiene de lo que cambia: identidad, luz, recorrido y cámara.'},
 {title:'Fija la identidad',body:'El prompt debe decir qué vehículo estás siguiendo antes de describir el plano. En el chat, Milo pidió mantener la camioneta plateada y cambiar el emblema a negro.'},
 {title:'Cambia el plano',body:'Compara una toma lateral con una aérea del mismo archivo de proyecto. Cambia el punto de vista sin dar por resuelta la continuidad del vehículo.'},
 {title:'Revisa antes de montar',body:'Una instrucción repetida no garantiza un detalle consistente. Revisa el objeto, el movimiento y las uniones antes de elegir qué fragmentos montar.'}
];
export const veoCase={id:VEO_ID,title:'Google Flow',category:'Proyecto gratuito',subtitle:'Silverado: continuidad entre planos.',learning:'Fijar identidad, variar la cámara y revisar la continuidad.',description:'Primera lección local basada en Silverado, realizado en Google Flow según confirmó Milo. Los archivos se recuperaron y cotejaron con su reel. Cuatro pasos, comparación de tomas y una propuesta de prompt histórica, sin atribuir parámetros no registrados.',referenceUrl:'https://www.instagram.com/yutro_ia/reel/DOuqdQyjV-3/',type:'free',art:'tablet',editorialStatus:'local-draft',lessonVersion:VEO_VERSION,steps:veoSteps,practice:{
 expected:'Una ficha de continuidad y una selección justificada de dos planos. Si generas una prueba propia, registra los ajustes que realmente uses; no se garantiza replicar el montaje.',
 requirements:'Para analizar: estos videos y la hoja de continuidad. Para generar: acceso propio a Google Flow u otra herramienta que permita video desde texto y un editor. LAB no genera videos ni pide credenciales. Puedes completar la comparación sin gastar créditos.',
 prompt:historicalPrompt,
 why:'El texto separa identidad, acción, cámara y luz. Repetir una descripción concreta ayuda a expresar la intención; la continuidad se confirma comparando resultados, no solo repitiendo palabras.',
 variables:'En tu práctica conserva sujeto, color y entorno. Cambia solo el plano o movimiento de cámara. Usa un vehículo u objeto propio o sin marca para tu ejercicio; no añadas ajustes históricos que no están documentados.',
 errors:'Si cambian parrilla, ruedas, ventanas o emblema, registra la diferencia y revisa la selección. Si hay un salto de movimiento entre planos, cambia el corte o simplifica la acción. Estos son criterios nuevos de práctica, no un registro de correcciones realizadas por Milo.'
}};
export const veoTasks=[
 ['Mira el montaje sin sonido. Identifica el frontal, el lateral, el riachuelo, el aéreo y la llegada a la cabaña.','Anota tres rasgos que deberían permanecer: color, silueta y detalles del vehículo. Añade una referencia de luz y entorno.','Elige dos planos y escribe qué diferencia aceptas y cuál rompe la continuidad. No confundas mantener una idea con conservar cada detalle.'],
 ['Lee la propuesta de prompt guardada en el chat. Separa identidad, acción, cámara y luz en la hoja de trabajo.','Subraya lo que no debería cambiar entre tus planos. Para una práctica propia, sustituye la marca por un objeto o vehículo que puedas utilizar.','Copia el texto como punto de partida editorial. Registra tu herramienta y ajustes reales: aquí no hay prueba de que ese texto exacto generara un archivo concreto.'],
 ['Reproduce los dos clips. Comprueba color, proporciones, ruedas, ventanas y relación con el paisaje al pasar de lateral a aéreo.','Para tu ejercicio, conserva la descripción de identidad y cambia una sola decisión de cámara. Escribe antes qué esperas mantener.','Si decides generar, compara principio, mitad y final de cada toma. Registra lo que ocurrió y conserva solo los fragmentos que sostienen tu intención.'],
 ['Revisa el emblema y la parrilla en el clip de acercamiento. El chat pidió un emblema negro; no supongas que todas las tomas lo respetan.','Elige dos fragmentos, comprueba entrada y salida del movimiento y arma una prueba breve. El montaje v4 sirve como evidencia, no como receta de edición reconstruida.','Compara sin música, explica un descarte y guarda tu ficha. Usa únicamente audio propio o autorizado si después sonorizas tu ejercicio.']
];
export const veoWhy=[
 'El espectador reconoce un mismo sujeto por varios rasgos a la vez. Un color repetido ayuda, pero no oculta una parrilla o una silueta que cambia.',
 'Separar lo fijo de lo variable evita reescribir todo cada vez. El pedido de emblema negro del chat es una decisión concreta que se puede contrastar visualmente.',
 'Variar el encuadre cambia qué rasgos puedes comprobar. Una toma aérea puede mantener el contexto y aun así ocultar un detalle que falla de cerca.',
 'La selección y el corte forman parte del resultado. Revisar sin sonido evita que la música disimule un salto visual.'
];
export const veoCorrections=[
 'Si no puedes decidir qué cambió, compara un rasgo por pasada: primero silueta, después color y finalmente detalles. Escribe lo que observas.',
 'Si la instrucción es ambigua, concreta sujeto y atributos antes de agregar cámara. No presentes el nombre del modelo, seed o duración como histórico sin registro.',
 'Si cambia demasiado el vehículo, vuelve a fijar su descripción y reduce las variables de la siguiente prueba. No hay una fórmula documentada que garantice continuidad perfecta.',
 'Si el emblema o la geometría falla, no lo ocultes con una conclusión general de consistencia. Descarta, recorta si es viable o plantea una nueva prueba y vuelve a revisar.'
];

