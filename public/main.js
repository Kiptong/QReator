const qrButton = document.getElementById('createqr')

qrButton.addEventListener('click', () => {
  const urlInput = document.getElementById('qrurlinput').value
  const nameInput = document.getElementById('qrnameinput').value
  const descripInput = document.getElementById('qrdescripinput').value
  const qrrequest = {
    url: urlInput,
    name: nameInput,
    description: descripInput
  }
  fetch('/qrrequest', {
    method: 'POST',
    body: JSON.stringify(qrrequest)
  })
    .then((res) => console.log(res))
    .catch((res) => console.log(res))
})

fetch('/sample')
  .then(res => res.json())
  .then(data => {
    const qr = document.getElementById('picture')
    qr.setAttribute('src', data.qr)
  })
