export interface Job {
  title: string;
  employer: {
    name: string,
    website?: string,
    location?: string
  };
  dates: {start: Date, end?: Date}
  duties: {
    description: string,
    skills: string[]
  }[]
}
