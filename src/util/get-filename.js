const cheerio = require('cheerio')

/**
 * @param {string} body
 * @return {string|null}
 */
function getFilename(body) {
	const $ = cheerio.load(body)
	const target = $('meta[itemprop=name]')

	if( target.length > 0 )
		return target.attr('content')
}

module.exports = getFilename
