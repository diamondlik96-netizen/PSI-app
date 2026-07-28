export interface ProjectPhoto {
  src: string;
  caption?: string;
}

export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  industry: string;
  productType: string;
  location: string;
  featured?: boolean;
  /** First photo is used as the cover thumbnail everywhere (list cards, home, etc). Empty array = no photos yet, shows a placeholder. */
  photos: ProjectPhoto[];
  stats?: ProjectStat[];
  summary: string;
  testimonial: string | null;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  region: string;
  phone: string;
  email: string;
}

export interface Message {
  from: 'me' | 'them';
  text: string;
  time: string;
}

export interface Thread {
  id: string;
  subject: string;
  withName: string;
  unread: boolean;
  date: string;
  messages: Message[];
}

export interface Appointment {
  id: string;
  type: string;
  product: string;
  location: string;
  date: string;
  time: string;
  status: string;
}

export interface HistoryEntry {
  id: string;
  date: string;
  type: string;
  description: string;
  location: string;
  status: string;
}

export interface Service {
  id: string;
  name: string;
  photo: string | null;
  blurb: string;
  tagline: string;
  paras: string[];
  bullets: string[];
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  panels: string;
  lastService: string;
  status: string;
  due: string;
}

export interface QuoteLine {
  desc: string;
  amount: string;
}

export interface OpenQuote {
  id: string;
  title: string;
  submitted: string;
  status: string;
  statusKind: 'active' | 'action';
  approvable: boolean;
  contact: string;
  validThru: string;
  note: string;
  lines: QuoteLine[];
  total: string;
}

export interface InvoiceLine {
  desc: string;
  amount: string;
}

export interface Invoice {
  id: string;
  title: string;
  date: string;
  due: string;
  amount: string;
  status: string;
  paidOn?: string;
  method?: string;
  ref: string;
  lines: InvoiceLine[];
}

export interface ClientLogo {
  name: string;
  src: string;
}
