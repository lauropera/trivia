import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";
import questionMock from "./helpers/questionsMock";

describe('Testes da página de ranking', () => {
  it('Feedback redirect', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionMock),
    }));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game')
  
    const btn = await screen.findByTestId('correct-answer');
    expect(btn).toBeInTheDocument()
    
  });
})
