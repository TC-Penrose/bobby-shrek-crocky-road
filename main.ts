namespace SpriteKind {
    export const Door = SpriteKind.create()
    export const abyss = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile13`, function (sprite, location) {
    Change_Tilemap("BossBattle")
    tiles.placeOnTile(Bobbetita, tiles.getTileLocation(18, 1))
    tiles.placeOnTile(Onion, tiles.getTileLocation(17, 2))
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    SpawnGator(60, 80, 0, "2")
    Big_Boss_Move()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile16`, function (sprite, location) {
    if (current_tilemap == "BossBattle") {
        Change_Tilemap("Final")
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        tiles.placeOnTile(Bobbetita, tiles.getTileLocation(2, 1))
        tiles.placeOnTile(Onion, tiles.getTileLocation(7, 7))
    }
})
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
    if (current_tilemap == "Swamp tile-map") {
        Score += randint(1, 5)
        otherSprite.setPosition(randint(0, 1000), randint(0, 35))
    } else if (current_tilemap == "BossBattle") {
        Score += randint(1, 5)
        otherSprite.destroy()
        pause(5000)
        Onion = sprites.create(assets.image`Onion`, SpriteKind.Food)
        Onion.setScale(1, ScaleAnchor.Middle)
        tiles.placeOnTile(Onion, tiles.getTileLocation(17, 2))
    } else if (current_tilemap == "Final") {
        if (Score < 1) {
            game.over(false, effects.smiles)
        } else if (Score > 1) {
            game.over(true, effects.clouds)
        }
    }
})
function Big_Boss_Move () {
    Gator.setBounceOnWall(true)
    Gator.ax = 3
    Gator.ay = 3
    gatorMovementLvl_2 = ["run faster"]
    for (let value of gatorMovementLvl_2) {
        pause(100)
        gatorMovementLvl_2.push("run faster")
        Gator.ax += 6
        Gator.ay += 6
    }
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
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    Score += -1
})
let gatorMovementLvl_2: string[] = []
let current_tilemap = ""
let Gator: Sprite = null
let Onion: Sprite = null
let Score = 0
let Bobbetita: Sprite = null
game.setDialogTextColor(1)
game.setDialogFrame(assets.image`Dialog place`)
game.showLongText("Sing Along!", DialogLayout.Full)
game.showLongText("The Crocs come marching three by three. Not hoorah, not hoorah. They are invading your territory, Bobbetita!", DialogLayout.Full)
game.showLongText("You can send them to their doom by shooting arrows from your ears.", DialogLayout.Full)
game.showLongText("Press A for left and B for right: these are the shoot controls.", DialogLayout.Full)
game.showLongText("But be careful, Bobbetita for your mission is filled, with glitches and with ruthless Crocs who think that you taste good.", DialogLayout.Full)
game.showLongText("So use your ears and arrows and kill them all for good. ", DialogLayout.Full)
game.showLongText("And make your way carefully across the crocky road.", DialogLayout.Full)
Change_Tilemap("Swamp tile-map")
scene.centerCameraAt(100, 100)
Bobbetita = sprites.create(assets.image`Bobby Big-Ear0`, SpriteKind.Player)
scene.cameraFollowSprite(Bobbetita)
tiles.placeOnTile(Bobbetita, tiles.getTileLocation(7, 7))
Bobbetita.setScale(2, ScaleAnchor.Middle)
Bobbetita.sayText("GET OUT OF MY SWAMP.", 2000, true)
pause(2000)
Score = 5
let Score_text = textsprite.create(convertToText(Score))
Score_text.setScale(1.5, ScaleAnchor.Middle)
let UnderwaterGravity = 0.5
let Normal_gravity = 1
Bobbetita.setScale(1, ScaleAnchor.Middle)
Onion = sprites.create(assets.image`Onion`, SpriteKind.Food)
Onion.setScale(1, ScaleAnchor.Middle)
Onion.setPosition(24, 40)
let Arrow = sprites.create(assets.image`Abyss`, SpriteKind.Projectile)
Gator = sprites.create(assets.image`Abyss`, SpriteKind.Enemy)
forever(function () {
    if (controller.right.isPressed()) {
        Bobbetita.x += 1
    }
})
forever(function () {
    if (controller.B.isPressed()) {
        Arrow = sprites.createProjectileFromSprite(assets.image`Arrow_right`, Bobbetita, 50, 10)
    }
})
forever(function () {
    if (controller.down.isPressed()) {
        Bobbetita.y += 1
    }
})
forever(function () {
    if (controller.left.isPressed()) {
        Bobbetita.x += -1
    }
})
forever(function () {
    if (controller.A.isPressed()) {
        Arrow = sprites.createProjectileFromSprite(assets.image`Arrow_Left`, Bobbetita, -50, 10)
    }
})
forever(function () {
    if (controller.up.isPressed()) {
        if (current_tilemap == "Swamp tile-map") {
            if (Bobbetita.y >= 76) {
                Bobbetita.y += -1.4
            }
            if (Bobbetita.y < 76) {
                Bobbetita.y += -2
            }
        }
        if (current_tilemap == "BossBattle") {
            if (Bobbetita.y >= 91) {
                Bobbetita.y += -1.4
            }
            if (Bobbetita.y < 91) {
                Bobbetita.y += -2
            }
        }
    }
})
forever(function () {
    Score_text.setText(convertToText(Score))
    Score_text.setPosition(scene.cameraProperty(CameraProperty.Left) + 15, scene.cameraProperty(CameraProperty.Top) + 15)
})
forever(function () {
    if (current_tilemap == "Swamp tile-map") {
        if (Bobbetita.y < 75) {
            Bobbetita.y += Normal_gravity
        } else if ((Bobbetita.y == 75 || Bobbetita.y == 76) && !(controller.up.isPressed())) {
            Bobbetita.y += Normal_gravity
            Normal_gravity = 0
        } else if (Bobbetita.y > 76) {
            Bobbetita.y += UnderwaterGravity
        } else {
            Normal_gravity = 1
            UnderwaterGravity = 0.5
        }
    }
})
forever(function () {
    if (current_tilemap == "Swamp tile-map") {
        SpawnGator(0, randint(80, 300), 1000, "1")
    }
})
forever(function () {
    if (current_tilemap == "BossBattle") {
        if (Bobbetita.y < 90) {
            Bobbetita.y += Normal_gravity
        } else if ((Bobbetita.y == 90 || Bobbetita.y == 91) && !(controller.up.isPressed())) {
            Bobbetita.y += Normal_gravity
            Normal_gravity = 0
        } else if (Bobbetita.y > 91) {
            Bobbetita.y += UnderwaterGravity
        } else {
            Normal_gravity = 1
            UnderwaterGravity = 0.5
        }
    }
})
forever(function () {
	
})
forever(function () {
	
})
forever(function () {
	
})
forever(function () {
	
})
forever(function () {
	
})
