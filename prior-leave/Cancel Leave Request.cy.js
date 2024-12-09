/// <reference types="cypress" />

const { data, htmltag: htmlTag } = require('./Data.cy.js');
const { selectDate } = require('./utils.js'); // Import the reusable function

describe('Cancel Leave Request', () => {
  it('Cancel Leave Request', () => {
    // Open Webpage
    cy.visit(data.url);

    // Sign In
    cy.get(htmlTag.user).type(data.user);
    cy.get(htmlTag.pass).type(data.pass);
    cy.get(htmlTag.signInButton).click();

    // Click Leave Menu
    cy.contains(htmlTag.LeaveMenu).click();

    // Open My Leave Calendar
    cy.get(htmlTag.myLeaveCalendar).click();

    cy.log('Dec' + '#LeaveCalendar .calendar-grid'.length);

    // Select Month Year to Cancel
    selectDate(htmlTag, data.cancelDateFrom.day, data.cancelDateFrom.month, data.cancelDateFrom.year, null, htmlTag.nextButtonOnMyLeave, htmlTag.dateToCancel, true);

    // Trigger hover effect on the selected date
    cy.contains(htmlTag.dateToCancel, data.cancelDateFrom.day)
      .parent()
      .find(htmlTag.nameIcon)
      .trigger('mouseover');
  });
});
