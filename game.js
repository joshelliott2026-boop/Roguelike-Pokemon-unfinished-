const typeChart = {
  Fire: { weak: ['Water', 'Ground', 'Rock'], resist: ['Fire', 'Grass', 'Ice', 'Bug', 'Steel', 'Fairy'] },
  Water: { weak: ['Electric', 'Grass'], resist: ['Fire', 'Water', 'Ice', 'Steel'] },
  Grass: { weak: ['Fire', 'Ice', 'Poison', 'Flying', 'Bug'], resist: ['Water', 'Electric', 'Grass', 'Ground'] },
  Electric: { weak: ['Ground'], resist: ['Electric', 'Flying', 'Steel'], immune: [] },
  Ground: { weak: ['Water', 'Grass', 'Ice'], resist: ['Poison', 'Rock'], immune: ['Electric'] },
  Rock: { weak: ['Water', 'Grass', 'Fighting', 'Ground', 'Steel'], resist: ['Normal', 'Fire', 'Poison', 'Flying'] },
  Bug: { weak: ['Fire', 'Flying', 'Rock'], resist: ['Grass', 'Fighting', 'Ground'] },
  Normal: { weak: ['Fighting'], resist: [], immune: ['Ghost'] },
  Flying: { weak: ['Electric', 'Ice', 'Rock'], resist: ['Grass', 'Fighting', 'Bug'], immune: ['Ground'] },
  Psychic: { weak: ['Bug', 'Ghost', 'Dark'], resist: ['Fighting', 'Psychic'] },
};

