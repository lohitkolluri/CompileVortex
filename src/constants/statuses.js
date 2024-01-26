export const statuses = [
  createStatus(1, "In Queue"),
  createStatus(2, "Processing"),
  createStatus(3, "Accepted"),
  createStatus(4, "Wrong Answer"),
  createStatus(5, "Time Limit Exceeded"),
  createStatus(6, "Compilation Error"),
  createStatus(7, "Runtime Error (SIGSEGV)"),
  createStatus(8, "Runtime Error (SIGXFSZ)"),
  createStatus(9, "Runtime Error (SIGFPE)"),
  createStatus(10, "Runtime Error (SIGABRT)"),
  createStatus(11, "Runtime Error (NZEC)"),
  createStatus(12, "Runtime Error (Other)"),
  createStatus(13, "Internal Error"),
  createStatus(14, "Exec Format Error"),
];

function createStatus(id, description) {
  return {
    id,
    description,
  };
}
