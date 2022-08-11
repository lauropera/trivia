import React from "react";
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Game from "../pages/Game";

const token = '7a25d47506b0a23f9ca8b71ccb32e60a4791699cd44a3b41e60ed564782510f1';
const response = {
"response_code": 0,
"results": [
  {
    "category": "History",
    "type": "multiple",
    "difficulty": "medium",
    "question": "Which infamous European traitor was known as &quot;the last person to enter Parliament with honest intentions&quot;?",
    "correct_answer": "Guy Fawkes",
    "incorrect_answers": [
      "Robert Catesby",
      "Francis Tresham",
      "Everard Digby"
    ]
  },
  {
    "category": "Entertainment: Japanese Anime & Manga",
    "type": "multiple",
    "difficulty": "easy",
    "question": "In &quot;Future Diary&quot;, what is the name of Yuno Gasai&#039;s Phone Diary?",
    "correct_answer": "Yukiteru Diary",
    "incorrect_answers": [
      "Murder Diary",
      "Escape Diary ",
      "Justice Diary "
    ]
  },
  {
    "category": "Entertainment: Books",
    "type": "multiple",
    "difficulty": "medium",
    "question": "The title of Adolf Hitler&#039;s autobiography &quot;Mein Kampf&quot; is what when translated to English?",
    "correct_answer": "My Struggle",
    "incorrect_answers": [
      "My Hatred",
      "My Sadness",
      "My Desire"
    ]
  },
  {
    "category": "Entertainment: Board Games",
    "type": "multiple",
    "difficulty": "easy",
    "question": "The board game Monopoly takes its street names from which real American city?",
    "correct_answer": "Atlantic City, New Jersey",
    "incorrect_answers": [
      "Las Vegas, Nevada",
      "Duluth, Minnesota",
      "Charleston, South Carolina"
    ]
  },
  {
    "category": "Geography",
    "type": "multiple",
    "difficulty": "hard",
    "question": "Which country is the Taedong River in?",
    "correct_answer": "North Korea",
    "incorrect_answers": [
      "South Korea",
      "Japan",
      "China"
    ]
  }
]
}

describe('Testes da página de ranking', () => {
  afterEach(() => jest.clearAllMocks());
  it('Feedback redirect', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(response),
    }));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game')
  
    const btn = await screen.findByTestId('correct-answer');
    expect(btn).toBeInTheDocument()
    
  });
})
