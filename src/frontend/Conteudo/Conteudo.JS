/*  Conteudo.js
 *  – Insere novos cards na grade ao submeter o formulário
 *  – Evita erros se elementos não existirem
 */

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('contentForm');
  const grid = document.querySelector('.grid-conteudos');

  /* Se não houver formulário ou grid, não faz nada */
  if (!form || !grid) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const title = form.contentTitle.value.trim();
    const desc  = form.contentDesc.value.trim();

    if (!title) return;               // título é obrigatório

    /* === cria novo card com mesma classe .item === */
    const card  = document.createElement('div');
    card.className = 'item dynamic';

    const h3 = document.createElement('h3');
    h3.textContent = title;

    const p  = document.createElement('p');
    p.textContent = desc || 'Sem descrição.';

    card.appendChild(h3);
    card.appendChild(p);

    grid.appendChild(card);

    /* limpa formulário e foca no primeiro campo */
    form.reset();
    form.contentTitle.focus();
  });
});
