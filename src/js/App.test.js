import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const MockApp = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

describe('App', () => {
  it('shows login button if there is no access token', async () => {
    render(<MockApp />);
    const buttonElement = screen.getByRole('link', { name: /login to spotify/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
