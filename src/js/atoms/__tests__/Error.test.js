import { render, screen } from '@testing-library/react';
import Error from '../Error';

describe('Error', () => {
  it('displays error message', async () => {
    render(<Error message="I am an error message" />);
    const errorMessage = screen.getByText(/i am an error message/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
