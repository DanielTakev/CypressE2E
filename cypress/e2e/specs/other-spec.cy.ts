
import DashboardPage from "../../pages/dashboard.page.cy";
import {users} from "../../../fixtures/enumUsers";
import HomepageActionsPage from "../../pages/homepage-actions.page.cy";
import NotesPage from "../../pages/notes.page.cy";
import {dashboardCards} from "../../../fixtures/enumDashboardCards";
import {customerName} from "../../../fixtures/enumCustomerName";
import SelectSuccessPlansPage from '../../pages/select-success-plans.page.cy'
import SuccessPlanPage from "../../pages/success-plan.page.cy";
import MockedLogin from "../../pages/mocked-login.cy";
import {tabName} from "../../../fixtures/enumTabNames";

describe('Delivery Notes', function () {

   const login = new MockedLogin();
   const dashboardPage = new DashboardPage();
   const homepageActionsPage = new HomepageActionsPage();
   const notesPage = new NotesPage();
   const selectSuccessPlansPage = new SelectSuccessPlansPage();
   const successPlansPage = new SuccessPlanPage();
   const noteTitle = 'note title';
   const noteContent = 'note content';
   const spNoteContent = 'Success Plan Content';
   const spNoteTitle = 'Success Plan Title';
   const spEditedNoteTitle = 'Edited title';

   describe('Delivery Notes in accelerators grid', function () {

      before(function () {
         login.loginWithMockedUser(users.DELIVERY_PERSON);
         homepageActionsPage.clickNotesBtn();
      });

      it('C15554 Verify delivery note can be created', function () {
         notesPage.createDeliveryNote(customerName.ADIDAS, noteTitle, noteContent);
         notesPage.verifyDeliveryNoteIsPresent(customerName.ADIDAS, true);
         notesPage.searchDeliveryNoteByKeyword(customerName.ADIDAS);
         notesPage.verifyDeliveryNoteContent(noteTitle, noteContent);
      });

      it('C15555 Verify delivery note can be edited', function () {
         notesPage.clickToEditDeliveryNote(customerName.ADIDAS);
         notesPage.editCustomerName(customerName.FEDERAL_CUSTOMER);
         notesPage.clickSaveButtonEditedNote();
         notesPage.searchDeliveryNoteByKeyword(customerName.FEDERAL_CUSTOMER);
         notesPage.verifyDeliveryNoteIsPresent(customerName.FEDERAL_CUSTOMER, true);
      });

      it('C15556 Verify delivery note can be deleted', function () {
         notesPage.clickToDeleteDeliveryNote(customerName.FEDERAL_CUSTOMER);
         notesPage.verifyDeliveryNoteDeletionMessage();
         notesPage.verifyDeliveryNoteIsPresent(customerName.FEDERAL_CUSTOMER, false);
      });

   });

   describe('Delivery Notes in success plans', function () {

      beforeEach(function () {
         login.loginWithMockedUser(users.SUCCESS_EXECUTIVE);
         dashboardPage.closeVideoDialogIfExists();
         dashboardPage.selectDashboardCardByName(dashboardCards.SUCCESS_PLANS);
         selectSuccessPlansPage.selectSuccessPlan(customerName.COCA_COLA);
         successPlansPage.selectTab(tabName.DELIVERY_NOTES);
      });

      it('C220295 Verify adding delivery note to success plan', function () {
         notesPage.populateNoteTitle(spNoteTitle);
         notesPage.populateNoteContent(spNoteContent);
         notesPage.clickSaveButton();
         notesPage.searchDeliveryNoteByKeyword(spNoteTitle);
         notesPage.verifyDeliveryNoteContent(spNoteTitle, spNoteContent);
      });

      it('C220296 Verify editing delivery note in success plan', function () {
         notesPage.clickToEditDeliveryNote(spNoteTitle);
         notesPage.editNoteTitle(spEditedNoteTitle);
         notesPage.clickSaveButtonEditedNote();
         notesPage.searchDeliveryNoteByKeyword(spEditedNoteTitle);
         notesPage.verifyDeliveryNoteContent(spEditedNoteTitle, spNoteContent);
      });

      it('C220297 Verify deleting delivery note in success plan', function () {
         notesPage.clickToDeleteDeliveryNote(spEditedNoteTitle);
         cy.wait(4000);
         notesPage.verifyDeliveryNoteDeletionMessage();
         notesPage.verifyDeliveryNoteIsPresent(spEditedNoteTitle, false);
      });

   });

});