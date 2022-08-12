import React from 'react';
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';
import token from './mocks/tokenMock';
import questions from './mocks/questionsMock';

describe('Testes com a tela de Feedback', () => {
  afterEach(() => jest.restoreAllMocks());
  beforeEach(() => window.localStorage.clear());

  it('Verifica se Could be better aparece na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/feedback');

    const badFeedback = screen.getByText(/Could be better/i);
    expect(badFeedback).toBeInTheDocument();
  });

  it('Verifica se Well Done aparece na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      player: { assertions: 3, name: 'Aloha', score: 3, gravatarEmail: '' },
    });
    history.push('/feedback');

    const goodFeedback = screen.getByText(/Well Done/i);
    expect(goodFeedback).toBeInTheDocument();
  });

  it('Verifica se os dados da pessoa aparecem na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      player: { assertions: 3, name: 'Daniel', score: 4, gravatarEmail: '' },
    });
    history.push('/feedback');

    const name = screen.getByText(/Daniel/i);
    expect(name).toBeInTheDocument();
    const score = screen.getAllByText(/4/i);
    expect(score[1]).toBeInTheDocument();
  });

  it('Verifica se a ordem do score é decrescente aos pontos', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(token),
    });

    const { history } = renderWithRouterAndRedux(<App />, {
      player: {
        name: 'Marcus',
        score: 26,
        assertions: 3,
        gravatarEmail: 'marcus@teste.com',
      },
    });
    history.push('/feedback');

    const playAgainBtn = screen.getByTestId('btn-play-again');
    userEvent.click(playAgainBtn);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');
    const MAX_QUESTIONS = 5;

    userEvent.type(emailInput, 'lauro@teste.com');
    userEvent.type(nameInput, 'Lauro');
    userEvent.click(playBtn);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questions),
    });

    URL = `https://opentdb.com/api.php?amount=5&token=${token.token}`;
    await waitFor(() => expect(fetch).toHaveBeenCalledWith(URL));

    for (let question = 0; question < MAX_QUESTIONS; question += 1) {
      const btn = await screen.findAllByTestId(/wrong-answer-/i);
      userEvent.click(btn[0]);
      const nextBtn = screen.getByTestId('btn-next');
      userEvent.click(nextBtn);
    }

    const rankBtn = screen.getByTestId('btn-ranking');
    userEvent.click(rankBtn);

    const marcus = screen.getByTestId('player-name-0');
    const lauro = screen.getByTestId('player-name-1');
    expect(marcus).toHaveTextContent('Marcus');
    expect(lauro).toHaveTextContent('Lauro');
  });

  it('Testando o button Play Again', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const buttonPlayAgain = screen.getByText(/Play Again/i);
    expect(buttonPlayAgain).toBeInTheDocument();
    userEvent.click(buttonPlayAgain);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testando o button Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const buttonRanking = screen.getByText(/Ranking/i);
    expect(buttonRanking).toBeInTheDocument();
    userEvent.click(buttonRanking);

    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  });
});
