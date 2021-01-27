const express = require("express");
const socket = require("socket.io");
var path = require('path');
var mongoManagerClass = require('./../mongo/mongoManager.js').default;
var mongoManager = new mongoManagerClass();

// App setup
const PORT = 3000;
const app = express();
mongoManager.createDb();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static("src/client"));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/views/index.html'));
});

// app.get('/new-game', (req, res) => {
//   res.sendFile(path.resolve(__dirname + '/../client/views/new_game.html'));
// });

// app.get('/game', (req, res) => {
//   res.sendFile(path.resolve(__dirname + '/../client/views/game.html'));
// });

app.get('/service/card', (req, res) => {
  let cardsR = [];
  let copyCards = JSON.parse(JSON.stringify(cards));

  for (let nCards = 15; nCards >= 0; nCards--) {
    let index = Math.floor(Math.random() * nCards+1);
    if(copyCards.length == index) {
      index --;
    }
    let element = copyCards[index];
    cardsR.push(element);
    copyCards.splice(index, 1);
  }
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(cardsR));
});

app.get('/service/random_element', (req, res) => {
  let totalElements = 54;
  let index = Math.floor(Math.random() * totalElements+1);
  let element = cards[index];
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(element));
});


// Socket setup
const io = socket(server);

const activeUsers = new Set();

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("create room", function (data) {
    let collectionName = "games";
    mongoManager.createCollection(collectionName);
    let keepTrying = true;
    while(keepTrying) {
      let max = 1000;
      let min = 500;
      let gameNumber = Math.random() * (max - min) + min;
      let gameName = "game-"+gameNumber;
      mongoManager.query({gameName: gameName}, collectionName, function(err, result) {
        if(!err) {
          if(result.length == 0) {
            keepTrying = false;
          }
        }else {
          keepTrying = false;
          console.log(err);
        }
      });
    }
    

    socket.userId = data;
    activeUsers.add(data);
    console.log("nuevo user: "+data);
    io.emit("new room", gameName);
    io.emit("new user", [...activeUsers]);
  });

  socket.on("join game", function (data) {
    socket.userId = data;
    activeUsers.add(data);
    console.log("nuevo user: "+data);
    io.emit("new user", [...activeUsers]);
  });

  socket.on("disconnect", () => {
    activeUsers.delete(socket.userId);
    io.emit("user disconnected", socket.userId);
  });

  socket.on("chat message", function (data) {
    io.emit("chat message", data);
  });
  
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});

