/// <reference types="cypress" />

const { data, htmltag: htmlTag } = require('./Data.cy.js');
const { selectDate } = require('./utils.js'); // Import the reusable function

describe('Leave Request', () => {
  it('Leave Request', () => {
    // Open Webpage
    cy.visit(data.url);

    // Sign In
    cy.get(htmlTag.user).type(data.user);
    cy.get(htmlTag.pass).type(data.pass);
    cy.get(htmlTag.signInButton).click();

    // Click Leave Menu
    cy.contains(htmlTag.LeaveMenu).click();

    // Open leave popup
    cy.get(htmlTag.createLeave).click();

    // Select Start Date
    selectDate(htmlTag, data.startDate.day, data.startDate.month, data.startDate.year, htmlTag.startDateCalendarPicker, htmlTag.nextButtonOnStartCalendar, htmlTag.dateOnStart);

    cy.wait(2000);
    cy.log('check' + htmlTag.endDateDisable);

    if (data.halfDay === 'Yes') {
      cy.get(htmlTag.halfDay).click();
      cy.get(htmlTag.endDateDisable).should('have.attr', 'disabled');
      cy.log('Half Day is selected; skipping end date selection.');
    } else {
      // Select End Date
      selectDate(htmlTag, data.endDate.day, data.endDate.month, data.endDate.year, htmlTag.endDateCalendarPicker, htmlTag.nextButtonOnEndCalendar, htmlTag.dateOnEnd);
    }

    cy.wait(2000);

    // Select Leave Type
    cy.contains('label', data.leaveType)
      .parent()
      .find(htmlTag.radioButton)
      .check()
      .should('be.checked');

    // Select Employee Type
    cy.contains('label', data.employeeType)
    .parent()
    .find(htmlTag.radioButton)
    .check()
    .should('be.checked');

    // Submit Request
    cy.contains('Submit').click()

  });
});

