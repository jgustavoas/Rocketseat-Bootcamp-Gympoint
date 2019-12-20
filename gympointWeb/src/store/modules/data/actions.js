export function request(type, page, data) {
  return {
    type,
    payload: { page, data },
  };
}
