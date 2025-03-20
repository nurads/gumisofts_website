// types.ts
export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  type: string;
  posted_date: string;
}

export interface JobApplication {
  job: number;
  full_name: string;
  email: string;
  resume: File | null;
  cover_letter: string;
}
