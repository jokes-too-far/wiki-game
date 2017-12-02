import Request from 'request'

// const url = 'https://simple.wikipedia.org/wiki/Baghlan_Province'
// const url = 'https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=5'
const url = 'https://simple.wikipedia.org/w/api.php?action=query&list=random&rnlimit=500&format=json&origin=*'

const badTitles = ['Talk', 'User', 'Template', 'Category', 'Wikipedia:', 'Mediawiki', 'Module']

const Wikipedia = {
	getRandomPages: (callback) => {
		Request(url, (err, response, body) => {
			const parsed = JSON.parse(body);
			const potentials = parsed.query.random;
			const pages = potentials.filter(page => {
				for (const badTitle of badTitles) {
					if (page.title.toUpperCase().indexOf(badTitle.toUpperCase()) !== -1) {
						return false;
					}
				}
				return true;
			})
			callback(pages)
		})
	},
}

export default Wikipedia;
