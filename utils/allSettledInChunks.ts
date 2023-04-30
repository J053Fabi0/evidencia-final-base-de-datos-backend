export default async function allSettleInChunks<T>(promises: (() => Promise<T>)[], chunkSize: number) {
  const chunks = [];

  for (let i = 0; i < promises.length; i += chunkSize)
    chunks.push(await Promise.allSettled(promises.slice(i, i + chunkSize).map((p) => p())));

  return chunks.flat();
}
