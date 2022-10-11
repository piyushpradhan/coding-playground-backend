import util from "util";
import { ShellOpMessage } from "../utils/types";
const exec = util.promisify(require("child_process").exec);

export const executeCommand = async (containerId: string, command: string) => {
  try {
	// TODO: add support for multiple commands (';','&&','|')
	// TODO: add support for terminating processes
	const splitCommand = command.split(" ");
	let dockerExec: string = "docker exec ";
	dockerExec += `${containerId} `;
	for(let ind in splitCommand) {
	  dockerExec += `"${splitCommand[ind]}" `
	}
	const { stdout, stderr } = await exec(dockerExec);
	const output: ShellOpMessage = {
	  stdout: stdout,
	  stderr: stderr
	};
	return output;
  } catch (err: any) {
	const errResponse: ShellOpMessage = {
	  stdout: null,
	  stderr: err.message
	}
	return errResponse;
  }
}
