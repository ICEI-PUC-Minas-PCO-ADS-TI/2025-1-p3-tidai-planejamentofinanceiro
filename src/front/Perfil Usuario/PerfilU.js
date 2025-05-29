/* PerfilU.js – agora alternando a classe d-flex */

document.addEventListener('DOMContentLoaded', () => {

  const $ = id => document.getElementById(id);

  /* elementos */
  const modal        = $('modal');
  const modalContent = modal.querySelector('.modal-content');
  const btnEdit  = $('editProfile');
  const btnClose = modal.querySelector('.close');
  const btnSave  = $('saveProfile');

  const spanName   = $('user-name');
  const spanAge    = $('user-age');
  const spanPeriod = $('user-period');

  const inName   = $('editName');
  const inAge    = $('editAge');
  const inPeriod = $('editPeriod');

  /* helpers */
  const showModal = () => {
    inName.value   = spanName.textContent.trim();
    inAge.value    = spanAge.textContent.replace(/\D/g,'');
    inPeriod.value = spanPeriod.textContent.trim();

    modal.classList.add('d-flex');   /* mostra */
    inName.focus();
  };

  const hideModal = () => { modal.classList.remove('d-flex'); };

  const saveProfile = () => {
    const name   = inName.value.trim();
    const age    = parseInt(inAge.value.trim(),10);
    const period = inPeriod.value.trim();

    if (name)   spanName.textContent = name;
    if (!isNaN(age) && age > 0) spanAge.textContent = `${age} anos`;
    if (period) spanPeriod.textContent = period;

    hideModal();
  };

  /* bindings */
  btnEdit .addEventListener('click', showModal);
  btnClose.addEventListener('click', hideModal);
  btnSave .addEventListener('click', saveProfile);

  /* fecha clicando fora */
  modal.addEventListener('click', e=>{
    if(!modalContent.contains(e.target)) hideModal();
  });

  /* fecha no ESC */
  document.addEventListener('keydown', e=>{
    if(e.key==='Escape' && modal.classList.contains('d-flex')) hideModal();
  });
});
