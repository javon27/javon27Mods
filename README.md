# javon27Mods
## Minecraft Pocket Edition Mod Commands

This script is my attempt to add commands to Minecraft Pocket Edition. I test it on Android MCPE 0.13.1.

### Working Commands
### Help
```javascript
/help [1-5]
```
* Prints lists of available commands

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
/addeffect potionEffectName durationInSeconds [amplification=0] [ambient=false] [showParticles=true]
```
* Add potion effect to self for the duration set.
* Parameters:
	* potionEffectName: 
		* case-sensitive string, required
		* Name of effect. For a list of valid names, see [/potions](#Potions)
	* durationInSeconds: 
		* integer, required
		* Anything greater than zero
	* amplification:
		* integer, optional
		* default value is 

### Potions
