# javon27Mods
## Minecraft Pocket Edition Mod Commands

This script is my attempt to add commands to Minecraft Pocket Edition. Tested on Android MCPE 0.13.1.
---

### Working Commands
### Addeffect
```
/addeffect potionEffectName durationInSeconds [amplification] [ambient] [showParticles]
```
* Add potion effect to self for the duration set.
* Parameters:
    * potionEffectName:
        * case-sensitive string, required
        * Name of effect. For a list of valid names, see [/potions](#potions)
    * durationInSeconds:
        * integer, required
        * Anything greater than zero
    * amplification:
        * integer, optional
        * default value is 0
        * (Not really sure what this does yet...)
    * ambient:
        * boolean, optional
        * default value is false
        * (Not sure about this either...)
    * showParticles:
        * boolean, optional
        * default value is true
        * Shows particle effects for potion

### Clear
```
/clear
```
* Clears the chat log

### Help
```
/help [pageNo]
/help [command]
```
* Prints lists of available commands
* Parameters:
    * pageNo:
        * integer, optional
    * command:
        * case-sensitive string, optional
        * Name of command to show help for

### Direction
```
/direction
```
* Toggles showing the direction player is facing

### Home
```
/home
```
* Teleports the player to home (if set)

### Position
```
/position
```
* Toggles showing player's current position

### Potions
```
/potions
```
* Shows a list of valid potion effect names for use with /addeffect command

### Sethome
```
/sethome
```
* Sets the current position as the destination used by the /home command

### Setspawn
```
/setspawn [x y z]
```
* Sets level spawn point. If no arguments, uses player current position
* Parameters:
    * x y z:
        * integers, optional
        * Coordinates to set as level spawn
        * x and z are horizontal coordinates
        * y is vertical coordinate

### Teleport
```
/tp x y z [safe]
```
* Teleports player to specified location
* Parameters:
    * x y z:
        * integers, required
        * x anx z are horizontal coordinates
        * y is vertical coordinate
    * safe:
        * safe, optional
        * Aborts teleporting if coordinates are inside a block

### Time
```
/time set timeToSet
/time add timeToAdd
/time show
```
* Parameters:
    * set: timeToSet
        * integer, required
        * can also use the following named variables:
            * dawn = 0
            * day = 1000
            * noon = 6000
            * dusk = 12000
            * night = 14000
            * midnight = 18000
        * Changes the time to the given time
    * add: timeToAdd
        * integer, required
        * Number of ticks to add to the time
    * show
        * Toggles showing game ticks


### Coming soon...
```
/biome
/explode
/direction
/fly
/gamemode
/give
/heal
/kill
/ride
/time