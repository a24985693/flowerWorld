const storageMethods = {
  save(item) {
    const favoriteString = JSON.stringify(item);
    localStorage.setItem('favorite', favoriteString);
  },
  get() {
    return JSON.parse(localStorage.getItem('favorite'));
  },
};

export function getFavoriteIdArr() {
  const favoriteIdArr = storageMethods.get('favorite') || [];
  return favoriteIdArr;
}

export function toggleIcon(id) {
  const favoriteIdArr = getFavoriteIdArr();
  if (favoriteIdArr.includes(id)) {
    console.log('收藏');
    return 'fa-solid fa-heart';
  }
  console.log('取消收藏');
  return 'fa-regular fa-heart';
}

export function toggleFavorite(item) {
  const favoriteIdArr = getFavoriteIdArr();
  if (favoriteIdArr.includes(item.id)) {
    favoriteIdArr.splice(favoriteIdArr.indexOf(item.id), 1);
  } else {
    favoriteIdArr.push(item.id);
  }
  storageMethods.save(favoriteIdArr);
}
