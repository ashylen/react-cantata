import { isYouTubeUrl } from './isYouTubeUrl';

describe('isYoutubeUrl valid?', () => {
  test('YouTube URL is invalid', () => {
    expect(isYouTubeUrl('TEST')).toMatch('Must be valid YouTubde URL');
  });

  test('Default YouTube URL', () => {
    expect(isYouTubeUrl('https://www.youtube.com/watch?v=KhGNOJg-1s4')).toBeUndefined();
  });

  test('Short YouTube URL', () => {
    expect(isYouTubeUrl('https://youtu.be/KhGNOJg-1s4')).toBeUndefined();
  });
});
