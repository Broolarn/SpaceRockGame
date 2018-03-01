var Boot ={
	//Write on console that the grame is starting
	create:function () {
		game.physics.startSystem( Phaser.Physics.ARCADE);
		console.log('booted')
   		game.state.start('Load')
	}
};