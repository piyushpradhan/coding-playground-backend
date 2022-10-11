export type ContainerOpMessage = {
  statusCode: number;
  container: string;
  reactPort: number;
};

export type ShellOpMessage = {
  stdout: string | null;
  stderr: string | null;
}
