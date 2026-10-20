# Material Didático – GitHub Pages

Solução completa para hospedar **slides de condução de aula** e **atividades de fixação monitoradas** no GitHub Pages, com suporte a **imagens e vídeos**.

O professor pode adicionar novas aulas a qualquer momento durante o semestre apenas criando uma nova pasta e fazendo commit.

## 🚀 Como usar (professor)

### 1. Clone ou use este repositório
```bash
git clone https://github.com/SEU-USUARIO/material-didatico-gh-pages.git
cd material-didatico-gh-pages
```

### 2. Adicionar uma nova aula
1. Crie a pasta:
   ```bash
   mkdir -p docs/aulas/03-nome-da-aula/recursos
   ```
2. Copie os arquivos de exemplo de `docs/aulas/01-introducao/`
3. Edite:
   - `slides.md` → conteúdo dos slides (Marp)
   - `slides.html` → versão Reveal.js (já com suporte a mídia)
   - `atividades.html` → quiz / atividades
4. Coloque imagens/vídeos em `recursos/` ou em `docs/assets/media/`
5. Atualize a lista em `docs/index.html` (adicione um card)
6. Commit e push:
   ```bash
   git add .
   git commit -m "Adiciona aula 03"
   git push
   ```

O site atualiza automaticamente em 1–2 minutos.

### 3. Editar pelo site do GitHub (sem Git local)
- Vá em `docs/aulas/`
- Clique em “Add file” → “Create new file” ou “Upload files”
- Crie a estrutura de pastas e arquivos (incluindo imagens)
- Faça o commit direto no navegador

## 📁 Estrutura do repositório

```
material-didatico-gh-pages/
├── .github/workflows/deploy.yml     # Deploy automático
├── docs/
│   ├── index.html                   # Página inicial (lista de aulas)
│   ├── assets/
│   │   ├── css/style.css            # Estilos + suporte a mídia
│   │   ├── js/quiz.js               # Lógica dos quizzes
│   │   └── media/
│   │       ├── imagens/             # Imagens compartilhadas
│   │       └── videos/              # Vídeos locais (MP4)
│   └── aulas/
│       ├── 01-introducao/
│       │   ├── slides.md            # Fonte Marp
│       │   ├── slides.html          # Reveal.js (com exemplos de mídia)
│       │   ├── atividades.html      # Quiz + material de apoio
│       │   └── recursos/            # Mídia específica da aula
│       └── 02-exemplo-conceitos/
│           └── ...
├── package.json
└── README.md
```

## 🖼️ Suporte a imagens e vídeos

| Tipo                    | Como usar                                      | Recomendação                  |
|-------------------------|------------------------------------------------|-------------------------------|
| Imagem local            | `<img src="...">` ou `![alt](caminho)`         | WebP/PNG otimizado            |
| Vídeo YouTube / Vimeo   | `<div class="video-wrapper"><iframe ...>`      | **Preferido** (leve)          |
| Vídeo local (MP4)       | `<video controls><source src="..."></video>`   | Só para vídeos curtos         |
| Galeria                 | Classe `.galeria` no CSS                       | Várias imagens lado a lado    |

Exemplos prontos estão nas aulas 01 e 02.

Veja o guia completo em `docs/aulas/COMO-ADICIONAR-AULA.md`.

## 🛠️ Tecnologias

| Parte              | Tecnologia                          |
|--------------------|-------------------------------------|
| Slides             | Reveal.js (CDN) + Marp (fonte)      |
| Site               | HTML + CSS puro                     |
| Quizzes            | JavaScript vanilla + localStorage   |
| Mídia              | HTML5 video + iframes responsivos   |
| Monitoramento      | localStorage + opção Google Forms   |
| Deploy             | GitHub Actions → GitHub Pages       |

## 📊 Monitoramento das atividades

- **Feedback imediato** para o aluno (nota + correção)
- Progresso salvo no navegador (`localStorage`)
- Botão “Copiar resultado” para enviar ao professor
- Espaço preparado para embutir **Google Forms** ou **Microsoft Forms** (monitoramento real)

## 🔧 Comandos úteis (opcional)

```bash
# Instalar Marp CLI (para gerar slides localmente)
npm install

# Gerar HTML dos slides a partir do Markdown
npx marp docs/aulas/**/slides.md --html --allow-local-files
```

## 📄 Licença

MIT – use livremente em suas disciplinas.
