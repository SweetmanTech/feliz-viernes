import { EXAMPLE_ACTION_LOOP, type ActionLoop } from "./types";
import { getEventsForToday } from "../../stack/getEventsForToday";
import { generateResponse } from "../../openai/generateResponse";
import {
  whoIsFelizViernes,
  whoIsFelizViernesShadow,
} from "@/lib/openai/instructions";
import { openai } from "@/lib/openai/client";
import { OPEN_AI_MODEL } from "@/lib/consts";
import { getCurrentStateOfExecution } from "./getCurrentStateOfExectution";

export async function createActionLoop(): Promise<ActionLoop> {
  const currentStateOfExecution = await getCurrentStateOfExecution();
  console.log("currentStateOfExecution", currentStateOfExecution);

  const observationReflection = await generateResponse({
    systemPrompt:
      "Generate an observation reflection on your current state of execution.",
    text: currentStateOfExecution,
    username: "felizviernes",
    userPrompt:
      "Analyze your current state and provide insights about your progress:",
  });
  console.log("observationReflection", observationReflection);

  const stateOfMind = await generateResponse({
    text: observationReflection,
    username: "felizviernes",
    userPrompt:
      "Based on your observations, describe your current state of mind:",
  });
  console.log("stateOfMind", stateOfMind);
  const hlpPlanReasoning = await generateResponse({
    text: `${currentStateOfExecution}\n${observationReflection}\n${stateOfMind}`,
    username: "felizviernes",
    userPrompt: "Provide reasoning for your next high-level plan:",
  });
  console.log("hlpPlanReasoning", hlpPlanReasoning);
  // Create the action loop structure
  return {
    highLevelPlanning: {
      currentStateOfExecution,
      observationReflection,
      stateOfMind,
      hlpPlanId: "",
      hlpPlanReasoning,
      hlpPlan: [], // To be implemented in next step
    },
    lowLevelPlanning: {
      llpPlan: [],
      llpPlanReasoning: "",
      situationAnalysis: "",
      taskReasoning: "",
      taskId: "",
      task: "",
    },
    performing: {
      action: "create_post",
    },
  };
}
