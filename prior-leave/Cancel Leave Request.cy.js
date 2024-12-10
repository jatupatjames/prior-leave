/// <reference types="cypress" />

const { data, htmltag: htmlTag } = require('./Data.cy.js');
const { selectDate } = require('./utils.js'); // Import the reusable function
import 'cypress-real-events';

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

    cancelDates.forEach((date) => {
    // Select Month Year to Cancel
    selectDate(htmlTag, data.cancelDates.day, data.cancelDates.month, data.cancelDates.year, null, htmlTag.nextButtonOnMyLeave, htmlTag.dateToCancel, true);

    // Trigger hover effect on the selected date and click "X"
    cy.contains(htmlTag.dateToCancel, new RegExp(`^${data.cancelDate.day}$`))
    .parent()
    .find(htmlTag.nameIcon)
    .realHover()
    .find('.delete-icon')
    .click()

    // Click 'Yes'
    cy.contains('Yes').click()
  })
});
})
