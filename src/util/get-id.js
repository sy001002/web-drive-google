const { URL } = require('url')

function fromQuery(url) {
	const Url = new URL(url)
	return Url.searchParams.get('id')
}

function fromView(url) {
	const result = (/\/file\/d\/([^\/]+)\/view/).exec(url)
	if( result )
		return result[1]
}

const PARSERS = [
	fromView,
	fromQuery,
]

/*
 * @param {string} url
 * @return {string|null}
 */
function getId(url) {
	if( !(/^https:\/\/drive\.google\.com/).test(url) )
		return null

	for(const parser of PARSERS) {
		const id = parser(url)
		if( id )
			return id
	}
}

module.exports = getId
