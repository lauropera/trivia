import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe('Testes com a tela de Feedback', () => {
  beforeEach(() => window.localStorage.clear())
  it('Verifica se Could be better aparece na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />)

    history.push('/feedback')

    const badFeedback = screen.getByText(/Could be better/i);
    expect(badFeedback).toBeInTheDocument();
  });
  it('Verifica se Well Done aparece na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      player:{assertions: 3, name: '', score: 0, gravatarEmail: ''}
    })

    history.push('/feedback')

    const goodFeedback = screen.getByText(/Well Done/i);
    expect(goodFeedback).toBeInTheDocument();
  });
  it('Verifica se os dados da pessoa aparecem na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      player:{assertions: 3, name: 'Daniel', score: 4, gravatarEmail: ''}
    })
    history.push('/feedback')

    const name = screen.getByText(/Daniel/i);
    expect(name).toBeInTheDocument();
    const score = screen.getAllByText(/4/i);
    expect(score[1]).toBeInTheDocument();
  });
  it('Verifica ordem do score', () => {
    let { history } = renderWithRouterAndRedux(<App />, {
      player:{assertions: 1, name: 'Marcus', score: 2, gravatarEmail: ''}
    })

    history.push('/feedback')
    history.push('/')
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailInput, 'teste@teste.com');
    const nameInput = screen.getByTestId('input-player-name');
    userEvent.type(nameInput, 'Albert');
    const inputBtn = screen.getByTestId('btn-play');
    
    userEvent.click(inputBtn);
    history.push('/feedback')
    history.push('/ranking')

    const score1 = screen.getByText(/Marcus/i);
    expect(score1).toBeInTheDocument();
    const score2 = screen.getByText(/2/i);
    expect(score2).toBeInTheDocument();
    
  });
  it('Testando o button Play Again', () => {
    const { history } = renderWithRouterAndRedux(<App />)

    history.push('/feedback')

    const buttonPlayAgain = screen.getByText(/Play Again/i);
    expect(buttonPlayAgain).toBeInTheDocument();

    userEvent.click(buttonPlayAgain)
    const { location: { pathname } } = history;
    expect(pathname).toBe('/')
  });
  
  it('Testando o button Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />)

    history.push('/feedback')

    const buttonRanking = screen.getByText(/Ranking/i);
    expect(buttonRanking).toBeInTheDocument();
    
    userEvent.click(buttonRanking)
    const { location: { pathname } } = history;
    expect(pathname).toBe('/ranking')
  });
});