import Request from 'request'

// const url = 'https://simple.wikipedia.org/wiki/Baghlan_Province'
// const url = 'https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=5'
const url = 'https://simple.wikipedia.org/w/api.php?action=query&list=random&rnlimit=500&format=json&origin=*'

const badTitles = ['Talk', 'User', 'Template', 'Category', 'Wikipedia:', 'Mediawiki', 'Module']


class Menu extends Phaser.State {

  constructor() {
    super();
  }

  create() {

    const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'MENU', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);
	let pages;

	Request(url, (err, response, body) => {
		const parsed = JSON.parse(body);
		const potentials = parsed.query.random;
		pages = potentials.filter(page => {
			for (const badTitle of badTitles) {
				if (page.title.toUpperCase().indexOf(badTitle.toUpperCase()) !== -1) {
					return false;
				}
			}
			return true;
		})
		console.log(pages);
	})

    this.input.onDown.add(this.startGame, this);
  }

  update() {}

  startGame () {
    this.game.state.start('game');
  }

}

export default Menu;
