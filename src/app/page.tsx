
"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { entradaSchema, loginSchema } from "@/lib/validators";
import { normalizarTexto, gerarProtocolo } from "@/lib/utils";

export default function Home() {
  const router = useRouter();

  
  const [entrada, setEntrada] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const erroMemo = useMemo(() => {
    const t = normalizarTexto(entrada);
    const r = entradaSchema.safeParse({ texto: t });
    return r.success ? null : r.error.issues[0]?.message ?? "Entrada inválida.";
  }, [entrada]);
  useEffect(() => setErro(erroMemo), [erroMemo]);

  const [normalizado, setNormalizado] = useState<string | null>(null);
  const [protocolo, setProtocolo] = useState<string | null>(null);

  function confirmarEntrada() {
    if (erroMemo) return;
    const t = normalizarTexto(entrada);
    setNormalizado(t);
    setProtocolo(gerarProtocolo());
  }


  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [protInput, setProtInput] = useState("");

  const [erroLogin, setErroLogin] = useState<string | null>(null);
  const erroLoginMemo = useMemo(() => {
    if (!protocolo) return "Gere o protocolo primeiro.";
    const r = loginSchema.safeParse({
      email,
      senha,
      protocolo: protInput || protocolo
    });
    return r.success ? null : r.error.issues[0]?.message ?? "Dados inválidos.";
  }, [email, senha, protInput, protocolo]);
  useEffect(() => setErroLogin(erroLoginMemo), [erroLoginMemo]);

  function entrar() {
    if (erroLoginMemo) return;
    router.push(
      `/fale?protocolo=${encodeURIComponent(protInput || protocolo!)}`
    );
  }

  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold">Agendamento de Suporte (ISP)</h1>

        
        <section className="rounded-2xl border p-4 space-y-3">
          <h2 className="font-medium">1) Descreva seu problema</h2>
          <input
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            placeholder="Ex.: Sem internet desde ontem"
            className="w-full rounded-xl border px-3 py-2 outline-none"
          />
          {erro && <p className="text-sm text-red-600">{erro}</p>}
          <button
            onClick={confirmarEntrada}
            className="rounded-xl px-4 py-2 border hover:bg-gray-50"
          >
            Validar & gerar protocolo
          </button>

          {normalizado && protocolo && (
            <div className="rounded-xl bg-gray-50 p-3 text-sm">
              <p>
                <span className="font-medium">Solicitação:</span> {normalizado}
              </p>
              <p>
                <span className="font-medium">Protocolo:</span> {protocolo}
              </p>
            </div>
          )}
        </section>

        
        <section className="rounded-2xl border p-4 space-y-3">
          <h2 className="font-medium">2) Entrar com e-mail, senha e protocolo</h2>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@provedor.com"
            className="w-full rounded-xl border px-3 py-2 outline-none"
            inputMode="email"
          />
          <input
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Sua senha"
            className="w-full rounded-xl border px-3 py-2 outline-none"
            type="password"
          />
          <input
            value={protInput}
            onChange={(e) => setProtInput(e.target.value)}
            placeholder="PR-YYYYMMDD-1234"
            className="w-full rounded-xl border px-3 py-2 outline-none"
            disabled={!protocolo}
          />
          {!protInput && protocolo && (
            <p className="text-xs text-gray-500">
              Dica: deixe em branco para usar <b>{protocolo}</b>
            </p>
          )}
          {erroLogin && <p className="text-sm text-red-600">{erroLogin}</p>}
          <button
            onClick={entrar}
            className="rounded-xl px-4 py-2 border hover:bg-gray-50"
            disabled={!protocolo}
          >
            Entrar e ir para o chat
          </button>
        </section>
      </div>
    </main>
  );
}
