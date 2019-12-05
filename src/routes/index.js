export const routes = {
  home: '/',
  dictionary: '/slownik',
  articles: '/artykuly',
  article: id => `/artykuly/${id}`,
  trips: '/wyjazdy',
  trip: id => `/wyjazdy/${id}`,
  login: '/login',
};
