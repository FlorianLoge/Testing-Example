const request = require('request-promise');
const {
  CoverNotFoundError
} = require('../errors/covers');

module.exports.findCoverUrl = async (id) => {
  const options = {
    uri: `http://openlibrary.org/search.json?q=${id}`,
    json: true
  }
  const response = await request(options);

  if (response.docs.length < 0) {
    throw new CoverBookNotFoundError('Cannot find document for book id ' + id);
  }

  const { cover_edition_key } = response.docs[0];

  if (!cover_edition_key) {
    throw new CoverNotFoundError('Cannot find cover for book id ' + id);
  }

  return `http://covers.openlibrary.org/b/olid/${cover_edition_key}-L.jpg`; 
}