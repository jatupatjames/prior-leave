const data = {
  url: 'https://prior-dashboard.web.app/login',
  user: 'jatupat.jirapraphai@priorsolution.co.th',
  pass: 'Jame23@#',

  // Input Value
  startDate: {
    day: '17',
    month: 'DECEMBER',
    year: '2024'
  },
  endDate: {
    day: '23',
    month: 'DECEMBER',
    year: '2024'
  },
  halfDay: 'Yes',
  leaveType: 'Business', // Annual , Sick , Business
  employeeType: 'Outsource' // Permanent , Outsource , Vendor , Trainee
};

// Current Date and change format to Month Year
const currentDate = new Date();
const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
const currentYear = currentDate.getFullYear();
const formattedCurrentDate = `${currentMonth} ${currentYear}`

const htmltag = {
  label: '.head-section .box-name',
  user: '.head-section .input-section .email-section input',
  pass: '.head-section .input-section .password-section',
  signInButton: "button[type='submit']",
  LeaveMenu: 'Leaving',

  // Leave Page
  calendarLabel: '.form-container h1',
  createLeave: '.button-box button',
  allCalender: '.tab button:nth-child(1)',
  leaveList: '.tab button:nth-child(2)',
  myLeaveCalendar: '.tab button:nth-child(3)',
  monthYear: '#AllCalendar h2',
  calendarDays: '#AllCalendar .calendar-container .calendar-grid .date',
  daysWithRequest: '#AllCalendar .calendar-container .calendar-grid .date > div',
  requestThatCanBeSeen: '#AllCalendar .calendar-container .calendar-grid .date > div > div',
  requestInNumber: '#AllCalendar .calendar-container .calendar-grid .date > div > span',

  // Level Modal
  modalTitle: 'app-create .modal-title',
  startDateLabel: ".modal-body label[for='start']",
  startDateCalendarPicker: '.form-start > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-icon-suffix > .mat-datepicker-toggle > .mdc-icon-button > .mat-mdc-button-touch-target',
  halfDayLabel: "label[for='halfDay']",
  endDateLabel: 'label[for="end"]',
  endDateCalendarPicker: '.form-end > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-icon-suffix > .mat-datepicker-toggle > .mdc-icon-button > .mat-mdc-button-touch-target',
  leaveTypeLabel: ':nth-child(6) fieldset .legend-type',
  annual: ':nth-child(6) > fieldset > :nth-child(2) > .form-check-label',
  sick: ':nth-child(6) > fieldset > :nth-child(3) > .form-check-label',
  business: ':nth-child(6) > fieldset > :nth-child(4) > .form-check-label',
  employeeTypeLabel: ':nth-child(7) fieldset .legend-type',
  permanent: ':nth-child(7) > fieldset > :nth-child(2) > .form-check-label',
  outsource: ':nth-child(7) > fieldset > :nth-child(3) > .form-check-label',
  vendor: ':nth-child(7) > fieldset > :nth-child(4) > .form-check-label',
  trainee: ':nth-child(7) > fieldset > :nth-child(5) > .form-check-label',
  buttonPermanent: ':nth-child(7) > fieldset > :nth-child(2) input',
  monthYearOnStartCalendar: '.mdc-button__label > span',
  nextButtonOnStartCalendar: 'button[aria-label="Next month"]',
  dateOnStart: 'tbody[class="mat-calendar-body"] .mat-focus-indicator',
  dateOnEnd: 'td[role="gridcell"] button span.mat-calendar-body-cell-content',
  nextButtonOnEndCalendar: 'button[aria-label="Next month"]',
  monthYearOnEndCalendar: '.mdc-button__label > span',
  radioButton: 'input[type="radio"]',
  halfDay: '#halfDay',
  endDateDisable: 'button[disabled="true"]',
  clickOutside: 'body'

};


module.exports = {
  data,
  formattedCurrentDate,
  htmltag
};