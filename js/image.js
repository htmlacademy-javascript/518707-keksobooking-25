const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

const avatarChooserElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const photoChooserElement = document.querySelector('#images');
const photosContainerElement = document.querySelector('.ad-form__photo-container');

avatarChooserElement.addEventListener('change', () => {
  const avatar = avatarChooserElement.files[0];
  const avatarFileName = avatar.name.toLowerCase();
  const isImage = FILE_TYPES.some((type) => avatarFileName.endsWith(type));

  if (isImage) {
    avatarPreviewElement.src = URL.createObjectURL(avatar);
  }
});

photoChooserElement.addEventListener('change', () => {
  const photo = photoChooserElement.files[0];
  const photoFileName = photo.name.toLowerCase();
  const isImage = FILE_TYPES.some((type) => photoFileName.endsWith(type));

  if (isImage) {
    const newPhoto = document.createElement('IMG');
    newPhoto.src = URL.createObjectURL(photo);
    newPhoto.style.width = '100%';
    newPhoto.style.height = '100%';
    newPhoto.style.objectFit = 'cover';

    if (document.querySelector('.ad-form__photo img')) {
      const newPreviewContainer = document.createElement('div');
      newPreviewContainer.classList.add('ad-form__photo');
      photosContainerElement.append(newPreviewContainer);
      newPreviewContainer.append(newPhoto);
    } else {
      document.querySelector('.ad-form__photo').append(newPhoto);
    }
  }
});

const removeFormImages = () => {
  const photos = document.querySelectorAll('.ad-form__photo');
  avatarPreviewElement.src = DEFAULT_AVATAR_SRC;
  if (photos[0].firstChild) {
    photos.forEach((photo, index) => index === 0 ? photo.firstChild.remove() : photo.remove());
  }
};

export {removeFormImages};
