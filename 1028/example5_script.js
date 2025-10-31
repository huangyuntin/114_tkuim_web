// example5_script.js
// 攔截 submit，聚焦第一個錯誤並模擬送出流程

const form = document.getElementById('full-form');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const agreeCheckbox = document.getElementById('agree'); 

function validateAllInputs(formElement) {
  let firstInvalid = null;
  const controls = Array.from(formElement.querySelectorAll('input, select, textarea'));
  controls.forEach((control) => {
    control.classList.remove('is-invalid');
    if (!control.checkValidity()) {
      control.classList.add('is-invalid');
      if (!firstInvalid) {
        firstInvalid = control;
      }
    }
  });
  return firstInvalid;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  submitBtn.disabled = true;
  submitBtn.textContent = '送出中...';

  const firstInvalid = validateAllInputs(form);

  if (firstInvalid) {
    submitBtn.disabled = false;
    submitBtn.textContent = '送出';
    firstInvalid.focus(); 
    return; 
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  alert('資料已送出，感謝您的聯絡！');
  form.reset(); 
  
  submitBtn.disabled = false;
  submitBtn.textContent = '送出';
});

resetBtn.addEventListener('click', () => {
  form.reset();
  Array.from(form.elements).forEach((element) => {
    element.classList.remove('is-invalid');
  });
});

form.addEventListener('input', (event) => {
  const target = event.target;
  if (target.classList.contains('is-invalid') && target.checkValidity()) {
    target.classList.remove('is-invalid');
  }
});

agreeCheckbox.addEventListener('click', (event) => {
  if (!agreeCheckbox.checked) {
    
    event.preventDefault();

    const privacyPolicyText = "這是一份示範的隱私權條款：\n\n" +
      "1. 我們會收集您的姓名、主題和留言內容。\n" +
      "2. 您的資料僅用於本次聯絡回覆。\n" +
      "3. 我們不會將您的資料分享給任何第三方。\n\n" +
      "點擊「確定」表示您已閱讀並同意上述條款。";

    alert(privacyPolicyText);

    agreeCheckbox.checked = true;

    if (agreeCheckbox.classList.contains('is-invalid')) {
      agreeCheckbox.classList.remove('is-invalid');
    }
  }
});