export type Recipe = {
  id: string;
  title: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  versions: Version[];
};

export type Version = {
  versionId: string;
  date: Date;
  title: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
};
