import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Feedback from "../pages/Feedback";

describe('Testes com a tela de Feedback', () => {
  beforeEach(() => window.localStorage.clear())
  it('Verifica se Could be better aparece na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />)

    history.push('/feedback')

    const badFeedback = screen.getByText(/Could be better/i);
    expect(badFeedback).toBeInTheDocument();
  });
  it('Verifica se Well Done aparece na tela', () => {
    renderWithRouterAndRedux(<Feedback />, {
      player:{assertions: 3, name: 'Aloha', score: 3, gravatarEmail: ''}
    })

    const goodFeedback = screen.getByText(/Well Done/i);
    expect(goodFeedback).toBeInTheDocument();
  });
  it('Verifica se os dados da pessoa aparecem na tela', () => {
    renderWithRouterAndRedux(<Feedback />, {
      player:{assertions: 3, name: 'Daniel', score: 4, gravatarEmail: ''}
    })

    const name = screen.getByText(/Daniel/i);
    expect(name).toBeInTheDocument();
    const score = screen.getAllByText(/4/i);
    expect(score[1]).toBeInTheDocument();
  });
  it('Verifica ordem do score', () => {
    renderWithRouterAndRedux(<Feedback />, {
      player:{assertions: 1, name: 'Marcus', score: 2, gravatarEmail: ''}
    })
    const { history } = renderWithRouterAndRedux(<App />)
    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailInput, 'teste@teste.com');
    const nameInput = screen.getByTestId('input-player-name');
    userEvent.type(nameInput, 'Lauro');
    const inputBtn = screen.getByTestId('btn-play');
    userEvent.click(inputBtn);

    history.push('/feedback')
    history.push('/ranking')

    const marcus = screen.getByTestId('player-name-0');
    expect(marcus).toBeInTheDocument();

    const lauro = screen.getByTestId('player-name-1');
    expect(lauro).toBeInTheDocument();
    
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