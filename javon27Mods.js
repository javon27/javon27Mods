// Each line is a page for the help menu
var cmdPages = [
    ["addeffect", "clear", "help", "home", "position"],
    ["potions", "sethome", "setspawn", "tp"],
    ["biome", "direction", "fly", "gamemode", "give"],
    ["ride", "time"]
];

// Show player coordinates if set to true
var position = false;

// Show game time if true
var showTime = false;

// Shorten a few color names
var CMD_COLOR = ChatColor.YELLOW;           // Color for command text
var PARAM_COLOR = ChatColor.LIGHT_PURPLE;   // command parameters
var OPT_COLOR = ChatColor.GRAY;             // optional command parameters
var TXT_COLOR = ChatColor.WHITE;            // normal text

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
    clientMessage(ChatColor.LIGHT_PURPLE + "Welcome! Thanks for using javon27Mods");
    msg("Type /help to see available list of commands\n\n");
}

function modTick() {
    var msg = "";
    if (position) {
        msg += "\n[x: " + Math.round(getPlayerX()) + " y: "+Math.round(getPlayerY()) + " z: " + Math.round(getPlayerZ()) + "]";
    }
    if (showTime) {
        var ticks = Level.getTime();
        ticks %= 24000;
        var hour = parseInt(ticks/1000) + 6;
        var meridiem = "pm";
        if (hour < 12) {
            meridiem = "am";
        }
        if ((hour %= 12) == 0) {
            hour = 12;
        }
        ticks %= 1000;
        var minutes = parseInt(ticks * 60 / 1000);
        minutes = ("0" + minutes).slice(-2);
        ticks %= 1000 / 60;
        var seconds = parseInt(ticks / (1000/60/60));
        seconds = ("0" + seconds).slice(-2);
        msg += "\nT: " + hour + ":" + minutes + ":" + seconds + " " + meridiem;
    }
    ModPE.showTipMessage(msg);
}

