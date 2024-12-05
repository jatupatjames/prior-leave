/// <reference types="cypress" />

const { data, formattedCurrentDate ,htmltag: htmlTag} = require('./Data.cy.js');
let totalLeaveRequest = 0

describe('Leave Request', () => {
  it('Leave Request', ()=>{

    // Open Webpage
    cy.visit(data.url)

    // Login Page Assertion
    cy.get(htmlTag.label).should('be.visible').should('contain','Back Office')
    cy.get(htmlTag.user).should('be.visible')
    cy.get(htmlTag.pass).should('be.visible')
    cy.get(htmlTag.signInButton).should('be.visible').should('contain','Sign in')

    // Sign In
    cy.get(htmlTag.user).type(data.user)
    cy.get(htmlTag.pass).type(data.pass)
    cy.get(htmlTag.signInButton).click()

    // Click Leave Menu
    cy.contains(htmlTag.LeaveMenu).click()

    // Leave Page Assertion
    cy.get(htmlTag.calendarLabel).should('be.visible').should('contain','Calendar')
    cy.get(htmlTag.createLeave).should('be.visible').should('contain','Create Leave')
    cy.get(htmlTag.allCalender).should('be.visible').should('contain','All Calendar')
    cy.get(htmlTag.leaveList).should('be.visible').should('contain','Leave List')
    cy.get(htmlTag.myLeaveCalendar).should('be.visible').should('contain','My Leave Calendar')

    // Compare if the website displaying correct month year
    cy.get(htmlTag.monthYear).invoke('text').then((dateText) => {
    const displayedMonthYear = dateText.trim();
    expect(displayedMonthYear).to.equal(formattedCurrentDate)
  })

  // Count total days of the month
    cy.get(htmlTag.calendarDays).then(($totalDays) => {
    cy.log('Total days in this month = ' + $totalDays.length); 
  });

// Count the total of request in number
cy.get(htmlTag.requestInNumber).each((item) => {
  cy.wrap(item)
    .invoke('text') // Get the text of the element
    .then((text) => {
      // Convert the text to a number and add it to the total
      const numberValue = parseFloat(text.replace(/[^\d.-]/g, ''));
      if (!isNaN(numberValue)) {
        totalLeaveRequest += numberValue;
      }
    })
}).then(() => {
  cy.log('Total requests in number:' + totalLeaveRequest);

// Total up the request can be seen and request in number
cy.get(htmlTag.requestThatCanBeSeen).then(($totalSeenRequest) => {
  const totalSeenRequest = $totalSeenRequest.length;
  totalLeaveRequest += totalSeenRequest;
  cy.log('Total days with requests that can be seen:' + totalSeenRequest);
  cy.log('Leave request in total:' + totalLeaveRequest); // Log updated total
});
});

// Open leave popup
cy.get(htmlTag.createLeave).click()

// Leave popup assertion
cy.get(htmlTag.modalTitle).should('be.visible').should('contain','Create Leave Date')

cy.get(htmlTag.startDateLabel).should('be.visible').should('contain','Start Date:')
cy.get(htmlTag.startDateCalendarPicker).should('be.visible')

cy.get(htmlTag.halfDayLabel).should('be.visible').should('contain','Half Day')

cy.get(htmlTag.endDateLabel).should('be.visible').should('contain','End Date:')
cy.get(htmlTag.endDateCalendarPicker).should('be.visible')

cy.get(htmlTag.leaveTypeLabel).should('be.visible').should('contain','Leave Type:')
cy.get(htmlTag.annual).should('be.visible').should('contain','Annual')
cy.get(htmlTag.sick).should('be.visible').should('contain','Sick')
cy.get(htmlTag.business).should('be.visible').should('contain','Business')

cy.get(htmlTag.employeeTypeLabel).should('be.visible').should('contain','Employee Type:')
cy.get(htmlTag.permanent).should('be.visible').should('contain','Permanent')
cy.get(htmlTag.buttonPermanent).should('be.visible').and('be.checked') // Check if it's defaulted
cy.get(htmlTag.outsource).should('be.visible').should('contain','Outsource')
cy.get(htmlTag.vendor).should('be.visible').should('contain','Vendor')
cy.get(htmlTag.trainee).should('be.visible').should('contain','Trainee')

});
});