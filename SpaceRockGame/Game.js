   	var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer');
        	game.state.add('Boot', Boot);
        	game.state.add('Load', Load);
        	game.state.add('Play', Play);
        	game.state.start('Boot');