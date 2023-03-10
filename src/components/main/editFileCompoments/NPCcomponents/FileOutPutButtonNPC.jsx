import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CommandList } from "./CommandList";
import PromptError from "../../../overlays/promptError";

const FileOutPutButtonNPC = (props) => {
  const [errorPrompt, setErrorPrompt] = useState(false);
  const buttonNPCRef = useRef(null);

  const ButtonToolKit = () => {
    if (props.nbtVersionTool === "horizon") {
      return (
        <>
          <FontAwesomeIcon className="fontAweIcon" icon="fa-exchange" />
          Convert File to Horion NPC
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
      setErrorPrompt(true);
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
          //Horion Version
          NPCCommandList.unshift(`/tickingarea add circle ~ ~ ~ 4 NPCCOMMANDS`);
          NPCCommandList.push(`/tickingarea remove NPCCOMMANDS`);
          if (NPCCount > 1) {
            NPCCommandList.push(
              `/dialogue open @e[tag=${nbt_name}${nextNPC},type=NPC] @initiator`
            );
          }
          NPCCommandList.push(`/kill @s`);
        } else {
          //ToolBox Version
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
        //Horion download file Version
        props.downloadFile();
      } else {
        //Toolbox download file Version
        props.downloadFileToolKit();
      }

      buttonNPCRef.current.classList.add("greenB");
      buttonNPCRef.current.classList.remove("redB", "yellowB");

      function getUsefulCommands(content) {
        if (props.nbtVersionTool === "horizon") {
          //Horion Version
          return content
            .split("\n")
            .map((x) => x.replace(/^\//, "").trim())
            .filter((x) => {
              return x.search(CommandList) === 0;
            });
        } else {
          //Toolkit Version
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
          //Horion Version
          return `{Block:{name:"minecraft:moving_block",states:{},version:17959425},Count:1b,Damage:0s,Name:"minecraft:moving_block",WasPickedUp:0b,tag:{display:{Lore:["????l????bBuild By: ????d${NameBuilder}????????","????3NBT Tool By: ????aBrutus314 ","????aand Clawsky123???????","????9Conversion Tool By: ","????eExgioan!!????????","????fSpecial Thanks To:","????6Chronicles765!!    ???????","????4Warning: ????cDont Hold Too","????cMany Or You Will Lag!!???????????"],Name:"????l????d${NameBuilder} Builds: ????g????l${nbt_name}"},ench:[{id:28s,lvl:1s}],movingBlock:{name:"minecraft:sea_lantern",states:{},version:17879555},movingEntity:{Occupants:[`;
        } else {
          //Toolbox Version
          return `{Block:{name:"minecraft:moving_block",version:17959425,states:{}},Count:1b,tag:{ench:[{id:28s,lvl:1s}],movingBlock:{name:"minecraft:sea_lantern",version:17879555,states:{}},display:{Lore:["????l????bBuild By: ????dKitty Shizz????????","????3NBT Tool By: ????aBrutus314 ","????aand Clawsky123???????","????9Conversion Tool By: ","????eExgioan!!????????","????fSpecial Thanks To:","????6Chronicles765!!    ???????","????4Warning: ????cDont Hold Too","????cMany Or You Will Lag!!???????????"],Name:"??l??dKittys Builds: ??g??l${nbt_name}"},movingEntity:{id:Beehive,Occupants:[`;
        }
      }

      function getBlockCloser() {
        if (props.nbtVersionTool === "horizon") {
          //Horion Version
          return '],id:"Beehive"}}}';
        } else {
          //Toolbox Version
          return ']}},Damage:0s,WasPickedUp:0b,Name:"minecraft:moving_block"}';
        }
      }

      function getNPCOpener(section, nbt_name) {
        if (props.nbtVersionTool === "horizon") {
          //Horion Version
          return `{ActorIdentifier:"minecraft:npc<>",SaveData:{Actions:"[{"button_name" : "Build Part: ${section}","data" : [`;
        } else {
          //Toolbox Version
          return `{TicksLeftToStay:0,ActorIdentifier:"minecraft:npc<>",SaveData:{Variant:3,identifier:"minecraft:npc",CustomName:"??l??dKittys Builds: ${nbt_name}",Actions:"[{\\"button_name\\" : \\"Build Part: ${section}\\",\\"data\\" : [`;
        }
      }

      function getNPCCloser(section, nbt_name) {
        if (props.nbtVersionTool === "horizon") {
          //Horion Version
          return `],"mode" : 0,"text" : "","type" : 1}]",CustomName:"????l????d${NameBuilder} Builds: ${nbt_name}",CustomNameVisible:1b,InterativeText:"????cBuild By: ????d${NameBuilder}!!????????\n????cNBT Tool By: ????dBrutus314 an Clawsky123!!\n????cConversion Tool By: ????dExgioan!!\n????cSpecial Thanks To: ????dChronicles765!!! ???????\n????6Thanks For Trying My ${nbt_name} Build!!!",Persistent:1b,Pos:[],RawtextName:"????l????d${NameBuilder} Builds: ${nbt_name}",Tags:["${nbt_name}${section}"],Variant:3,definitions:["+minecraft:npc"],identifier:"minecraft:npc"},TicksLeftToStay:0}`;
        } else {
          //Toolbox Version
          return `],\\"mode\\" : 0,\\"text\\" : \\"\\",\\"type\\" : 1}]",Pos:[],InterativeText:"??cBuild By: ??dKitty Shizz!!???",Persistent:1b,definitions:["+minecraft:npc"],Tags:[${nbt_name}${section}],CustomNameVisible:1b,RawtextName:"??l??dKittys Builds: ${nbt_name}"}}`;
        }
      }
    }
    function commandToNBT(command) {
      if (props.nbtVersionTool === "horizon") {
        //Horion Version
        return JSON.stringify({
          cmd_line: command,
          cmd_ver: 12,
        });
      } else {
        //Toolbox Version
        return `{\\"cmd_line\\":\\"${command},\\"cmd_ver\\":12}`;
      }
    }
  };
  return (
    <>
      <label
        onClick={FileOutputNPCLogic}
        ref={buttonNPCRef}
        className="buttonOne hoverYes yellowB"
      >
        {ButtonToolKit()}
      </label>
      {errorPrompt ? (
        <PromptError
          titleTextError="Error: NPC Output"
          errorText="Warning, it appears that something went wrong with the conversion of your file, please ensure that the input section has properly converted your Bedrock data and that the output editor is not empty."
        />
      ) : null}
    </>
  );
};
export default FileOutPutButtonNPC;
