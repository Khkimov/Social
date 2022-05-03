console.log('ok');

const photo = document.querySelector('#photo');

photo.addEventListener('contextmenu', async (e) => {
  const pass = prompt('password');
  const response = await fetch(`/photos/bad/${pass}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ link: photo.src }),
  });
  if (!response.ok) alert('not');
});

const { addPhoto } = document.forms;

addPhoto.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { link } = addPhoto;
  const response = await fetch('/photos', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ link: link.value }),
  });
  if (response.ok) link.value = '';
  else alert('not added photo');
});

setPhoto();
setInterval(setPhoto, 2000);

async function setPhoto() {
  photo.src = await getRandomPhoto();
}

async function getRandomPhoto() {
  const response = await fetch('/photos/photo');
  if (response.ok) return (await response.json()).link;
  return photo.src;
}
