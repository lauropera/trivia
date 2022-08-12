import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';
import token from './mocks/tokenMock';
import questions from './mocks/questionsMock';

describe('Testes com a tela de Ranking', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    window.localStorage.clear();
  });

  it('Verifica se quando clicar no botão home leva para pagina principal', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');

    const btn = screen.getByTestId('btn-go-home');
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
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

    userEvent.type(emailInput, 'lauro@teste.com');
    userEvent.type(nameInput, 'Lauro');
    userEvent.click(playBtn);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questions),
    });

    URL = `https://opentdb.com/api.php?amount=5&token=${token.token}`;
    await waitFor(() => expect(fetch).toHaveBeenCalledWith(URL));

    const MAX_QUESTIONS = 5;
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
});
