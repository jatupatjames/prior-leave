/// <reference types="cypress" />

const { data, formattedCurrentDate ,htmltag: htmlTag} = require('./Data.cy.js');

describe('Leave Request', () => {
  it('Leave Request', ()=>{

    // Open Webpage
    cy.visit(data.url)

    // Sign In
    cy.get(htmlTag.user).type(data.user)
    cy.get(htmlTag.pass).type(data.pass)
    cy.get(htmlTag.signInButton).click()

    // Click Leave Menu
    cy.contains(htmlTag.LeaveMenu).click()

    // Open leave popup
    cy.get(htmlTag.createLeave).click()

    // Select Start Date
    const selectDate = (day, targetMonth, targetYear) => {
      cy.get(htmlTag.startDateCalendarPicker).click();

    // Check if the Month Year is what we want
      const navigateToTargetDate = () => {
        cy.get(htmlTag.monthYearOnStartCalendar)
          .invoke('text')
          .then((text) => {
            if (!text.includes(targetMonth) || !text.includes(targetYear)) {
              cy.get(htmlTag.nextButtonOnStartCalendar).click();
              navigateToTargetDate(); // Recursive call
            }
          });
      };

      navigateToTargetDate();

      cy.get(htmlTag.dateOnStart)
        .contains(day)
        .click();
      cy.get(htmlTag.clickOutside).click(0, 0);
    };
    selectDate(data.startDate.day, data.startDate.month, data.startDate.year)

    cy.wait(2000);
    cy.log('check' + htmlTag.endDateDisable)

    if (data.halfDay === 'Yes') {
      cy.get(htmlTag.halfDay).click()
      cy.get(htmlTag.endDateDisable).should('have.attr', 'disabled');
      cy.log('Half Day is selected; skipping end date selection.');
    } else {
    //Select End Date
      const selectEndDate = (day, targetEndMonth, targetEndYear) => {
        cy.get(htmlTag.endDateCalendarPicker).click();

    // Check if the Month Year is what we want
        const navigateToTarget = () => {
          cy.get(htmlTag.monthYearOnEndCalendar)
            .invoke('text')
            .then((text) => {
              if (!text.includes(targetEndMonth) || !text.includes(targetEndYear)) {
                cy.get(htmlTag.nextButtonOnEndCalendar).click();
                navigateToTarget(); // Recursive call
              }
            });
        };
    
        navigateToTarget();

        cy.get(htmlTag.dateOnEnd)
          .contains(day)
          .click();
        cy.get(htmlTag.clickOutside).click(0, 0);
      };
      selectEndDate(data.endDate.day , data.endDate.month , data.endDate.year)
    }

    cy.wait(2000);

    // Select Leave Type
    cy.contains('label', data.leaveType)
    .parent() // Move to the parent element
    .find(htmlTag.radioButton) // Locate the radio button within the parent
    .check()
    .should('be.checked');

    // Select Employee Type
    cy.contains('label', data.employeeType)
    .parent() // Move to the parent element
    .find(htmlTag.radioButton) // Locate the radio button within the parent
    .check()
    .should('be.checked');

    // Submit Request
    // cy.contains('Submit').click()


    });
    });