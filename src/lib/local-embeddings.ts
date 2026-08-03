const EMBEDDING_DIM = 768;

function hashToken(token: string): number {
  let hash = 2166136261;
  for (let i = 0; i < token.length; i++) {
    hash ^= token.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function getLocalEmbedding(text: string, dim: number = EMBEDDING_DIM): number[] {
  const tokens = (text.toLowerCase().match(/[a-záéíóúñü0-9]+/g) || []);
  const vector = new Array(dim).fill(0);

  for (const token of tokens) {
    const features = [token];
    if (token.length > 3) {
      features.push(token.slice(0, 3), token.slice(-3));
    }
    for (const feature of features) {
      const hash = hashToken(feature);
      const index = hash % dim;
      const sign = (hash & 1) === 0 ? 1 : -1;
      vector[index] += sign;
    }
  }

  let norm = 0;
  for (const value of vector) norm += value * value;
  norm = Math.sqrt(norm) || 1;

  return vector.map((value) => value / norm);
}
