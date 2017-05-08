var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update,
  update
})

function preload() {
  game.load.image('sky', 'assets/sky.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)
  game.add.sprite(0, 0, 'sky')

  platforms = game.add.group()
  platforms.enableBody = true

  var ground = platforms.create(0, game.world.height - 64, 'ground')
  ground.scale.setTo(2, 2)
  ground.body.immovable = true

  var ledge = platforms.create(400, 400, 'ground')
  ledge.body.immovable = true
  ledge = platforms.create(-150, 250, 'ground')
  ledge.body.immovable = true

  cursors = game.input.keyboard.createCursorkeys()

  stars = game.add.group()
  stars.enableBody = true

  for (var i = 0; i < 12; i++) {
    var star = stars.create(i * 70, 0, 'star')
    star.body.gravity.y = 6
    star.body.bounce.y = 0.7 + Math.random() * 0.2
  }
}

function update() {
  var hitPlatform = game.physics.arcade.collide(player, platforms)

  if (cursors.left.isDown) {
    player.body.velocity.x = 150
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150
    player.animations.play('right')
  } else {
    player.animations.stop()
    player.frame = 4
  }
  if (cursors.up.isDown && player.body.touch.down && hitPlatform) {
    player.body.velocity.y = -350
  }
}


player = game.add.sprite(32, game.world.height - 150, 'dude')
game.physics.arcade.enable(player)

player.body.bounce.y = 0.2
player.body.gravity.y = 300
player.body.collideWorldBounds = true

player.animations.add('left', [0, 1, 2, 3], 10, true)
player.animations.add('right' [5, 6, 7, 8], 10, true)
