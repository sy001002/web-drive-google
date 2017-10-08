const webDriveUtil = require('web-drive-util')
const getCookie = require('./get-cookie')
const getFilename = require('./get-filename')
const getId = require('./get-id')
const urlMaker = require('./url-maker')

/**
 * @typedef {object} result
 * @property {string} url
 * @property {string} filename
 * @property {string} cookie - optional
 * @property {string} range - 'bytes'
 */

/**
 * @param {string} url
 * @param {object} opts
 * @param {number} opts.timeout - default to 30000
 * @param {number} opts.requestDelay - default to 3000
 * @return {result}
 */
async function fetchMeta(url, opts) {
	opts = opts || {}
	opts.timeout = opts.timeout || 30000
	opts.requestDelay = opts.requestDelay || 3000

	const id = getId(url)
	if( !id )
		throw 'invalid url'

	const viewUrl = urlMaker.getView(id)

	let res = await webDriveUtil.followLocation(viewUrl, {
		timeout: opts.timeout,
		requestDelay: opts.requestDelay,
	})

	let body = await res.text()

	if( !res.ok )
		throw await webDriveUtil.makeError(res, url, viewUrl, {}, 'status code is not ok')

	const filename = getFilename(body)
	if( !filename )
		throw webDriveUtil.makeError(res, url, viewUrl, {}, 'can not fetch filename')

	const downloadUrl = urlMaker.getDownload(id)
	await webDriveUtil.delay(opts.requestDelay)
	res = await webDriveUtil.followLocation(downloadUrl, {
		timeout: opts.timeout,
		requestDelay: opts.requestDelay,
	})

	if( !res.ok )
		throw await webDriveUtil.makeError(res, url, downloadUrl, {}, 'status code is not ok')

	res.destroy()

	if( res.headers['content-disposition'] )
		return webDriveUtil.makeResult(downloadUrl, filename, '', true)

	const cookie = getCookie(res.headers)
	if( !cookie )
		throw await webDriveUtil.makeError(res, url, downloadUrl, {}, 'can not get cookie')

	return webDriveUtil.makeResult(
		urlMaker.getConfirm(id, cookie.confirm),
		filename,
		cookie.cookie,
		true
	)
}

module.exports = fetchMeta
