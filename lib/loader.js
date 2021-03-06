import { ConfigNotFound } from "./errors/index.js"

/**
 * Dynamicaly load a webpack configuration file
 *
 * Use path to find a path to a configuration file with two formats, a function
 * which receives webpack env parameter or a configuration object. In case the
 * file doens't exists or there's some error importing the file a ConfigNotFound
 * it throwed specifying its location.
 *
 * @throws ConfigNotFound
 * @param {import('webpack').Configuration} env webpack environment
 * @return {Promise<import('webpack').Configuration>}
 */
export default function (env, path) {
	try {
		// eslint-disable-next-line no-undef
		const config = require(path)
		return typeof config === "function" ? config(env) : config
	} catch (error) {
		console.error(error)
		throw new ConfigNotFound(path)
	}
}
