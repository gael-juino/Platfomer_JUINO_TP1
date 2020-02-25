var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
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
	var slime;
	var Vie;
	var nVie = 3;
	var potionHeal;
	var saut = 2;
	var nSaut = 1;
	var direction = 'right';
	var Feu;


function preload(){

	//background//
	this.load.image('background1','assets/background1.png');
	this.load.image('background2','assets/background2.png');
	this.load.image('background3','assets/background3.png');
	this.load.image('background4','assets/background4.png');
	this.load.image('background5','assets/background5.png');
	this.load.image('background6','assets/background6.png');

	//BULLET//
	this.load.image('bullet','assets/bullet.png');

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
	this.load.image('bomb','assets/bomb.png');
	this.load.image('bat','assets/bat.png',{frameWidth: 6, frameHeight: 12});
	this.load.spritesheet('adventurer','assets/adventurer.png',{frameWidth: 20, frameHeight: 35});
	this.load.spritesheet('slime','assets/slime.png',{frameWidth: 30, frameHeight: 25});
	//this.load.spritesheet('batt','assets/batt.png',{frameWidth: 16, frameHeight: 16});
}



function create(){

	this.load.image('bomb','assets/bomb.png');
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
		player = this.physics.add.sprite(100,500,'adventurer');
		player.setCollideWorldBounds(true);
		player.setBounce(0.2);
		player.body.setGravityY(000);
		this.physics.add.collider(player,platforms);
	
	

	this.anims.create({
		key:'left',
		frames: this.anims.generateFrameNumbers('adventurer', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});


	this.anims.create({
		key:'right',
		frames: this.anims.generateFrameNumbers('adventurer', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});

	this.anims.create({
		key:'stop',
		frames: [{key: 'adventurer', frame:4}],
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
		batt.body.setGravityY(-300);
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
		sam.body.setGravityY(-300);
		this.physics.add.collider(batt, platforms);
		this.physics.add.overlap(player, sam, hitsam, null, this);

	this.anims.create({
		key:'fly',
		frames: this.anims.generateFrameNumbers('batt', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});

	//slime//
		slime = this.physics.add.sprite(200,500,'slime');
		slime.setCollideWorldBounds(true);
		slime.body.setGravityY(000);
		this.physics.add.collider(slime, platforms);
		this.physics.add.collider(slime, player);
	
	

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


	//piece//
		stars = this.physics.add.group();
	
		//NIV1//
		stars.create(690,440,'piece');

		//NIV2//
		stars.create(220,400,'piece');

		//NIV3//
		stars.create(50,320,'piece');

		//NIV4//
		stars.create(470,280,'piece');

		//NIV5//
		stars.create(120,160,'piece');

		//NIV6//
		stars.create(750,120,'piece');

		this.physics.add.collider(stars, platforms);
		this.physics.add.collider(stars, player, collectStar, null, this);

		

	cursors = this.input.keyboard.createCursorKeys();
	Feu = this.input.keyboard.addKeys('A');

	//SCORE//
	scoreText = this.add.text(600,16, 'score: 0', {fontSize: '32px', fill:'#000'});

	//BOMB//
	bombs = this.physics.add.group();
	this.physics.add.collider(bombs,platforms);
	this.physics.add.overlap(player, bombs, hitBomb, null, this);
	this.anims.create({
		key:'bomb',
		frames: this.anims.generateFrameNumbers('bomb', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});

	//POTION//
		//HEAL//
		potionHeal = this.physics.add.group();
		potionHeal.create(500,542,'potion');

		this.physics.add.collider(potionHeal, platforms);
		this.physics.add.collider(potionHeal, slime);
		this.physics.add.overlap(potionHeal, player, collectHeal, null, this);
		this.physics.add.overlap(bombs, potionHeal, collectHealBombs, null, this);
		this.physics.add.overlap(slime, potionHeal, collectHealSlime, null, this);
}



function update(){

	if ( Phaser.Input.Keyboard.JustDown(Feu)) {
   		tirer(player, direction);
	}


	if(cursors.left.isDown){
		player.direction = 'left';
		player.anims.play('left', true);
		player.setVelocityX(-200);
		player.setFlipX(false);

		//COURRIR//
		if (cursors.shift.isDown) {
			player.setVelocityX(-300);
		}
	}
	else if(cursors.right.isDown){
		player.direction = 'right';
		player.setVelocityX(200);
		player.anims.play('right', true);
		player.setFlipX(true);

		//COURRIR//
		if (cursors.shift.isDown) {
			player.setVelocityX(300);
		}
	}
	else{
		player.anims.play('stop', true);
		player.setVelocityX(0);
	}
	//DOUBLE SAUT//
	if(cursors.up.isDown && player.body.touching.down){
		saut = 2;
	}

	if ((nSaut==1) && saut>0 && cursors.up.isDown){
		saut --;
		nSaut=0;
		if (saut == 1) {
		player.setVelocityY(-330);
			if (player.body.velocity.y<0) {
				player.anims.play('left',true);
			}
		}

		if (saut == 0) {
		player.setVelocityY(-330);
			if (player.body.velocity.y<0) {
				player.anims.play('left',true);
			}
		}
	}

	if (cursors.up.isUp) {
		nSaut=1;
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
			ease: 'Linear',
			duration: 1000,
		});
		//batt.anims.play('fly', true);
	}

	//SLIME//
	if (slime.x <= 200) {
		this.tweens.add({
			targets: slime,
			x:1000,
		    ease: 'Linear',
		    duration: 4000,
		});
		//slime.anims.play('fly', true);
	}

	if (slime.x >= 700) {
		this.tweens.add({
			targets: slime,
			x: -400,
			ease: 'Linear',
			duration: 4000,
		});
		//slime.anims.play('fly', true);
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

function tirer(player) {
 	var coefDir;
 	    if (player.direction == 'left') { coefDir = -1; } else { coefDir = 1 }
         // on crée la balle a coté du joueur
         var bullet = groupeBullets.create(player.x + (25 * coefDir), player.y - 4, 'bullet');
         // parametres physiques de la balle.
         bullet.setCollideWorldBounds(true);
         bullet.body.allowGravity =false;
         bullet.setVelocity(1000 * coefDir, 0); // vitesse en x et en y
 	alert ("joueur en position"+player.x + ","+player.y + " ; direction du tir : "+ player.direction) ; 
}


function hitBomb(player, bomb){
	nVie--;
	score -= 5;
	scoreText.setText('score: '+score);
	bomb.destroy();
}

function hitPotion(bomb, potion) {

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

function hitslime(slime, potion) {

	score -= 5;
	scoreText.setText('score: '+score);
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
	if (nVie <= 2 ){
		potion.disableBody(false,false);
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

function collectHealSlime(slime, potion) {


	potion.disableBody(true,true);

	if(potionHeal.countActive(true)===0){
		potionHeal.children.iterate(function(child){
		child.enableBody(true,child.x,child.y - 170, true, true);
		});
	}
		
	

}
function collectHealBombs(bomb, potion) {

	bomb.disableBody(true,true);
	potion.disableBody(true,true);


	score -= 5;
	scoreText.setText('score: '+score);
}