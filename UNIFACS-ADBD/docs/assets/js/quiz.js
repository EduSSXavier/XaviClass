/**
 * Quiz interativo com feedback imediato e localStorage
 * Uso: chame initQuiz(config) no final da página de atividades
 */

function initQuiz(config) {
  const {
    aulaId,
    questoes,
    containerId = "quiz",
    onFinish = null
  } = config;

  const container = document.getElementById(containerId);
  if (!container) {
    console.error("Container do quiz não encontrado");
    return;
  }

  let respostas = {};
  let finalizado = false;

  // Carrega progresso anterior (se existir)
  const saved = localStorage.getItem(`quiz-${aulaId}`);
  if (saved) {
    try {
      const data = JSON.parse(saved);
      if (data.finalizado) {
        respostas = data.respostas || {};
        finalizado = true;
      }
    } catch (e) {}
  }

  // Renderiza questões
  container.innerHTML = "";
  questoes.forEach((q, idx) => {
    const div = document.createElement("div");
    div.className = "questao";
    div.dataset.id = q.id;

    const titulo = document.createElement("h3");
    titulo.textContent = `${idx + 1}. ${q.pergunta}`;
    div.appendChild(titulo);

    const opcoesDiv = document.createElement("div");
    opcoesDiv.className = "opcoes";

    q.opcoes.forEach((op, opIdx) => {
      const label = document.createElement("label");
      label.className = "opcao";
      label.dataset.valor = opIdx;

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q-${q.id}`;
      input.value = opIdx;
      if (finalizado && respostas[q.id] !== undefined) {
        input.disabled = true;
        if (Number(respostas[q.id]) === opIdx) {
          input.checked = true;
        }
      }

      input.addEventListener("change", () => {
        if (!finalizado) {
          respostas[q.id] = opIdx;
        }
      });

      const span = document.createElement("span");
      span.textContent = op;

      label.appendChild(input);
      label.appendChild(span);
      opcoesDiv.appendChild(label);
    });

    div.appendChild(opcoesDiv);

    // Feedback (aparece depois)
    const feedback = document.createElement("div");
    feedback.className = "feedback";
    feedback.id = `feedback-${q.id}`;
    div.appendChild(feedback);

    container.appendChild(div);
  });

  // Área de resultado e botões
  const resultadoDiv = document.createElement("div");
  resultadoDiv.className = "resultado";
  resultadoDiv.id = "resultado-quiz";
  container.appendChild(resultadoDiv);

  const acoes = document.createElement("div");
  acoes.className = "acoes-quiz";
  acoes.innerHTML = `
    <button class="btn btn-primary" id="btn-verificar">Verificar respostas</button>
    <button class="btn btn-outline" id="btn-refazer" style="display:none">Refazer quiz</button>
    <button class="btn btn-success" id="btn-copiar" style="display:none">Copiar resultado</button>
  `;
  container.appendChild(acoes);

  const btnVerificar = document.getElementById("btn-verificar");
  const btnRefazer = document.getElementById("btn-refazer");
  const btnCopiar = document.getElementById("btn-copiar");

  if (finalizado) {
    mostrarResultado();
    btnVerificar.style.display = "none";
    btnRefazer.style.display = "inline-flex";
    btnCopiar.style.display = "inline-flex";
  }

  btnVerificar.addEventListener("click", () => {
    // Verifica se todas foram respondidas
    const faltando = questoes.filter(q => respostas[q.id] === undefined);
    if (faltando.length > 0) {
      alert(`Responda todas as questões antes de verificar.\nFaltam ${faltando.length} questão(ões).`);
      return;
    }

    finalizado = true;
    localStorage.setItem(`quiz-${aulaId}`, JSON.stringify({
      finalizado: true,
      respostas,
      data: new Date().toISOString()
    }));

    mostrarResultado();
    btnVerificar.style.display = "none";
    btnRefazer.style.display = "inline-flex";
    btnCopiar.style.display = "inline-flex";

    if (typeof onFinish === "function") {
      onFinish(calcularNota());
    }
  });

  btnRefazer.addEventListener("click", () => {
    if (confirm("Deseja apagar suas respostas e refazer o quiz?")) {
      localStorage.removeItem(`quiz-${aulaId}`);
      location.reload();
    }
  });

  btnCopiar.addEventListener("click", () => {
    const { acertos, total, percentual } = calcularNota();
    const texto = [
      `Resultado – ${aulaId}`,
      `Acertos: ${acertos}/${total} (${percentual}%)`,
      `Data: ${new Date().toLocaleString("pt-BR")}`,
      "",
      "Detalhamento:"
    ];

    questoes.forEach((q, i) => {
      const resp = respostas[q.id];
      const correta = resp === q.correta;
      texto.push(`${i + 1}. ${correta ? "✓" : "✗"} ${q.pergunta}`);
    });

    navigator.clipboard.writeText(texto.join("\n")).then(() => {
      alert("Resultado copiado! Cole no chat da turma, e-mail ou formulário do professor.");
    }).catch(() => {
      prompt("Copie o texto abaixo:", texto.join("\n"));
    });
  });

  function calcularNota() {
    let acertos = 0;
    questoes.forEach(q => {
      if (Number(respostas[q.id]) === q.correta) acertos++;
    });
    const total = questoes.length;
    const percentual = Math.round((acertos / total) * 100);
    return { acertos, total, percentual };
  }

  function mostrarResultado() {
    const { acertos, total, percentual } = calcularNota();

    // Marca opções corretas/erradas
    questoes.forEach(q => {
      const questaoEl = container.querySelector(`.questao[data-id="${q.id}"]`);
      const opcoes = questaoEl.querySelectorAll(".opcao");
      const feedback = document.getElementById(`feedback-${q.id}`);

      opcoes.forEach((op, idx) => {
        op.classList.remove("correta", "errada");
        if (idx === q.correta) {
          op.classList.add("correta");
        }
        if (Number(respostas[q.id]) === idx && idx !== q.correta) {
          op.classList.add("errada");
        }
      });

      const acertou = Number(respostas[q.id]) === q.correta;
      feedback.className = `feedback mostrar ${acertou ? "ok" : "erro"}`;
      feedback.textContent = acertou
        ? "✓ Correto!"
        : `✗ Incorreto. Resposta certa: ${q.opcoes[q.correta]}`;
    });

    // Resultado geral
    const resultadoEl = document.getElementById("resultado-quiz");
    let classe = "ruim";
    let mensagem = "Continue estudando!";
    if (percentual >= 80) {
      classe = "bom";
      mensagem = "Excelente trabalho!";
    } else if (percentual >= 50) {
      classe = "medio";
      mensagem = "Bom, mas você pode melhorar.";
    }

    resultadoEl.className = `resultado mostrar ${classe}`;
    resultadoEl.innerHTML = `
      <h2>${mensagem}</h2>
      <p>Você acertou <strong>${acertos}</strong> de <strong>${total}</strong> questões (${percentual}%)</p>
      <div class="progresso">
        <div class="progresso-bar" style="width: ${percentual}%"></div>
      </div>
    `;
  }
}
