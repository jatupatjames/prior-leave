import * as allFunctions  from './Function/Function.cy.js';
Object.assign(global, allFunctions);

describe('Create Transaction', () => {
    beforeEach(() => {
        login();
      });

    it('Maker Create Transaction', () => {
        selectUser("MAKER 1");
        clickMenuInhouse();
        selectAccountFrom();
        selectAccountTo();
        amount();
        clickNext();
        verifyPreviewScreen();
        submitTransaction();
        verifySuccessScreen();
    });

    it('Checker Approve Transaction', () => {
        selectUser("CHECKER 1");
        clickMenuApprove();
        filter();
        enterRefNo();
        clickFilter();
        checkTransactionDetail();
        selectCheckbox();
        clickConfirm();
        verifyTransactionCompletion();
    });
  });