// Each line is a page for the help menu
var pages = [
    ["clear", "showcoords", "addeffect", "potions"],
    ["sethome", "setspawn", "timeset", "tp"],
    ["effect", "explode", "fly", "forward", "gamemode"],
    ["gamespeed", "biome", "give", "heal", "home"],
    ["itemdata", "joinserver", "kill", "ride", "sethealth"]
];

// Show player coordinates if set to true
var showcoords = false;

var potions = [
    "saturation",
    "absorption",
    "healthBoost",
    "wither",
    "poison",
    "weakness",
    "hunger",
    "nightVision",
    "blindness",
    "invisibility",
    "waterBreathing",
    "fireResistance",
    "damageResistance",
    "regeneration",
    "confusion",
    "jump",
    "harm",
    "heal",
    "damageBoost",
    "digSlowdown",
    "digSpeed",
    "movementSlowdown",
    "movementSpeed"
];

var potionObjs = [
    MobEffect.saturation,
    MobEffect.absorption,
    MobEffect.healthBoost,
    MobEffect.wither,
    MobEffect.poison,
    MobEffect.weakness,
    MobEffect.hunger,
    MobEffect.nightVision,
    MobEffect.blindness,
    MobEffect.invisibility,
    MobEffect.waterBreathing,
    MobEffect.fireResistance,
    MobEffect.damageResistance,
    MobEffect.regeneration,
    MobEffect.confusion,
    MobEffect.jump,
    MobEffect.harm,
    MobEffect.heal,
    MobEffect.damageBoost,
    MobEffect.digSlowdown,
    MobEffect.digSpeed,
    MobEffect.movementSlowdown,
    MobEffect.movementSpeed,
]

function newLevel() {
    msg(ChatColor.LIGHT_PURPLE + "Welcome! Thanks for using javon27Mods");
    msg("Type /help to see available list of commands\n\n");
}

function modTick() {
    if (showcoords) {
        ModPE.showTipMessage("\n[x: "+Math.round(getPlayerX())+" y: "+Math.round(getPlayerY())+" z: "+Math.round(getPlayerZ())+"]");
    }
}

