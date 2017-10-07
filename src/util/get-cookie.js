/**
 * @typedef {object} result
 * @property {string} cookie
 * @property {string} confirm
 */

/**
 * @param {object} headers
 * @return {result}
 */
function getCookie(headers) {
	const setCookieList = headers['set-cookie']
	if( !Array.isArray(setCookieList) )
		return null

	for(const setCookie of setCookieList) {
		const result = (/^download_warning[^=]+=\s*([^;]+)/).exec(setCookie)

		if( result ) {
			return {
				cookie: result[0],
				confirm: result[1],
			}
		}
	}
}

module.exports = getCookie
