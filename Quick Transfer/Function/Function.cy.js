const { data , inhouseKeyIn } = require('../Data/Data.cy.js');

let refNo;

// Set screen size and open HTML file
export function login() {
  cy.viewport(1920, 1080); // Set screen size
  cy.visit(data.path); // Open HTML file
}

// Selects a user from the list and prevents "about:blank" tab from opening.
export function selectUser(user) {
  cy.window().then((win) => {
    cy.stub(win, 'open').as('windowOpen'); // Stub window.open to prevent new tabs
  });
  cy.contains(user).click(); // Click on the user
}

// Handles the "Inhouse" menu by dismissing the error popup and navigating.
export function clickMenuInhouse() {
  cy.get('.swal2-popup.swal2-modal.swal2-icon-error.swal2-show', { timeout: 10000 })
    .should('be.visible'); // Wait for the error popup
  cy.get('.swal2-confirm.popup-btn.confirm-popup').click(); // Click "ตกลง"
  cy.contains('โอนเงิน').click(); // Click on the "โอนเงิน" menu
}

// Selects the "Account From" dropdown and chooses the desired account.
export function selectAccountFrom(){
  cy.get('div.mat-mdc-form-field-icon-suffix.ng-tns-c3736059725-4.ng-star-inserted img[alt="chevron_down"]').click(); // Open the dropdown
  cy.contains(inhouseKeyIn.accountFrom).click(); // Select account from
}

// Selects the "Account To" dropdown and chooses the desired account.
export function selectAccountTo(){
  cy.get('div.mat-mdc-form-field-icon-suffix.ng-tns-c3736059725-6.ng-star-inserted img[alt="chevron_down"]').click(); // Open the dropdown
  cy.contains(inhouseKeyIn.accountTo).click(); // Select account to
}

// Inputs the transaction amount.
export function amount(){
  cy.get('.mat-mdc-form-field-infix.ng-tns-c3736059725-10 input').type(inhouseKeyIn.amount) // Type the amount
}

// Proceeds to the next step in the transaction process.
export function clickNext(){
  cy.get('button[class="btn btn-lg btn-primary w-[175px] ml-auto"]').click() // Click "Next"
}

// Verifies details on the preview screen.
export function verifyPreviewScreen() {
  // Verify account from
  cy.get("div[class = 'flex flex-col grow gap-2 mb-2 self-start'] div[class='flex flex-row w-full gap-4 items-center rounded-lg bg-[#F1EFEF] p-4'] div[class='flex flex-col w-full'] div p span")
    .should('contain', 
    inhouseKeyIn.accountFrom
  );

  // Verify account to
  cy.get("div[class = 'flex flex-col grow gap-2 mb-2'] span")
    .should('contain', 
    inhouseKeyIn.accountTo
  );

  // Verify amount
  cy.get("div[class='grid grid-cols-2 mt-4 gap-4'] .grid.gap-4 .thongterm-bold.text-data")
    .first()
    .should('contain', 
    inhouseKeyIn.amount
  );
}

// Submits the transaction.
export function submitTransaction(){
  cy.get('.btn-primary').click() // Click ยืนยันและส่งรายการ
}

export function verifySuccessScreen() {
  // Locate the element and store its text content as an alias
  cy.get('.custom-grid-cols-account-section-left > :nth-child(2) > :nth-child(3) > .thongterm-bold')
  .should('exist')
  .and('be.visible')
  .and('not.be.empty') // Ensures the element is not empty
  .invoke('text')
  .then((refNo) => {
    cy.log('Reference Number: ' +refNo); // Logs the reference number
    cy.wrap(refNo).as('referenceNumber'); // Store as alias
  });
  cy.get('@referenceNumber').then((referenceNumber) => {
    refNo = referenceNumber
    cy.log('RefNo : ',refNo)
  })
}

// Click menu "รายการรออนุมัติ"
export function clickMenuApprove() {
  cy.get('.swal2-popup.swal2-modal.swal2-icon-error.swal2-show', { timeout: 10000 })
  .should('be.visible'); // Wait for the error popup
  cy.get('.swal2-confirm.popup-btn.confirm-popup').click(); // Click "ตกลง"
  cy.get("div[class='krungsri-con-bold ng-tns-c1069438098-2 contain-sidenav-th'] :nth-child(2) :nth-child(2)").click(); // Click menu รายการรออนุมัติ
}

// Open คัดกรอง popup
export function filter() {
  cy.get("button[class='krungsri-con-bold btn-primary btn-lg w-btn-lg']").click(); // Click คัดกรอง
}

// Type reference number
export function enterRefNo() {
    cy.get('#mat-input-5').type(refNo) // Type reference number
}

// Click คัดกรอง
export function clickFilter(){
  cy.get("button[class='btn btn-sm btn-primary h-[44px] w-full md:w-[175px] text-base']").click(); // Click filter
  cy.get('table tbody tr', { timeout: 10000 }).eq(2).should('not.exist') // To make sure only 1 record display
}

// Check transaction details
export function checkTransactionDetail(){
  cy.get('table tbody tr :nth-child(5) div')
  .scrollIntoView() // Scroll right until element visisble
  .should('be.visible')
  .should('contain',inhouseKeyIn.accountFrom) // Check if account from is correct

  cy.get('table tbody tr :nth-child(7) div')
  .scrollIntoView() // Scroll right until element visisble
  .should('be.visible')
  .should('contain',inhouseKeyIn.accountTo) // Check if account to is correct

  cy.get('table tbody tr :nth-child(9) div')
  .scrollIntoView() // Scroll right until element visisble
  .should('be.visible')
  .should('contain',inhouseKeyIn.amount) // Check if amount is correct

  cy.log("Account from: " + inhouseKeyIn.accountFrom) // Log account from
  .log("Account to: " + inhouseKeyIn.accountTo) // Log account to
  .log("Amount: " + inhouseKeyIn.amount) // Log amount to
}

// Select checkbox and verify that approve button enabled.
export function selectCheckbox(){
  cy.get("div[class='w-full flex flex-row mb-6 gap-4 justify-end ng-star-inserted'] :nth-child(3)").should('be.disabled') // Verify that approve button must be disabled before selecting any checkbox
  cy.get('table tbody tr').first().find('input[type="checkbox"]').click(); // Select checkbox
  cy.get("div[class='w-full flex flex-row mb-6 gap-4 justify-end ng-star-inserted'] :nth-child(3)").should('be.enabled').click() // Verify that approve button must be enabled after selecting any checkbox and click it
}

// Click confirm to approve transaction
export function clickConfirm(){
  cy.get(".swal2-confirm.popup-btn.confirm-popup").click();
}

// Verify that transaction is completed
export function verifyTransactionCompletion(){
  cy.get('img[src="assets/coolicons-icons/Warning/Circle_Check.svg"]').should('be.visible'); // Check that green icon must display
  cy.get('#swal2-title').should('contain','อนุมัติรายการสำเร็จ') // Check label
  cy.get('.swal2-confirm.popup-btn.confirm-popup').should('contain','ตกลง').should('be.enabled').click(); // Check button 'ตกลง' must be enabled and click it
  cy.get('table tbody tr').its('length').then((rowCount) => {
    if (rowCount > 0) {
      cy.log('Rows exist in the table');
      cy.get('table tbody tr').first().find('input[type="checkbox"]').should('be.disabled')
    } else {
      cy.log('No rows in the table');
    }
  });
};
