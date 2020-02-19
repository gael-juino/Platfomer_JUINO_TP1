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
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);
var score = 0;


 	var platforms;
	var player;
	var cursors; 
	var stars;
	var scoreText;
	var bomb;
	var batt;
	var sam;
	var Vie;
	var nVie = 3;
	var potionHeal;


function preload(){

	//background//
	this.load.image('background1','assets/background1.png');
	this.load.image('background2','assets/background2.png');
	this.load.image('background3','assets/background3.png');
	this.load.image('background4','assets/background4.png');
	this.load.image('background5','assets/background5.png');
	this.load.image('background6','assets/background6.png');

	//piece//
	this.load.image('piece','assets/piece.png');

	//vie//
	this.load.image('vie0','assets/vie0.png');
	this.load.image('vie3','assets/vie3.png');
	this.load.image('vie2','assets/vie2.png');
	this.load.image('vie1','assets/vie1.png');

	//potion//
	this.load.image('potion','assets/potionHeal.png');

	//platforms//
	this.load.image('platforms','assets/platforms.png');
	this.load.image('platforme','assets/platforme.png');

	//personnage//
	this.load.image('bat','assets/bat.png',{frameWidth: 6, frameHeight: 12});
	this.load.spritesheet('slime','assets/slime.png',{frameWidth: 13, frameHeight: 16});
	//this.load.spritesheet('batt','assets/batt.png',{frameWidth: 16, frameHeight: 16});
}



