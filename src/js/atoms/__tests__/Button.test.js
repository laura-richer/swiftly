import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button rendering', () => {
  it('Renders a button if no tag prop exists', async () => {
    render(<Button />);
    const buttonElement = screen.queryByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('Renders a link if tag prop is "a" and link prop exists', async () => {
    render(<Button tag="a" link="/" />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
  });

  it('doesnt render a link if link prop is empty', async () => {
    render(<Button tag="a" />);
    const linkElement = screen.queryByRole('link');
    expect(linkElement).not.toBeInTheDocument();
  });
});
