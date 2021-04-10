export interface User {
  id?:string;
  name: string;
  title: string;
  social: {name: string, value: string}[];
  lastRefresh?: Date;
  aboutMe: string;
}
