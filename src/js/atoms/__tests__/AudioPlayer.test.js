import { render, screen } from '@testing-library/react';
import AudioPlayer from '../AudioPlayer';

describe('Audio player rendering', () => {
  it('Doenst render an image if it doesnt exist', async () => {
    const track = {
      album: {
        image: undefined,
        url: '/',
      },
      artist: {
        name: 'Artist name',
        url: '/',
      },
      url: '/',
      name: 'Track name',
      previewUrl: '/',
    };

    render(<AudioPlayer track={track} />);
    const imgElement = screen.queryByRole('img');
    expect(imgElement).not.toBeInTheDocument();
  });

  it('Doenst render the audio snippet if it doesnt exist', async () => {
    const track = {
      album: {
        image: '/',
        url: '/',
      },
      artist: {
        name: 'Artist name',
        url: '/',
      },
      url: '/',
      name: 'Track name',
      previewUrl: undefined,
    };

    render(<AudioPlayer track={track} />);
    const audioElement = screen.queryByTestId('audio-player');
    expect(audioElement).not.toBeInTheDocument();
  });
});
