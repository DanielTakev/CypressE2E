class BasePage {

    private readonly shadowHost = 'authoring-ui';
    readonly buttonLocator = '.btn';
    readonly modalFooter = '.modal-footer';
    readonly successMessage = '.success-message';
    readonly dropdownOption = '.ng-option';
    readonly controlContainer = '.clr-control-container';
    readonly toggleLabelLocator = '.clr-control-label';
    readonly paginationDescription = '.pagination-description';
    readonly paginationNextBtn = '.pagination-next';
    readonly paginationPrevBtn = '.pagination-previous';
    readonly paginationDescriptionBtn = '.pagination-description';
    readonly completedHrs = '#completedHrs';
    readonly registeredHrs = '#registeredHrs';
    readonly remainingHrs = '#remainingHrs';
    readonly breadcrumbs = '.breadcrumbs';
 
    /**
     *Clicking an element via locator and containing text
     * @param locator
     * @param elementORText
     */
    clickOnElementORText(locator: string, elementORText?: string) {
       if (!elementORText) {
          cy.get(locator).click({force: true});
       } else {
          cy.get(locator).contains(locator, elementORText).click({force: true});
       }
    }
 
    /**
     *Typing in an element(input/combo-box) via locator and containing text
     * @param locator
     * @param elementText
     * @param textToType
     */
    clearAndType(locator: string, textToType: string, elementText?: string) {
       if (elementText) {
          cy.contains(locator, elementText).clear().type(textToType, {force: true});
       } else {
          cy.get(locator).clear().type(textToType, {force: true});
       }
    }
 
    /**
     * Click a button according the button's text
     * @param textOfButton
     */
    clickButton(textOfButton: string) {
       cy.contains(this.buttonLocator, textOfButton).click({force: true});
    }
 
    /**
     * Verify button does not exist on page
     * @param textOfButton
     */
    verifyButtonDoesNotExist(textOfButton: string) {
       cy.contains(this.buttonLocator, textOfButton).should(shouldEnum.notExist)
    }
 
    /**
     * Click on button Next
     */
    clickButtonNext() {
       this.clickButton(buttonText.NEXT);
    }
 
    /**
     * Click on button Back
     */
    clickButtonBack() {
       this.clickButton(buttonText.BACK);
    }
 
    /**
     * Verify message of success
     * @param expMessage
     */
    verifySuccessMessage(expMessage: string) {
       cy.get(this.successMessage).should(shouldEnum.haveText, expMessage);
    }
 
    /**
     * Verify a button is enabled or disabled
     * @param textOfButton
     * @param isEnabled
     */
    verifyAButtonIsEnabled(textOfButton: string, isEnabled: boolean) {
       cy.contains(this.buttonLocator, textOfButton).should(isEnabled ? shouldEnum.notBeDisabled : shouldEnum.beDisabled)
    }
 
    /**
     * Click button on modal
     * @param button
     */
    clickBtnOnModal(button: string) {
       cy.get(this.modalFooter).contains(button).should(shouldEnum.exist).click({force: true});
    }
 
    /**
     * Select value from dropdown list
     * @param dropDown
     * @param value
     */
    selectDropDownValue(dropDown: string, value: string) {
       cy.get(dropDown).click().get(this.dropdownOption).contains(value).click();
    }
 
    /**
     * Select value from dropdown list waits up to the provided timeout
     * @param dropDown
     * @param value
     * @param timeout
     */
    selectDropDownValueTimeout(dropDown: string, value: string, timeout: number) {
       cy.get(dropDown).click().get(this.dropdownOption, {timeout}).contains(value).click();
    }
 
    /**
     * Choose value from 'select' type of element
     * @param dropDown
     * @param value
     */
    selectValueFromMultipleDropdown(dropDown: string, value: string) {
       cy.get(dropDown).first().select(value);
    }
 
    /**
     * Set edit box value
     * @param editBox
     * @param value
     */
    setEditBoxValue(editBox: string, value: string) {
       cy.get(this.controlContainer).get(editBox).clear().click().type(value);
    }
 
    /**
     * Click to switch ON/OFF a toggle
     * @param toggleSelector
     * @param toggleLabel
     * @param switchOff
     */
    switchToggle(toggleSelector: string, toggleLabel: string, switchOff: boolean) {
       if (cy.get(toggleSelector).should(switchOff ? shouldEnum.beChecked : shouldEnum.notBeChecked)) {
          cy.contains(this.toggleLabelLocator, toggleLabel).click();
       } else {
          cy.log(switchOff ? 'Toggle is already OFF' : 'Toggle is already ON')
       }
    }
 
    /**
     * Verify page counter displays correct range per page
     * @param pageRange - accepted values: '1 - 10', '11 - 20', etc
     * @param hasShadowDom - accepts true/false
     */
    verifyPaginationCounter(pageRange: string, hasShadowDom: boolean = true) {
       if (!hasShadowDom) {
          cy.get(this.paginationDescription).contains(pageRange);
       } else {
          cy.get(this.shadowHost).shadow().find(this.paginationDescriptionBtn).contains(pageRange);
       }
    }
 
    /**
     * Click on right-hand arrow button
     */
    goToNextPage() {
       cy.get(this.paginationNextBtn).click();
    }
 
    /**
     * Click on left-hand arrow button
     */
    returnToPreviousPage() {
       cy.get(this.paginationPrevBtn).click();
    }
 
    /**
     * Click on a particular breadcrumb option
     * @param breadcrumbOption
     * @param shadowHost
     */
    clickOnBreadCrumbOption(breadcrumbOption: string, shadowHost: boolean) {
       if (shadowHost) {
          cy.get(this.shadowHost).shadow().contains(breadcrumbOption).click();
       } else {
          cy.contains(breadcrumbOption).click();
       }
    }
 
    /**
     * Verify if a particular breadcrumb option exists
     * @param breadcrumbOption
     * @param existenceInBreadcrumb
     */
    verifyBreadCrumbOption(breadcrumbOption: string, existenceInBreadcrumb: boolean) {
       if (existenceInBreadcrumb) {
          cy.get(this.breadcrumbs).contains(breadcrumbOption);
       } else {
          cy.get(this.breadcrumbs).contains(breadcrumbOption).should(shouldEnum.notExist);
       }
    }
 
    /**
     * Verify an element is visible
     * @param locator
     * @param element
     * @param shadowHost
     */
    verifyElementIsVisible(locator: string, element: string, shadowHost: boolean = true){
       if (shadowHost) {
          cy.get(this.shadowHost).shadow().find(locator).contains(element).should(shouldEnum.beVisible);
       } else {
          cy.get(locator).contains(element).should(shouldEnum.beVisible);
       }
    }
 
    /**
     * Click on tab based on its name
     * @param tabName
     */
    selectTab(tabName: string) {
       cy.contains('.nav-item', tabName).click();
    }
 
    /**
     *A general method checking the success resources balance
     * @param locator
     * @param completed
     * @param registered
     * @param remaining
     */
    checkHours(locator:string, completed: string, registered: string, remaining: string) {
       cy.get(`${locator} ${this.completedHrs}`).should('have.text', completed);
       cy.get(`${locator} ${this.registeredHrs}`).should('have.text', registered);
       cy.get(`${locator} ${this.remainingHrs}`).should('have.text', remaining);
    }
 }
 
 export default BasePage;