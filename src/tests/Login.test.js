import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes com a tela de Login', () => {
  it('Verifica se a logo do jogo Trivia aparece na tela', () => {
    renderWithRouterAndRedux(<App />);

    const triviaLogoEl = screen.getByRole('img', { name: 'logo' });
    expect(triviaLogoEl).toBeInTheDocument();
  });

  it('Verifica se o formulário de Login aparece na tela', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    expect(emailInput).toBeInTheDocument();

    const nameInput = screen.getByTestId('input-player-name');
    expect(nameInput).toBeInTheDocument();

    const inputBtn = screen.getByTestId('btn-play');
    expect(inputBtn).toBeInTheDocument();
  });

  it('Verifica se o botão do formulário inicia desativado', () => {
    renderWithRouterAndRedux(<App />);

    const inputBtn = screen.getByTestId('btn-play');
    expect(inputBtn).toBeDisabled();
  });

  it('Verifica se o botão é ativado ao preencher o formulário e ao clicar é enviado para página de game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    expect(emailInput).toHaveValue('');

    userEvent.type(emailInput, 'teste@teste.com');
    expect(emailInput).toHaveValue('teste@teste.com');

    const nameInput = screen.getByTestId('input-player-name');
    expect(nameInput).toHaveValue('');

    userEvent.type(nameInput, 'Albert');
    expect(nameInput).toHaveValue('Albert');

    const inputBtn = screen.getByTestId('btn-play');
    expect(inputBtn).toBeEnabled();

    userEvent.click(inputBtn);

    const profileName = await screen.findByTestId('header-player-name');
    expect(profileName).toBeInTheDocument();

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/game');
  });

  it('Verifica se o botão de configurações aparece na tela', () => {
    renderWithRouterAndRedux(<App />);

    const configBtn = screen.getByRole('button', { name: /configurações/i });
    expect(configBtn).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão de configurações é redirecionado para página de configurações', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const configBtn = screen.getByRole('button', { name: /configurações/i });
    expect(configBtn).toBeInTheDocument();

    userEvent.click(configBtn);

    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/settings');
  });
});
