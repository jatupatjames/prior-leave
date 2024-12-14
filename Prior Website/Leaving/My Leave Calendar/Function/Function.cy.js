/// <reference types="cypress" />

const { data,formattedCurrentDate ,htmltag: htmlTag } = require('../Data/Data.cy.js');
const { cancelDates } = data;
import 'cypress-real-events';

let totalLeaveRequest = 0

const monthMap = {
  JANUARY: 1,
  FEBRUARY: 2,
  MARCH: 3,
  APRIL: 4,
  MAY: 5,
  JUNE: 6,
  JULY: 7,
  AUGUST: 8,
  SEPTEMBER: 9,
  OCTOBER: 10,
  NOVEMBER: 11,
  DECEMBER: 12,
};

const selectDate = (htmlTag, day, targetMonth, targetYear, calendarPicker, prevButton, nextButton, dateSelector, isCancelRequest = false) => {
  if (isCancelRequest) {
    // Cancel Leave Request: Select date from calendar grid
    const navigateToTargetDate = () => {
      cy.get(htmlTag.monthYearOnMyLeave)
        .invoke('text')
        .then((text) => {
          const [currentMonth , currentYear] = text.split(' ')
          const currentMonthValue = monthMap[currentMonth.toUpperCase()];
          const targetMonthValue = monthMap[targetMonth];
          const currentYearValue = Number(currentYear);
          const targetYearValue = Number(targetYear);
          if (currentYearValue < targetYearValue || (currentYearValue === targetYearValue && currentMonthValue < targetMonthValue)) {
          // Click "Next" button
          cy.get(nextButton).click();
          navigateToTargetDate(); // Call recursively for the next iteration
        } else if (currentYearValue > targetYearValue || (currentYearValue === targetYearValue && currentMonthValue > targetMonthValue)) {
          // Click "Previous" button
          cy.get(prevButton).click();
          navigateToTargetDate(); // Call recursively for the previous iteration
        } else {
          cy.log(`Reached target date: ${targetMonth} ${targetYear}`);
        }
      });
  };

  navigateToTargetDate();

    // Find the date to cancel
    cy.contains(dateSelector, day)
      .parent()
      .find(htmlTag.nameIcon)
      .trigger('mouseover');
  } else {
    // Normal Leave Request: Use calendar picker
    cy.get(calendarPicker).click();

    const navigateToTargetDate = () => {
      cy.get(htmlTag.monthYearOnStartCalendar)
        .invoke('text')
        .then((text) => {
          if (!text.includes(targetMonth) || !text.includes(targetYear)) {
            cy.get(nextButton).click();
            navigateToTargetDate(); // Recursive call
          }
        });
    };

    navigateToTargetDate();

    cy.get(dateSelector)
      .contains(day)
      .click();
    cy.get(htmlTag.clickOutside).click(0, 0);
  }
};

// Function to create a leave request
export const createLeave = () => {
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
      selectDate(
        htmlTag,
        data.startDate.day,
        data.startDate.month,
        data.startDate.year,
        htmlTag.startDateCalendarPicker,
        null,
        htmlTag.nextButtonOnStartCalendar,
        htmlTag.dateOnStart
      );

      cy.log('Check: ' + htmlTag.endDateDisable);
      cy.wait(2000);

      if (data.halfDay === 'Yes') {
        cy.get(htmlTag.halfDay).click();
        cy.get(htmlTag.endDateDisable).should('have.attr', 'disabled');
        cy.log('Half Day is selected; skipping end date selection.');
      } else {
        // Select End Date
        selectDate(
          htmlTag,
          data.endDate.day,
          data.endDate.month,
          data.endDate.year,
          htmlTag.endDateCalendarPicker,
          null,
          htmlTag.nextButtonOnEndCalendar,
          htmlTag.dateOnEnd
        );
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
      cy.contains('Submit').click();
      cy.wait(2000);
    });
  };

// Function to cancel leave request
export const cancelLeave = () => {
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

      cy.log('Dec: ' + '#LeaveCalendar .calendar-grid'.length);

      cancelDates.forEach((date) => {
        cy.log(`Attempting to cancel leave on: ${date.day} ${date.month} ${date.year}`);

        // Select Month/Year to Cancel
        selectDate(
          htmlTag,
          date.day,
          date.month,
          date.year,
          null,
          htmlTag.prevButtonOnMyLeave, // Fixed `htmltag` to `htmlTag`
          htmlTag.nextButtonOnMyLeave,
          htmlTag.dateToCancel,
          true
        );

        // Trigger hover effect on the selected date and click "X"
        cy.contains(htmlTag.dateToCancel, new RegExp(`^${date.day}$`))
          .parent()
          .find(htmlTag.nameIcon)
          .realHover()
          .find('.delete-icon')
          .click();

        // Click 'Yes'
        cy.contains('Yes').click();
      });
    });
  };

export const pageAssertion = () => {
  it('Page Assertion', ()=>{

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
}