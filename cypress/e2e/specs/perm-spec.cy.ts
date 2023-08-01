import MockedLogin from "../../pages/mocked-login.cy";
import {urls} from "../../../fixtures/enumUrls";
import {users} from "../../../fixtures/enumUsers";
import {dashboardCards} from "../../../fixtures/enumDashboardCards";
import DashboardPage from "../../pages/dashboard.page.cy";

describe('Permissions', function () {

   const login = new MockedLogin();
   const dashboardPage = new DashboardPage();

   it('T1', function () {
      login.loginWithMockedUser(users.ADMIN);
      cy.hash().should('eq', urls.dashboard);
      dashboardPage.verifyDashboardCardExistence(dashboardCards.SUCCESS_PLANS, true);
      dashboardPage.verifyDashboardCardExistence(dashboardCards.SUCCESS_PATHWAYS, false);
      dashboardPage.verifyDashboardCardExistence(dashboardCards.SIGN_UPS, true);
      dashboardPage.verifyDashboardCardExistence(dashboardCards.ACCELERATORS, true);
      dashboardPage.verifyDashboardCardExistence(dashboardCards.ASSESSMENTS, true);
   });

   it('T2', function () {
      login.loginWithMockedUser(users.SUCCESS_EXECUTIVE);
      cy.hash().should('eq', urls.dashboard);
      dashboardPage.verifyDashboardCardExistence(dashboardCards.SUCCESS_PLANS, true);
      dashboardPage.verifyDashboardCardExistence(dashboardCards.SUCCESS_PATHWAYS, false);
      dashboardPage.verifyDashboardCardExistence(dashboardCards.SIGN_UPS, true);
      dashboardPage.verifyDashboardCardExistence(dashboardCards.ACCELERATORS, false);
      dashboardPage.verifyDashboardCardExistence(dashboardCards.ASSESSMENTS, true);
   });

   it('T3', function () {
      login.loginWithMockedUser(users.ACCELERATOR_OWNER);
      cy.hash().should('not.eq', urls.dashboard);
   });

});
