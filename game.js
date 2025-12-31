import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, Star, Zap, Heart } from 'lucide-react';

const PokemonRoguelike = () => {
  const [gameState, setGameState] = useState('menu');
  const [signaturePokemon, setSignaturePokemon] = useState(null);
  const [playerTeam, setPlayerTeam] = useState([]);
  const [enemyTeam, setEnemyTeam] = useState([]);
  const [currentBattle, setCurrentBattle] = useState(0);
  const [skillPoints, setSkillPoints] = useState(0);
  const [caughtPokemon, setCaughtPokemon] = useState([]);
  const [unlockedSkills, setUnlockedSkills] = useState([]);
  const [battleLog, setBattleLog] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [shaking, setShaking] = useState(null);
  const [flashEffect, setFlashEffect] = useState(false);

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

  const startBattle = (battleIndex) => {
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
      id: Math.random()
    }));

    setPlayerTeam(team);
    setEnemyTeam(enemies);
    setBattleLog([`${battle.npc} wants to battle!`]);
    setGameState('battle');
  };

  const getTypeEffectiveness = (attackerType, defenderType) => {
    const chart = typeChart[attackerType];
    if (!chart) return 1;
    
    if (chart.immune && chart.immune.includes(defenderType)) return 0;
    if (chart.weak && chart.weak.includes(defenderType)) return 0.5;
    if (chart.resist && chart.resist.includes(defenderType)) return 2;
    return 1;
  };

  const attack = () => {
    if (animating || playerTeam[0].currentHp <= 0 || enemyTeam[0].currentHp <= 0) return;

    setAnimating(true);
    setShaking('enemy');
    setFlashEffect(true);

    const player = playerTeam[0];
    const enemy = enemyTeam[0];
    
    const effectiveness = getTypeEffectiveness(player.type, enemy.type);
    const baseDamage = Math.max(5, Math.floor(player.attack * 0.8 - enemy.defense * 0.3));
    const damage = Math.floor(baseDamage * effectiveness);
    const newEnemyHp = Math.max(0, enemy.currentHp - damage);

    setTimeout(() => {
      setFlashEffect(false);
      setShaking(null);
      
      const newEnemyTeam = [...enemyTeam];
      newEnemyTeam[0] = { ...enemy, currentHp: newEnemyHp };
      setEnemyTeam(newEnemyTeam);
      
      let effectivenessText = '';
      if (effectiveness === 2) effectivenessText = " It's super effective!";
      if (effectiveness === 0.5) effectivenessText = " It's not very effective...";
      if (effectiveness === 0) effectivenessText = " It had no effect...";
      
      setBattleLog(prev => [...prev, `${player.name} dealt ${damage} damage!${effectivenessText}`]);

      if (newEnemyHp <= 0) {
        setTimeout(() => {
          setBattleLog(prev => [...prev, `${enemy.name} fainted!`]);
          
          const isShiny = Math.random() < 1/160;
          if (isShiny) {
            setBattleLog(prev => [...prev, `✨ Shiny ${enemy.name} caught! +3 Skill Points!`]);
            setSkillPoints(sp => sp + 3);
          } else {
            setBattleLog(prev => [...prev, `${enemy.name} caught! +1 Skill Point!`]);
            setSkillPoints(sp => sp + 1);
          }
          
          setCaughtPokemon(prev => [...prev, { ...enemy, isShiny }]);

          setTimeout(() => {
            if (newEnemyTeam.length > 1) {
              setEnemyTeam(newEnemyTeam.slice(1));
              setBattleLog(prev => [...prev, `Enemy sent out ${newEnemyTeam[1].name}!`]);
            } else {
              if (currentBattle < battleSequence.length - 1) {
                setCurrentBattle(currentBattle + 1);
                setGameState('victory');
              } else {
                setGameState('victory');
                setBattleLog(prev => [...prev, '🎉 You completed the gauntlet!']);
              }
            }
            setAnimating(false);
          }, 1000);
        }, 500);
      } else {
        setTimeout(() => {
          setShaking('player');
          const enemyEffectiveness = getTypeEffectiveness(enemy.type, player.type);
          const enemyBaseDamage = Math.max(5, Math.floor(enemy.attack * 0.8 - player.defense * 0.3));
          const enemyDamage = Math.floor(enemyBaseDamage * enemyEffectiveness);
          const newPlayerHp = Math.max(0, player.currentHp - enemyDamage);

          setTimeout(() => {
            setShaking(null);
            const newPlayerTeam = [...playerTeam];
            newPlayerTeam[0] = { ...player, currentHp: newPlayerHp };
            setPlayerTeam(newPlayerTeam);
            
            let enemyEffectText = '';
            if (enemyEffectiveness === 2) enemyEffectText = " It's super effective!";
            if (enemyEffectiveness === 0.5) enemyEffectText = " It's not very effective...";
            if (enemyEffectiveness === 0) enemyEffectText = " It had no effect...";
            
            setBattleLog(prev => [...prev, `${enemy.name} dealt ${enemyDamage} damage!${enemyEffectText}`]);

            if (newPlayerHp <= 0) {
              setTimeout(() => {
                setBattleLog(prev => [...prev, `${player.name} fainted! Run failed!`]);
                setGameState('defeat');
              }, 500);
            }
            setAnimating(false);
          }, 500);
        }, 800);
      }
    }, 500);
  };

  const unlockSkill = (skillId) => {
    const skill = skillTree.find(s => s.id === skillId);
    if (skill && skillPoints >= skill.cost && !unlockedSkills.includes(skillId)) {
      setSkillPoints(skillPoints - skill.cost);
      setUnlockedSkills([...unlockedSkills, skillId]);
    }
  };

  const selectStarter = (pokemon) => {
    setSignaturePokemon(pokemon);
    setGameState('menu');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-green-800 via-yellow-700 to-amber-900 text-white p-4 overflow-auto">
      <div className="max-w-4xl mx-auto relative">
        <div className="fixed inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,0,0,0.1) 50px, rgba(0,0,0,0.1) 51px)'
        }}></div>
        
        <h1 className="text-4xl font-bold text-center mb-6 flex items-center justify-center gap-2 relative z-10">
          <Sparkles className="text-yellow-400" />
          Pokemon Roguelike
          <Sparkles className="text-yellow-400" />
        </h1>

        {gameState === 'menu' && (
          <div className="bg-black/40 backdrop-blur p-6 rounded-lg relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xl">Skill Points: <span className="text-yellow-400 font-bold">{skillPoints}</span></div>
              {signaturePokemon && (
                <div className="text-lg">Signature: <span className="font-bold" style={{ color: signaturePokemon.color }}>{signaturePokemon.name}</span></div>
              )}
            </div>

            {!signaturePokemon ? (
              <div>
                <p className="text-center mb-4 text-yellow-300">First, select your signature Pokemon for all runs!</p>
                <button
                  onClick={() => setGameState('selectStarter')}
                  className="w-full bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold text-xl"
                >
                  Choose Signature Pokemon
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => startBattle(currentBattle)}
                  className="w-full bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold text-xl"
                >
                  Start Run (Battle {currentBattle + 1}/{battleSequence.length})
                </button>
                <button
                  onClick={() => setGameState('skillTree')}
                  className="w-full bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-bold text-xl flex items-center justify-center gap-2"
                >
                  <Trophy /> Skill Tree
                </button>
                <div className="bg-black/40 p-4 rounded">
                  <h3 className="font-bold mb-2">Caught Pokemon: {caughtPokemon.length}</h3>
                  <div className="flex flex-wrap gap-2">
                    {caughtPokemon.slice(-10).map((p, i) => (
                      <span key={i} className="text-sm" style={{ color: p.color }}>
                        {p.isShiny && '✨'}{p.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {gameState === 'selectStarter' && (
          <div className="bg-black/40 backdrop-blur p-6 rounded-lg relative z-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Choose Your Signature Pokemon</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {starterPool.map(pokemon => (
                <button
                  key={pokemon.id}
                  onClick={() => selectStarter(pokemon)}
                  className="bg-black/60 hover:bg-black/80 p-4 rounded-lg border-2 transition-all hover:scale-105"
                  style={{ borderColor: pokemon.color }}
                >
                  <img src={pokemon.sprite} alt={pokemon.name} className="w-24 h-24 mx-auto" style={{ imageRendering: 'pixelated' }} />
                  <div className="font-bold" style={{ color: pokemon.color }}>{pokemon.name}</div>
                  <div className="text-sm text-gray-300">{pokemon.type}</div>
                  <div className="text-xs mt-2">
                    HP: {pokemon.hp} | ATK: {pokemon.attack}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'skillTree' && (
          <div className="bg-black/40 backdrop-blur p-6 rounded-lg relative z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Skill Tree</h2>
              <div className="text-xl">Points: <span className="text-yellow-400 font-bold">{skillPoints}</span></div>
            </div>
            <div className="grid gap-4 mb-4">
              {skillTree.map(skill => {
                const isUnlocked = unlockedSkills.includes(skill.id);
                const canAfford = skillPoints >= skill.cost;
                return (
                  <div
                    key={skill.id}
                    className={`p-4 rounded-lg border-2 ${isUnlocked ? 'bg-green-900/40 border-green-500' : 'bg-black/60 border-gray-600'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-lg">{skill.name}</div>
                        <div className="text-sm text-gray-300">{skill.description}</div>
                        <div className="text-xs text-yellow-400 mt-1">Cost: {skill.cost} SP</div>
                      </div>
                      {!isUnlocked && (
                        <button
                          onClick={() => unlockSkill(skill.id)}
                          disabled={!canAfford}
                          className={`px-4 py-2 rounded ${canAfford ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-600 cursor-not-allowed'}`}
                        >
                          Unlock
                        </button>
                      )}
                      {isUnlocked && <span className="text-green-400 font-bold">✓ Unlocked</span>}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setGameState('menu')}
              className="w-full bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-bold"
            >
              Back to Menu
            </button>
          </div>
        )}

        {gameState === 'battle' && playerTeam[0] && enemyTeam[0] && (
          <div className="space-y-4 relative z-10">
            <div className="bg-black/40 backdrop-blur p-4 rounded-lg">
              <h2 className="text-xl font-bold text-center mb-2">{battleSequence[currentBattle].npc}</h2>
              
              <div className={`bg-gradient-to-b from-sky-400 to-sky-200 p-6 rounded-lg mb-4 transition-transform relative ${shaking === 'enemy' ? 'animate-bounce' : ''}`}>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/20 rounded-full blur-sm"></div>
                <div className="text-center relative">
                  <img 
                    src={enemyTeam[0].sprite} 
                    alt={enemyTeam[0].name} 
                    className="w-32 h-32 mx-auto mb-2" 
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <div className="font-bold text-xl text-gray-800" style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}>{enemyTeam[0].name}</div>
                  <div className="inline-block px-3 py-1 rounded-full text-sm font-bold mt-1 text-white" style={{ backgroundColor: enemyTeam[0].color }}>
                    {enemyTeam[0].type}
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4 mt-2 border-2 border-gray-800">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(enemyTeam[0].currentHp / enemyTeam[0].maxHp) * 100}%`,
                        backgroundColor: enemyTeam[0].currentHp / enemyTeam[0].maxHp > 0.5 ? '#22c55e' : enemyTeam[0].currentHp / enemyTeam[0].maxHp > 0.2 ? '#eab308' : '#ef4444'
                      }}
                    />
                  </div>
                  <div className="text-sm mt-1 font-bold text-gray-800">{enemyTeam[0].currentHp} / {enemyTeam[0].maxHp} HP</div>
                </div>
              </div>

              <div className={`bg-gradient-to-b from-green-600 to-green-400 p-6 rounded-lg transition-transform relative ${shaking === 'player' ? 'animate-bounce' : ''}`}>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/20 rounded-full blur-sm"></div>
                <div className="text-center relative">
                  <img 
                    src={playerTeam[0].sprite} 
                    alt={playerTeam[0].name} 
                    className="w-32 h-32 mx-auto mb-2" 
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <div className="font-bold text-xl text-gray-800" style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}>{playerTeam[0].name}</div>
                  <div className="inline-block px-3 py-1 rounded-full text-sm font-bold mt-1 text-white" style={{ backgroundColor: playerTeam[0].color }}>
                    {playerTeam[0].type}
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4 mt-2 border-2 border-gray-800">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(playerTeam[0].currentHp / playerTeam[0].maxHp) * 100}%`,
                        backgroundColor: playerTeam[0].currentHp / playerTeam[0].maxHp > 0.5 ? '#22c55e' : playerTeam[0].currentHp / playerTeam[0].maxHp > 0.2 ? '#eab308' : '#ef4444'
                      }}
                    />
                  </div>
                  <div className="text-sm mt-1 font-bold text-gray-800">{playerTeam[0].currentHp} / {playerTeam[0].maxHp} HP</div>
                </div>
              </div>

              <button
                onClick={attack}
                disabled={animating}
                className={`w-full px-6 py-4 rounded-lg font-bold text-xl ${animating ? 'bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
              >
                {animating ? 'Attacking...' : 'ATTACK'}
              </button>
            </div>

            <div className="bg-black/40 backdrop-blur p-4 rounded-lg max-h-40 overflow-y-auto">
              {battleLog.map((log, i) => (
                <div key={i} className="text-sm mb-1">{log}</div>
              ))}
            </div>
          </div>
        )}

        {gameState === 'victory' && (
          <div className="bg-black/40 backdrop-blur p-6 rounded-lg text-center relative z-10">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-4">Victory!</h2>
            <p className="mb-6">You defeated {battleSequence[currentBattle].npc}!</p>
            {currentBattle < battleSequence.length - 1 ? (
              <button
                onClick={() => startBattle(currentBattle + 1)}
                className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-bold text-xl"
              >
                Next Battle
              </button>
            ) : (
              <div>
                <p className="text-2xl mb-4">🏆 Gauntlet Complete! 🏆</p>
                <button
                  onClick={() => {
                    setCurrentBattle(0);
                    setGameState('menu');
                  }}
                  className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg font-bold text-xl"
                >
                  Return to Menu
                </button>
              </div>
            )}
          </div>
        )}

        {gameState === 'defeat' && (
          <div className="bg-black/40 backdrop-blur p-6 rounded-lg text-center relative z-10">
            <div className="text-6xl mb-4">💀</div>
            <h2 className="text-3xl font-bold mb-4">Defeated!</h2>
            <p className="mb-6">Your run has ended. Try again!</p>
            <button
              onClick={() => {
                setCurrentBattle(0);
                setGameState('menu');
              }}
              className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg font-bold text-xl"
            >
              Return to Menu
            </button>
          </div>
        )}

        {flashEffect && (
          <div className="fixed inset-0 bg-white pointer-events-none animate-pulse opacity-30" />
        )}
      </div>
    </div>
  );
};

export default PokemonRoguelike;
