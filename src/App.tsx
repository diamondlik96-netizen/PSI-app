import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppStateProvider } from './state/AppStateContext';
import { AppShell } from './components/shell/AppShell';
import { HomeScreen } from './screens/home/HomeScreen';
import { ServiceDetailScreen } from './screens/services/ServiceDetailScreen';
import { ProjectsScreen } from './screens/projects/ProjectsScreen';
import { ProjectDetailScreen } from './screens/projects/ProjectDetailScreen';
import { TeamScreen } from './screens/team/TeamScreen';
import { ScheduleScreen } from './screens/service-request/ScheduleScreen';
import { QuoteFlowScreen } from './screens/service-request/QuoteFlowScreen';
import { ReportIssueScreen } from './screens/service-request/ReportIssueScreen';
import { AccountScreen } from './screens/account/AccountScreen';
import { QuoteDetailScreen } from './screens/account/QuoteDetailScreen';
import { InvoiceDetailScreen } from './screens/account/InvoiceDetailScreen';
import { TechnicianTrackingScreen } from './screens/tracking/TechnicianTrackingScreen';
import { MessagesScreen } from './screens/messages/MessagesScreen';
import { ThreadScreen } from './screens/messages/ThreadScreen';

function App() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/services/:id" element={<ServiceDetailScreen />} />
            <Route path="/projects" element={<ProjectsScreen />} />
            <Route path="/projects/:id" element={<ProjectDetailScreen />} />
            <Route path="/team" element={<TeamScreen />} />
            <Route path="/schedule" element={<ScheduleScreen />} />
            <Route path="/quote" element={<QuoteFlowScreen />} />
            <Route path="/report-issue" element={<ReportIssueScreen />} />
            <Route path="/account" element={<AccountScreen />} />
            <Route path="/account/tracking" element={<TechnicianTrackingScreen />} />
            <Route path="/account/quotes/:id" element={<QuoteDetailScreen />} />
            <Route path="/account/invoices/:id" element={<InvoiceDetailScreen />} />
            <Route path="/account/messages" element={<MessagesScreen />} />
            <Route path="/account/messages/:threadId" element={<ThreadScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppStateProvider>
  );
}

export default App;
