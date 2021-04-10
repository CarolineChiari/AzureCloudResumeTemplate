export interface Job {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  duties: {
    responsibility: string,
    skills: string[]
  }[]
}
