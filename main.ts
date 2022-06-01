namespace SpriteKind {
    export const Door = SpriteKind.create()
    export const abyss = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile13`, function (sprite, location) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    tiles.setCurrentTilemap(tilemap`BossBattle`)
    current_tilemap = "BossBattle"
    tiles.placeOnTile(Bobbetita, tiles.getTileLocation(0, 0))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    Life += randint(1, 5)
    Apple.setPosition(randint(0, 1000), randint(0, 35))
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    Life += -1
})
let Apple: Sprite = null
let Bobbetita: Sprite = null
let current_tilemap = ""
game.setDialogTextColor(1)
game.setDialogFrame(assets.image`Dialog place`)
game.showLongText("The Crocs come marching three by three. Not hoorah, not hoorah. They are invading your swamp, Bobbetita!", DialogLayout.Full)
game.showLongText("You can send them to their doom by shooting arrows from your massive ears. To do this, press A and B.", DialogLayout.Full)
game.showLongText("But be careful, Bobby. Crocs are ruthless, and they think you taste yummy.", DialogLayout.Full)
tiles.setCurrentTilemap(tilemap`Swamp tile-map`)
current_tilemap = "Swamp tile-map"
scene.centerCameraAt(100, 100)
Bobbetita = sprites.create(assets.image`Bobby Big-Ear0`, SpriteKind.Player)
scene.cameraFollowSprite(Bobbetita)
tiles.placeOnTile(Bobbetita, tiles.getTileLocation(7, 7))
Bobbetita.setScale(2, ScaleAnchor.Middle)
Bobbetita.sayText("GET OUT OF MY SWAMP.", 2000, true)
let Life = 5
let textSprite = textsprite.create(convertToText(Life))
textSprite.setScale(1.5, ScaleAnchor.Middle)
pause(2000)
let Gravity = 0.5
Bobbetita.setScale(1, ScaleAnchor.Middle)
Apple = sprites.create(assets.image`Apple`, SpriteKind.Food)
Apple.setScale(0.8, ScaleAnchor.Middle)
Apple.setPosition(24, 40)
let Arrow = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Projectile)
let Gator = sprites.create(assets.image`Abyss`, SpriteKind.Enemy)
forever(function () {
    if (controller.right.isPressed()) {
        Bobbetita.x += 1
    }
})
forever(function () {
    if (controller.up.isPressed()) {
        Bobbetita.y += -1.5
    }
})
forever(function () {
    if (controller.A.isPressed()) {
        Arrow = sprites.createProjectileFromSprite(assets.image`Arrow_right`, Bobbetita, 50, 10)
    }
})
forever(function () {
    if (controller.left.isPressed()) {
        Bobbetita.x += -1
    }
})
forever(function () {
    if (controller.down.isPressed()) {
        Bobbetita.y += 1
    }
})
forever(function () {
    if (controller.B.isPressed()) {
        Arrow = sprites.createProjectileFromSprite(assets.image`Arrow_Left`, Bobbetita, -50, 10)
    }
})
forever(function () {
    Bobbetita.y += Gravity
})
forever(function () {
    textSprite.setText(convertToText(Life))
})
forever(function () {
    textSprite.setPosition(scene.cameraProperty(CameraProperty.Left) + 15, scene.cameraProperty(CameraProperty.Top) + 15)
})
forever(function () {
    while (current_tilemap == "Swamp tile-map") {
        pause(1000)
        Gator = sprites.create(assets.image`Alligators`, SpriteKind.Enemy)
        Gator.setScale(randint(1, 2), ScaleAnchor.Middle)
        Gator.setPosition(0, randint(80, 300))
        Gator.setVelocity(randint(15, 25), 0)
        Gator.setFlag(SpriteFlag.GhostThroughWalls, true)
    }
})
