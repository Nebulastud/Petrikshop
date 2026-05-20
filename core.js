import { world, system, Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

const OWNER_ITEM = "petrik:owner_setting";
const PLAYER_ITEM = "petrik:player_menu";
const MENU_USE_SOUND = "random.toast";
const BUTTON_USE_SOUND = "random.levelup";
const SIDEBAR_OBJECTIVE = "petrik_sidebar";
const SIDEBAR_STATE_KEY = "petrik:sidebar_enabled";
const SIDEBAR_THEME_KEY = "petrik:sidebar_theme";
const SIDEBAR_THEMES = ["GOLEM", "IRIS", "JUNGLE", "MUMMY", "WITHER", "CAPTAIN", "SENTINEL"];

const DEFAULT_CHAT_RANK = "PLAYER";
const CHAT_RANKS = [
  { label: "OWNER", color: "§c", tags: ["rank:owner", "owner"] },
  { label: "ADMIN", color: "§c", tags: ["rank:admin", "admin"] },
  { label: "MOD", color: "§b", tags: ["rank:mod", "mod", "moderator"] },
  { label: "MEMBER", color: "§6", tags: ["rank:member", "member"] },
  { label: "PLAYER", color: "§a", tags: ["rank:player", "player"] }
];

const DEFAULT_CLAN = "NONE";
const DEFAULT_DEVICE = "MOBILE";
const CHAT_DEVICES = [
  { label: "MOBILE", tags: ["device:mobile", "mobile"] },
  { label: "PC", tags: ["device:pc", "pc", "desktop"] },
  { label: "CONSOLE", tags: ["device:console", "console"] }
];

let sidebarEnabledFallback = false;

const ownerMenuButtons = [
  { text: "SIDEBAR", icon: "textures/button/sidebar", action: "sidebar" },
  { text: "RANK\nMANAGEMENT", icon: "textures/button/menu_rank", action: "owner_submenu", title: "§r§a§n§k§m§g§r" },
  { text: "TIME\nSET", icon: "textures/button/menu_time", action: "owner_submenu", title: "§t§i§m§e§s§e§t" },
  { text: "GAMEMODE", icon: "textures/button/menu_gamemode", action: "owner_submenu", title: "§g§a§m§e§m§o§d§e" },
  { text: "PLAYER", icon: "textures/button/menu_player", action: "owner_submenu", title: "§p§l§a§y§e§r§m" },
  { text: "GACHA\nSET", icon: "textures/button/menu_gacha", action: "owner_submenu", title: "§g§a§c§h§a§s§e§t" },
  { text: "CLEARLAG", icon: "textures/button/menu_clearlag", action: "owner_submenu", title: "§c§l§e§a§r§l§a§g" },
  { text: "BROADCAST", icon: "textures/button/menu_broadcast", action: "owner_submenu", title: "§b§r§o§a§d§c§a§s§t" },
  { text: "NPC\nSISTEM", icon: "textures/button/menu_npc", action: "owner_submenu", title: "§n§p§c§s§i§s§t§e§m" },
  { text: "FLOATING\nTEXT", icon: "textures/button/menu_floating", action: "owner_submenu", title: "§f§l§o§a§t§t§e§x§t" },
  { text: "LOBY\nPROTEK", icon: "textures/button/menu_loby", action: "owner_submenu", title: "§l§o§b§y§p§r§o§t§e§k" },
  { text: "SHOP\nSISTEM", icon: "textures/button/menu_shop", action: "owner_submenu", title: "§s§h§o§p§s§i§s§t§e§m" },
  { text: "SET\nSPAWN", icon: "textures/button/menu_spawn", action: "owner_submenu", title: "§s§e§t§s§p§a§w§n" },
  { text: "VIEW\nREPORT", icon: "textures/button/menu_broadcast", action: "owner_submenu", title: "§v§i§e§w§r§e§p§o§r§t" },
  { text: "BAN\nITEM", icon: "textures/button/barrier", action: "owner_submenu", title: "§b§a§n§i§t§e§m" },
  { text: "BAN\nPLAYER", icon: "textures/button/barrier", action: "owner_submenu", title: "§b§a§n§p§l§a§y§e§r" },
  { text: "EMOTE", icon: "textures/button/menu_player", action: "owner_submenu", title: "§e§m§o§t§e" },
  { text: "CREDITE", icon: "textures/button/menu_broadcast", action: "owner_submenu", title: "§c§r§e§d§i§t§e" },
  { text: "ANTI\nCHEAT", icon: "textures/button/barrier", action: "owner_submenu", title: "§a§n§t§i§c§h§e§a§t" },
  { text: "ITEM", icon: "textures/button/item", action: "item_owner" }
];

const itemOwnerButtons = [
  { text: "COMMAND\nBLOCK", icon: "textures/button/command_block", command: "give @s command_block", message: "§aCommand block sudah diberikan." },
  { text: "EGG NPC", icon: "textures/button/egg_npc", command: "give @s spawn_egg 1 51", message: "§aEgg npc sudah diberikan." },
  { text: "BARRIER", icon: "textures/button/barrier", command: "give @s barrier", message: "§aBarrier sudah diberikan." },
  { text: "DENY\nBLOCK", icon: "textures/button/deny_block", command: "give @s deny", message: "§aDeny block sudah diberikan." },
  { text: "LIGHT\nBLOCK", icon: "textures/button/light_block", command: "give @s light_block", message: "§aLight block sudah diberikan." },
  { text: "BORDER", icon: "textures/button/border_block", command: "give @s border_block", message: "§aBorder sudah diberikan." },
  { text: "STRUCTURE\nBLOCK", icon: "textures/button/structure_block", command: "give @s structure_block", message: "§aStructure block sudah diberikan." },
  { text: "STRUCTURE\nVOID", icon: "textures/button/structure_void", command: "give @s structure_void", message: "§aStructure void sudah diberikan." }
];

const playerMenuButtons = [
  { text: "REPORT\nPLAYER", icon: "textures/button/menu_broadcast", action: "player_submenu", title: "§r§e§p§o§r§t§p§l§a§y§e§r" },
  { text: "SHOP\nMENU", icon: "textures/button/menu_shop", action: "player_submenu", title: "§s§h§o§p§m§e§n§u" },
  { text: "BACK\nPACK", icon: "textures/button/item", action: "player_submenu", title: "§b§a§c§k§p§a§c§k" },
  { text: "RANK\nMENU", icon: "textures/button/menu_rank", action: "player_submenu", title: "§r§a§n§k§m§e§n§u" },
  { text: "BANK\nMENU", icon: "textures/button/menu_shop", action: "player_submenu", title: "§b§a§n§k§m§e§n§u" },
  { text: "TRANSFER\nMONEY", icon: "textures/button/menu_broadcast", action: "player_submenu", title: "§t§r§a§n§s§f§e§r§m§o§n§e§y" },
  { text: "CLAIM\nLAND", icon: "textures/button/border_block", action: "player_submenu", title: "§c§l§a§i§m§l§a§n§d" },
  { text: "SET\nHOME", icon: "textures/button/menu_loby", action: "player_submenu", title: "§s§e§t§h§o§m§e" },
  { text: "PLAYER\nWARP", icon: "textures/button/menu_player", action: "player_submenu", title: "§p§l§a§y§e§r§w§a§r§p" },
  { text: "DAFTAR\nWARP", icon: "textures/button/menu_spawn", action: "player_submenu", title: "§d§a§f§t§a§r§w§a§r§p" },
  { text: "RANDOM\nTELEPORT", icon: "textures/button/menu_spawn", action: "player_submenu", title: "§r§a§n§d§o§m§t§e§l§e§p§o§r§t" },
  { text: "TELEPORT\nREQUEST", icon: "textures/button/menu_player", action: "player_submenu", title: "§t§e§l§e§p§o§r§t§r§e§q" },
  { text: "GACHA", icon: "textures/button/menu_gacha", action: "player_submenu", title: "§g§a§c§h§a§m§e§n§u" },
  { text: "RANK\nSHOP", icon: "textures/button/menu_rank", action: "player_submenu", title: "§r§a§n§k§s§h§o§p" },
  { text: "PROFIL\nINFO", icon: "textures/button/menu_player", action: "player_submenu", title: "§p§r§o§f§i§l§i§n§f§o" },
  { text: "MINI\nGAME", icon: "textures/button/menu_gamemode", action: "player_submenu", title: "§m§i§n§i§g§a§m§e" },
  { text: "CREDIT", icon: "textures/button/menu_broadcast", action: "player_submenu", title: "§c§r§e§d§i§t" }
];

function playSound(player, soundId) {
  try {
    player.playSound(soundId);
    return;
  } catch (_) {}

  try {
    player.runCommand(`playsound ${soundId} @s`);
  } catch (_) {}
}

function runPlayerCommand(player, command) {
  if (!command) return true;

  try {
    player.runCommand(command);
    return true;
  } catch (_) {}

  try {
    player.runCommandAsync(command);
    return true;
  } catch (_) {}

  return false;
}

function getSidebarEnabled() {
  try {
    return world.getDynamicProperty(SIDEBAR_STATE_KEY) === true;
  } catch (_) {
    return sidebarEnabledFallback;
  }
}

function setSidebarEnabled(value) {
  sidebarEnabledFallback = value;
  try {
    world.setDynamicProperty(SIDEBAR_STATE_KEY, value);
  } catch (_) {}
}

function getSidebarTheme() {
  try {
    const theme = String(world.getDynamicProperty(SIDEBAR_THEME_KEY) ?? "GOLEM").toUpperCase();
    return SIDEBAR_THEMES.includes(theme) ? theme : "GOLEM";
  } catch (_) {
    return "GOLEM";
  }
}

function setSidebarTheme(theme) {
  const safeTheme = SIDEBAR_THEMES.includes(String(theme).toUpperCase()) ? String(theme).toUpperCase() : "GOLEM";
  try {
    world.setDynamicProperty(SIDEBAR_THEME_KEY, safeTheme);
  } catch (_) {}
  return safeTheme;
}

function safeSidebarText(value, maxLength = 32) {
  return String(value ?? "")
    .replace(/["\n\r]/g, "")
    .slice(0, maxLength);
}

function getClockText() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function getSidebarText(player) {
  const players = world.getAllPlayers();
  const name = safeSidebarText(player?.name ?? "Player", 24);

  // Mengikuti tampilan Admin Suite: tidak ada text YOUR SERVER,
  // dan Device diganti menjadi Fps.
  return [
    `§fɴᴀᴍᴀ: §a${name}`,
    `${(() => { const rank = getPlayerRankData(player); return `§fʀᴀɴᴋ: ${rank.color}${rank.label}`; })()}`,
    `§fᴄʟᴀɴ: §f${getPlayerClan(player)}`,
    "§fᴍᴏɴᴇʏ: §e$0",
    "§r ",
    `§fᴏɴʟɪɴᴇ: §a${players.length}`,
    "§fғᴘꜱ: §a60",
    `§fᴛɪᴍᴇ: §b${getClockText()}`,
    "§fᴛᴘꜱ: §a20.0"
  ].join("\n");
}

function showSidebarTitle(player) {
  if (!player) return false;

  const text = getSidebarText(player);

  try {
    player.onScreenDisplay.setTitle(text, {
      fadeInDuration: 0,
      stayDuration: 40,
      fadeOutDuration: 0
    });
    return true;
  } catch (_) {}

  try {
    runPlayerCommand(player, "title @s times 0 40 0");
    runPlayerCommand(player, `titleraw @s title ${JSON.stringify({ rawtext: [{ text }] })}`);
    return true;
  } catch (_) {}

  return false;
}

function clearSidebarTitle(player) {
  if (!player) return;

  try {
    player.onScreenDisplay.setTitle("", {
      fadeInDuration: 0,
      stayDuration: 0,
      fadeOutDuration: 0
    });
  } catch (_) {}

  try { runPlayerCommand(player, "title @s clear"); } catch (_) {}
}

function clearOldScoreboardSidebar(player) {
  // Membersihkan sidebar scoreboard dari versi sebelumnya supaya tidak menumpuk.
  runPlayerCommand(player, "scoreboard objectives setdisplay sidebar");
  runPlayerCommand(player, `scoreboard objectives remove ${SIDEBAR_OBJECTIVE}`);
}

function enableSidebar(player, theme = getSidebarTheme()) {
  const activeTheme = setSidebarTheme(theme);
  clearOldScoreboardSidebar(player);
  const success = showSidebarTitle(player);
  setSidebarEnabled(true);
  try { player.sendMessage(success ? `§a${activeTheme} diaktifkan.` : `§cGagal mengaktifkan ${activeTheme}.`); } catch (_) {}
  return success;
}

function disableSidebar(player) {
  const activeTheme = getSidebarTheme();
  clearSidebarTitle(player);
  clearOldScoreboardSidebar(player);
  setSidebarEnabled(false);
  try { player.sendMessage(`§c${activeTheme} dinonaktifkan.`); } catch (_) {}
  return true;
}

function toggleSidebar(player, theme = getSidebarTheme()) {
  const activeTheme = String(theme).toUpperCase();
  const isActiveTheme = getSidebarTheme() === activeTheme;
  playSound(player, BUTTON_USE_SOUND);
  if (getSidebarEnabled() && isActiveTheme) {
    disableSidebar(player);
  } else {
    enableSidebar(player, activeTheme);
  }
}

system.runInterval(() => {
  if (!getSidebarEnabled()) return;
  for (const player of world.getAllPlayers()) {
    showSidebarTitle(player);
  }
}, 20);

async function showOwnerSubMenu(player, titleMarker) {
  try {
    const form = new ActionFormData()
      .title(titleMarker)
      .body("");

    form.button("BACK", "textures/button/menu_back");

    const result = await form.show(player);
    if (result.canceled || result.selection === undefined) {
      system.runTimeout(() => showOwnerMenu(player), 1);
      return;
    }

    if (result.selection === 0) {
      system.runTimeout(() => showOwnerMenu(player), 1);
    }
  } catch (_) {
    try { player.sendMessage("§cMenu OWNER SETTING gagal dibuka."); } catch (_) {}
  }
}

async function showOwnerMenu(player) {
  try {
    const form = new ActionFormData()
      .title("§g§r§i§d§r")
      .body("");
    for (const entry of ownerMenuButtons) form.button(entry.text, entry.icon);

    const result = await form.show(player);
    if (result.canceled || result.selection === undefined) return;

    const picked = ownerMenuButtons[result.selection];
    if (!picked) return;

    if (picked.action === "item_owner") {
      system.runTimeout(() => showItemOwnerMenu(player), 1);
    } else if (picked.action === "sidebar") {
      system.runTimeout(() => showSidebarMenu(player), 1);
    } else if (picked.action === "owner_submenu") {
      system.runTimeout(() => showOwnerSubMenu(player, picked.title), 1);
    }
  } catch (_) {
    try { player.sendMessage("§cOWNER SETTING gagal dibuka."); } catch (_) {}
  }
}

async function showSidebarMenu(player) {
  try {
    const enabled = getSidebarEnabled();
    const activeTheme = getSidebarTheme();
    const form = new ActionFormData()
      .title("§d§r§a§g§o§n")
      .body(`§fStatus ${activeTheme}: ${enabled ? "§aON" : "§cOFF"}`);

    for (const theme of SIDEBAR_THEMES) {
      const isActive = enabled && activeTheme === theme;
      form.button(
        `${theme}\n${isActive ? "§cOFF" : "§aON"}`,
        isActive ? "textures/button/sidebar_on" : "textures/button/sidebar_off"
      );
    }

    const result = await form.show(player);
    if (result.canceled || result.selection === undefined) return;

    const pickedTheme = SIDEBAR_THEMES[result.selection];
    if (!pickedTheme) return;

    toggleSidebar(player, pickedTheme);
    system.runTimeout(() => showSidebarMenu(player), 6);
  } catch (_) {
    try { player.sendMessage("§cDRAGON gagal dibuka."); } catch (_) {}
  }
}

async function showPlayerSubMenu(player, titleMarker) {
  try {
    const form = new ActionFormData()
      .title(titleMarker)
      .body("");

    form.button("BACK", "textures/button/menu_back");

    const result = await form.show(player);
    if (result.canceled || result.selection === undefined) {
      system.runTimeout(() => showPlayerMenu(player), 1);
      return;
    }

    if (result.selection === 0) {
      system.runTimeout(() => showPlayerMenu(player), 1);
    }
  } catch (_) {
    try { player.sendMessage("§cMenu PLAYER gagal dibuka."); } catch (_) {}
  }
}

async function showPlayerMenu(player) {
  try {
    const form = new ActionFormData()
      .title("§p§m§e§n§u")
      .body("");

    for (const entry of playerMenuButtons) form.button(entry.text, entry.icon);

    const result = await form.show(player);
    if (result.canceled || result.selection === undefined) return;

    const picked = playerMenuButtons[result.selection];
    if (!picked) return;

    if (picked.action === "player_submenu") {
      system.runTimeout(() => showPlayerSubMenu(player, picked.title), 1);
    }
  } catch (_) {
    try { player.sendMessage("§cPLAYER MENU gagal dibuka."); } catch (_) {}
  }
}

async function showItemOwnerMenu(player) {
  try {
    const form = new ActionFormData()
      .title("§i§t§e§m§o§w§n§e§r")
      .body("");
    for (const entry of itemOwnerButtons) form.button(entry.text, entry.icon);
    const result = await form.show(player);
    if (result.canceled || result.selection === undefined) {
      system.runTimeout(() => showOwnerMenu(player), 1);
      return;
    }
    const picked = itemOwnerButtons[result.selection];
    if (!picked) return;

    const success = runPlayerCommand(player, picked.command);
    if (picked.message) player.sendMessage(success ? picked.message : "§cGagal menjalankan command item.");
  } catch (_) {
    try { player.sendMessage("§cITEM OWNER menu gagal dibuka."); } catch (_) {}
  }
}

world.afterEvents.itemUse.subscribe((event) => {
  const player = event.source;
  const item = event.itemStack;
  if (!(player instanceof Player) || !item) return;

  if (item.typeId === OWNER_ITEM) {
    playSound(player, MENU_USE_SOUND);
    system.runTimeout(() => showOwnerMenu(player), 1);
  } else if (item.typeId === PLAYER_ITEM) {
    playSound(player, MENU_USE_SOUND);
    system.runTimeout(() => showPlayerMenu(player), 1);
  }
});

function getPlayerRankData(player) {
  let tags = [];
  try {
    tags = player.getTags();
  } catch (_) {}

  for (const rank of CHAT_RANKS) {
    if (rank.tags.some((tag) => tags.includes(tag))) {
      return rank;
    }
  }

  return CHAT_RANKS.find((rank) => rank.label === DEFAULT_CHAT_RANK) ?? { label: DEFAULT_CHAT_RANK, color: "§a" };
}

function getPlayerClan(player) {
  let tags = [];
  try {
    tags = player.getTags();
  } catch (_) {}

  for (const tag of tags) {
    if (tag.startsWith("clan:")) {
      const clanName = tag.slice(5).trim();
      if (clanName) return clanName.toUpperCase();
    }
  }

  return DEFAULT_CLAN;
}

function getPlayerDevice(player) {
  let tags = [];
  try {
    tags = player.getTags();
  } catch (_) {}

  for (const device of CHAT_DEVICES) {
    if (device.tags.some((tag) => tags.includes(tag))) {
      return device.label;
    }
  }

  return DEFAULT_DEVICE;
}

function getCleanChatMessage(message) {
  return String(message ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim();
}

function sendCustomChatMessage(player, message) {
  const cleanMessage = getCleanChatMessage(message);
  if (!cleanMessage) return;

  const rank = getPlayerRankData(player);
  const clan = getPlayerClan(player);
  const device = getPlayerDevice(player);
  const playerName = player?.name ?? "Player";

  const rankText = `§6${rank.label}`;
  const clanText = `§f${clan}`;
  const deviceText = `§e${device}`;

  world.sendMessage(`§7[${rankText}§7] §7[${clanText}§7] §7[${deviceText}§7] §f${playerName} §7>> §f${cleanMessage}`);
}


try {
  world.beforeEvents.chatSend.subscribe((event) => {
    const sender = event.sender;
    if (!(sender instanceof Player)) return;

    event.cancel = true;
    sendCustomChatMessage(sender, event.message);
  });
} catch (_) {
  try {
    world.afterEvents.chatSend.subscribe((event) => {
      const sender = event.sender;
      if (!(sender instanceof Player)) return;
      sendCustomChatMessage(sender, event.message);
    });
  } catch (_) {}
}
