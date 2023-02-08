import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CommandList } from "./CommandList";

const FileOutPutButtonNPC = (props) => {
  const buttonNPCRef = useRef(null);

  const ButtonToolKit = () => {
    if (props.nbtVersionTool === "horizon") {
      return (
        <>
          <FontAwesomeIcon className="fontAweIcon" icon="fa-exchange" />
          Convert File to Horizon NPC
        </>
      );
    } else {
      return (
        <>
          <FontAwesomeIcon className="fontAweIcon" icon="fa-exchange" />
          Convert File to Toolbox NPC
        </>
      );
    }
  };
  const FileOutputNPCLogic = () => {
    let NameBuilder = props.nameInput.replaceAll(" ", "_");
    if (
      props.contentOutputTargetRef.current.value === (undefined || null) ||
      props.contentOutputTargetHoldDataRef === null
    ) {
      buttonNPCRef.current.classList.add("redB");
      buttonNPCRef.current.classList.remove("yellowB");
    } else {
      console.log(props.contentOutputTargetRef.current.value);
      let content = String(props.contentOutputTargetHoldDataRef);
      console.log(content);
      const commands = getUsefulCommands(content);
      let commands_per_npc = parseInt(props.valueInput);
      let nbt_name = props.FileName.split("\\")
        .pop()
        .replace(".txt", "")
        .replace(".mcfunction", "")
        .replaceAll(" ", "_");
      let curSec = 0;
      let NBTdata = getBlockOpener(nbt_name);
      let NPCCount = Math.ceil(commands.length / commands_per_npc);
      for (var i = 0; i < commands.length; i += commands_per_npc) {
        curSec++;
        let NPCCommandList = commands.slice(i, i + commands_per_npc);
        let nextNPC = curSec === NPCCount ? 1 : curSec + 1;

        // Need to add special commands per NPC

        if (props.nbtVersionTool === "horizon") {
          NPCCommandList.unshift(`/tickingarea add circle ~ ~ ~ 4 NPCCOMMANDS`);
          NPCCommandList.push(`/tickingarea remove NPCCOMMANDS`);
          if (NPCCount > 1) {
            NPCCommandList.push(
              `/dialogue open @e[tag=${nbt_name}${nextNPC},type=NPC] @initiator`
            );
          }
          NPCCommandList.push(`/kill @s`);
        } else {
          NPCCommandList.unshift(
            `/tickingarea add circle ~60 ~20 ~60 4 NPCCOMMANDS\\"`
          );
          NPCCommandList.push(`/tickingarea remove NPCCOMMANDS\\"`);
          if (NPCCount > 1) {
            NPCCommandList.push(
              `/dialogue open @e[tag=${nbt_name}${nextNPC},type=NPC] @initiator\\"`
            );
          }
          NPCCommandList.push(`/kill @s\\"`);
        }

        // Build meat and potatoes of the NPC
        NBTdata += getNPCOpener(curSec, nbt_name);
        NBTdata += NPCCommandList.map((x) => commandToNBT(x.trim())).join(",");
        NBTdata += getNPCCloser(curSec, nbt_name);

        // If there will be another NPC, glue with comma
        if (curSec < NPCCount) {
          NBTdata += ",";
        }
      }
      NBTdata += getBlockCloser();
      props.contentOutputTargetRef.current.value = NBTdata;
      props.setDataConvertedStateHolder(NBTdata);
      if (props.nbtVersionTool === "horizon") {
        props.downloadFile();
      } else {
        props.downloadFileToolKit();
      }

      buttonNPCRef.current.classList.add("greenB");
      buttonNPCRef.current.classList.remove("redB", "yellowB");

      function getUsefulCommands(content) {
        if (props.nbtVersionTool === "horizon") {
          return content
            .split("\n")
            .map((x) => x.replace(/^\//, "").trim())
            .filter((x) => {
              return x.search(CommandList) === 0;
            });
        } else {
          return content
            .split("\n")
            .map((x) => x.replace(/^\//, "").trim())
            .map((x) => x + `\\"`)
            .filter((x) => {
              return (
                x.search("setblock") === 0 ||
                x.search("fill") === 0 ||
                x.search("summon") === 0
              );
            });
        }
      }

      function getBlockOpener(nbt_name) {
        if (props.nbtVersionTool === "horizon") {
          return `{Block:{name:"minecraft:moving_block",states:{},version:17959425},Count:1b,Damage:0s,Name:"minecraft:moving_block",WasPickedUp:0b,tag:{display:{Lore:["Â§lÂ§bBuild By: Â§d${NameBuilder}î„€","Â§3NBT Tool By: Â§aBrutus314 ","Â§aand Clawsky123î„","Â§9Conversion Tool By: ","Â§eExgioan!!î„‚","Â§fSpecial Thanks To:","Â§6Chronicles765!!    î„ƒ","Â§4Warning: Â§cDont Hold Too","Â§cMany Or You Will Lag!!Â§âˆ†"],Name:"Â§lÂ§d${NameBuilder} Builds: Â§gÂ§l${nbt_name}"},ench:[{id:28s,lvl:1s}],movingBlock:{name:"minecraft:sea_lantern",states:{},version:17879555},movingEntity:{Occupants:[`;
        } else {
          return `{Block:{name:"minecraft:moving_block",version:17959425,states:{}},Count:1b,tag:{ench:[{id:28s,lvl:1s}],movingBlock:{name:"minecraft:sea_lantern",version:17879555,states:{}},display:{Lore:["Â§lÂ§bBuild By: Â§dKitty Shizzî„€","Â§3NBT Tool By: Â§aBrutus314 ","Â§aand Clawsky123î„","Â§9Conversion Tool By: ","Â§eExgioan!!î„‚","Â§fSpecial Thanks To:","Â§6Chronicles765!!    î„ƒ","Â§4Warning: Â§cDont Hold Too","Â§cMany Or You Will Lag!!Â§âˆ†"],Name:"§l§dKittys Builds: §g§l${nbt_name}"},movingEntity:{id:Beehive,Occupants:[`;
        }
      }

      function getBlockCloser() {
        if (props.nbtVersionTool === "horizon") {
          return '],id:"Beehive"}}}';
        } else {
          return ']}},Damage:0s,WasPickedUp:0b,Name:"minecraft:moving_block"}';
        }
      }

      function getNPCOpener(section, nbt_name) {
        if (props.nbtVersionTool === "horizon") {
          return `{ActorIdentifier:"minecraft:npc<>",SaveData:{Actions:"[{"button_name" : "Build Part: ${section}","data" : [`;
        } else {
          return `{TicksLeftToStay:0,ActorIdentifier:"minecraft:npc<>",SaveData:{Variant:3,identifier:"minecraft:npc",CustomName:"§l§dKittys Builds: ${nbt_name}",Actions:"[{\\"button_name\\" : \\"Build Part: ${section}\\",\\"data\\" : [`;
        }
      }

      function getNPCCloser(section, nbt_name) {
        if (props.nbtVersionTool === "horizon") {
          return `],"mode" : 0,"text" : "","type" : 1}]",CustomName:"Â§lÂ§d${NameBuilder} Builds: ${nbt_name}",CustomNameVisible:1b,InterativeText:"Â§cBuild By: Â§d${NameBuilder}!!î„€\nÂ§cNBT Tool By: Â§dBrutus314 an Clawsky123!!\nÂ§cConversion Tool By: Â§dExgioan!!\nÂ§cSpecial Thanks To: Â§dChronicles765!!! î„ƒ\nÂ§6Thanks For Trying My ${nbt_name} Build!!!",Persistent:1b,Pos:[],RawtextName:"Â§lÂ§d${NameBuilder} Builds: ${nbt_name}",Tags:["${nbt_name}${section}"],Variant:3,definitions:["+minecraft:npc"],identifier:"minecraft:npc"},TicksLeftToStay:0}`;
        } else {
          return `],\\"mode\\" : 0,\\"text\\" : \\"\\",\\"type\\" : 1}]",Pos:[],InterativeText:"§cBuild By: §dKitty Shizz!!",Persistent:1b,definitions:["+minecraft:npc"],Tags:[${nbt_name}${section}],CustomNameVisible:1b,RawtextName:"§l§dKittys Builds: ${nbt_name}"}}`;
        }
      }
    }
    function commandToNBT(command) {
      if (props.nbtVersionTool === "horizon") {
        return JSON.stringify({
          cmd_line: command,
          cmd_ver: 12,
        });
      } else {
        return `{\\"cmd_line\\":\\"${command},\\"cmd_ver\\":12}`;
      }
    }
  };
  return (
    <label
      onClick={FileOutputNPCLogic}
      ref={buttonNPCRef}
      className="buttonOne hoverYes yellowB"
    >
      {ButtonToolKit()}
    </label>
  );
};
export default FileOutPutButtonNPC;
