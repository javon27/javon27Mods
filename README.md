# javon27Mods
## Minecraft Pocket Edition Mod Commands

This script is my attempt to add commands to Minecraft Pocket Edition. Tested on Android MCPE 0.13.1.
---

### Working Commands
### Help
```
/help [pageNo]
```
* Prints lists of available commands
* Parameters:
    * pageNo:
        * integer, optional

### Clear
```
/clear
```
* Clears the chat log

### Showcoords
```
/showcoords
```
* Toggles showing player's current position

### Addeffect
```
/addeffect potionEffectName durationInSeconds [amplification [ambient [showParticles]]]
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

### Home
```
/home
```
* Teleports the player to home (if set)

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

### Coming soon...
```
/timeset
/fly
/gamemode
/ride
/biome
/give
/direction
