/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import React from "react";

const App = () => <h1>Hello, world.</h1>;

const testRotation = [
  [
    "Manipulation",
    "Great Strides",
    "Innovation",
    "Preparatory Touch",
    "Great Strides",
    "Preparatory Touch",
    "Great Strides",
    "Innovation",
    "Preparatory Touch",
    "Preparatory Touch",
    "Preparatory Touch",
    "Great Strides",
    "Byregot's Blessing",
    "Great Strides",
    "Standard Synthesis",
    "None",
    "None",
    "None",
    "None",
    "None",
    "None"],
];

const skills = {
  manip: "Manipulation",
  innovation: "Innovation",
  greatStrides: "Great Strides",
  prepTouch: "Preparatory Touch",
  prudentTouch: "Prudent Touch",
  basicTouch: "Basic Touch",
  standardTouch: "Standard Touch",
  observe: "Observe",
  focusedTouch: "Focused Touch",
  byregotsBlessing: "Byregot's Blessing",
  standardSynthesis: "Standard Synthesis",
  none: "None",
};

const types = {
  touch: "Touch",
  synthesis: "Synthesis",
};

const abilities = {
  Innovation: {
    name: skills.innovation,
    CP: 18,
    durability: 0,
    multi: 0.5,
    duration: 4,
  },
  "Basic Touch": {
    CP: 18,
    durability: 10,
    multi: 1,
    type: types.touch,
  },
  "Standard Touch": {
    CP: 32,
    durability: 10,
    multi: 1.25,
    type: types.touch,
  },

  "Preparatory Touch": {
    CP: 40,
    durability: 20,
    multi: 2,
    type: types.touch,
  },

  "Prudent Touch": {
    CP: 25,
    durability: 5,
    multi: 1,
    type: types.touch,
  },

  Observe: {
    CP: 7,
    durability: 0,
    multi: 0,
  },

  "Focused Touch": {
    CP: 18,
    durability: 10,
    multi: 1.5,
    type: types.touch,
  },

  "Great Strides": {
    name: skills.greatStrides,
    CP: 32,
    durability: 0,
    multi: 1,
    duration: 3,
  },

  "Byregot's Blessing": {
    CP: 24,
    durability: 10,
    multi: 3,
    type: types.touch,
  },

  "Standard Synthesis": {
    CP: 0,
    durability: 10,
    multi: 1,
    type: types.synthesis,
  },

  Manipulation: {
    name: skills.manip,
    CP: 96,
    durability: -40,
    multi: 0,
    duration: 8,
  },

  None: {
    CP: 0,
    durability: 0,
    multi: 0,
    name: skills.none,
  },
};


const calcCP = ([rotation]) => {
  return rotation.reduce((result, current) => {
    return result + abilities[current].CP;
  }, 0);
};

const calcDurability = ([rotation]) => {
  const preDura = rotation.reduce((result, current) => {
    return result + abilities[current].durability;
  }, 0);
  return preDura + (preDura % 10 === 0 ? -9 : -4);
};

const activeBuff = (currentAbility, buffStatus, buffName) => {
  let { active, duration } = buffStatus;

  if (active && duration > 0) {
    duration -= 1;
  }

  if (duration === 0) {
    active = false;
  }

  if (currentAbility === buffName) {
    active = true;
    duration = abilities[currentAbility].duration;
  }

  return { active, duration };
};

const calcQuality = ([rotation]) => {
  const {
    Innovation, None, "Great Strides": GS, Manipulation,
  } = abilities;

  let gsBuff = {
    duration: 0,
    active: false,
  };

  let inBuff = {
    duration: 0,
    active: false,
  };

  let manipBuff = {
    duration: 0,
    active: false,
  };

  return rotation.reduce((result, current) => {
    console.log(`   Ability used: ${current}`);
    if (current === None.name) return result;

    manipBuff = activeBuff(current, manipBuff, Manipulation.name);

    inBuff = activeBuff(current, inBuff, Innovation.name);

    gsBuff = activeBuff(current, gsBuff, GS.name);
    if (gsBuff.active && abilities[current].type === types.touch) { // touch used, reset
      gsBuff.duration = 0;
      gsBuff.active = false;
    }
    console.log(`Manip: ${manipBuff.active} ${manipBuff.duration} - GS: ${gsBuff.active} ${gsBuff.duration} - In: ${inBuff.active} ${inBuff.duration}`);

    return result + abilities[current].durability;
  }, 0);
};

console.log(calcQuality(testRotation));
console.log(calcCP(testRotation));
console.log(calcDurability(testRotation));

export default App;
