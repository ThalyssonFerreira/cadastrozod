"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Msg = { id: string; de: "bot" | "vc"; texto: string; ts: number };

export default function Fale() {
  const search = typeof window !== "undefined" ? new URLSearchParams(location.search) : null;
  const protocolo = search?.get("protocolo") ?? "PR-????????-????";

  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: "1",
      de: "bot",
      texto: `Olá! Sou seu assistente virtual. Protocolo detectado: ${protocolo}`,
      ts: Date.now()
    },
    {
      id: "2",
      de: "bot",
      texto:
        "Antes de começarmos, confirme: os LEDs do modem estão acesos? Responda SIM ou NÃO.",
      ts: Date.now() + 500
    }
  ]);
  const [txt, setTxt] = useState("");

  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
  }, [msgs.length]);

  const podeEnviar = useMemo(() => txt.trim().length > 0, [txt]);

  function enviar() {
    if (!podeEnviar) return;
    const m: Msg = { id: crypto.randomUUID(), de: "vc", texto: txt.trim(), ts: Date.now() };
    setMsgs((v) => [...v, m]);
    setTxt("");

    setTimeout(() => {
      const resposta: Msg = {
        id: crypto.randomUUID(),
        de: "bot",
        ts: Date.now(),
        texto:
          /sim/i.test(m.texto)
            ? "Beleza! Tente reiniciar o modem por 10s. Se já fez, vou abrir um agendamento com seu protocolo."
            : "Ok! Verifique a alimentação elétrica e cabos. Se persistir, seguirei para agendamento técnico."
      };
      setMsgs((v) => [...v, resposta]);
    }, 600);
  }

  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <div className="w-full max-w-md rounded-2xl border">
        <div className="p-4 border-b">
          <h1 className="text-lg font-semibold">Fale com o Suporte</h1>
          <p className="text-xs text-gray-600">Protocolo: {protocolo}</p>
        </div>

        <div ref={scrollRef} className="h-[55vh] overflow-auto p-4 space-y-3">
          {msgs.map((m) => (
            <div
              key={m.id}
              className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                m.de === "vc" ? "ml-auto bg-blue-600 text-white" : "bg-gray-100"
              }`}
              aria-label={m.de === "vc" ? "Sua mensagem" : "Mensagem do bot"}
            >
              {m.texto}
            </div>
          ))}
        </div>

        <div className="p-3 border-t flex gap-2">
          <input
            value={txt}
            onChange={(e) => setTxt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviar()}
            placeholder="Digite sua mensagem..."
            className="flex-1 rounded-xl border px-3 py-2 outline-none"
          />
          <button
            onClick={enviar}
            disabled={!podeEnviar}
            className="rounded-xl px-4 py-2 border hover:bg-gray-50 disabled:opacity-50"
          >
            Enviar
          </button>
        </div>
      </div>
    </main>
  );
}
