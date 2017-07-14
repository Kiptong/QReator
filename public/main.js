const qrButton = document.getElementById('createqr')

function createCard(data) {
  const $qrCodeDiv = document.createElement('div')
  const $qrCode = document.createElement('img')
  const $name = document.createElement('h3')

  $qrCode.setAttribute('src', data.qr)
  $qrCode.setAttribute('class', 'img-thumbnail')
  $qrCodeDiv.setAttribute('class', 'col-xs-3')
  $qrCode.setAttribute('id', data.id)

  $name.setAttribute('class', 'text-center')
  $name.textContent = data.name

  $qrCodeDiv.appendChild($qrCode)
  $qrCodeDiv.appendChild($name)

  const $cardRow = document.getElementById('cardrow')
  $cardRow.appendChild($qrCodeDiv)
}

window.onload = () => {
  fetch('/qrcards')
    .then(res => res.json())
      .then(data => {
        data.forEach((data) => createCard(data))
      })
    .catch((err) => console.log(err))
}

qrButton.addEventListener('click', () => {
  const urlInput = document.getElementById('qrurlinput').value
  const nameInput = document.getElementById('qrnameinput').value
  const descripInput = document.getElementById('qrdescripinput').value
  const qrCode = {
    url: urlInput,
    name: nameInput,
    description: descripInput
  }

  fetch('/generate', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(qrCode)
  })
    .then(res => res.json())
      .then(data => {
        const qr = document.getElementById('picture')
        qr.setAttribute('src', data.qr)
        createCard(data)
      })
    .catch((res) => console.log(res))
})
