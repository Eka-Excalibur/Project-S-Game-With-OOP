// enemy.js
export class Enemy {
  constructor(name, hp, lvl, dmg, isDie = false) {
    this.name = name;
    this.hp = hp;
    this.lvl = lvl;
    this.dmg = dmg;
    this.isDie = isDie;
  }

  takeDmg(getAtk) {
    this.hp -= getAtk;
    if (this.hp <= 0) {
      this.hp = 0;
      this.isDie = true;
      console.log(`${this.name} mati!`);
    } else {
      console.log(`${this.name} sisa HP: ${this.hp}`);
    }
  }
}

export class LowEnemy extends Enemy {
  constructor(name, hp, lvl, dmg) {
    super(name, hp, lvl, dmg);
  }
}

export class MidEnemy extends Enemy {
  constructor(name, hp, lvl, dmg) {
    super(name, hp, lvl, dmg);
  }

   takeDmg(getAtk) {
    const reducedDmg = Math.floor(getAtk / 0.75);
    console.log(`${this.name} mengurangi damage menjadi ${reducedDmg}`);
    super.takeDmg(reducedDmg);
  }
}

export class HighEnemy extends Enemy {
  constructor(name, hp, lvl, dmg) {
    super(name, hp, lvl, dmg);
  }
   takeDmg(getAtk) {
    const reducedDmg = Math.floor(getAtk / 2);
    console.log(`${this.name} mengurangi damage menjadi ${reducedDmg}`);
    super.takeDmg(reducedDmg);
  }
}

export const enemyLowLvl = [
  new LowEnemy("Slime", 50, 1, 3),
  new LowEnemy("Goblin", 100, 1, 10),
  new LowEnemy("Orc", 150, 1, 15),
];

export const enemyMedLvl = [
  new MidEnemy("Bandit", 200, 2, 15),
  new MidEnemy("Wizard", 200, 3, 25),
];

export const enemyHighLvl = [
  new HighEnemy("Elf", 600, 3, 50),
  new HighEnemy("Ghoul", 600, 3, 55),
  new HighEnemy("Raja Yapping X-RPL", 1000, 3, 100),
];
