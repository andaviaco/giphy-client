export async function httpRequest<ResponseType>(
  req: RequestInfo,
): Promise<ResponseType> {
  const res = await fetch(req);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