const starterPool = [
  { id: 1, name: 'Bulbasaur', type: 'Grass', hp: 45, attack: 49, defense: 49, speed: 45, color: '#78C850', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
  { id: 4, name: 'Charmander', type: 'Fire', hp: 39, attack: 52, defense: 43, speed: 65, color: '#F08030', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
  { id: 7, name: 'Squirtle', type: 'Water', hp: 44, attack: 48, defense: 65, speed: 43, color: '#6890F0', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
  { id: 25, name: 'Pikachu', type: 'Electric', hp: 35, attack: 55, defense: 40, speed: 90, color: '#F8D030', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
  { id: 133, name: 'Eevee', type: 'Normal', hp: 55, attack: 55, defense: 50, speed: 55, color: '#A8A878', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png' },
  { id: 104, name: 'Cubone', type: 'Ground', hp: 50, attack: 50, defense: 95, speed: 35, color: '#E0C068', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/104.png' },
  { id: 54, name: 'Psyduck', type: 'Water', hp: 50, attack: 52, defense: 48, speed: 55, color: '#6890F0', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png' },
  { id: 37, name: 'Vulpix', type: 'Fire', hp: 38, attack: 41, defense: 40, speed: 65, color: '#F08030', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png' },
];

const skillTree = [
  { id: 'lightning_rod', name: 'Lightning Rod', description: 'Immunity to Electric moves', cost: 3, type: 'ability' },
  { id: 'early_bird', name: 'Early Bird', description: 'Wake from sleep faster', cost: 2, type: 'ability' },
  { id: 'leftovers', name: 'Leftovers', description: 'Start with Leftovers item', cost: 4, type: 'item' },
  { id: 'quick_claw', name: 'Quick Claw', description: 'Start with Quick Claw', cost: 3, type: 'item' },
  { id: 'shiny_boost', name: 'Shiny Hunter', description: 'Better shiny rates', cost: 5, type: 'passive' },
  { id: 'hp_boost', name: 'Vitality', description: '+10% max HP', cost: 2, type: 'stat' },
];

const battleSequence = [
  { npc: 'Youngster Joey', pokemon: [{ id: 19, name: 'Rattata', type: 'Normal', hp: 30, attack: 35, defense: 25, speed: 40, color: '#A8A878', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png' }] },
  { npc: 'Bug Catcher', pokemon: [{ id: 10, name: 'Caterpie', type: 'Bug', hp: 28, attack: 30, defense: 25, speed: 30, color: '#A8B820', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png' }, { id: 13, name: 'Weedle', type: 'Bug', hp: 28, attack: 30, defense: 25, speed: 30, color: '#A8B820', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png' }] },
  { npc: 'Lass', pokemon: [{ id: 16, name: 'Pidgey', type: 'Flying', hp: 35, attack: 38, defense: 30, speed: 45, color: '#A890F0', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png' }] },
  { npc: 'Brock', pokemon: [{ id: 74, name: 'Geodude', type: 'Rock', hp: 40, attack: 55, defense: 65, speed: 25, color: '#B8A038', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png' }, { id: 95, name: 'Onix', type: 'Rock', hp: 45, attack: 60, defense: 85, speed: 30, color: '#B8A038', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png' }] },
  { npc: 'Misty', pokemon: [{ id: 120, name: 'Staryu', type: 'Water', hp: 42, attack: 45, defense: 50, speed: 60, color: '#6890F0', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/120.png' }, { id: 121, name: 'Starmie', type: 'Water', hp: 60, attack: 75, defense: 65, speed: 85, color: '#6890F0', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/121.png' }] },
];

let gameState = 'menu';
let signaturePokemon = null;
let playerTeam = [];
let enemyTeam = [];
let currentBattle = 0;
let skillPoints = 0;
let caughtPokemon = [];
let unlockedSkills = [];
let battleLog = [];
let animating = false;

function getTypeEffectiveness(attackerType, defenderType) {
  const chart = typeChart[attackerType];
  if (!chart) return 1;
  
  if (chart.immune && chart.immune.includes(defenderType)) return 0;
  if (chart.weak && chart.weak.includes(defenderType)) return 0.5;
  if (chart.resist && chart.resist.includes(defenderType)) return 2;
  return 1;
}

function getHPColor(currentHp, maxHp) {
  const ratio = currentHp / maxHp;
  if (ratio > 0.5) return '#22c55e';
  if (ratio > 0.2) return '#eab308';
  return '#ef4444';
}

function startBattle(battleIndex) {
  const battle = battleSequence[battleIndex];
  const team = [{ ...signaturePokemon, currentHp: signaturePokemon.hp, maxHp: signaturePokemon.hp }];
  
  if (unlockedSkills.includes('hp_boost')) {
    team[0].maxHp = Math.floor(team[0].maxHp * 1.1);
    team[0].currentHp = team[0].maxHp;
  }

  const enemies = battle.pokemon.map(p => ({
    ...p,
    currentHp: p.hp,
    maxHp: p.hp,
    uniqueId: Math.random()
  }));

  playerTeam = team;
  enemyTeam = enemies;
  battleLog = [`${battle.npc} wants to battle!`];
  gameState = 'battle';
  render();
}

function attack() {
  if (animating || playerTeam[0].currentHp <= 0 || enemyTeam[0].currentHp <= 0) return;

  animating = true;
  
  const enemyDisplay = document.getElementById('enemy-display');
  enemyDisplay.classList.add('shaking');
  
  const flashDiv = document.createElement('div');
  flashDiv.className = 'flash-effect';
  document.body.appendChild(flashDiv);

  const player = playerTeam[0];
  const enemy = enemyTeam[0];
  
  const effectiveness = getTypeEffectiveness(player.type, enemy.type);
  const baseDamage = Math.max(5, Math.floor(player.attack * 0.8 - enemy.defense * 0.3));
  const damage = Math.floor(baseDamage * effectiveness);
  const newEnemyHp = Math.max(0, enemy.currentHp - damage);

  setTimeout(() => {
    flashDiv.remove();
    enemyDisplay.classList.remove('shaking');
    
    enemyTeam[0].currentHp = newEnemyHp;
    
    let effectivenessText = '';
    if (effectiveness === 2) effectivenessText = " It's super effective!";
    if (effectiveness === 0.5) effectivenessText = " It's not very effective...";
    if (effectiveness === 0) effectivenessText = " It had no effect...";
    
    battleLog.push(`${player.name} dealt ${damage} damage!${effectivenessText}`);
    render();

    if (newEnemyHp <= 0) {
      setTimeout(() => {
        battleLog.push(`${enemy.name} fainted!`);
        
        const isShiny = Math.random() < 1/160;
        if (isShiny) {
          battleLog.push(`✨ Shiny ${enemy.name} caught! +3 Skill Points!`);
          skillPoints += 3;
        } else {
          battleLog.push(`${enemy.name} caught! +1 Skill Point!`);
          skillPoints += 1;
        }
        
        caughtPokemon.push({ ...enemy, isShiny });
        render();

        setTimeout(() => {
          if (enemyTeam.length > 1) {
            enemyTeam.shift();
            battleLog.push(`Enemy sent out ${enemyTeam[0].name}!`);
            render();
          } else {
            if (currentBattle < battleSequence.length - 1) {
              currentBattle++;
              gameState = 'victory';
            } else {
              gameState = 'victory';
              battleLog.push('🎉 You completed the gauntlet!');
            }
            render();
          }
          animating = false;
        }, 1000);
      }, 500);
    } else {
      setTimeout(() => {
        const playerDisplay = document.getElementById('player-display');
        playerDisplay.classList.add('shaking');
        
        const enemyEffectiveness = getTypeEffectiveness(enemy.type, player.type);
        const enemyBaseDamage = Math.max(5, Math.floor(enemy.attack * 0.8 - player.defense * 0.3));
        const enemyDamage = Math.floor(enemyBaseDamage * enemyEffectiveness);
        const newPlayerHp = Math.max(0, player.currentHp - enemyDamage);

        setTimeout(() => {
          playerDisplay.classList.remove('shaking');
          playerTeam[0].currentHp = newPlayerHp;
          
          let enemyEffectText = '';
          if (enemyEffectiveness === 2) enemyEffectText = " It's super effective!";
          if (enemyEffectiveness === 0.5) enemyEffectText = " It's not very effective...";
          if (enemyEffectiveness === 0) enemyEffectText = " It had no effect...";
          
          battleLog.push(`${enemy.name} dealt ${enemyDamage} damage!${enemyEffectText}`);
          render();

          if (newPlayerHp <= 0) {
            setTimeout(() => {
              battleLog.push(`${player.name} fainted! Run failed!`);
              gameState = 'defeat';
              render();
            }, 500);
          }
          animating = false;
        }, 500);
      }, 800);
    }
  }, 500);
}

function unlockSkill(skillId) {
  const skill = skillTree.find(s => s.id === skillId);
  if (skill && skillPoints >= skill.cost && !unlockedSkills.includes(skillId)) {
    skillPoints -= skill.cost;
    unlockedSkills.push(skillId);
    render();
  }
}

function selectStarter(pokemon) {
  signaturePokemon = pokemon;
  gameState = 'menu';
  render();
}

function render() {
  const app = document.getElementById('app');
  
  if (gameState === 'menu') {
    app.innerHTML = `
      <div class="card">
        <div class="header-info">
          <div>Skill Points: <span class="skill-points">${skillPoints}</span></div>
          ${signaturePokemon ? `<div>Signature: <span class="signature-pokemon" style="color: ${signaturePokemon.color}">${signaturePokemon.name}</span></div>` : ''}
        </div>
        
        ${!signaturePokemon ? `
          <p class="warning-text">First, select your signature Pokemon for all runs!</p>
          <button class="btn-green" onclick="gameState = 'selectStarter'; render();">Choose Signature Pokemon</button>
        ` : `
          <button class="btn-red" onclick="startBattle(currentBattle)">Start Run (Battle ${currentBattle + 1}/${battleSequence.length})</button>
          <button class="btn-purple" onclick="gameState = 'skillTree'; render();">🏆 Skill Tree</button>
          <div class="caught-pokemon">
            <h3>Caught Pokemon: ${caughtPokemon.length}</h3>
            <div class="pokemon-list">
              ${caughtPokemon.slice(-10).map(p => `<span style="color: ${p.color}">${p.isShiny ? '✨' : ''}${p.name}</span>`).join('')}
            </div>
          </div>
        `}
      </div>
    `;
  } else if (gameState === 'selectStarter') {
    app.innerHTML = `
      <div class="card">
        <h2 class="text-center">Choose Your Signature Pokemon</h2>
        <div class="starter-grid">
          ${starterPool.map(pokemon => `
            <div class="starter-card" style="border-color: ${pokemon.color}" onclick="selectStarter(starterPool[${starterPool.indexOf(pokemon)}])">
              <img src="${pokemon.sprite}" alt="${pokemon.name}">
              <div class="pokemon-name" style="color: ${pokemon.color}">${pokemon.name}</div>
              <div class="pokemon-type">${pokemon.type}</div>
              <div class="pokemon-stats">HP: ${pokemon.hp} | ATK: ${pokemon.attack}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (gameState === 'skillTree') {
    app.innerHTML = `
      <div class="card">
        <div class="header-info">
          <h2>Skill Tree</h2>
          <div>Points: <span class="skill-points">${skillPoints}</span></div>
        </div>
        ${skillTree.map(skill => {
          const isUnlocked = unlockedSkills.includes(skill.id);
          const canAfford = skillPoints >= skill.cost;
          return `
            <div class="skill-item ${isUnlocked ? 'unlocked' : ''}">
              <div class="skill-info">
                <h3>${skill.name}</h3>
                <p>${skill.description}</p>
                <div class="skill-cost">Cost: ${skill.cost} SP</div>
              </div>
              ${!isUnlocked ? `
                <button class="skill-unlock ${canAfford ? 'btn-yellow' : 'btn-gray'}" 
                        onclick="unlockSkill('${skill.id}')" 
                        ${!canAfford ? 'disabled' : ''}>
                  Unlock
                </button>
              ` : '<span style="color: #22c55e; font-weight: bold;">✓ Unlocked</span>'}
            </div>
          `;
        }).join('')}
        <button class="btn-gray" onclick="gameState = 'menu'; render();">Back to Menu</button>
      </div>
    `;
  } else if (gameState === 'battle') {
    const player = playerTeam[0];
    const enemy = enemyTeam[0];
    
    app.innerHTML = `
      <div class="card">
        <h2 class="text-center">${battleSequence[currentBattle].npc}</h2>
        
        <div class="battle-arena">
          <div class="pokemon-display enemy-display" id="enemy-display">
            <div class="pokemon-shadow"></div>
            <img src="${enemy.sprite}" alt="${enemy.name}">
            <h3>${enemy.name}</h3>
            <span class="type-badge" style="background-color: ${enemy.color}">${enemy.type}</span>
            <div class="hp-bar-container">
              <div class="hp-bar" style="width: ${(enemy.currentHp / enemy.maxHp) * 100}%; background-color: ${getHPColor(enemy.currentHp, enemy.maxHp)}"></div>
            </div>
            <div class="hp-text">${enemy.currentHp} / ${enemy.maxHp} HP</div>
          </div>
          
          <div class="pokemon-display player-display" id="player-display">
            <div class="pokemon-shadow"></div>
            <img src="${player.sprite}" alt="${player.name}">
            <h3>${player.name}</h3>
            <span class="type-badge" style="background-color: ${player.color}">${player.type}</span>
            <div class="hp-bar-container">
              <div class="hp-bar" style="width: ${(player.currentHp / player.maxHp) * 100}%; background-color: ${getHPColor(player.currentHp, player.maxHp)}"></div>
            </div>
            <div class="hp-text">${player.currentHp} / ${player.maxHp} HP</div>
          </div>
        </div>
        
        <button class="btn-red" onclick="attack()" ${animating ? 'disabled' : ''}>
          ${animating ? 'Attacking...' : 'ATTACK'}
        </button>
      </div>
      
      <div class="battle-log">
        ${battleLog.map(log => `<div>${log}</div>`).join('')}
      </div>
    `;
  } else if (gameState === 'victory') {
    app.innerHTML = `
      <div class="card victory-screen">
        <div style="font-size: 4rem;">🎉</div>
        <h2>Victory!</h2>
        <p>You defeated ${battleSequence[currentBattle].npc}!</p>
        ${currentBattle < battleSequence.length - 1 ? `
          <button class="btn-green" onclick="startBattle(currentBattle + 1)">Next Battle</button>
        ` : `
          <p style="font-size: 1.5rem;">🏆 Gauntlet Complete! 🏆</p>
          <button class="btn-purple" onclick="currentBattle = 0; gameState = 'menu'; render();">Return to Menu</button>
        `}
      </div>
    `;
  } else if (gameState === 'defeat') {
    app.innerHTML = `
      <div class="card defeat-screen">
        <div style="font-size: 4rem;">💀</div>
        <h2>Defeated!</h2>
        <p>Your run has ended. Try again!</p>
        <button class="btn-red" onclick="currentBattle = 0; gameState = 'menu'; render();">Return to Menu</button>
      </div>
    `;
  }
}

render();