function create(){
	//BACKGROUND//
	this.add.image(400,300,'background1');
	this.add.image(400,300,'background2');
	this.add.image(400,300,'background3');
	this.add.image(400,300,'background4');
	this.add.image(400,300,'background5');
	this.add.image(400,300,'background6');

	//VIE//
	this.load.image('vie0','assets/vie0.png');
	this.load.image('vie3','assets/vie3.png');
	this.load.image('vie2','assets/vie2.png');
	this.load.image('vie1','assets/vie1.png');

	

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



	//PLAYER//
		player = this.physics.add.sprite(100,550,'slime');
		player.setCollideWorldBounds(true);
		player.setBounce(0.2);
		player.body.setGravityY(000);
		this.physics.add.collider(player,platforms);
	
	

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

	//VIE//
		//PLAYER//
		vie0 = this.add.image(0,0, 'vie0').setOrigin(0,0);
        vie1 = this.add.image(0,0, 'vie1').setOrigin(0,0);
        vie2 = this.add.image(0,0, 'vie2').setOrigin(0,0);
        vie3 = this.add.image(0,0, 'vie3').setOrigin(0,0);

	//batt//
		batt = this.physics.add.sprite(250,100,'bat');
		batt.setCollideWorldBounds(true);
		this.physics.add.collider(batt, platforms);
		this.physics.add.overlap(player, batt, hitbatt, null, this);

	this.anims.create({
		key:'fly',
		frames: this.anims.generateFrameNumbers('batt', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});

	//SAM//
		sam = this.physics.add.sprite(600,50,'bat');
		sam.setCollideWorldBounds(true);
		this.physics.add.collider(batt, platforms);
		this.physics.add.overlap(player, sam, hitsam, null, this);

	this.anims.create({
		key:'fly',
		frames: this.anims.generateFrameNumbers('batt', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});


	//piece//
		stars = this.physics.add.group();
	
		//NIV1//
		stars.create(690,440,'piece');

		//NIV2//
		//stars.create(220,400,'piece');

		//NIV3//
		//stars.create(50,320,'piece');

		//NIV4//
		//stars.create(470,280,'piece');

		//NIV5//
		//stars.create(120,160,'piece');

		//NIV6//
		//stars.create(750,120,'piece');

		this.physics.add.collider(stars, platforms);
		this.physics.add.collider(stars, player, collectStar, null, this);

		

	cursors = this.input.keyboard.createCursorKeys(); 

	//SCORE//
	scoreText = this.add.text(600,16, 'score: 0', {fontSize: '32px', fill:'#000'});

	//BOMB//
	bombs = this.physics.add.group();
	this.physics.add.collider(bombs,platforms);
	this.physics.add.overlap(player, bombs, hitBomb, null, this);
	this.anims.create({
		key:'monstre',
		frames: this.anims.generateFrameNumbers('bat', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});

	//POTION//
		//HEAL//
		potionHeal = this.physics.add.group();
		potionHeal.create(500,542,'potion');

		this.physics.add.collider(potionHeal, platforms);
		this.physics.add.overlap(potionHeal, player, collectHeal, null, this);
		this.physics.add.overlap(bombs, potionHeal, collectHealBombs, null, this);
}



function update(){
	if(cursors.left.isDown){
		player.anims.play('left', true);
		player.setVelocityX(-200);
		player.setFlipX(false);

		if (cursors.shift.isDown) {
			player.setVelocityX(-300);
		}
	}
	else if(cursors.right.isDown){
		player.setVelocityX(200);
		player.anims.play('left', true);
		player.setFlipX(true);

		if (cursors.shift.isDown) {
			player.setVelocityX(300);
		}
	}
	else{
		player.anims.play('stop', true);
		player.setVelocityX(0);
	}
	
	if(cursors.up.isDown && player.body.touching.down){
		player.setVelocityY(-330);
	}

	//BATT//
	if (batt.y <= 150) {
		this.tweens.add({
			targets: batt,
			y:600,
		    ease: 'Linear',
		    duration: 4000,
		});
		//batt.anims.play('fly', true);
	}

	if (batt.y >= 300) {
		this.tweens.add({
			targets: batt,
			y:10,
			duration: 1000,
		});
		//batt.anims.play('fly', true);
	}
 
	//SAM//
	if (sam.y <= 100) {
		this.tweens.add({
			targets: sam,
			y:650,
		    ease: 'Linear',
		    duration: 4000,
		});
		//batt.anims.play('fly', true);
	}

	if (sam.y >= 250) {
		this.tweens.add({
			targets: sam,
			y:10,
			duration: 1000,
		});
		//batt.anims.play('fly', true);
	}
	//VIE//

	if (nVie==2) {
            vie3.destroy(true);

        }
    if (nVie==1) {
            vie2.destroy(true);
			
        }
    if (nVie==0) {
            vie1.destroy(true);
            gameOver=true;
            this.physics.pause();
			player.setTint(0xff0000);
			player.anims.play('turn');
        }


	


}

function hitBomb(player, bomb){
	nVie--;
	score -= 5;
	scoreText.setText('score: '+score);
	bomb.destroy();
}

function hitPotion(bomb, potion) {

	console.log('touch');

	bomb.disableBody(true,true);
	potion.disableBody(true,true);

	score -= 5;
	scoreText.setText('score: '+score);
}

function hitsam(player, sam){
	sam.disableBody(true,true);
	nVie--;
}

function hitbatt(player, batt){
	batt.disableBody(true,true);
	nVie--;
}

function collectStar(player, star){
	star.disableBody(true,true);
	score += 10;
	scoreText.setText('score: '+score);

	if(stars.countActive(true)===0){
		stars.children.iterate(function(child){
			child.enableBody(true,child.x,child.y, true, true);
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

function collectHeal(player, potion) {
	if (nVie == 3) {
		potion.disableBody(true,true);
		score += 10;
		scoreText.setText('score: '+score);

		if(potionHeal.countActive(true)===0){
			potionHeal.children.iterate(function(child){
			child.enableBody(true,child.x,child.y - 170, true, true);
			});
		}
		
	}

	if (nVie < 3) {
		potion.disableBody(true,true);
		nVie++;
		score += 10;
		scoreText.setText('score: '+score);
		if(potionHeal.countActive(true)===0){
			potionHeal.children.iterate(function(child){
			child.enableBody(true,child.x,child.y - 170, true, true);
			});
		}

		
		if (nVie==3) {
    	vie3 = this.add.image(0,0, 'vie3').setOrigin(0,0);
    	}

    	if (nVie==2) {
    	vie2 = this.add.image(0,0, 'vie2').setOrigin(0,0);
    	}
	}
	
}
function collectHealBombs(bombs, potion) {
	potion.disableBody(true,true);
	bombs.destroy();
	score -= 5;
	scoreText.setText('score: '+score);
}