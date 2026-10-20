# Como adicionar uma nova aula

Siga estes passos para incluir uma nova aula durante o semestre.

## 1. Crie a pasta

```bash
mkdir -p docs/aulas/03-nome-da-aula/recursos
```

Substitua `03-nome-da-aula` pelo número e nome desejado (use hífens, sem espaços ou acentos no nome da pasta).

A pasta `recursos/` é opcional, mas recomendada para imagens e vídeos específicos daquela aula.

## 2. Copie os arquivos de exemplo

```bash
cp docs/aulas/01-introducao/slides.md       docs/aulas/03-nome-da-aula/
cp docs/aulas/01-introducao/slides.html     docs/aulas/03-nome-da-aula/
cp docs/aulas/01-introducao/atividades.html docs/aulas/03-nome-da-aula/
```

## 3. Edite o conteúdo

### slides.md (Marp)
- Altere o título, objetivos e conteúdo.
- Para imagens use a sintaxe Markdown:
  ```markdown
  ![Legenda](../../assets/media/imagens/minha-figura.png)
  ```
  ou, se estiver na pasta da aula:
  ```markdown
  ![Legenda](recursos/minha-figura.png)
  ```

### slides.html (Reveal.js)
- Atualize as seções `<section>`.
- **Imagem local:**
  ```html
  <img src="../../assets/media/imagens/minha-figura.png" alt="Descrição" style="max-height:400px;">
  ```
- **Vídeo YouTube/Vimeo (recomendado):**
  ```html
  <div class="video-wrapper">
    <iframe
      src="https://www.youtube.com/embed/ID_DO_VIDEO"
      title="Título do vídeo"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>
  </div>
  ```
- **Vídeo local (MP4):**
  ```html
  <div class="video-wrapper">
    <video controls preload="metadata" poster="recursos/thumbnail.jpg">
      <source src="recursos/meu-video.mp4" type="video/mp4">
      Seu navegador não suporta vídeo HTML5.
    </video>
  </div>
  ```

### atividades.html
- Mude o `aulaId` no `initQuiz({ aulaId: "03-nome-da-aula", ... })`
- Substitua as questões no array `questoes`.
- Você também pode inserir imagens e vídeos **antes** do quiz, usando as mesmas classes CSS (`conteudo-img`, `video-wrapper`).

## 4. Onde colocar as mídias

| Tipo              | Local recomendado                          | Observação                          |
|-------------------|--------------------------------------------|-------------------------------------|
| Imagens gerais    | `docs/assets/media/imagens/`               | Compartilhadas entre aulas          |
| Vídeos curtos     | `docs/assets/media/videos/`                | Prefira MP4 (H.264)                 |
| Mídia da aula     | `docs/aulas/0X-nome/recursos/`             | Específica daquela aula             |
| Vídeos longos     | YouTube / Vimeo (embed)                    | **Recomendado** – não pesa o repo   |

**Dicas de tamanho:**
- Imagens: prefira WebP ou PNG otimizado (< 500 KB)
- Vídeos locais: no máximo 20–30 MB (GitHub tem limite de 100 MB por arquivo, mas o clone fica lento)
- Sempre use `alt` descritivo nas imagens

## 5. Atualize a página inicial

Abra `docs/index.html` e adicione um novo card na grid:

```html
<article class="aula-card">
  <div class="numero">Aula 03</div>
  <h2>Título da Nova Aula</h2>
  <p>Descrição curta do que será abordado nesta aula.</p>
  <div class="acoes">
    <a class="btn btn-primary" href="aulas/03-nome-da-aula/slides.html">▶ Slides</a>
    <a class="btn btn-outline" href="aulas/03-nome-da-aula/atividades.html">✎ Atividades</a>
  </div>
</article>
```

## 6. Commit e push

```bash
git add docs/
git commit -m "Adiciona Aula 03 – Nome da Aula (com imagens e vídeo)"
git push
```

O GitHub Actions publicará automaticamente no GitHub Pages.

## Dica – edição só pelo navegador

Você também pode criar pastas e arquivos (incluindo upload de imagens) diretamente na interface web do GitHub (botão “Add file” → “Upload files”).
