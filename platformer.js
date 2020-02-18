var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
scene: {
		init: init,
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);
var score = 0;

function init(){
 	var platforms;
	var player;
	var cursors; 
	var stars;
	var scoreText;
	var bomb;
}

function preload(){
	this.load.image('background1','assets/background1.png');
	this.load.image('background2','assets/background2.png');
	this.load.image('background3','assets/background3.png');
	this.load.image('background4','assets/background4.png');
	this.load.image('background5','assets/background5.png');
	this.load.image('background6','assets/background6.png');
	this.load.image('piece','assets/',{frameWidth: 32, frameHeight: 48});
	this.load.image('platforms','assets/platforms.png');
	this.load.image('platforme','assets/platforme.png');
	this.load.image('bat','assets/bat.png',{frameWidth: 32, frameHeight: 48});
	this.load.spritesheet('slime','assets/slime.png',{frameWidth: 13, frameHeight: 16});
}



function create(){
	this.add.image(400,300,'background1');
	this.add.image(400,300,'background2');
	this.add.image(400,300,'background3');
	this.add.image(400,300,'background4');
	this.add.image(400,300,'background5');
	this.add.image(400,300,'background6');

	//sol//
	platforms = this.physics.add.staticGroup();
	platforms.create(20,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(60,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(100,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(140,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(180,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(220,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(260,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(300,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(340,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(380,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(420,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(460,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(500,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(540,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(580,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(620,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(660,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(700,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(740,580,'platforms').setScale(1.2).refreshBody();
	platforms.create(780,580,'platforms').setScale(1.2).refreshBody();

	//platforme//
		//1ER niv//
		platforms.create(690,490,'platforme').setScale(1.1).refreshBody();

		//2EME niv//
		platforms.create(220,450,'platforme').setScale(1.1).refreshBody();

		//3EME niv//
		platforms.create(50,370,'platforme').setScale(1.1).refreshBody();

		//4EME niv//
		platforms.create(470,320,'platforme').setScale(1.1).refreshBody();

		//5EME niv//
		platforms.create(120,200,'platforme').setScale(1.1).refreshBody();

		//6EME niv//
		platforms.create(750,150,'platforme').setScale(1.1).refreshBody();

	




	player = this.physics.add.sprite(100,450,'slime');
	player.setCollideWorldBounds(true);
	player.setBounce(0.2);
	player.body.setGravityY(000);
	this.physics.add.collider(player,platforms);
	
	cursors = this.input.keyboard.createCursorKeys(); 
	
	this.anims.create({
		key:'left',
		frames: this.anims.generateFrameNumbers('slime', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});
	
	this.anims.create({
		key:'stop',
		frames: [{key: 'slime', frame:4}],
		frameRate: 20
	});
	
	stars = this.physics.add.group({
		key: 'piece',
		repeat:11,
		setXY: {x:12,y:0,stepX:70}
	});

	
	this.physics.add.collider(stars,platforms);
	this.physics.add.overlap(player,stars,collectStar,null,this);

	scoreText = this.add.text(16,16, 'score: 0', {fontSize: '32px', fill:'#000'});
	bombs = this.physics.add.group();
	this.physics.add.collider(bombs,platforms);
	this.physics.add.collider(player,bombs, hitBomb, null, this);
}



function update(){
	if(cursors.left.isDown){
		player.anims.play('left', true);
		player.setVelocityX(-300);
		player.setFlipX(false);
	}else if(cursors.right.isDown){
		player.setVelocityX(300);
		player.anims.play('left', true);
		player.setFlipX(true);
	}else{
		player.anims.play('stop', true);
		player.setVelocityX(0);
	}
	
	if(cursors.up.isDown && player.body.touching.down){
		player.setVelocityY(-330);
	} 
	
}
function hitBomb(player, bomb){
	this.physics.pause();
	player.setTint(0xff0000);
	player.anims.play('turn');
	gameOver=true;
}

function collectStar(player, star){
	star.disableBody(true,true);
	score += 10;
	scoreText.setText('score: '+score);
	if(stars.countActive(true)===0){
		stars.children.iterate(function(child){
			child.enableBody(true,child.x,0, true, true);
		});
		
		var x = (player.x < 400) ? 
			Phaser.Math.Between(400,800):
			Phaser.Math.Between(0,400);
		var bomb = bombs.create(x, 16, 'bat');
		bomb.setBounce(1);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
	}
}