import { YOUTUBE_REGEXP } from '../../constants/YouTubeRegExp'; 

export const isYouTubeUrl = value => {
  const regex = new RegExp(YOUTUBE_REGEXP);
  const test = value;

  if (test.match(regex)) {
    return undefined;
  }
  
  return 'Must be valid YouTube URL';
};
