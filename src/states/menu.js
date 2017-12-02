import Request from 'request'

// const url = 'https://simple.wikipedia.org/wiki/Baghlan_Province'
// const url = 'https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=5'
const url = 'https://simple.wikipedia.org/w/api.php?action=query&list=random&rnlimit=5&format=json&origin=*'


class Menu extends Phaser.State {

  constructor() {
    super();
  }

  create() {

    const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'MENU', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);

	Request(url, (err, response, body) => {
		console.log(JSON.parse(body).query.random[0].title);
	})

    this.input.onDown.add(this.startGame, this);
  }

  update() {}

  startGame () {
    this.game.state.start('game');
  }

}

export default Menu;
