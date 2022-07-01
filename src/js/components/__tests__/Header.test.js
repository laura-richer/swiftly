import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header UI', () => {
  it('displays current user data', async () => {
    render(<Header />);
    const userData = await screen.findByRole('heading');
    expect(userData).toBeInTheDocument();
  });

  // it('displays current user image', async () => {
  //   render(<Header />);
  //   const userImage = screen.getByRole('img');
  //   expect(userImage).toBeInTheDocument();
  // });
});
