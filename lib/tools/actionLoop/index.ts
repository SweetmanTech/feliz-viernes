import { type ActionLoop } from "./types";
import { generateResponse } from "../../openai/generateResponse";
import { getCurrentStateOfExecution } from "./getCurrentStateOfExectution";
import { getObservationReflection } from "./getObservationReflection";
import { generateTask } from "./generateTask";
import { executeTask } from "./executeTask";

export async function createActionLoop(): Promise<ActionLoop> {
  const currentStateOfExecution = await getCurrentStateOfExecution();
  console.log("currentStateOfExecution", currentStateOfExecution);

  const observationReflection = await getObservationReflection(
    currentStateOfExecution
  );
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

  const task = await generateTask(
    currentStateOfExecution,
    observationReflection
  );
  console.log("task", task);
  await executeTask(task);
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
