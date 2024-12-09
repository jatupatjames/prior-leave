// utils.js
const selectDate = (htmlTag, day, targetMonth, targetYear, calendarPicker, nextButton, dateSelector, isCancelRequest = false) => {
    if (isCancelRequest) {
      // Cancel Leave Request: Select date from calendar grid
      const navigateToTargetDate = () => {
        cy.get(htmlTag.monthYearOnMyLeave)
          .invoke('text')
          .then((text) => {
            if (!text.includes(targetMonth) || !text.includes(targetYear)) {
              cy.get(nextButton).click();
              navigateToTargetDate(); // Recursive call to navigate to the right month
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
  
  module.exports = { selectDate };
  