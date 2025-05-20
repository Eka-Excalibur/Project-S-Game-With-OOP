import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import inquirer from "inquirer";

import { emojiArry } from "../system/emote.js";
import { timeSet, clearLog } from "../system/async.js";
import {
  enemyLowLvl as EnemyLow,
  enemyMedLvl as EnemyMed,
  enemyHighLvl as EnemyHigh,
} from "../game/enemy.js";
import { testing } from "../game/battle.js";

async function pickEnemyLevel() {
  const { enemy } = await inquirer.prompt([
    {
      type: "list",
      name: "enemy",
      message: "Pilih musuh",
      choices: ["EnemyLow", "EnemyMed", "EnemyHigh"],
    },
  ]);

  await timeSet(500);
  await clearLog();

  figlet(enemy, (err, data) => {
    if (!err) console.log(data);
  });

  let chosenEnemyList;
  if (enemy === "EnemyLow") {
    chosenEnemyList = EnemyLow;
  } else if (enemy === "EnemyMed") {
    chosenEnemyList = EnemyMed;
  } else {
    chosenEnemyList = EnemyHigh;
  }

  const { enemyPick } = await inquirer.prompt([
    {
      type: "list",
      name: "enemyPick",
      message: "Pilih musuh yang akan dilawan",
      choices: chosenEnemyList.map((e) => e.name),
    },
  ]);

  const indexOfEnemy = chosenEnemyList.findIndex(
    (e) => e.name === enemyPick
  );
  const chosenEnemy = chosenEnemyList[indexOfEnemy];

  return { indexOfEnemy, chosenEnemy };
}

export async function start() {
  figlet("WELCOME", (err, data) => {
    if (!err) chalkAnimation.neon(data);
  });

  await timeSet(1000);
  await clearLog();

  chalkAnimation.glitch(emojiArry[0].emoji);

  await timeSet(2000);
  await clearLog();

  figlet("PROJECT   S   GAME", (err, data) => {
    if (!err) console.log(chalk.cyan(data));
  });

  console.table(
    EnemyLow.map((e) => ({
      Name: e.name,
      Hp: e.hp,
      Lvl: e.lvl,
    }))
  );
  await timeSet(1000);
  console.table(
    EnemyMed.map((e) => ({
      Name: e.name,
      Hp: e.hp,
      Lvl: e.lvl,
    }))
  );
  await timeSet(1000);
  console.table(
    EnemyHigh.map((e) => ({
      Name: e.name,
      Hp: e.hp,
      Lvl: e.lvl,
    }))
  );

  const { indexOfEnemy, chosenEnemy } = await pickEnemyLevel();

  console.log(chalk.green(`Musuh terpilih: ${chosenEnemy.name}`));
  console.log(chalk.yellow(`Index musuh: ${indexOfEnemy}`));

  testing(chosenEnemy);
}

start();
