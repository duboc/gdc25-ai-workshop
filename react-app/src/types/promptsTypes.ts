// Types for the Prompts data

export interface PromptData {
  prompts: Prompt[];
}

export interface Prompt {
  id: string;
  title: string;
  content: string;
}