function procCmd(c) {
    var line = c.split(" ");
    var cmd = line[0].toLowerCase();
    var args = line.slice(1);

    switch (cmd) {
        case "addeffect" : {
            addeffect(args);
            break;
        }
        case "clear" : {
            cClear(args);
            break;
        }
        case "help" : {
            var pageNo;
            if (args.length == 0) {
                pageNo = 1;
            }
            else if (isNaN(args[0])) {
                help(args);
                break;
            }
            else {
                pageNo = parseInt(args[0]);
            }
            helpPage(pageNo);
            break;
        }
        case "home" : {
            tpHome();
            break;
        }
        case "position" : {
            position = !position;
            break;
        }
        case "potions" : {
            potions(args);
            break;
        }
        case "sethome" : {
            sethome(args);
            break;
        }
        case "setspawn" : {
            setspawn(args);
            break;
        }
        case "time" : {
            time(args);
            break;
        }
        case 'tp': {
            tp(args);
            break;
        }
        default : {
            var keywordFound = false;
            cmdPages.forEach(function(v,i,r) {
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

function msg(msg) {
    var words = msg.split(" ");
    words.forEach(function (word, i, arg) {
        if ( /^\/(\w+)/ig.test(word) ) {
            words[i] = CMD_COLOR + word;
        } else if ( /^<\S+>$/.test(word) ) {
            words[i] = PARAM_COLOR + word.replace(/<(\S+)>/, "$1");
        } else if ( /^\[[\S\s]+\]$/.test(word) ) {
            words[i] = OPT_COLOR + word;
        } else {
            words[i] = TXT_COLOR + word;
        }
    });
    msg = words.join(" ");
    clientMessage(msg);
}
function err(msg) { clientMessage(ChatColor.RED + "ERROR" + ChatColor.WHITE + " : " + msg); }
function suc(msg) { clientMessage(ChatColor.GREEN + "SUCCESS" + ChatColor.WHITE + " : " + msg); }
function info(msg) { clientMessage(ChatColor.YELLOW + "INFO" + ChatColor.WHITE + " : " + msg); }
function warn(msg) { clientMessage(ChatColor.GOLD + "WARNING" + ChatColor.WHITE + " : " + msg); }

function cmdTitle(cmd) { clientMessage("=== " + CMD_COLOR + cmd + TXT_COLOR + " ==="); }

function helpPage(pageNo) {
    pageNo = pageNo - 1;

    if (0 <= pageNo && pageNo < cmdPages.length) {
        clientMessage(ChatColor.GREEN + "\n=== Help Page " + (pageNo+1) + " of " + cmdPages.length + " ===");
        cmdPages[pageNo].forEach(function(cmd,i,arg) {
            msg("/" + cmd);
        });
    } else {
        err((pageNo + 1) + " is not a valid page number.");
    }
    msg("For more help, type /help <command>");
}

function addeffect(args) {
    if (args.length > 0 && potions.indexOf(args[0]) == -1) {
        err(args[0] + " is not a valid potion effect");
    } else if (args.length == 1) {
        err("Invalid number of parameters. Type /help <addeffect> for usage help");
    } else if (args.length > 1 && potions.indexOf(args[0]) > -1 && !isNaN(args[1])) {
        var amplification = 0, ambient = false, showParticles = true;

        if (args.length > 2) {
            if (!isNaN(args[2])) {
                    amplification = args[2];
                } else {
                    err("Type /help <addeffect> for help using this command");
                    return;
                }
        }
        if (args.length > 3) {
            if (args[3] == "false") {
                ambient = false;
            } else if (args[3] == "true") {
                ambient = true;
            } else {
                err("Type /help <addeffect> for help using this command");
                return;
            }
        }
        if (args.length > 4) {
            if (args[4] == "false") {
                showParticles = false;
            } else if (args[4] == "true") {
                showParticles = true;
            } else {
                err("Type /help <addeffect> for help using this command");
                return;
            }
        }
        if (args.length > 5) {
            err("Type /help <addeffect> for help using this command");
            return;
        }
        Entity.addEffect(getPlayerEnt(), potionObjs[potions.indexOf(args[0])], parseInt(args[1])*20, 0, false, true);
        info(args[0] + " effect activated for " + args[1] + " seconds");
    } else {
        err("Type /help <addeffect> for help using this command");
    }
}

function cClear(args) {
    if (args.length == 0) {
        for (var i = 0; i < 100; i++) {
            msg("\n");
        }
        print("Chat cleared");
    } else {
        msg("Clear WHAT now?")
    }
}

function help(args) {
    var cmd = args[0];
    msg("");
    cmdTitle(cmd);
    switch (cmd) {
        case "addeffect" : {
            msg("Adds potion effect to player");
            msg("usage: /addeffect <potionEffect> <seconds> [amplification=0] \n   [ambient=false] [showParticles=true]");
            msg("Type /potions for a list of valid potion effects.")
            break;
        }
        case "clear" : {
            msg("Clears the chat log");
            break;
        }
        case "home" : {
            msg("Teleports the player to home (if set)");
            break;
        }
        case "potions" : {
            msg("Shows list of potion effects for /addeffect command");
            break;
        }
        case "sethome" : {
            msg("Sets current location as the destination for the /home command");
            break;
        }
        case "setspawn" : {
            msg("Sets level spawn point");
            msg("usage: /setspawn [x] [y] [z]");
            break;
        }
        case "position" : {
            msg("Turns on/off player position");
            break;
        }
        case "time" : {
            if (args.length == 1) {
                msg("Command to alter game time");
                msg("Type /help <time> <set> or /help <time> <add> for more help");
            } else if (args[1] == "set") {
                msg("Sets the time to the given integer value");
                msg("The following text values are also supported:");
                msg("dawn, day, noon, dusk, night, midnight");
                msg("usage: /time <set> <t>");
            } else if (args[1] == "add") {
                msg("Add the given number of ticks to the time");
                msg("usage: /time <add> <t>");
            } else {
                err("Type /help <time> for valid help options")
            }
            break;
        }
        case "tp" : {
            msg("Teleports you to specified location");
            msg("'safe' warns if you will /tp into a block");
            msg("usage: /tp <x> <y> <z> [safe]");
            break;
        }
    }
}

function potions(args) {
    var tmp = "";
    potions.forEach(function(potion, index, arg) {
        tmp = tmp + potion + ", ";
        if (index == (potions.length - 1) || tmp.length > 70) {
            msg(tmp);
            tmp = "";
        }
    });
}

function sethome(args) {
    var world = Level.getWorldDir();
    ModPE.saveData(world + "-homePosX", parseInt(Player.getX()));
    ModPE.saveData(world + "-homePosY", parseInt(Player.getY()));
    ModPE.saveData(world + "-homePosZ", parseInt(Player.getZ()));
    ModPE.saveData(world + "-homeSet", 1);
    info("Set Home at X:" + getPlayerX() + ", Y:" + getPlayerY() + ", Z:" + getPlayerZ());
}

function setspawn(args) {
    if (args.length == 3) {
        var valid = true;
        args.forEach(function(v,i,r) {
            if (isNaN(v)) {
                err("Invalid parameters. Type /help <setspawn> for help using this command");
                valid = false;
            }
        });
        if (!valid) {
            return;
        }
        Level.setSpawn(args[0], args[1], args[2]);
        info("Spawn set to X:" + args[0] + ", Y:" + args[1] + ", Z:" + args[2]);
    } else if (args.length == 0) {
        Level.setSpawn(getPlayerX(), getPlayerY(), getPlayerZ());
        info("Spawn set to X:" + parseInt(getPlayerX()) + ", Y:" + parseInt(getPlayerY()) + ", Z:" + parseInt(getPlayerZ()));
    } else {
        err("What? Type /help <setspawn> for help using this command");
    }
}

function time(args) {
    if (args.length == 0 || args.length > 2) {
        err("Invalid number of parameters. Type /help <time> for help using this command");
        return;
    } else if (args.length == 2) {
        if (args[0] == "set") {
            var t = args[1];
            switch (t) {
                case "dawn" : {
                    t = 0;
                    break;
                }
                case "day" : {
                    t = 1000;
                    break;
                }
                case "noon" : {
                    t = 6000;
                    break;
                }
                case "dusk" : {
                    t = 12000;
                    break;
                }
                case "night" : {
                    t = 14000;
                    break;
                }
                case "midnight" : {
                    t = 18000;
                    break;
                }
                default : {
                    if (isNaN(t = parseInt(t))) {
                        err("Invalid parameter for /time set. Type /help <time> <set> for help using this command");
                        return;
                    }
                }
            }
            Level.setTime(t);
            info("Time set to " + t);
        } else if (args[0] == "add") {
            var t = Level.getTime();
            if (!isNaN(parseInt(args[1]))) {
                t += parseInt(args[1]);
                Level.setTime(t);
                info("Time set to " + t);
            } else {
                err("Invalid parameter for /time add. Type /help <time> <add> for help using this command");
                return;
            }
        } else {
            err("Type /help <time> for help using this command");
        }
    } else {
        if (args[0] == "show") {
            showTime = !showTime;
        }
    }
}

function tp(args) {
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
        return;
    }

    if(args[3] == 'safe'){
        if((getBlock(args[0], args[1], args[2]) != null && getBlock(args[0], args[1], args[2]) != 0) ||
            (getBlock(args[0], args[1]- 0.5, args[2]) != null && getBlock(args[0], args[1], args[2]) != 0)){
            warn("Safe Tp: Specified pos is inside a block");
            return;
        }

        Entity.setPosition(getPlayerEnt(), args[0], args[1], args[2]);
        info("Safely teleported player to X:" + args[0] + ", Y:" + args[1] + ", Z:" + args[2]);
        return;
    }

    Entity.setPosition(getPlayerEnt(), args[0], args[1], args[2]);
    info("Teleported player to X:" + args[0] + ", Y:" + args[1] + ", Z:" + args[2]);
}

function tpHome() {
    var world = Level.getWorldDir();
    if (ModPE.readData(world + "-homeSet") == '') {
        err("Home not set. Use /sethome to do so")
        return;
    }
    Entity.setPosition(getPlayerEnt(),
                       parseFloat(ModPE.readData(world + "-homePosX")) + 0.25,
                       parseFloat(ModPE.readData(world + "-homePosY")) + 1.00,
                       parseFloat(ModPE.readData(world + "-homePosZ")) + 0.25);
    info("Teleported home");
}