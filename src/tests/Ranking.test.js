import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes da página de ranking', () => {
  it('Verifica se quando clicar no botão home leva para pagina principal', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');

    const btn = screen.getByTestId('btn-go-home');
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
