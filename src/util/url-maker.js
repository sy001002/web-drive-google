const BASE_URL = 'https://drive.google.com'

/**
 * @param {string} id
 * @return {string}
 */
function getView(id) {
	return `${BASE_URL}/file/d/${id}/view`
}

/**
 * @param {string} id
 * @return {string}
 */
function getDownload(id) {
	return `${BASE_URL}/uc?id=${id}&export=download`
}

/**
 * @param {string} id
 * @param {string} confirm
 * @return {string}
 */
function getConfirm(id, confirm) {
	return `${getDownload(id)}&confirm=${confirm}`
}

module.exports = {
	getView,
	getDownload,
	getConfirm,
}
