namespace SpriteKind {
    export const Door = SpriteKind.create()
    export const abyss = SpriteKind.create()
}
function Gravity (Sprite2: Sprite) {
    if (current_tilemap == "Swamp tile-map") {
        if (Sprite2.y < 75) {
            Sprite2.y += Normal_gravity
        } else if ((Sprite2.y == 75 || Sprite2.y == 76) && !(controller.up.isPressed())) {
            Sprite2.y += Normal_gravity
            Normal_gravity = 0
        } else if (Sprite2.y > 76) {
            Sprite2.y += UnderwaterGravity
        } else {
            Normal_gravity = 1
            UnderwaterGravity = 0.5
        }
    }
    if (current_tilemap == "BossBattle") {
        if (Sprite2.y < 90) {
            Sprite2.y += Normal_gravity
        } else if ((Sprite2.y == 90 || Sprite2.y == 91) && !(controller.up.isPressed())) {
            Sprite2.y += Normal_gravity
            Normal_gravity = 0
        } else if (Sprite2.y > 91) {
            Sprite2.y += UnderwaterGravity
        } else {
            Normal_gravity = 1
            UnderwaterGravity = 0.5
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile13`, function (sprite, location) {
    Change_Tilemap("BossBattle")
    tiles.placeOnTile(Bobbetita, tiles.getTileLocation(18, 1))
    tiles.placeOnTile(BILLY, tiles.getTileLocation(19, 1))
    tiles.placeOnTile(Onion, tiles.getTileLocation(17, 2))
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    SpawnGator(60, 80, 0, "2")
    Big_Boss_Move()
    Boss_Hits = 0
    HitCounter = []
})
function PlayerJump (Sprite2: Sprite, Player_: number) {
    if (Player_ == 1) {
        if (controller.player1.isPressed(ControllerButton.Up)) {
            if (current_tilemap == "Swamp tile-map") {
                if (Sprite2.y >= 76) {
                    Sprite2.y += -1.4
                }
                if (Sprite2.y < 76) {
                    Sprite2.y += -2
                }
            }
            if (current_tilemap == "BossBattle") {
                if (Sprite2.y >= 91) {
                    Sprite2.y += -1.4
                }
                if (Sprite2.y < 91) {
                    Sprite2.y += -2
                }
            }
            if (current_tilemap == "Final") {
                Sprite2.y += -1
            }
        }
    }
    if (Player_ == 2) {
        if (controller.player2.isPressed(ControllerButton.Up)) {
            if (current_tilemap == "Swamp tile-map") {
                if (Sprite2.y >= 76) {
                    Sprite2.y += -1.4
                }
                if (Sprite2.y < 76) {
                    Sprite2.y += -2
                }
            }
            if (current_tilemap == "BossBattle") {
                if (Sprite2.y >= 91) {
                    Sprite2.y += -1.4
                }
                if (Sprite2.y < 91) {
                    Sprite2.y += -2
                }
            }
            if (current_tilemap == "Final") {
                Sprite2.y += -1
            }
        }
    }
}
function Dialogue () {
    game.setDialogTextColor(1)
    game.setDialogFrame(assets.image`Dialog place`)
    game.showLongText("Sing Along!", DialogLayout.Full)
    game.showLongText("The Crocs come marching three by three. Not hoorah, not hoorah. They are invading your territory, Bobbetita!", DialogLayout.Full)
    game.showLongText("You can send them to their doom by shooting arrows from your ears.", DialogLayout.Full)
    game.showLongText("Press A for left and B for right: these are the shoot controls.", DialogLayout.Full)
    game.showLongText("But be careful, Bobbetita for your mission is filled, with glitches and with ruthless Crocs who think that you taste good.", DialogLayout.Full)
    game.showLongText("So use your ears and arrows and kill them all for good. ", DialogLayout.Full)
    game.showLongText("And make your way carefully across the crocky road.", DialogLayout.Full)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile16`, function (sprite, location) {
    if (current_tilemap == "BossBattle") {
        Change_Tilemap("Final")
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        tiles.placeOnTile(Bobbetita, tiles.getTileLocation(2, 1))
        tiles.placeOnTile(BILLY, tiles.getTileLocation(1, 1))
        tiles.placeOnTile(Onion, tiles.getTileLocation(7, 7))
    }
})
function layerzotheOnion () {
    if (current_tilemap == "Swamp tile-map") {
        Score += randint(1, 5)
        Onion.setPosition(randint(0, 1000), randint(0, 35))
    } else if (current_tilemap == "BossBattle") {
        Score += randint(1, 5)
        Onion.destroy()
        pause(5000)
        Onion = sprites.create(assets.image`Onion`, SpriteKind.Food)
        Onion.setScale(1, ScaleAnchor.Middle)
        tiles.placeOnTile(Onion, tiles.getTileLocation(17, 2))
    } else if (current_tilemap == "Final") {
        if (Score < 1) {
            game.over(false, effects.smiles)
        } else if (Score > 1) {
            game.over(true, effects.confetti)
        } else if (Score == 1) {
            Final_Text = textsprite.create("1 isn't good enough, sry")
            Final_Text.setPosition(80, 20)
            pause(5000)
            Final_Text.destroy()
            game.reset()
        } else if (Score == 9) {
            Final_Text = textsprite.create("Yur a cat")
            Final_Text.setPosition(80, 20)
        }
    }
}
function Change_Tilemap (text: string) {
    if (text == "BossBattle") {
        tiles.setCurrentTilemap(tilemap`BossBattle`)
        current_tilemap = text
    } else if (text == "Swamp tile-map") {
        tiles.setCurrentTilemap(tilemap`Swamp tile-map`)
        current_tilemap = text
    } else if (text == "Final") {
        tiles.setCurrentTilemap(tilemap`Final`)
        current_tilemap = text
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    layerzotheOnion()
})
function Big_Boss_Move () {
    Gator.setBounceOnWall(true)
    Gator.ax = 3
    Gator.ay = 3
}
function SpawnGator (xSpawn: number, ySpawn: number, Interval: number, level: string) {
    if (level == "1") {
        pause(Interval)
        Gator = sprites.create(assets.image`Alligators`, SpriteKind.Enemy)
        Gator.setScale(randint(1, 2), ScaleAnchor.Middle)
        Gator.setPosition(xSpawn, ySpawn)
        Gator.setVelocity(randint(15, 25), 0)
        Gator.setFlag(SpriteFlag.GhostThroughWalls, true)
    }
    if (level == "2") {
        Gator = sprites.create(assets.image`Big_Boss`, SpriteKind.Enemy)
        Gator.setScale(4, ScaleAnchor.Middle)
        Gator.setPosition(xSpawn, ySpawn)
        Gator.setFlag(SpriteFlag.GhostThroughWalls, false)
    }
}
function PlayerControls (Sprite2: Sprite, Player_: number) {
    if (Player_ == 1) {
        if (controller.player1.isPressed(ControllerButton.A)) {
            Arrow = sprites.createProjectileFromSprite(assets.image`Arrow_Left`, Sprite2, -50, 10)
        }
        if (controller.player1.isPressed(ControllerButton.B)) {
            Arrow = sprites.createProjectileFromSprite(assets.image`Arrow_right`, Sprite2, 50, 10)
        }
        if (controller.player1.isPressed(ControllerButton.Left)) {
            Sprite2.x += -1
        }
        if (controller.player1.isPressed(ControllerButton.Right)) {
            Sprite2.x += 1
        }
        if (controller.player1.isPressed(ControllerButton.Down)) {
            Sprite2.y += 1
        }
    }
    if (Player_ == 2) {
        if (controller.player2.isPressed(ControllerButton.B)) {
            Arrow = sprites.createProjectileFromSprite(assets.image`Arrow_right`, Sprite2, 50, 10)
        }
        if (controller.player2.isPressed(ControllerButton.A)) {
            Arrow = sprites.createProjectileFromSprite(assets.image`Arrow_Left`, Sprite2, -50, 10)
        }
        if (controller.player2.isPressed(ControllerButton.Left)) {
            Sprite2.x += -1
        }
        if (controller.player2.isPressed(ControllerButton.Right)) {
            Sprite2.x += 1
        }
        if (controller.player2.isPressed(ControllerButton.Down)) {
            Sprite2.y += 1
        }
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (current_tilemap == "Swamp tile-map") {
        otherSprite.destroy(effects.disintegrate, 500)
    }
    if (current_tilemap == "BossBattle") {
        otherSprite.destroy(effects.disintegrate, 2000)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    Score += -1
})
let Final_Text: TextSprite = null
let HitCounter: number[] = []
let Boss_Hits = 0
let current_tilemap = ""
let Gator: Sprite = null
let Arrow: Sprite = null
let Onion: Sprite = null
let Normal_gravity = 0
let UnderwaterGravity = 0
let Score = 0
let BILLY: Sprite = null
let Bobbetita: Sprite = null
Dialogue()
Change_Tilemap("Swamp tile-map")
scene.centerCameraAt(100, 100)
Bobbetita = sprites.create(assets.image`Bobby Big-Ear0`, SpriteKind.Player)
tiles.placeOnTile(Bobbetita, tiles.getTileLocation(7, 7))
Bobbetita.setScale(2, ScaleAnchor.Middle)
Bobbetita.sayText("GET OUT OF MY SWAMP.", 2000, true)
pause(2000)
Bobbetita.setScale(1, ScaleAnchor.Middle)
scene.cameraFollowSprite(Bobbetita)
BILLY = sprites.create(assets.image`BILLY goat-shrek`, SpriteKind.Player)
tiles.placeOnTile(BILLY, tiles.getTileLocation(8, 7))
BILLY.setScale(1, ScaleAnchor.Middle)
BILLY.setStayInScreen(true)
Score = 1
let Score_text = textsprite.create(convertToText(Score))
Score_text.setScale(1.5, ScaleAnchor.Middle)
UnderwaterGravity = 0.5
Normal_gravity = 1
Onion = sprites.create(assets.image`Onion`, SpriteKind.Food)
Onion.setScale(1, ScaleAnchor.Middle)
Onion.setPosition(24, 40)
Arrow = sprites.create(assets.image`Abyss`, SpriteKind.Projectile)
Gator = sprites.create(assets.image`Abyss`, SpriteKind.Enemy)
forever(function () {
    Score_text.setText(convertToText(Score))
    Score_text.setPosition(scene.cameraProperty(CameraProperty.Left) + 15, scene.cameraProperty(CameraProperty.Top) + 15)
})
forever(function () {
    PlayerControls(Bobbetita, 1)
    PlayerJump(Bobbetita, 1)
    Gravity(Bobbetita)
})
forever(function () {
    PlayerControls(BILLY, 2)
    PlayerJump(BILLY, 2)
    Gravity(BILLY)
})
forever(function () {
    while (current_tilemap == "Swamp tile-map" || current_tilemap == "BossBattle") {
        for (let index = 0; index < 2; index++) {
            music.playMelody("C - G E E E D C ", 200)
            music.playMelody("C F E E D D C - ", 200)
            music.playMelody("C G E E E D C C ", 200)
            music.playMelody("D D C C C C - - ", 200)
        }
        for (let index = 0; index < 2; index++) {
            music.playMelody("E E C C C C - - ", 450)
            music.playMelody("C C C - C C C - ", 450)
            music.playMelody("- C C - E E E - ", 250)
        }
        music.playMelody("E E G G F G A C5 ", 200)
        music.playMelody("- C C D C E D D ", 200)
        music.playMelody("D D C - C C C - ", 200)
    }
})
forever(function () {
    if (current_tilemap == "Swamp tile-map") {
        SpawnGator(0, randint(80, 300), 1000, "1")
    }
})
forever(function () {
	
})
forever(function () {
	
})
forever(function () {
    while (current_tilemap == "Final") {
        music.stopAllSounds()
        music.playMelody("- - - - C5 C5 C5 C5 ", 200)
        music.playMelody("- F F F F E E E ", 200)
        music.rest(music.beat(BeatFraction.Whole))
        music.playMelody("E E E G C5 C5 B C5 ", 200)
        music.playMelody("- D D D D C C C ", 200)
        music.playMelody("- - - - - - - - ", 200)
    }
})
forever(function () {
    while (current_tilemap == "Final") {
        music.stopAllSounds()
        music.playMelody("C C C E G G G G ", 200)
        music.playMelody("- A A A A G G G ", 200)
        music.rest(music.beat(BeatFraction.Whole))
        music.playMelody("C C C E G G G G ", 200)
        music.playMelody("- A A A A G G G ", 200)
        music.playMelody("- - - - - - - - ", 200)
    }
})
forever(function () {
	
})
forever(function () {
    if (current_tilemap == "BossBattle") {
        pause(100)
        Gator.ax += 6
        Gator.ay += 6
    }
})
