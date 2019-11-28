import { GetYouTubeVideoId } from './GetYouTubeVideoId';

test('Check if videoId is valid', () => {
  expect(GetYouTubeVideoId('https://www.youtube.com/watch?v=KhGNOJg-1s4')).toMatch('KhGNOJg-1s4');
});

test('Check if videoId is valid', () => {
  expect(GetYouTubeVideoId('https://www.youtube.com/watch?v=zPOUiQ3iWJQ')).toMatch('zPOUiQ3iWJQ');
});

test('Check if videoId is valid, short URL', () => {
  expect(GetYouTubeVideoId('https://youtu.be/sCvpTzOV85I')).toMatch('sCvpTzOV85I');
});

test('Check if URL is invalid', () => {
  expect(GetYouTubeVideoId('youtu.bee/sCvpTzOV85I')).toMatch('');
});

