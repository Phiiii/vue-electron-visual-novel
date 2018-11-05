import { Script } from '../interfaces/script';

const tutorialScript: Script = {
  actions: [{
    runText: { text: 'Hello! My name is Phi. Welcome to Caravan visual novel engine.' }
  }, {
    runText: { text: `How about we start with the basics?` }
  }]
};

export default tutorialScript;
