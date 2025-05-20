import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import { Assassin } from "./player.js";
import { timeSet } from "../system/async.js";
import { emojiArry } from "../system/emote.js";
import { clearLog } from "../system/async.js";
import figlet from "figlet";
import { start } from "../src/index.js";

export async function testing(enemy) {
  const player = new Assassin("XxxAntiYapping2k25", 180, 5, 70);
  console.clear();
  console.log(chalk.redBright("=== PERTARUNGAN DIMULAI ==="));
  await timeSet(500);
  console.log(emojiArry[1].emoji)
  await timeSet(1000);

  await clearLog()
  const maxDashTime = 2000;

  while (player.hp > 0 && enemy.hp > 0) {
    console.log(emojiArry[1].emoji)
    console.log(chalk.yellow(`🔹 ${player.name} HP: ${player.hp}`));
    console.log(chalk.red(`🔸 ${enemy.name} HP: ${enemy.hp}`));

    const startTime = Date.now();

    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Pilih aksi (respon cepat untuk Dash):",
        choices: ["Attack", "Dash"],
      }
    ]);

    const endTime = Date.now();
    const delta = endTime - startTime;

    if (action === "Dash") {
      if (delta <= maxDashTime) {
        await clearLog();
        player.dash(delta);
        console.log(chalk.cyan("Serangan musuh dihindari!"));
        await timeSet(1000);
        continue;
      } else {
        await clearLog()
        console.log(chalk.red(`Dash gagal (telat ${delta}ms). Kamu diserang!`));
      }
    }

    await timeSet(1000);

    if (enemy.isDie || enemy.hp <= 0) {
        await clearLog()
       figlet("WINNER", (err, data)=>{
        chalkAnimation.rainbow(data)
      });
      await timeSet(2000);
      start();
    }

    console.log(chalk.red(`${enemy.name} menyerang sebesar ${enemy.dmg}.`));
    player.takeDmg(enemy.dmg);

    if (player.hp <= 0) {
        await clearLog()
        console.log(emojiArry[3].emoji)
      figlet("LOSER", (err, data)=>{
        chalkAnimation.glitch(data)
      });
      
    }
  }
}
