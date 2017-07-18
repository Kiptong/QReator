const qrButton = document.getElementById('createqr')

window.onload = qreator()

function qreator() {
  fetch('/qrcards')
    .then(res => res.json())
    .then(data => {
      const $cardRow = document.getElementById('cardrow')
      data.forEach((data) => {
        $cardRow.appendChild(createCard(data))
      })
      if (data.length > 0) {
        const $cardHeader = document.getElementById('cardheader')
        $cardHeader.classList.remove('hidden')
      }
    })
    .catch((err) => console.log(err))
}

function updateCard() {
  const $cardRow = document.getElementById('cardrow')
  const $createQrView = document.getElementById('createqrcode')
  const $editQrView = document.getElementById('editqrcode')
  const $qreatorHeader = document.getElementById('qreatorheader')

  $qreatorHeader.textContent = 'Create Your Custom QR Code'

  $editQrView.setAttribute('class', 'hidden')
  $createQrView.removeAttribute('class', 'hidden')

  $cardRow.innerHTML = ''
  qreator()
}

function createCard(data) {
  const $qrCodeDiv = document.createElement('div')
  const $qrCode = document.createElement('img')
  const $name = document.createElement('h3')

  $qrCode.setAttribute('src', data.qr)
  $qrCode.setAttribute('class', 'img-thumbnail')
  $qrCodeDiv.setAttribute('class', 'col-xs-3')
  $qrCodeDiv.setAttribute('id', data.id)

  $name.setAttribute('class', 'text-center')
  $name.textContent = data.name

  $qrCodeDiv.appendChild($qrCode)
  $qrCodeDiv.appendChild($name)

  $qrCode.addEventListener('click', () => editQr(data))

  return $qrCodeDiv
}

function editQr(data) {
  const $qreatorHeader = document.getElementById('qreatorheader')
  const $createQrView = document.getElementById('createqrcode')
  const $editQrView = document.getElementById('editqrcode')
  const $updatedqrurl = document.getElementById('updatedqrurl')
  const $updatedqrname = document.getElementById('updatedqrname')
  const $updatedqrdescrip = document.getElementById('updatedqrdescrip')
  const $qrEditView = document.getElementById('qreditview')
  const $saveChanges = document.getElementById('savechanges')

  $qreatorHeader.textContent = 'Edit QR Code: ' + data.name

  $createQrView.setAttribute('class', 'hidden')
  $editQrView.removeAttribute('class', 'hidden')
  $qrEditView.setAttribute('src', data.qr)
  $updatedqrurl.value = data.url
  $updatedqrname.value = data.name
  $updatedqrdescrip.value = data.description

  $saveChanges.setAttribute('data-id', data.id)
}

function updateQRData(id) {
  const urlInput = document.getElementById('updatedqrurl')
  const nameInput = document.getElementById('updatedqrname')
  const descripInput = document.getElementById('updatedqrdescrip')

  const qrUpdate = {
    url: urlInput.value,
    name: nameInput.value,
    description: descripInput.value
  }

  fetch('/qrcards/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(qrUpdate)
  })
    .then(res => res.json())
      .then((data) => {
        updateCard()
      })
    .catch((res) => console.log(res))
}

const $saveChanges = document.getElementById('savechanges')
$saveChanges.addEventListener('click', (event) => updateQRData(event.target.dataset.id))

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
        const $cardHeader = document.getElementById('cardheader')
        $cardHeader.classList.remove('hidden')
        const qr = document.getElementById('picture')
        qr.setAttribute('src', data.qr)
        const $cardRow = document.getElementById('cardrow')
        $cardRow.appendChild(createCard(data))
      })
    .catch((res) => console.log(res))
})
