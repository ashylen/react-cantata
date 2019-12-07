export const routes = {
  home: '/',
  dictionary: '/slownik',
  dictionaryItem: id => `/slownik/${id}`,
  articles: '/artykuly',
  article: id => `/artykuly/${id}`,
  trips: '/wyjazdy',
  trip: id => `/wyjazdy/${id}`,
  login: '/login',
};
