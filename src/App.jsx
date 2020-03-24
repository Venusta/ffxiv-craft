/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import React from "react";
import {
  Simulation,
  RapidSynthesis,
  CrafterStats,
  MuscleMemory,
  InnerQuiet,
  PrudentTouch,
  PreparatoryTouch,
  Manipulation,
  Veneration,
  WasteNotII,
  CraftingJob,
  BasicTouch,
  GreatStrides,
  Innovation,
  ByregotsBlessing,
  PatientTouch,
  Reflect,
  MastersMend,
  BasicSynthesis,
  Buff,
} from "@ffxiv-teamcraft/simulator";

const recipe = {
  id: "9999",
  job: CraftingJob.ANY,
  rlvl: 481,
  durability: 60,
  quality: 64862,
  progress: 9181,
  lvl: 80,
  suggestedCraftsmanship: 2484,
  suggestedControl: 2206,
  stars: 3,
  hq: 1,
  quickSynth: 0,
  controlReq: 2480,
  craftsmanshipReq: 2195,
  unlockId: 0,
  yield: 1,
  expert: true,
};

const crafterLevels = [80, 80, 80, 80, 80, 80, 80, 80];
const crafterStats = new CrafterStats(0, 2560, 2517 + 64, 553, true, 80, crafterLevels);
const rotation = new Simulation(recipe, [
  new Manipulation(),
  new GreatStrides(),
  new Innovation(),
  new PreparatoryTouch(),
  new GreatStrides(),
  new PreparatoryTouch(),
  new GreatStrides(),
  new Innovation(),
  new PreparatoryTouch(),
  new GreatStrides(),
  new ByregotsBlessing(),
  new BasicSynthesis(),
], crafterStats, undefined, undefined, 0);

rotation.buffs.push({
  duration: Infinity, stacks: 11, buff: Buff.INNER_QUIET, appliedStep: 0,
});

rotation.progression = recipe.progress - 1;
const result = rotation.run();

// console.log(rotation);
console.log(result);
// console.log(reliabilityReport);

const App = () => {
  let cp = 0;
  let dura = recipe.durability;
  let quality = 0;

  const listItems = result.steps.map((step, index) => { // GROSS AF
    dura += step.solidityDifference;
    dura += step.afterBuffTick.solidityDifference;
    cp -= step.cpDifference;
    quality += step.addedQuality;
    return <li key={index}>{`${step.action.constructor.name} - Q: ${step.addedQuality} - P: ${step.addedProgression} CP: ${step.cpDifference} Dura: ${step.solidityDifference} Dura+Buff: ${step.solidityDifference + step.afterBuffTick.solidityDifference}`}</li>;
  });

  return (
    <div>
      <h2>{`CP: ${cp}, Dura Needed: ${recipe.durability - dura}, Quality Needed: ${recipe.quality - quality}, Quality Gain: ${quality}`}</h2>
      <ol>
        {listItems}
      </ol>
    </div>
  );
};


export default App;
