import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/homepage";
import AdminDashboard from "pages/admin-dashboard";
import OfficersDirectory from "pages/officers-directory";
import OfficerPortfolio from "pages/officer-portfolio";
import ArchiveBrowser from "pages/archive-browser";
import PortfolioEditor from "pages/portfolio-editor";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/officers-directory" element={<OfficersDirectory />} />
        <Route path="/officer-portfolio" element={<OfficerPortfolio />} />
        <Route path="/archive-browser" element={<ArchiveBrowser />} />
        <Route path="/portfolio-editor" element={<PortfolioEditor />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;