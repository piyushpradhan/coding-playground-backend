import util from "util";
import { ShellOpMessage } from "../utils/types";
const exec = util.promisify(require("child_process").exec);

export const executeCommand = async (containerId: string, command: string) => {
  try {
	const { stdout, stderr } = await exec(`docker exec -i ${containerId} sh -c '${command}'`)
	const output: ShellOpMessage = {
	  stdout: stdout, 
	  stderr: stderr,
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

export const executeSaveCommand = async (containerId: string, command: string) => {
  try {
	const { stdout, stderr } = await exec(`docker exec -i ${containerId} sh -c "${command}"`)
	const output: ShellOpMessage = {
	  stdout: stdout, 
	  stderr: stderr,
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
