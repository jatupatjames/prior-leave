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
  
  module.exports = { selectDate };
  