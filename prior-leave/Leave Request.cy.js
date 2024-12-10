/// <reference types="cypress" />

const { data, htmltag: htmlTag } = require('./Data.cy.js');
const { cancelDates } = data;
const { selectDate } = require('./utils.js'); // Import the reusable function
import 'cypress-real-events';

describe('Leave Request', () => {
  beforeEach(() => { 
  // Open Webpage
  cy.visit(data.url);

  // Sign In
  cy.get(htmlTag.user).type(data.user);
  cy.get(htmlTag.pass).type(data.pass);
  cy.get(htmlTag.signInButton).click();

  // Click Leave Menu
  cy.contains(htmlTag.LeaveMenu).click();
  })

  it('Leave Request', () => {
    // Open leave popup
    cy.get(htmlTag.createLeave).click();

    // Select Start Date
    selectDate(htmlTag, data.startDate.day, data.startDate.month, data.startDate.year, htmlTag.startDateCalendarPicker, htmlTag.nextButtonOnStartCalendar, htmlTag.dateOnStart);
    cy.log('check' + htmlTag.endDateDisable);

    cy.wait(2000)

    if (data.halfDay === 'Yes') {
      cy.get(htmlTag.halfDay).click();
      cy.get(htmlTag.endDateDisable).should('have.attr', 'disabled');
      cy.log('Half Day is selected; skipping end date selection.');
    } else {
      // Select End Date
      selectDate(htmlTag, data.endDate.day, data.endDate.month, data.endDate.year, htmlTag.endDateCalendarPicker, htmlTag.nextButtonOnEndCalendar, htmlTag.dateOnEnd);
    }

    cy.wait(2000)
    
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

  it('Cancel Leave Request', () => {
    // Open My Leave Calendar
    cy.get(htmlTag.myLeaveCalendar).click();

    cy.log('Dec' + '#LeaveCalendar .calendar-grid'.length);

    cancelDates.forEach((date) => {
      cy.log(`Attempting to cancel leave on: ${date.day} ${date.month} ${date.year}`);
    // Select Month Year to Cancel
    
    selectDate(
      htmlTag, 
      date.day, 
      date.month, 
      date.year, 
      null, 
      htmlTag.nextButtonOnMyLeave, 
      htmlTag.dateToCancel, 
      true);

    // Trigger hover effect on the selected date and click "X"
    cy.contains(htmlTag.dateToCancel, new RegExp(`^${date.day}$`))
    .parent()
    .find(htmlTag.nameIcon)
    .realHover()
    .find('.delete-icon')
    .click()

    // Click 'Yes'
    cy.contains('Yes').click()
  })
});
});

