/// <reference types="cypress" />

const { data, formattedCurrentDate ,htmltag: htmlTag} = require('./Data.cy.js');

describe('Cancel Leave Request', () => {
  it('Cancel Leave Request', ()=>{

    // Open Webpage
    cy.visit(data.url)

    // Sign In
    cy.get(htmlTag.user).type(data.user)
    cy.get(htmlTag.pass).type(data.pass)
    cy.get(htmlTag.signInButton).click()

    // Click Leave Menu
    cy.contains(htmlTag.LeaveMenu).click()

    // Open My Leave Calendar
    cy.get(htmlTag.myLeaveCalendar).click()

    cy.log('Dec' + '#LeaveCalendar .calendar-grid'.length)

    // Select Month Year to Cancel
    const selectDate = (day, targetMonth, targetYear) => {

    // Check if the Month Year is what we want
      const navigateToTargetDate = () => {
        cy.get(htmlTag.monthYearOnMyLeave)
          .invoke('text')
          .then((text) => {
            cy.log(text)
            cy.log(data.cancelDateFrom.day, data.cancelDateFrom.month, data.cancelDateFrom.year)
            if (!text.includes(targetMonth) || !text.includes(targetYear)) {
              cy.get(htmlTag.nextButtonOnMyLeave).click();
              navigateToTargetDate(); // Recursive call
            }
          });
      };

      navigateToTargetDate();

      cy.log('Jan' + '#LeaveCalendar .calendar-grid'.length)

      cy.get('#LeaveCalendar .date.ng-star-inserted span').invoke('text').then((text) => {
        cy.log(text)
        const date = Number(text)
        if (date === htmlTag.data.cancelDateFrom.day){
          cy.get('#LeaveCalendar .date.ng-star-inserted div div.p-element.event-dot.ng-star-inserted')
          .trigger('mouseover')
        }
      })

    };

    selectDate(data.cancelDateFrom.day, data.cancelDateFrom.month, data.cancelDateFrom.year)


    });
    });