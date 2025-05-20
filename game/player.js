import chalk from "chalk";
import chalkAnimation from "chalk-animation";

export class Player {
  constructor(name, hp, lvl, dmg) {
    this.name = name;
    this.hp = hp;
    this.lvl = lvl;
    this.dmg = dmg;
    this.dashCooldown = 0;
  }

  attack(target) {
    return new Error("YepYepYep");
  }

  dash() {
    return new Error("Eummmm????????");
  }

  takeDmg(damage) {
    return new Error("Eummmm????????");
  }
}

export class Magic extends Player {
  takeDmg(damage) {
    if (this.hp <= this.maxHp() / 2) {
      this.hp += 40;
      console.log(chalk.blue(`${this.name} menyerap energi magis! Pulih 40 HP. Sekarang: ${this.hp}`));
    } else {
      this.hp -= damage;
      if (this.hp < 0) this.hp = 0;
      console.log(chalk.red(`${this.name} terkena ${damage} damage! Sisa HP: ${this.hp}`));
    }
  }

  attack(target) {
    console.log(chalk.green(`${this.name} merapal mantra ke ${target.name} sebesar ${this.dmg}`));
    target.takeDmg(this.dmg);
  }

  maxHp() {
    return 200;
  }
}

export class Warrior extends Player {
  takeDmg(damage) {
    const reduced = Math.floor(damage * 0.7);
    this.hp -= reduced;
    if (this.hp < 0) this.hp = 0;
    console.log(chalk.red(`${this.name} menahan serangan! Damage diterima: ${reduced}. Sisa HP: ${this.hp}`));
  }

  attack(target) {
    console.log(chalk.yellow(`${this.name} menghantam ${target.name} dengan kekuatan ${this.dmg}!`));
    target.takeDmg(this.dmg);
  }
}


export class Assassin extends Player {
  constructor(name, hp, lvl, dmg) {
    super(name, hp, lvl, dmg);
    this.evadeReady = false;
  }

  takeDmg(damage) {
    if (this.evadeReady) {
      console.log(chalk.cyan(`${this.name} menghindari serangan! Tidak kena damage.`));
      this.hp += 10
      console.log(chalk.yellowBright("Perfect Dodge!!!! mendapat bomus heaal"))
      this.evadeReady = false; 
    } else {
      this.hp -= damage;
      if (this.hp < 0) this.hp = 0;
      console.log(chalk.red(`${this.name} terkena ${damage} damage! Sisa HP: ${this.hp}`));
    }
  }

  attack(target) {
    console.log(chalk.magenta(`${this.name} menyerang ${target.name} dengan cepat! Damage: ${this.dmg}`));
    target.takeDmg(this.dmg);
  }

  dash(time) {
    this.evadeReady = true;
    console.log(chalk.bgCyan(`${this.name} siap menghindari serangan berikutnya! (respon: ${time}ms)`));
  }
}
