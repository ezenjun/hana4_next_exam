export type Recipe = {
  title: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  versions: Version[];
};

export type Version = {
  date: Date;
  title: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
};
