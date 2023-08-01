import BasePage from "./base.page.cy";


class OtherPage extends BasePage {

   readonly titleInput = '#note-title';
   readonly contentInput = '#note-content';
   readonly modalContent = '.modal-content ';
   readonly buttonSelector = '.btn';
   readonly deleteBtn = '#delete-btn';
   readonly searchField = '#search';
   readonly cardSelector = '.card';
   readonly cardHeaderSelector = '.card-header';
   readonly editActionBtn = '.edit-action';
   readonly deleteActionBtn = '.delete-action';
   readonly menuIconLocator = '.menu-icon';
   readonly customerNameInput = '.clr-combobox-input';

   /**
    * Click to type the input for customer name in 'Notes' and select it
    * @param customerName
    */
   typeAndSelectCustomerNameNotes(customerName: string) {
         cy.get(this.customerNameInput).click().type(customerName, {force: true});
         cy.get('clr-option').first().click();
   }

   /**
    * Populate delivery note customer in edit node modal
    * @param customerName
    */
   editCustomerName(customerName: string) {
      cy.get(this.modalContent + this.customerNameInput).clear();
      cy.get(this.modalContent + this.customerNameInput).click().type(customerName, {force: true});
      cy.get('clr-option').first().click();
   }

   /**
    * Populate delivery note title in edit node modal
    * @param title
    */
   editNoteTitle(title: string) {
      cy.get(this.modalContent + this.titleInput).clear({force: true}).click().type(title, {force: true});
   }

   /**
    * Populate delivery note title
    * @param title
    */
   populateNoteTitle(title: string) {
      cy.get(this.titleInput).clear({force: true}).click().type(title, {force: true});
   }

   /**
    * Populate delivery note content
    * @param content
    */
   populateNoteContent(content: string) {
      cy.get(this.contentInput).clear({force: true}).click().type(content, {force: true});
   }

   /**
    * Click to save delivery note
    */
   clickSaveButton() {
      cy.contains(this.buttonSelector, 'Save').click();
   }

   /**
    * Click to save delivery note when edited
    */
   clickSaveButtonEditedNote() {
      cy.contains(this.modalContent + this.buttonSelector, 'Save').click();
   }

   /**
    * Click to confirm deletion
    */
   clickToConfirmDeletion() {
      cy.get(this.deleteBtn).click();
   }

   /**
    * Search for delivery note
    * @param keyword
    */
   searchDeliveryNoteByKeyword(keyword: string) {
      cy.get(this.searchField).clear().click().type(keyword);
   }

   /**
    * Clear field for searching delivery notes
    */
   clearSearchField() {
      cy.get(this.searchField).clear();
   }

   /**
    * Create delivery note with all required fields
    * @param customerName
    * @param title
    * @param content
    */
   createDeliveryNote(customerName: string, title: string, content: string) {
      this.typeAndSelectCustomerNameNotes(customerName);
      this.populateNoteTitle(title);
      this.populateNoteContent(content);
      this.clickSaveButton();
   }

   /**
    * Verify delivery note is created and present on grid
    * @param deliveryNoteCustomer
    * @param isPresent
    */
   verifyDeliveryNoteIsPresent(deliveryNoteCustomer: string, isPresent: boolean) {
      cy.contains(this.cardSelector, deliveryNoteCustomer).should(isPresent ? 'exist' : 'not.exist');
   }

   /**
    * Verify delivery note deletion message is shown
    */
   verifyDeliveryNoteDeletionMessage() {
      cy.get('.alert').contains('Note was successfully deleted');
   }

   /**
    * Verify delivery note content is populated correctly
    * @param deliveryNoteTitle
    * @param deliveryNoteContent
    */
   verifyDeliveryNoteContent(deliveryNoteTitle: string, deliveryNoteContent: string) {
      cy.contains(this.cardSelector, deliveryNoteTitle);
      cy.contains(this.cardSelector, deliveryNoteContent);
   }

   /**
    * Click to edit delivery note
    * @param deliveryNoteCustomer
    */
   clickToEditDeliveryNote(deliveryNoteCustomer: string) {
      cy.contains(this.cardHeaderSelector, deliveryNoteCustomer).parents(this.cardSelector).find(this.menuIconLocator).click({force: true});
      cy.get(this.editActionBtn).should('exist');
      cy.get(this.editActionBtn).click({force: true});
   }

   /**
    * Click to delete delivery note
    * @param deliveryNoteCustomer
    */
   clickToDeleteDeliveryNote(deliveryNoteCustomer: string) {
      cy.contains(this.cardHeaderSelector, deliveryNoteCustomer).parents(this.cardSelector).find(this.menuIconLocator).click({force: true});
      cy.get(this.deleteActionBtn).should('exist');
      cy.get(this.deleteActionBtn).click({force: true});
      this.clickToConfirmDeletion();
   }

   /**
   * Verify respective Success Plan is on the page
   * @param successPlanName
   * @param isExisting
   */
  verifySuccessPlanOnPage(successPlanName: string, isExisting: boolean) {
     cy.contains(this.successPlanCard, successPlanName).should(isExisting ? shouldEnum.exist : shouldEnum.notExist);
  }
}

export default OtherPage;