export async function toArray<T>(source: AsyncIterable<T>): Promise<T[]> {
  const result: T[] = [];
  for await(const entry of source) {
    result.push(entry);
  }
  return result;
}