const cards = [{"id":1,"name":"El gallo",
"image":"/images/cards/1.jpg", "descriptions":["El que la cantó a San Pedro"
]},
{"id":2,"name":"El diablo",
"image":"/images/cards/2.jpg", "descriptions":["Pórtate bien cuatito, si no te lleva el coloradito."
]},
{"id":3,"name":"La dama",
"image":"/images/cards/3.jpg", "descriptions":["Puliendo el paso, por toda la calle real."
]},
{"id":4,"name":"El catrín",
"image":"/images/cards/4.jpg", "descriptions":["Don Ferruco en la alameda, su bastón quería tirar. Inspirado en la personalidad de Don Memo (ampliamente conocido por su elegancia y caballerosidad)."
]},
{"id":5,"name":"El paraguas",
"image":"/images/cards/5.jpg", "descriptions":["Para el sol y para el agua."
]},
{"id":6,"name":"La sirena",
"image":"/images/cards/6.jpg", "descriptions":["Medio cuerpo de señora se divisa en altamar."
]},
{"id":7,"name":"La escalera",
"image":"/images/cards/7.jpg", "descriptions":["Súbeme paso a pasito, no quieras pegar brinquitos."
]},
{"id":8,"name":"La botella",
"image":"/images/cards/8.jpg", "descriptions":["La herramienta del borracho."
]},
{"id":9,"name":"El barril",
"image":"/images/cards/9.jpg", "descriptions":["Tanto bebió el albañil, que quedó como barril."
]},
{"id":10,"name":"El árbol",
"image":"/images/cards/10.jpg", "descriptions":["El que a buen árbol se arrima buena sombra le cobija.",
"El árbol grueso de El Tule"
]},
{"id":11,"name":"El melón",
"image":"/images/cards/11.jpg", "descriptions":["Me lo das o me lo quitas.",
"El melón de tierra fría"
]},
{"id":12,"name":"El valiente",
"image":"/images/cards/12.jpg", "descriptions":["Por qué le corres cobarde, trayendo tan buen puñal.",
"El valiente y su tranchete"
]},
{"id":13,"name":"El gorrito",
"image":"/images/cards/13.jpg", "descriptions":["El gorrito que me ponen",
"Ponle su gorrito al nene, no se nos vaya a resfriar."
]},
{"id":14,"name":"La muerte",
"image":"/images/cards/14.jpg", "descriptions":["La muerte siriqui siaca.",
"La muerte tilica y flaca."
]},
{"id":15,"name":"La pera",
"image":"/images/cards/15.jpg", "descriptions":["El que espera desespera."
]},
{"id":16,"name":"La bandera",
"image":"/images/cards/16.jpg", "descriptions":["Verde blanco y colorado, la bandera del soldado."
]},
{"id":17,"name":"El bandolón",
"image":"/images/cards/17.jpg", "descriptions":["Tocando su bandolón, está el mariachi Simón."
]},
{"id":18,"name":"El violoncello",
"image":"/images/cards/18.jpg", "descriptions":["Creciendo se fue hasta el cielo, y como no fue violín, tuvo que ser violonchelo."
]},
{"id":19,"name":"La garza",
"image":"/images/cards/19.jpg", "descriptions":["Al otro lado del río tengo mi banco de arena, donde se sienta mi chata pico de garza morena."
]},
{"id":20,"name":"El pájaro",
"image":"/images/cards/20.jpg", "descriptions":["Tu me traes a puros brincos, como pájaro en la rama.",
"El pájaro chirlo mirlo."
]},
{"id":21,"name":"La mano",
"image":"/images/cards/21.jpg", "descriptions":["La mano de un criminal.",
"La mano de un escribano."
]},
{"id":22,"name":"La bota",
"image":"/images/cards/22.jpg", "descriptions":["Una bota igual que l'otra.",
"Bótala si no te sirve."
]},
{"id":23,"name":"La luna",
"image":"/images/cards/23.jpg", "descriptions":["El farol de los enamorados.",
"Ya viene la linda luna rodeada de mil estrellas pa'lumbrar a mi morena cuando salga a su ventana."
]},
{"id":24,"name":"El cotorro",
"image":"/images/cards/24.jpg", "descriptions":["Cotorro cotorro saca la pata, y empiézame a platicar."
]},
{"id":25,"name":"El borracho",
"image":"/images/cards/25.jpg", "descriptions":["¡Ah! qué borracho tan necio, ya no lo puedo aguantar."
]},
{"id":26,"name":"El negrito",
"image":"/images/cards/26.jpg", "descriptions":["El que se comió el azúcar."
]},
{"id":27,"name":"El corazón",
"image":"/images/cards/27.jpg", "descriptions":["No me extrañes corazón, que regresó en el camión.",
"El corazón de una ingrata."
]},
{"id":28,"name":"La sandía",
"image":"/images/cards/28.jpg", "descriptions":["La barriga que Juan tenía, era empacho de sandía.",
"La sandía y su rebanada"
]},
{"id":29,"name":"El tambor",
"image":"/images/cards/29.jpg", "descriptions":["No te arrugues cuero viejo, que te quiero pa'tambor.",
"Tambor o caja de guerra"
]},
{"id":30,"name":"El camarón",
"image":"/images/cards/30.jpg", "descriptions":["Camarón que se duerme, se lo lleva la corriente."
]},
{"id":31,"name":"Las jaras",
"image":"/images/cards/31.jpg", "descriptions":["Las jaras del indio Adán, donde pegan, dan."
]},
{"id":32,"name":"El músico",
"image":"/images/cards/32.jpg", "descriptions":["El músico trompa de hule, ya no me quiere tocar."
]},
{"id":33,"name":"La araña",
"image":"/images/cards/33.jpg", "descriptions":["Atarántamela a palos, no me la dejes llegar."
]},
{"id":34,"name":"El soldado",
"image":"/images/cards/34.jpg", "descriptions":["Uno, dos y tres el soldado p'al cuartel."
]},
{"id":35,"name":"La estrella",
"image":"/images/cards/35.jpg", "descriptions":["La guía de los marineros.",
"La estrella polar del norte"
]},
{"id":36,"name":"El cazo",
"image":"/images/cards/36.jpg", "descriptions":["El caso que te hago es poco."
]},
{"id":37,"name":"El mundo",
"image":"/images/cards/37.jpg", "descriptions":["Este mundo es una bola, y nosotros un balón.",
"Cristóbal cargando el mundo"
]},
{"id":38,"name":"El apache",
"image":"/images/cards/38.jpg", "descriptions":["¡Ah Chihuahua! cuánto apache con pantalón y huarache."
]},
{"id":39,"name":"El nopal",
"image":"/images/cards/39.jpg", "descriptions":["Al nopal lo van a ver, nomás cuando tiene tunas."
]},
{"id":40,"name":"El alacrán",
"image":"/images/cards/40.jpg", "descriptions":["El que con la cola pica, le dan una paliza."
]},
{"id":41,"name":"La rosa",
"image":"/images/cards/41.jpg", "descriptions":["Rosita, Rosaura, ven que te quiero ahora.",
"Rosa Rosita Rosaura tu palabra es más firme que la d'un notario."
]},
{"id":42,"name":"La calavera",
"image":"/images/cards/42.jpg", "descriptions":["Al pasar por el panteón, me encontré un calaverón."
]},
{"id":43,"name":"La campana",
"image":"/images/cards/43.jpg", "descriptions":["Tú con la campana y yo con tu hermana.",
"La campana de Dolores."
]},
{"id":44,"name":"El cantarito",
"image":"/images/cards/44.jpg", "descriptions":["Tanto va el cántaro al agua, que se quiebra y te moja las enaguas.",
"El cantarito del pulque no se te vaya a quebrar pos lo quiere la patrona pa poderme enamorar."
]},
{"id":45,"name":"El venado",
"image":"/images/cards/45.jpg", "descriptions":["Saltando va buscando, pero no ve nada.",
"El que brinca los peñascos."
]},
{"id":46,"name":"El sol",
"image":"/images/cards/46.jpg", "descriptions":["Solo solo te quedaste, de cobija de los pobres.",
"La cobija de los pobres."
]},
{"id":47,"name":"La corona",
"image":"/images/cards/47.jpg", "descriptions":["El sombrero de los reyes.",
"La corona del imperio"
]},
{"id":48,"name":"La chalupa",
"image":"/images/cards/48.jpg", "descriptions":["Rema rema va Lupita, sentada en su chalupita.",
"La chalupa rema y rema se va para Xochimilco"
]},
{"id":49,"name":"El pino",
"image":"/images/cards/49.jpg", "descriptions":["Fresco y oloroso, en todo tiempo hermoso.",
"El pino de la Alameda siempre verde y siempre hermoso."
]},
{"id":50,"name":"El pescado",
"image":"/images/cards/50.jpg", "descriptions":["El que por la boca muere, aunque mudo fuere.",
"El pez por su boca muere"
]},
{"id":51,"name":"La palma",
"image":"/images/cards/51.jpg", "descriptions":["Palmero sube a la palma y bájame un coco real.",
"La palma real de Colima"
]},
{"id":52,"name":"La maceta",
"image":"/images/cards/52.jpg", "descriptions":["El que nace pa'maceta, no sale del corredor."
]},
{"id":53,"name":"El arpa",
"image":"/images/cards/53.jpg", "descriptions":["Arpa vieja de mi suegra, ya no sirves pa'tocar."
]},
{"id":54,"name":"La rana",
"image":"/images/cards/54.jpg", "descriptions":["Al ver a la verde rana, qué brinco pegó tu hermana.",
"La rana mujer del sapo"
]}
];