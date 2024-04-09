import _ from 'lodash';
import { Ref, ActionType, Skill, SkillDetails } from './types';

// Adjust AP values based on skills
export const calcSkillApModifiers = (attackRef: Ref, defendRef: Ref, attackSkill: Skill[], defendSkill: Skill[], 
  serverName: string, sMap: Map<string, Map<string, SkillDetails>>)=> {
  
  // Add in attacker's AP modifier from skills
  for (let i = 0; i < attackSkill.length; i++) {
    if (attackSkill[i].name === 'am' && attackRef.race.includes('animal')) {

      // Update init, too, if blitz and lvl 20
      if (serverName == 'blitz' && attackSkill[i].level === 20) {
        attackRef.primaryInit += 1;
        attackRef.secondaryInit += 1;
      }

      let modifier = 1 + sMap.get(serverName)?.get('am')?.effects[0].action.value[attackSkill[i].level];
      attackRef.primaryPower *= modifier;
      attackRef.secondaryPower *= modifier;
      attackRef.counterPower *= modifier;
    }
    if (attackSkill[i].name === 'um' && attackRef.race.includes('undead')) {

      // Update init, too, if blitz, lvl 20, and not a complex undead
      if (serverName === 'blitz' && defendSkill[i].level === 20 && defendRef.name !== 'vampire' && defendRef.name !== 'lich') {
        defendRef.primaryInit += 1;
        defendRef.secondaryInit += 1;
      }

      let modifier = 1 + sMap.get(serverName)?.get('um')?.effects[0].action.value[attackSkill[i].level];
      attackRef.primaryPower *= modifier;
      attackRef.secondaryPower *= modifier;
      attackRef.counterPower *= modifier;
    }
    if (attackSkill[i].name === 'lc') {
      let modifier = 1 + sMap.get(serverName)?.get('lc')?.effects[0].action.value[attackSkill[i].level];
      attackRef.primaryPower *= modifier;
      attackRef.secondaryPower *= modifier;
      attackRef.counterPower *= modifier;
    }
  }

  // Add in defender's AP modifier from skills
  for (let i = 0; i < defendSkill.length; i++) {
    if (defendSkill[i].name === 'am' && defendRef.race.includes('animal')) {

      // Update init, too, if blitz and lvl 20
      if (serverName === 'blitz' && defendSkill[i].level === 20) {
        defendRef.primaryInit += 1;
        defendRef.secondaryInit += 1;
      }

      let modifier = 1 + sMap.get(serverName)?.get('am')?.effects[0].action.value[defendSkill[i].level];
      defendRef.primaryPower *= modifier;
      defendRef.secondaryPower *= modifier;
      defendRef.counterPower *= modifier;
    }
    if (defendSkill[i].name === 'um' && defendRef.race.includes('undead')) {

      // Update init, too, if blitz, lvl 20, and not a complex undead
      if (serverName === 'blitz' && defendSkill[i].level === 20 && defendRef.name !== 'vampire' && defendRef.name !== 'lich') {
        defendRef.primaryInit += 1;
        defendRef.secondaryInit += 1;
      }

      // not vampire
      let modifier = 1 + sMap.get(serverName)?.get('um')?.effects[0].action.value[defendSkill[i].level];
      defendRef.primaryPower *= modifier;
      defendRef.secondaryPower *= modifier;
      defendRef.counterPower *= modifier;
    }
    if (defendSkill[i].name === 'lc') {
      let modifier = 1 + sMap.get(serverName)?.get('lc')?.effects[0].action.value[defendSkill[i].level];
      defendRef.primaryPower *= modifier;
      defendRef.secondaryPower *= modifier;
      defendRef.counterPower *= modifier;
    }
  }
} 

/**
 * Calculate defender's resistances
 */
export const calcDamageModifiers = (attackRef: Ref, defendRef: Ref, type: ActionType) => {
  let multiplier = 1.0;

  // Weakness
  let weaknesses = defendRef.abilities.filter(d => d.startsWith('weak'));
  for (const weakness of weaknesses) {
    const weakType = _.last(weakness.split(' ')) as string;
    if (attackRef.primaryTypes.includes(weakType)) {
      multiplier *= 2;
    }
  }

  // Charm only applies to primary and counter
  if (type === 'primary' || type === 'counter') {
    if (defendRef.abilities.includes('charm')) {
      multiplier /= 2;
    }
  }

  if (defendRef.abilities.includes('scales')) {
    multiplier *= 0.75;
  }

  // Racial bonus - attacker side
  const attackerBonus = attackRef.abilities.find(d => d.startsWith('racial enemy')) 
  if (attackerBonus) {
    const [, , race, bonus] = attackerBonus.split(' ');
    if (defendRef.race.includes(race)) {
      multiplier *= (1 + parseFloat(bonus) / 100);
    }
  }

  // Racial bonus - defender side
  const defenderBonus = defendRef.abilities.find(d => d.startsWith('racial enemy')) 
  if (defenderBonus) {
    const [, , race, bonus] = defenderBonus.split(' ');
    if (attackRef.race.includes(race)) {
      multiplier *= 1/(1 + parseFloat(bonus) / 100);
    }
  }
  return multiplier;
};