function procCmd(c) {
    var line = c.split(" ");
    var cmd = line[0].toLowerCase();
    var args = line.slice(1);

    switch (cmd) {
        case "help" : {
            var pageNo;
            if (args.length == 0 || isNaN(args[0]))
                pageNo = 1;
            else
                pageNo = parseInt(args[0]);
            helpPage(pageNo);
            break;
        }
        case "clear" : {
            if (args[0] === "help") {
                cmdTitle(cmd);
                msg("Clears the chat log");
            } else if (args.length == 0) {
                for (var i = 0; i < 20; i++) {
                    msg("\n");
                }
            } else {
                msg("Clear WHAT now?")
            }
            break;
        }
        case "showcoords" : {
            if (args[0] === "help") {
                cmdTitle(cmd);
                msg("Turns on/off player coordinates");
            } else {
                showcoords = !showcoords;
            }
            break;
        }
        case "addeffect" : {
            if (args[0] === "help") {
                cmdTitle(cmd);
                msg("Adds potion effect to player");
                msg("usage: /addeffect [potion effect] [seconds] [amplification=0]\n   [ambient=false] [showParticles=true]");
                msg("Type /potions for a list of valid potion effects.")
            } else if (args.length > 0 && potions.indexOf(args[0]) == -1) {
                err(args[0] + " is not a valid potion effect");
            } else if (args.length == 1) {
                err("Invalid number of parameters. Type '/addeffect help' for usage help");
            } else if (args.length > 1 && potions.indexOf(args[0]) > -1 && !isNaN(args[1])) {
                var amplification = 0, ambient = false, showParticles = true;

                if (args.length > 2) {
                    if (!isNaN(args[2])) {
                            amplification = args[2];
                        } else {
                            err("Type '/addeffect help' for help using this command");
                            break;
                        }
                }
                if (args.length > 3) {
                    if (args[3] == "false") {
                        ambient = false;
                    } else if (args[3] == "true") {
                        ambient = true;
                    } else {
                        err("Type '/addeffect help' for help using this command");
                        break;
                    }
                }
                if (args.length > 4) {
                    if (args[4] == "false") {
                        showParticles = false;
                    } else if (args[4] == "true") {
                        showParticles = true;
                    } else {
                        err("Type '/addeffect help' for help using this command");
                        break;
                    }
                }
                if (args.length > 5) {
                    err("Type '/addeffect help' for help using this command");
                    break;
                }
                Entity.addEffect(getPlayerEnt(), potionObjs[potions.indexOf(args[0])], parseInt(args[1])*20, 0, false, true);
            } else {
                err("Type '/addeffect help' for help using this command");
            }
            break;
        }
        case "potions" : {
            var tmp = "";
            potions.forEach(function(potion, index, arg) {
                tmp = tmp + potion + " ";
                if (index % 5 == 0) {
                    tmp = tmp + "\n";
                }
            });
            msg(tmp);
            break;
        }
        case "sethome" : {
            if (args[0] === "help") {
                cmdTitle(cmd);
                msg("Sets the destination for the /home cmd");
                break;
            }

            ModPE.saveData("homePosX", parseInt(Player.getX()));
            ModPE.saveData("homePosY", parseInt(Player.getY()));
            ModPE.saveData("homePosZ", parseInt(Player.getZ()));
            ModPE.saveData("homeSet", 1);
            info("Set Home at X:" + getPlayerX() + ", Y:" + getPlayerY() + ", Z:" + getPlayerZ());

            break;
        }
        case "setspawn" : {
            if (args[0] === "help") {
                cmdTitle(cmd);
                msg("Sets player spawn point");
                break;
            } else if (args.length == 3) {
                var valid = true;
                args.forEach(function(v,i,r) {
                    if (isNaN(v)) {
                        err("Invalid parameters. Type '/setspawn help' for help using this command");
                        valid = false;
                    }
                });
                if (!valid) {
                    break;
                }
                Level.setSpawn(args[0], args[1], args[2]);
                info("Spawn set to X:" + args[0] + ", Y:" + args[1] + ", Z:" + args[2]);
            } else if (args.length == 0) {
                Level.setSpawn(getPlayerX(), getPlayerY(), getPlayerZ());
                info("Spawn set to X:" + parseInt(getPlayerX()) + ", Y:" + parseInt(getPlayerY()) + ", Z:" + parseInt(getPlayerZ()));
            } else {
                err("What? Type '/setspawn help' for help using this cmd");
            }
            break;
        }
        case "home" : {
            if (args[0] === "help") {
                cmdTitle(cmd);
                msg("Teleports the player to home (if set)");
                break;
            }
            if (ModPE.readData("homeSet") == null) {
                err("Home not set. Use /sethome to do so")
                break;
            }
            Entity.setPosition(getPlayerEnt(),
                               parseFloat(ModPE.readData("homePosX")) + 0.25,
                               parseFloat(ModPE.readData("homePosY")) + 1.00,
                               parseFloat(ModPE.readData("homePosZ")) + 0.25);
            info("Teleported home");
            break;
        }
        case 'tp': {
            if(args[0] === "help"){
                msg("Teleports you to specified pos");
                msg("usage: /tp x y z [safe] (Warns if you will /tp into a block)");
                break;
            }

            if (args[0] == null || isNaN(args[0]) ||
                args[1] == null || isNaN(args[1]) ||
                args[2] == null || isNaN(args[2])) {
                if((isNaN(args[0]))){
                    err("Specified X pos in not an integer");
                }
                if(args[1] == null){
                    err("No X pos specified");
                }
                if((isNaN(args[1]))){
                    err("Specified Y pos in not an integer");
                }
                if(args[1] == null){
                    err("No Y pos specified");
                }
                if((isNaN(args[2]))){
                    err("Specified Z pos in not an integer");
                }
                if(args[2] == null){
                    err("No Z pos specified");
                }
                break;
            }

            if(args[3] == 'safe'){
                if((getBlock(args[0], args[1], args[2]) != null && getBlock(args[0], args[1], args[2]) != 0) ||
                    (getBlock(args[0], args[1]- 0.5, args[2]) != null && getBlock(args[0], args[1], args[2]) != 0)){
                    warn("Safe Tp: Specified pos is inside a block");
                    break;
                }

                Entity.setPosition(getPlayerEnt(), args[0], args[1], args[2]);
                info("Safely teleported player to X:" + args[0] + ", Y:" + args[1] + ", Z:" + args[2]);
                break;
            }

            Entity.setPosition(getPlayerEnt(), args[0], args[1], args[2]);
            info("Teleported player to X:" + args[0] + ", Y:" + args[1] + ", Z:" + args[2]);

            break;
        }
        default : {
            var keywordFound = false;
            pages.forEach(function(v,i,r) {
                if (v.indexOf(cmd) > -1) {
                    keywordFound = true;
                }
            })
            if (keywordFound) {
                warn("/" + cmd + " has not been implemented yet")
            } else {
                err("/" + cmd + " is not a valid command");
            }
        }
    }
}

function msg(msg){
    clientMessage(ChatColor.WHITE + msg);
}

function err(msg){
    clientMessage(ChatColor.RED + "ERROR" + ChatColor.WHITE + " : " + msg);
}

function suc(msg){
    clientMessage(ChatColor.GREEN + "SUCCESS" + ChatColor.WHITE + " : " + msg);
}

function info(msg){
    clientMessage(ChatColor.YELLOW + "INFO" + ChatColor.WHITE + " : " + msg);
}

function warn(msg){
    clientMessage(ChatColor.GOLD + "WARNING" + ChatColor.WHITE + " : " + msg);
}

function cmdTitle(cmd) {
    clientMessage("=== " + cmd + " ===");
}

function debug() {
    clientMessage("§f");
}

function helpPage(pageNo) {
    pageNo = pageNo - 1;

    if (0 <= pageNo && pageNo < pages.length) {
        if (pageNo === 0) {
            msg("For more help, type /cmdname help");
        }
        msg("\n=== Help Page " + (pageNo+1) + " ===");
        pages[pageNo].forEach(function(cmd,i,arg) {
            msg("/" + cmd);
        });
    } else {
        err((pageNo + 1) + " is not a valid page number.");
    }

}