// lib/utils.ts
export function normalizarTexto(s: string) {
  const t = s.normalize("NFKC").trim().replace(/\s+/g, " ");
  return t;
}

export function gerarProtocolo(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const seq = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `PR-${y}${m}${d}-${seq}`;
}
