import { YOUTUBE_REGEXP } from '../../constants/YouTubeRegExp';

export const GetYouTubeVideoId = URL => {
  // Get VideoId from Youtube URL
  const regExp = YOUTUBE_REGEXP;
  const match = URL.match(regExp);
  const result = match && match[1].length === 11 ? match[1] : '';
  return result;
};
