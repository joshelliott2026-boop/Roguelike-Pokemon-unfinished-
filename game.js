//* =============== META SAVE =============== */
const meta = JSON.parse(localStorage.getItem("meta")) || {
  skillPoints: 0,
  unlockedBuffs: [],
  seenPokemon: [],
  shinies: [],
  signaturePokemon: null,
  starterChoices: null,
  currentRun: null
};

function saveMeta() {
  localStorage.setItem("meta", JSON.stringify(meta));
}

function resetSave() {
  if (!confirm("Reset all progress?")) return;
  localStorage.clear();
  location.reload();
}

const pokedex = {
  Bulbasaur: { hp: 100, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    moves: [
      { name: "Vine Whip", dmg: 14 },
      { name: "Razor Leaf", dmg: 18 },
      { name: "Sleep Powder", effect: "sleep" },
      { name: "Leech Seed", effect: "leech" }
    ]
  },
  Ivysaur: { hp: 120, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    moves: [
      { name: "Vine Whip", dmg: 18 },
      { name: "Razor Leaf", dmg: 22 },
      { name: "Sleep Powder", effect: "sleep" },
      { name: "Leech Seed", effect: "leech" }
    ]
  },
  Venusaur: { hp: 160, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    moves: [
      { name: "Solar Beam", dmg: 42 },
      { name: "Razor Leaf", dmg: 26 },
      { name: "Sleep Powder", effect: "sleep" },
      { name: "Leech Seed", effect: "leech" }
    ]
  },
  Charmander: { hp: 95, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    moves: [
      { name: "Flamethrower", dmg: 28 },
      { name: "Fire Spin", dmg: 24 },
      { name: "Growl", effect: "boostEnemyDown" },
      { name: "Smokescreen", effect: "accuracyDown" }
    ]
  },
  Charmeleon: { hp: 120, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
    moves: [
      { name: "Flamethrower", dmg: 32 },
      { name: "Fire Spin", dmg: 28 },
      { name: "Growl", effect: "boostEnemyDown" },
      { name: "Smokescreen", effect: "accuracyDown" }
    ]
  },
  Charizard: { hp: 170, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    moves: [
      { name: "Fire Blast", dmg: 38 },
      { name: "Wing Attack", dmg: 30 },
      { name: "Slash", dmg: 26 },
      { name: "Smokescreen", effect: "accuracyDown" }
    ]
  },
  Squirtle: { hp: 100, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    moves: [
      { name: "Hydro Pump", dmg: 32 },
      { name: "Water Gun", dmg: 20 },
      { name: "Tail Whip", effect: "boostEnemyDown" },
      { name: "Withdraw", effect: "defenseUp" }
    ]
  },
  Wartortle: { hp: 130, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
    moves: [
      { name: "Hydro Pump", dmg: 36 },
      { name: "Water Gun", dmg: 24 },
      { name: "Tail Whip", effect: "boostEnemyDown" },
      { name: "Withdraw", effect: "defenseUp" }
    ]
  },
  Blastoise: { hp: 160, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
    moves: [
      { name: "Hydro Pump", dmg: 42 },
      { name: "Water Gun", dmg: 30 },
      { name: "Bite", dmg: 20 },
      { name: "Skull Bash", dmg: 26 }
    ]
  },
  Caterpie: { hp: 70, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
    moves: [
      { name: "Tackle", dmg: 8 },
      { name: "String Shot", effect: "speedDown" },
      { name: "Bug Bite", dmg: 14 },
      { name: "Harden", effect: "defenseUp" }
    ]
  },
  Metapod: { hp: 75, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
    moves: [
      { name: "Tackle", dmg: 10 },
      { name: "Harden", effect: "defenseUp" },
      { name: "Bug Bite", dmg: 18 },
      { name: "String Shot", effect: "speedDown" }
    ]
  },
  Butterfree: { hp: 130, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
    moves: [
      { name: "Psychic", dmg: 30 },
      { name: "Gust", dmg: 18 },
      { name: "Sleep Powder", effect: "sleep" },
      { name: "Stun Spore", effect: "paralyze" }
    ]
  },
  Weedle: { hp: 70, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png",
    moves: [
      { name: "Poison Sting", dmg: 8 },
      { name: "String Shot", effect: "speedDown" },
      { name: "Bug Bite", dmg: 14 },
      { name: "Harden", effect: "defenseUp" }
    ]
  },
  Kakuna: { hp: 75, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png",
    moves: [
      { name: "Poison Sting", dmg: 10 },
      { name: "Harden", effect: "defenseUp" },
      { name: "Bug Bite", dmg: 16 },
      { name: "String Shot", effect: "speedDown" }
    ]
  },
  Beedrill: { hp: 130, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png",
    moves: [
      { name: "Twineedle", dmg: 26 },
      { name: "Fury Attack", dmg: 24 },
      { name: "Poison Sting", dmg: 14 },
      { name: "Bite", dmg: 16 }
    ]
  },
  Pidgey: { hp: 80, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",
    moves: [
      { name: "Gust", dmg: 14 },
      { name: "Quick Attack", dmg: 12 },
      { name: "Sand Attack", effect: "accuracyDown" },
      { name: "Wing Attack", dmg: 22 }
    ]
  },
  Pidgeotto: { hp: 110, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png",
    moves: [
      { name: "Wing Attack", dmg: 24 },
      { name: "Quick Attack", dmg: 14 },
      { name: "Sand Attack", effect: "accuracyDown" },
      { name: "Gust", dmg: 16 }
    ]
  },
  Pidgeot: { hp: 140, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png",

  }
  Rattata: { hp: 70, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
    moves: [
      { name: "Tackle", dmg: 8 },
      { name: "Bite", dmg: 12 },
      { name: "Quick Attack", dmg: 10 },
      { name: "Tail Whip", effect: "boostEnemyDown" }
    ]
  },
Raticate: { hp: 110, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png",
    moves: [
      { name: "Hyper Fang", dmg: 22 },
      { name: "Bite", dmg: 16 },
      { name: "Quick Attack", dmg: 12 },
      { name: "Tail Whip", effect: "boostEnemyDown" }
    ]
  },
Spearow: { hp: 75, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png",
    moves: [
      { name: "Peck", dmg: 12 },
      { name: "Leer", effect: "boostEnemyDown" },
      { name: "Quick Attack", dmg: 10 },
      { name: "Fury Attack", dmg: 16 }
    ]
  },
Fearow: { hp: 120, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png",
    moves: [
      { name: "Drill Peck", dmg: 26 },
      { name: "Agility", effect: "speedUp" },
      { name: "Fury Attack", dmg: 22 },
      { name: "Quick Attack", dmg: 14 }
    ]
  },
Ekans: { hp: 80, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png",
    moves: [
      { name: "Bite", dmg: 14 },
      { name: "Poison Sting", dmg: 8 },
      { name: "Wrap", dmg: 10 },
      { name: "Glare", effect: "paralyze" }
    ]
  },
Arbok: { hp: 130, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png",
    moves: [
      { name: "Bite", dmg: 20 },
      { name: "Acid", dmg: 18 },
      { name: "Glare", effect: "paralyze" },
      { name: "Wrap", dmg: 12 }
    ]
  },
Pikachu: { hp: 90, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    moves: [
      { name: "Thunder Shock", dmg: 14 },
      { name: "Quick Attack", dmg: 10 },
      { name: "Thunder Wave", effect: "paralyze" },
      { name: "Electro Ball", dmg: 20 }
    ]
  },
Raichu: { hp: 130, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png",
    moves: [
      { name: "Thunderbolt", dmg: 28 },
      { name: "Quick Attack", dmg: 14 },
      { name: "Thunder Wave", effect: "paralyze" },
      { name: "Volt Tackle", dmg: 32 }
    ]
  },
Sandshrew: { hp: 80, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/27.png",
    moves: [
      { name: "Scratch", dmg: 10 },
      { name: "Sand Attack", effect: "accuracyDown" },
      { name: "Rollout", dmg: 12 },
      { name: "Slash", dmg: 14 }
    ]
  },
Sandslash: { hp: 130, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/28.png",
    moves: [
      { name: "Slash", dmg: 24 },
      { name: "Rollout", dmg: 16 },
      { name: "Sand Attack", effect: "accuracyDown" },
      { name: "Earthquake", dmg: 28 }
    ]
  },
NidoranF: { hp: 80, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png",
    moves: [
      { name: "Peck", dmg: 10 },
      { name: "Scratch", dmg: 12 },
      { name: "Double Kick", dmg: 14 },
      { name: "Tail Whip", effect: "boostEnemyDown" }
    ]
  },
Nidorina: { hp: 110, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/30.png",
    moves: [
      { name: "Double Kick", dmg: 18 },
      { name: "Bite", dmg: 16 },
      { name: "Scratch", dmg: 14 },
      { name: "Tail Whip", effect: "boostEnemyDown" }
    ]
  },
Nidoqueen: { hp: 160, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png",
    moves: [
      { name: "Earthquake", dmg: 28 },
      { name: "Body Slam", dmg: 20 },
      { name: "Double Kick", dmg: 22 },
      { name: "Tail Whip", effect: "boostEnemyDown" }
    ]
  },
NidoranM: { hp: 80, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/32.png",
    moves: [
      { name: "Peck", dmg: 10 },
      { name: "Scratch", dmg: 12 },
      { name: "Double Kick", dmg: 14 },
      { name: "Tail Whip", effect: "boostEnemyDown" }
    ]
  },
Nidorino: { hp: 110, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/33.png",
    moves: [
      { name: "Double Kick", dmg: 18 },
      { name: "Horn Attack", dmg: 16 },
      { name: "Scratch", dmg: 14 },
      { name: "Tail Whip", effect: "boostEnemyDown" }
    ]
  },
Nidoking: { hp: 160, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/34.png",
    moves: [
      { name: "Earthquake", dmg: 28 },
      { name: "Horn Attack", dmg: 22 },
      { name: "Double Kick", dmg: 22 },
      { name: "Tail Whip", effect: "boostEnemyDown" }
    ]
  },
Clefairy: { hp: 100, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png",
    moves: [
      { name: "Pound", dmg: 12 },
      { name: "Sing", effect: "sleep" },
      { name: "Double Slap", dmg: 14 },
      { name: "Defense Curl", effect: "defenseUp" }
    ]
  },
Clefable: { hp: 140, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/36.png",
    moves: [
      { name: "Pound", dmg: 16 },
      { name: "Double Slap", dmg: 18 },
      { name: "Sing", effect: "sleep" },
      { name: "Defense Curl", effect: "defenseUp" }
    ]
  },
Vulpix: { hp: 80, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png",
    moves: [
      { name: "Ember", dmg: 14 },
      { name: "Tail Whip", effect: "boostEnemyDown" },
      { name: "Quick Attack", dmg: 10 },
      { name: "Roar", effect: "skipNext" }
    ]
  },
Ninetales: { hp: 130, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png",
    moves: [
      { name: "Flamethrower", dmg: 28 },
      { name: "Confuse Ray", effect: "confuse" },
      { name: "Quick Attack", dmg: 14 },
      { name: "Roar", effect: "skipNext" }
    ]
  },
Jigglypuff: { hp: 100, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png",
    moves: [
      { name: "Pound", dmg: 12 },
      { name: "Sing", effect: "sleep" },
      { name: "Double Slap", dmg: 14 },
      { name: "Defense Curl", effect: "defenseUp" }
    ]
  },
Wigglytuff: { hp: 140, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/40.png",
    moves: [
      { name: "Pound", dmg: 16 },
      { name: "Double Slap", dmg: 18 },
      { name: "Sing", effect: "sleep" },
      { name: "Defense Curl", effect: "defenseUp" }
    ]
  },
Zubat: { hp: 60, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/41.png",
    moves: [
      { name: "Leech Life", dmg: 10 },
      { name: "Bite", dmg: 12 },
      { name: "Supersonic", effect: "confuse" },
      { name: "Wing Attack", dmg: 18 }
    ]
  },
Golbat: { hp: 120, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/42.png",
    moves: [
      { name: "Bite", dmg: 20 },
      { name: "Wing Attack", dmg: 24 },
      { name: "Supersonic", effect: "confuse" },
      { name: "Leech Life", dmg: 12 }
    ]
  },
Oddish: { hp: 80, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/43.png",
    moves: [
      { name: "Acid", dmg: 12 },
      { name: "Absorb", dmg: 10 },
      { name: "Sleep Powder", effect: "sleep" },
      { name: "Stun Spore", effect: "paralyze" }
    ]
  },
Gloom: { hp: 110, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/44.png",
    moves: [
      { name: "Acid", dmg: 16 },
      { name: "Razor Leaf", dmg: 20 },
      { name: "Sleep Powder", effect: "sleep" },
      { name: "Stun Spore", effect: "paralyze" }
    ]
  },
Vileplume: { hp: 130, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/45.png",
    moves: [
      { name: "Petal Dance", dmg: 28 },
      { name: "Razor Leaf", dmg: 24 },
      { name: "Sleep Powder", effect: "sleep" },
      { name: "Stun Spore", effect: "paralyze" }
  ]
},
Paras: { hp: 70, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/46.png",
    moves: [
      { name: "Scratch", dmg: 10 },
      { name: "Stun Spore", effect: "paralyze" },
      { name: "Leech Life", dmg: 12 },
      { name: "Spore", effect: "sleep" }
    ]
  },
Parasect: { hp: 120, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/47.png",
    moves: [
      { name: "Slash", dmg: 22 },
      { name: "Spore", effect: "sleep" },
      { name: "Leech Life", dmg: 14 },
      { name: "Stun Spore", effect: "paralyze" }
    ]
  },
Venonat: { hp: 80, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/48.png",
    moves: [
      { name: "Tackle", dmg: 10 },
      { name: "Confusion", dmg: 14 },
      { name: "Stun Spore", effect: "paralyze" },
      { name: "Leech Life", dmg: 12 }
    ]
  },
Venomoth: { hp: 120, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/49.png",
    moves: [
      { name: "Confusion", dmg: 20 },
      { name: "Gust", dmg: 16 },
      { name: "Stun Spore", effect: "paralyze" },
      { name: "Leech Life", dmg: 14 }
    ]
  },
Diglett: { hp: 60, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png",
    moves: [
      { name: "Scratch", dmg: 10 },
      { name: "Dig", dmg: 18 },
      { name: "Growl", effect: "boostEnemyDown" },
      { name: "Screech", effect: "defenseDown" }
    ]
  },
Dugtrio: { hp: 120, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/51.png",
    moves: [
      { name: "Earthquake", dmg: 28 },
      { name: "Slash", dmg: 24 },
      { name: "Growl", effect: "boostEnemyDown" },
      { name: "Screech", effect: "defenseDown" }
    ]
  },
Meowth: { hp: 70, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png",
    moves: [
      { name: "Scratch", dmg: 10 },
      { name: "Bite", dmg: 12 },
      { name: "Pay Day", dmg: 14 },
      { name: "Growl", effect: "boostEnemyDown" }
    ]
  },
Persian: { hp: 130, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/53.png",
    moves: [
      { name: "Slash", dmg: 24 },
      { name: "Bite", dmg: 20 },
      { name: "Pay Day", dmg: 18 },
      { name: "Growl", effect: "boostEnemyDown" }
    ]
  },
Psyduck: { hp: 100, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png",
    moves: [
      { name: "Water Gun", dmg: 16 },
      { name: "Scratch", dmg: 12 },
      { name: "Confusion", dmg: 18 },
      { name: "Tail Whip", effect: "boostEnemyDown" }
    ]
  },
Golduck: { hp: 140, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/55.png",
    moves: [
      { name: "Hydro Pump", dmg: 28 },
      { name: "Confusion", dmg: 22 },
      { name: "Scratch", dmg: 16 },
      { name: "Tail Whip", effect: "boostEnemyDown" }
    ]
  },
Mankey: { hp: 80, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/56.png",
    moves: [
      { name: "Scratch", dmg: 12 },
      { name: "Low Kick", dmg: 16 },
      { name: "Leer", effect: "boostEnemyDown" },
      { name: "Fury Swipes", dmg: 18 }
    ]
  },
Primeape: { hp: 130, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png",
    moves: [
      { name: "Scratch", dmg: 16 },
      { name: "Low Kick", dmg: 20 },
      { name: "Fury Swipes", dmg: 24 },
      { name: "Leer", effect: "boostEnemyDown" }
    ]
  },
Growlithe: { hp: 90, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png",
    moves: [
      { name: "Bite", dmg: 16 },
      { name: "Ember", dmg: 14 },
      { name: "Roar", effect: "skipNext" },
      { name: "Leer", effect: "boostEnemyDown" }
    ]
  },
Arcanine: { hp: 150, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png",
    moves: [
      { name: "Flamethrower", dmg: 30 },
      { name: "Bite", dmg: 22 },
      { name: "Roar", effect: "skipNext" },
      { name: "Leer", effect: "boostEnemyDown" }
    ]
  },
Poliwag: { hp: 70, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png",
    moves: [
      { name: "Water Gun", dmg: 14 },
      { name: "Hypnosis", effect: "sleep" },
      { name: "Body Slam", dmg: 16 },
      { name: "Mud Shot", dmg: 18 }
    ]
  },
     


const evolutions = {
  Bulbasaur:{level:16,to:"Ivysaur"}, Ivysaur:{level:32,to:"Venusaur"},
  Charmander:{level:16,to:"Charmeleon"}, Charmeleon:{level:36,to:"Charizard"},
  Squirtle:{level:16,to:"Wartortle"}, Wartortle:{level:36,to:"Blastoise"},
  Pikachu:{level:20,to:"Raichu"}
  // ... add remaining evolutions
};

/***********************
 RUN STATE
***********************/
let party = [];
let playerPokemon = null;
let enemyPokemon = null;
let floor = 1;
let stage = 1;

/***********************
 MAIN MENU
***********************/
function showMainMenu() {
  let html = "<h2>Pokémon Roguelike</h2>";

  if (!meta.signaturePokemon) {
    html += `<button onclick="chooseSignature()">Choose Signature Pokémon</button>`;
  } else {
    if (meta.currentRun) html += `<button onclick="resumeRun()">Resume Run</button>`;
    html += `<button onclick="startNewRun()">Start New Run</button>`;
  }

  html += `<button onclick="openSkillTree()">Skill Tree</button>`;
  html += `<button onclick="resetSave()">Reset All Progress</button>`;
  document.getElementById("game").innerHTML = html;
}

const firstStageStarters = ["Bulbasaur","Charmander","Squirtle","Pidgey","Rattata"];

function chooseSignature() {
  if (!meta.starterChoices) {
    meta.starterChoices = shuffle([...firstStageStarters]).slice(0,3);
    saveMeta();
  }

  let html = "<h2>Choose Your Signature Pokémon</h2>";
  meta.starterChoices.forEach(p => {
    html += `<button onclick="setSignature('${p}')">${p}</button>`;
  });
  html += `<br><button onclick="showMainMenu()">Back</button>`;
  document.getElementById("game").innerHTML = html;
}

function setSignature(name) {
  meta.signaturePokemon = name;
  saveMeta();
  startNewRun();
}

function startNewRun() {
  if (!meta.signaturePokemon) return chooseSignature();

  floor = 1;
  stage = 1;
  party = [];

  const base = JSON.parse(JSON.stringify(pokedex[meta.signaturePokemon]));
  base.name = meta.signaturePokemon;
  base.level = 5;
  base.xp = 0;
  base.maxHp = base.hp;
  base.currentHp = base.maxHp;

  party.push(base);
  playerPokemon = base;

  meta.currentRun = { floor, stage, party };
  saveMeta();

  nextStage();
}

/***********************
 RESUME RUN
***********************/
function resumeRun() {
  const run = meta.currentRun;
  if (!run) return startNewRun();
  floor = run.floor;
  stage = run.stage;
  party = run.party;
  playerPokemon = party[0];
  nextStage();
}

/***********************
 FLOOR / STAGE
***********************/
function nextStage() {
  if (stage > 10) {
    stage = 1;
    floor++;
  }

  meta.currentRun = { floor, stage, party };
  saveMeta();

  if (stage === 5) startTrainerBattle();
  else if (stage === 10) startBossBattle();
  else startWildBattle();

  stage++;
}

function getEnemyLevel() {
  return 3 + floor * 3 + Math.floor(Math.random() * 3);
}

function startWildBattle() {
  const pool = Object.keys(pokedex);
  startBattle(createEnemy(pool[Math.floor(Math.random()*pool.length)], true));
}

function startTrainerBattle() {
  startBattle(createEnemy("Pidgey", false));
}

function startBossBattle() {
  startBattle(createEnemy("Charmeleon", false));
}

function createEnemy(name, shinyAllowed) {
  const e = JSON.parse(JSON.stringify(pokedex[name]));
  e.name = name;
  e.level = getEnemyLevel();
  e.maxHp = e.hp + e.level * 5;
  e.currentHp = e.maxHp;
  e.isShiny = shinyAllowed && Math.random() < 1/160;
  if (e.isShiny) e.sprite = e.sprite.replace("pokemon/","pokemon/shiny/");
  return e;
}

function startBattle(enemy) {
  enemyPokemon = enemy;

  // Show battle screen
  document.getElementById("game").style.display = "none";
  document.getElementById("battle").style.display = "block";

  updateBattleUI();
  showBattleOptions(); // Ensure fight button is added
}

function updateBattleUI() {
  document.getElementById("playerSprite").style.backgroundImage = `url(${playerPokemon.sprite})`;
  document.getElementById("enemySprite").style.backgroundImage = `url(${enemyPokemon.sprite})`;

  document.getElementById("playerHp").style.width =
    `${(playerPokemon.currentHp/playerPokemon.maxHp)*100}%`;
  document.getElementById("enemyHp").style.width =
    `${(enemyPokemon.currentHp/enemyPokemon.maxHp)*100}%`;

  document.getElementById("battleTitle").innerText =
    `Floor ${floor} – Stage ${stage-1} – ${enemyPokemon.name} Lv ${enemyPokemon.level}`;
}

function showBattleOptions() {
  const div = document.getElementById("moveButtons");
  div.innerHTML = ""; // Clear previous buttons

  // Always add Fight button
  const fightBtn = document.createElement("button");
  fightBtn.innerText = "Fight";
  fightBtn.onclick = showMoves;
  div.appendChild(fightBtn);

  // Always add Exit button
  const exitBtn = document.createElement("button");
  exitBtn.innerText = "Exit";
  exitBtn.onclick = exitRun;
  div.appendChild(exitBtn);
}

function showMoves() {
  const div = document.getElementById("moveButtons");
  div.innerHTML = ""; // Clear options

  playerPokemon.moves.forEach(m => {
    const b = document.createElement("button");
    b.innerText = m.name;
    b.onclick = () => useMove(m);
    div.appendChild(b);
  });

  // Add back button to return to fight/exit options
  const backBtn = document.createElement("button");
  backBtn.innerText = "Back";
  backBtn.onclick = showBattleOptions;
  div.appendChild(backBtn);
}


function useMove(move) {
  enemyPokemon.currentHp -= move.dmg;
  if (enemyPokemon.currentHp <= 0) {
    winBattle();
    return;
  }
  enemyTurn();
  updateBattleUI();
}

function enemyTurn() {
  const m = enemyPokemon.moves[Math.floor(Math.random()*enemyPokemon.moves.length)];
  playerPokemon.currentHp -= m.dmg;
  if (playerPokemon.currentHp <= 0) endRun();
}

function winBattle() {
  gainXP(playerPokemon, enemyPokemon.level*10);
  endBattle();
}

function gainXP(p, amount) {
  p.xp += amount;
  if (p.xp >= p.level*20) {
    p.xp = 0;
    p.level++;
    p.maxHp += 10;
    p.currentHp = p.maxHp;
    checkEvolution(p);
  }
}

function checkEvolution(p) {
  const evo = evolutions[p.name];
  if (evo && p.level >= evo.level) {
    const d = pokedex[evo.to];
    p.name = evo.to;
    p.sprite = d.sprite;
    p.moves = d.moves;
    p.maxHp = d.hp + p.level*5;
    p.currentHp = p.maxHp;
    alert(`${p.name} evolved!`);
  }
}

function endBattle() {
  meta.currentRun = { floor, stage, party };
  saveMeta();
  setTimeout(() => {
    document.getElementById("battle").style.display = "none";
    document.getElementById("game").style.display = "block";
    nextStage();
  }, 500);
}

function endRun() {
  document.getElementById("battle").style.display = "none";
  document.getElementById("game").style.display = "block";
  meta.currentRun = null;
  saveMeta();
  showMainMenu();
}

function exitRun() {
  document.getElementById("battle").style.display = "none";
  document.getElementById("game").style.display = "block";
  meta.currentRun = { floor, stage, party };
  saveMeta();
  showMainMenu();
}

function openSkillTree() {
  let html = "<h2>Skill Tree</h2>";
  html += `<p>Skill Points: ${meta.skillPoints}</p>`;
  html += "<ul>";
  const buffs = ["Lightning Rod","Early Bird","Leftovers"];
  buffs.forEach(b => {
    html += `<li>${b} <button onclick="unlockBuff('${b}')">Unlock</button></li>`;
  });
  html += "</ul>";
  html += `<button onclick="showMainMenu()">Back</button>`;
  document.getElementById("game").innerHTML = html;
}

function unlockBuff(buff) {
  if (meta.skillPoints <= 0) { alert("Not enough skill points!"); return; }
  if (meta.unlockedBuffs.includes(buff)) { alert("Already unlocked!"); return; }
  meta.skillPoints--;
  meta.unlockedBuffs.push(buff);
  saveMeta();
  openSkillTree();
}

function shuffle(arr) {
  for (let i=arr.length-1;i>0;i--) {
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

showMainMenu();
