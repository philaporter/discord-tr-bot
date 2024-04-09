import _ from 'lodash';
import { Ref, Skill, SkillDetails } from './types';

/**
 * Calculate attacker's and defender's modified health
 */
export const calcHealthBoost = (attackRef: Ref, defendRef: Ref, attackSkill: Skill[], defendSkill: Skill[], 
    serverName: string, sMap: Map<string, Map<string, SkillDetails>>) => {
    
    // Apply the attacker's health boosts for any appropriate skils: am, lc, and um
    for (let i = 0; i < attackSkill.length; i++) {
        let hpModifier = 1.0;
        if (attackSkill[i].name === 'am' && attackRef.race.includes('animal')) {
            if (serverName === 'blitz') {
                hpModifier += sMap.get('blitz')?.get('am')?.effects[1].action.value[attackSkill[i].level]
            } else if (serverName === 'beta') {
                hpModifier += sMap.get('beta')?.get('am')?.effects[1].action.value[attackSkill[i].level]
            }
            attackRef.hp *= hpModifier;
        }
        if (attackSkill[i].name === 'um' && attackRef.race.includes('undead')) {
            if (serverName === 'blitz') {
                hpModifier += sMap.get('blitz')?.get('um')?.effects[1].action.value[attackSkill[i].level]
            } else if (serverName === 'beta') {
                hpModifier += sMap.get('beta')?.get('um')?.effects[1].action.value[attackSkill[i].level]
            }
            attackRef.hp *= hpModifier;
        }
    }

    // Apply the defender's health boosts for any appropriate skils: am, lc, and um
    for (let i = 0; i < defendSkill.length; i++) {
        let hpModifier = 1;
        if (defendSkill[i].name === 'am' && defendRef.race.includes('animal')) {
            if (serverName === 'blitz') {
                hpModifier += sMap.get('blitz')?.get('am')?.effects[1].action.value[defendSkill[i].level]
            } else if (serverName === 'beta') {
                hpModifier += sMap.get('beta')?.get('am')?.effects[1].action.value[defendSkill[i].level]
            }
            defendRef.hp *= hpModifier;
        }
        if (defendSkill[i].name === 'um' && defendRef.race.includes('undead')) {
            if (serverName === 'blitz') {
                hpModifier += sMap.get('blitz')?.get('um')?.effects[1].action.value[defendSkill[i].level]
            } else if (serverName === 'beta') {
                hpModifier += sMap.get('beta')?.get('um')?.effects[1].action.value[defendSkill[i].level]
            }
            defendRef.hp *= hpModifier;
        }
    }
    return;
};