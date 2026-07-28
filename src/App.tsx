import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppStateProvider } from './state/AppStateContext';
import { useViewMode } from './hooks/useViewMode';

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

import { DesktopShell } from './components/shell-desktop/DesktopShell';
import { HomeScreen as DesktopHomeScreen } from './screens-desktop/home/HomeScreen';
import { ServiceDetailScreen as DesktopServiceDetailScreen } from './screens-desktop/services/ServiceDetailScreen';
import { PortfolioScreen as DesktopPortfolioScreen } from './screens-desktop/projects/PortfolioScreen';
import { ProjectDetailScreen as DesktopProjectDetailScreen } from './screens-desktop/projects/ProjectDetailScreen';
import { TeamScreen as DesktopTeamScreen } from './screens-desktop/team/TeamScreen';
import { ScheduleScreen as DesktopScheduleScreen } from './screens-desktop/service-request/ScheduleScreen';
import { QuoteFlowScreen as DesktopQuoteFlowScreen } from './screens-desktop/service-request/QuoteFlowScreen';
import { ReportIssueScreen as DesktopReportIssueScreen } from './screens-desktop/service-request/ReportIssueScreen';
import { AccountScreen as DesktopAccountScreen } from './screens-desktop/account/AccountScreen';
import { QuoteDetailScreen as DesktopQuoteDetailScreen } from './screens-desktop/account/QuoteDetailScreen';
import { InvoiceDetailScreen as DesktopInvoiceDetailScreen } from './screens-desktop/account/InvoiceDetailScreen';
import { TechnicianTrackingScreen as DesktopTechnicianTrackingScreen } from './screens-desktop/tracking/TechnicianTrackingScreen';
import { MessagesScreen as DesktopMessagesScreen } from './screens-desktop/messages/MessagesScreen';

function MobileRoutes() {
  return (
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
  );
}

function DesktopRoutes() {
  return (
    <Routes>
      <Route element={<DesktopShell />}>
        <Route path="/" element={<DesktopHomeScreen />} />
        <Route path="/services/:id" element={<DesktopServiceDetailScreen />} />
        <Route path="/projects" element={<DesktopPortfolioScreen />} />
        <Route path="/projects/:id" element={<DesktopProjectDetailScreen />} />
        <Route path="/team" element={<DesktopTeamScreen />} />
        <Route path="/schedule" element={<DesktopScheduleScreen />} />
        <Route path="/quote" element={<DesktopQuoteFlowScreen />} />
        <Route path="/report-issue" element={<DesktopReportIssueScreen />} />
        <Route path="/account" element={<DesktopAccountScreen />} />
        <Route path="/account/tracking" element={<DesktopTechnicianTrackingScreen />} />
        <Route path="/account/quotes/:id" element={<DesktopQuoteDetailScreen />} />
        <Route path="/account/invoices/:id" element={<DesktopInvoiceDetailScreen />} />
        <Route path="/account/messages" element={<DesktopMessagesScreen />} />
        <Route path="/account/messages/:threadId" element={<DesktopMessagesScreen />} />
      </Route>
    </Routes>
  );
}

function ViewModeRouter() {
  const mode = useViewMode();
  return mode === 'app' ? <MobileRoutes /> : <DesktopRoutes />;
}

function App() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <ViewModeRouter />
      </BrowserRouter>
    </AppStateProvider>
  );
}

export default App;
