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
  Observe,
  FocusedTouch,
} from "@ffxiv-teamcraft/simulator";

const expertRecipe = {
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

const statData = {
  ltw: {
    cms: 2560,
    control: 2517 + 64,
    cp: 404, // 553
    specialist: true,
  },
};

const finisher404 = [
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
];

const finisherSegment1 = [
  new Innovation(),
  new Observe(),
  new FocusedTouch(),
  new Observe(),
  new FocusedTouch(),
];

const finisherSegment2 = [
  new Innovation(),
  new Observe(),
  new FocusedTouch(),
  new GreatStrides(),
  new ByregotsBlessing(),
];

const finisher331 = [
  new Manipulation(),
  ...finisherSegment1,
  ...finisherSegment1,
  ...finisherSegment2,
];

const obsFoc = [
  new Observe(),
  new FocusedTouch(),
];

const finisher231 = [
  new GreatStrides(),
  new Innovation(),
  new Observe(),
  new FocusedTouch(),
  new Observe(),
  new FocusedTouch(),
  new GreatStrides(),
  new Innovation(),
  new Observe(),
  new FocusedTouch(),
  new GreatStrides(),
  new ByregotsBlessing(),
];

const finisher74 = [
  new Innovation(),
  new GreatStrides(),
  new ByregotsBlessing(),
];

const testFinisher1 = [
  new Innovation(),
  new BasicTouch(),
  new GreatStrides(),
  new ByregotsBlessing(),
];
const testFinisher2 = [
  new Innovation(),
  new PrudentTouch(),
  new GreatStrides(),
  new ByregotsBlessing(),
];
const testFinisher3 = [
  new Innovation(),
  new Observe(),
  new FocusedTouch(),
  new GreatStrides(),
  new ByregotsBlessing(),
];


const rotation = (stats, finisher) => {
  const {
    cms, control, cp, specialist,
  } = stats;
  const crafterLevels = Array(8).fill(80);
  const crafterStats = new CrafterStats(0, cms, control, cp, specialist, 80, crafterLevels);

  const sim = new Simulation(expertRecipe, [...finisher, new BasicSynthesis()], crafterStats, undefined, undefined, 0);

  sim.buffs.push({
    duration: Infinity, stacks: 11, buff: Buff.INNER_QUIET, appliedStep: 0,
  });

  sim.durability = expertRecipe.durability - 0;
  sim.progression = expertRecipe.progress - 1;
  return sim.run();
};

const result = rotation(statData.ltw, finisher231);

// console.log(rotation);
console.log(result);
// console.log(reliabilityReport);

const App = () => {
  let cp = 0;
  let dura = expertRecipe.durability;
  let quality = 0;

  const listItems = result.steps.map((step, index) => { // GROSS AF
    dura += step.solidityDifference;
    dura += step.afterBuffTick.solidityDifference;
    cp -= step.cpDifference;
    quality += step.addedQuality;
    return <li key={index}>{`${step.action.constructor.name} - Q: ${step.addedQuality} - P: ${step.addedProgression} CP: ${step.cpDifference} Dura: ${step.solidityDifference} Dura+Buff: ${step.solidityDifference + step.afterBuffTick.solidityDifference}`}</li>;
  });

  const spareCP = result.simulation.maxCP - cp;

  const finalDura = `${expertRecipe.durability - dura + (dura % 10 === 0 ? -9 : -4)} (${expertRecipe.durability - dura})`;

  return (
    <div>
      <h2>{`${result.failCause ? result.failCause : "SUCCESS!"} CP: ${cp} (${spareCP}), Dura Needed: ${finalDura}, Quality Needed: ${expertRecipe.quality - quality}, Quality Gain: ${quality}`}</h2>
      <ol>
        {listItems}
      </ol>
    </div>
  );
};


export default App;
