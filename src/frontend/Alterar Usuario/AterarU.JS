/*  AlterarU.js
 *  – Troca a foto do usuário (preview local)
 *  – Valida e salva alterações (alerta simples)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* elementos */
  const profileImage = document.getElementById('profileImage');
  const imageInput   = document.getElementById('imageInput');
  const btnChangeImg = document.getElementById('changeImage');
  const btnSave      = document.getElementById('saveChanges');

  /* === trocar foto ========================================== */
  btnChangeImg.addEventListener('click', () => imageInput.click());

  imageInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => { profileImage.src = ev.target.result; };
    reader.readAsDataURL(file);
  });

  /* === salvar alterações ==================================== */
  btnSave.addEventListener('click', () => {
    const newName       = document.getElementById('newName').value.trim();
    const newPassword   = document.getElementById('newPassword').value.trim();
    const confirmPass   = document.getElementById('confirmPassword').value.trim();

    if (newPassword && newPassword !== confirmPass) {
      alert('As senhas não coincidem!');
      return;
    }

    /* aqui você enviaria dados para o servidor… */
    alert(`Alterações salvas com sucesso!\nNome: ${newName || '(sem alteração)'}`);
  });
});
