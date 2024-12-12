/// <reference types="cypress" />

describe('Create Leave API Test', () => {
  it('should create a leave request successfully', () => {
    // Step 1: Fetch the token from a login endpoint
    cy.request({
      method: 'POST',
      url: 'https://go-api.priorsolution.co.th/dashboard/login/api/v1/token',
      body: {
        userId: 'test_owner',
        password: '11223344'
      },
    }).then((getResponse) => {
      cy.log(JSON.stringify(getResponse.body));
        // Extract the token from the GET response
        const token = getResponse.body.data.token; // Adjust based on the response structure
        // Log the token to verify
        cy.log(`Token: ${token}`);
  
    // Leave Request
    cy.request({
      method: 'POST',
      url: 'https://go-api.priorsolution.co.th/dashboard/leave-service/api/v1/create/leave',
      headers: {
        'Dashboard': `Bearer ${token}`
      },
      body: {
        date: ['2024-11-01', '2024-11-01'],
        employeeType: 'Outsource',
        leaveType: 'Annual',
      },
    }).then((response) => {
      // Assertions to verify the response
      expect(response.body).to.have.property('code', 'S0000');
      expect(response.body).to.have.property('message', 'success');
    });
  });
});
});