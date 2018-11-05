import { Script } from '../interfaces/script';
import { Speed } from '../interfaces/speeds';

const { Slow, Medium, Fast } = Speed;

const maleBlip = require('@/assets/blips/male.wav');

const tutorialScript: Script = {
  actions: [{
    runText: {
      text: `${Fast}I used to be an adventurer like you... _ ${Slow} Until I took an arrow in the knee.`,
      speaker: 'Phi'
    },
    runVoice: maleBlip
  }, {
    runText: {
      text: `How about we start with the basics?`,
      speaker: 'Phi'
    },
    runVoice: maleBlip
  }]
};

export default tutorialScript;
