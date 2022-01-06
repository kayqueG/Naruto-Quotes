import { render, screen , fireEvent} from '@testing-library/react';
import App from './App';
import {rest} from "msw";
import { setupServer } from "msw/node";

const response = { speaker: 'test speaker', quote: 'test quote' };

const server = setupServer(
  rest.get(process.env.REACT_APP_API, (req, res, ctx) => {
    return res(ctx.json(response));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders the app with a button,a quote and a button', () => {
  
  render(<App />);

  const buttonEl= screen.getByRole("button");
  const imageEl= screen.getByRole("img");

  expect(buttonEl).toBeInTheDocument();
  expect(imageEl).toBeInTheDocument();

});

test("calls api on button click and update it response", async () => {
  render(<App/>);

  const quoteEl= await screen.findByText(/test quote/i);

  expect(quoteEl).toBeInTheDocument();

});

test('calls api on button click and update its text', async () => {
  const customResponse = {
    speaker: 'custom test speaker',
    quote: 'teste quote'
  };

  render(<App />);

  server.use(
    rest.get(process.env.REACT_APP_API, (req, res, ctx) => {
      return res(ctx.json(customResponse));
    })
  );

  const buttonEl = screen.getByRole('button');

  fireEvent.click(buttonEl);
  const quoteEl = await screen.findByText(/custom test speaker/i);

  expect(quoteEl).toBeInTheDocument();
});

test("calls api on startup and renders it response",()=>{
  render(<App />);

  const quoteEl= await screen.findByText(response.quote);

  expect(quoteEl).toBeInTheDocument();
  
})
