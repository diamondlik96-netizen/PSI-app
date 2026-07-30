import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { initialAppointments, initialOpenQuotes, initialThreads } from '../data/seed';
import type { Appointment, OpenQuote, Thread } from '../data/types';

export const SERVICE_TYPES = ['Repair', 'Maintenance', 'Inspection', 'Emergency'] as const;
export const SLOT_POOL = ['8:00 AM', '10:00 AM', '1:00 PM', '3:00 PM'] as const;
export const ISSUE_EQUIPMENT_OPTIONS = ['Operable partition', 'Basketball system', 'Bleachers', 'Divider curtain', 'Other'];
export const ISSUE_SEVERITY_OPTIONS = ['Routine', 'Needs attention soon', 'Emergency'];

export interface QuoteForm {
  path: 'unsure' | 'known' | null;
  productType: string;
  dimensions: string;
  location: string;
  phone: string;
  issueDescription: string;
  photos: number;
  submitted: boolean;
  // Desktop quote wizard also collects these; unused by the mobile forms.
  name: string;
  email: string;
  notes: string;
}

export interface IssueForm {
  equipment: string;
  severity: string;
  description: string;
  location: string;
  phone: string;
  submitted: boolean;
}

export interface ScheduleForm {
  selectedDay: number | null;
  selectedSlot: string | null;
  serviceType: string;
  location: string;
  notes: string;
  confirmed: boolean;
  // Desktop schedule form also collects these; unused by the mobile form.
  name: string;
  phone: string;
}

export interface ReviewState {
  rating: number;
  comment: string;
  done: 'public' | 'skipped' | 'feedback' | null;
}

export interface ReferralState {
  name: string;
  contact: string;
  sent: boolean;
  linkCopied: boolean;
}

interface AppState {
  threads: Thread[];
  appointments: Appointment[];
  openQuotes: OpenQuote[];
  quoteDecisions: Record<string, 'approved' | 'declined'>;
  paidInvoices: Record<string, true>;
  quoteForm: QuoteForm;
  issueForm: IssueForm;
  scheduleForm: ScheduleForm;
  review: ReviewState;
  referral: ReferralState;
}

const emptyQuoteForm: QuoteForm = {
  path: null,
  productType: '',
  dimensions: '',
  location: '',
  phone: '',
  issueDescription: '',
  photos: 0,
  submitted: false,
  name: '',
  email: '',
  notes: '',
};

const emptyIssueForm: IssueForm = {
  equipment: '',
  severity: '',
  description: '',
  location: '',
  phone: '',
  submitted: false,
};

const emptyScheduleForm: ScheduleForm = {
  selectedDay: null,
  selectedSlot: null,
  serviceType: SERVICE_TYPES[0],
  location: '',
  notes: '',
  confirmed: false,
  name: '',
  phone: '',
};

const initialState: AppState = {
  threads: initialThreads,
  appointments: initialAppointments,
  openQuotes: initialOpenQuotes,
  quoteDecisions: {},
  paidInvoices: {},
  quoteForm: emptyQuoteForm,
  issueForm: emptyIssueForm,
  scheduleForm: emptyScheduleForm,
  review: { rating: 0, comment: '', done: null },
  referral: { name: '', contact: '', sent: false, linkCopied: false },
};

type Action =
  | { type: 'setQuoteForm'; patch: Partial<QuoteForm> }
  | { type: 'submitQuote' }
  | { type: 'resetQuoteForm' }
  | { type: 'setIssueForm'; patch: Partial<IssueForm> }
  | { type: 'submitIssue' }
  | { type: 'resetIssueForm' }
  | { type: 'setScheduleForm'; patch: Partial<ScheduleForm> }
  | { type: 'confirmSchedule' }
  | { type: 'resetScheduleForm' }
  | { type: 'setReviewRating'; rating: number }
  | { type: 'setReviewComment'; comment: string }
  | { type: 'submitReviewPublic' }
  | { type: 'skipReviewPublic' }
  | { type: 'submitReviewFeedback' }
  | { type: 'setReferral'; patch: Partial<Pick<ReferralState, 'name' | 'contact'>> }
  | { type: 'submitReferral' }
  | { type: 'shareReferralLink' }
  | { type: 'approveQuote'; id: string }
  | { type: 'declineQuote'; id: string }
  | { type: 'payInvoice'; id: string }
  | { type: 'sendMessage'; threadId: string; text: string }
  | { type: 'hydrate'; state: AppState };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'hydrate':
      return action.state;
    case 'setQuoteForm':
      return { ...state, quoteForm: { ...state.quoteForm, ...action.patch } };
    case 'submitQuote':
      return { ...state, quoteForm: { ...state.quoteForm, submitted: true } };
    case 'resetQuoteForm':
      return { ...state, quoteForm: emptyQuoteForm };
    case 'setIssueForm':
      return { ...state, issueForm: { ...state.issueForm, ...action.patch } };
    case 'submitIssue':
      return { ...state, issueForm: { ...state.issueForm, submitted: true } };
    case 'resetIssueForm':
      return { ...state, issueForm: emptyIssueForm };
    case 'setScheduleForm':
      return { ...state, scheduleForm: { ...state.scheduleForm, ...action.patch } };
    case 'confirmSchedule':
      return { ...state, scheduleForm: { ...state.scheduleForm, confirmed: true } };
    case 'resetScheduleForm':
      return { ...state, scheduleForm: emptyScheduleForm };
    case 'setReviewRating':
      return { ...state, review: { ...state.review, rating: action.rating } };
    case 'setReviewComment':
      return { ...state, review: { ...state.review, comment: action.comment } };
    case 'submitReviewPublic':
      return { ...state, review: { ...state.review, done: 'public' } };
    case 'skipReviewPublic':
      return { ...state, review: { ...state.review, done: 'skipped' } };
    case 'submitReviewFeedback':
      return { ...state, review: { ...state.review, done: 'feedback' } };
    case 'setReferral':
      return { ...state, referral: { ...state.referral, ...action.patch } };
    case 'submitReferral':
      return state.referral.name.trim() ? { ...state, referral: { ...state.referral, sent: true } } : state;
    case 'shareReferralLink':
      return { ...state, referral: { ...state.referral, linkCopied: true } };
    case 'approveQuote':
      return { ...state, quoteDecisions: { ...state.quoteDecisions, [action.id]: 'approved' } };
    case 'declineQuote':
      return { ...state, quoteDecisions: { ...state.quoteDecisions, [action.id]: 'declined' } };
    case 'payInvoice':
      return { ...state, paidInvoices: { ...state.paidInvoices, [action.id]: true } };
    case 'sendMessage': {
      if (!action.text.trim()) return state;
      const threads = state.threads.map((t) =>
        t.id === action.threadId
          ? { ...t, messages: [...t.messages, { from: 'me' as const, text: action.text, time: 'Just now' }] }
          : t,
      );
      return { ...state, threads };
    }
    default:
      return state;
  }
}

const STORAGE_KEY = 'psi-app-state';

interface AppStateContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...init, ...JSON.parse(raw) } as AppState;
    } catch {
      // ignore corrupt storage
    }
    return init;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage unavailable — state just won't persist
    }
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}

export function unreadThreadCount(threads: Thread[]) {
  return threads.filter((t) => t.unread).length;
}
