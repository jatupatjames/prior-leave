/// <reference types="cypress" />

describe('Create Leave API Test', () => {
  it('should create a leave request successfully', () => {
    cy.request({
      method: 'POST',
      url: 'https://go-api.priorsolution.co.th/dashboard/leave-service/api/v1/cancel/leave',
      headers: {
        'Dashboard': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjpcInRlc3Rfb3duZXJcIixcIm9iamVjdHNcIjpbXCJPV05FUlwiXSxcImVtcGxveWVlVHlwZVwiOm51bGx9IiwiaWF0IjoxNzMzNzU3ODQxLCJleHAiOjE3MzM3Nzk0NDF9.RMneLc3oqYhjArerCfaSwpylmKZ8pjRm52ZsxmxJGOoB_Ydm0dpaww2vGBmM2625534xvCnVrH0qCtwV-tgaLQ'
      },
      body: {
        date: ['2024-12-17']
      },
    }).then((response) => {
      // Assertions to verify the response
      expect(response.body).to.have.property('code', 'S0000');
      expect(response.body).to.have.property('message', 'success');
    });
  });
});