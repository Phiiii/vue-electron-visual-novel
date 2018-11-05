export interface Script {
  actions: ClickAction[];
  options?: ScriptOption;
}

export interface ScriptOption {
  voiceEndsAfterText?: boolean;
}

export interface ClickAction {
  runText?: TextOption;
  runVoice?: string;
  addSprite?: SpriteOption;
  removeSprite?: SpriteOption;
  removeAllSprites?: boolean;
}

export interface TextOption {
  text: string;
  speed?: number;
  speaker?: string | Character;
}

export interface SpriteOption {
  character?: Character;
  position?: number;
  sprite?: NodeRequire | Character;
}

export interface Character {
  voice?: NodeRequire;
  name: string;
  sprite?: NodeRequire;
}
