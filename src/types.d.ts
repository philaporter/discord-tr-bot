type AttackType = "missile" | "fire" | "poison" | "breath" | "magic" | "melee" | "ranged" | "lightning" | "cold" | "paralyse" | "psychic" | "holy"

type Race = "angel" | "animal" | "astral" | "demon" | "dragon" | "dwarf" | "elemental" | "elf" | "giant" | "golem" | "human" | "illusion" | "orc" | "pixie" | "reptile" | "telepath" | "treefolk" | "troll" | "undead"

type Magic = "ascendant" | "verdant" | "eradication" | "nether" | "phantasm"

export type ActionType = 'primary' | 'secondary' | 'counter';

// export enum Abilities {
//   FLYING = 'flying',
//   SWIFT = 'swfit',
//   BEAUTY = 'beauty',
//   FEAR = 'fear',
//   MARKMANSHIP = 'marksmanship',
//   CLUMSINESS = 'clumsiness'
// }

export interface Skill {
  name: string
  level: number
}

export interface SkillDetails {
  id: string
  name: string
  effects: Effects[]
}

export interface Effects {
  target: string
  action: {
    attributes: string[]
    type: string
    value: {
      1: number
      2: number
      3: number
      4: number
      5: number
      6: number
      7: number
      8: number
      9: number
      10: number
      11: number
      12: number
      13: number
      14: number
      15: number
      16: number
      17: number
      18: number
      19: number
      20: number 
    }
  }
}

export interface Unit {
  name: string
  magic: Magic
  race: Race[]
  power: number
  a1_power: number
  a1_type: string
  a1_init: number
  a2_power: number
  a2_type: string
  a2_init: number
  counter: number
  hp: number
  abilities: string[]
  spell_resistance: {
    ascendant: number
    verdant: number
    eradication: number
    nether: number
    phantasm: number
  }
  resistances: {
    missile: number	
    fire:	number
    poison:	number
    breath:	number
    magic: number
    melee: number
    ranged:	number
    lightning: number
    cold:	number
    paralyse:	number
    psychic: number	
    holy:	number
  }
}

export interface Ref {
  name: string
  magic: string
  race: string[]

  efficiency: number
  hp: number
  accuracy: number
  power: number
  numUnits: number
  abilities: string[]

  primaryTypes: string[]
  primaryPower: number
  primaryInit: number
  secondaryTypes: string[]
  secondaryPower: number
  secondaryInit: number
  counterPower: number
  resistances: any
  unitLoss: number
  powerLoss: number
  activeEnchantments: string[]

  base: {
    hp: number
    primaryPower: number
    secondaryPower: number
    counterPower: number
  }
}

export interface SimResult {
  attacker: Ref
  defender: Ref
  
  attackerLoss: number
  attackerUnitCount: number
  attackerUnitLoss: number
  
  defenderLoss: number
  defenderUnitCount: number
  defenderUnitLoss: number
  
  battleLog: string[]
}

