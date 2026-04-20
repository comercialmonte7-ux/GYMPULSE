export interface Machine {
  id: string;
  name: string;
  muscleGroup: string;
  description: string;
  instructions: string[];
  tips: string[];
  videoUrl?: string;
}

export interface ExerciseDefinition {
  machineId: string;
  reps: string;
  sets: number;
  note?: string;
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  type: 'adaptacion' | 'localizado';
  target: 'general' | 'hombre' | 'mujer';
  exercises: ExerciseDefinition[];
}

export interface Exercise {
  id: string;
  machineId: string;
  name: string;
  sets: Set[];
  date: string;
}

export interface Set {
  reps: number;
  weight: number;
  completed: boolean;
}
