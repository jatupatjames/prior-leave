/// <reference types="cypress" />

describe('Create Leave API Test', () => {
  let token;

  beforeEach(() => {
    // Step 1: Fetch the token from a login endpoint
    cy.request({
      method: 'POST',
      url: 'https://go-api.priorsolution.co.th/dashboard/login/api/v1/token',
      body: {
        userId: 'test_owner',
        password: '11223344',
      },
    }).then((getResponse) => {
      cy.log(JSON.stringify(getResponse.body));
      // Extract the token from the response body
      token = getResponse.body.data.token; // Store the token in the higher scope
      cy.log(`Token: ${token}`); // Log the token to verify
    });
  });

  it('Cancel the date that is valid', () => {
    // Cancel Request
    cy.request({
      method: 'POST',
      url: 'https://go-api.priorsolution.co.th/dashboard/leave-service/api/v1/cancel/leave',
      headers: {
        Dashboard: `Bearer ${token}`,
      },
      body: {
        date: ['2024-12-20'],
      },
    }).then((response) => {
      // Assertions to verify the response
      expect(response.body).to.have.property('code', 'S0000');
      expect(response.body).to.have.property('message', 'success');
    });
  });
});

