(function () {
  function initImageViewer() {
    const imageContainers = document.querySelectorAll('[data-image-preview="true"]');
    if (imageContainers.length === 0) return;

    const imageViewer = new ImageViewer();
    imageViewer.init();

    const observer = new MutationObserver(function (mutationsList) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.tagName === 'IMG') {
              imageViewer.setActionListenerToImage(node, node.closest('[data-image-preview="true"]'));
            }
            if (node.nodeType === 1) {
              const imgs = node.querySelectorAll && node.querySelectorAll('img');
              imgs && imgs.forEach(img => {
                imageViewer.setActionListenerToImage(img, node.closest('[data-image-preview="true"]'));
              });
            }
          });
        }
      }
    });

    const config = { childList: true, subtree: true };
    imageContainers.forEach(container => observer.observe(container, config));
  }

  function waitForAngularContent() {
    let lastUrl = location.href;
    const checkInterval = 500;

    setInterval(() => {
      const currentUrl = location.href;
      if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        setTimeout(initImageViewer, 200);
      }
    }, checkInterval);

    setTimeout(initImageViewer, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForAngularContent);
  } else {
    waitForAngularContent();
  }
})();


class ImageViewer {
  constructor() {
      this.IMAGE_CONTAINER_SELECTOR = '[data-image-preview="true"]';
      this.IMAGE_MODAL_SELECTOR = '.preview-modal';
      this.currentImageIndex = 0;
      this.currentImageList = [];
      this.currentContainer = null;
      this.isModalOpen = false;
      this.leftBtn = null;
      this.rightBtn = null;
      this.closeBtn = null;
  }

  init() {
      this.enablePreview();
      this.setActionListerToAllImages();
  }

  enablePreview() {
      const modal = document.querySelector('.oranbyte-img-preview');
      if (!modal) this.createPreviewModal();

      const previewModal = document.querySelector(this.IMAGE_MODAL_SELECTOR);
      this.leftBtn = previewModal.querySelector('.left-btn');
      this.rightBtn = previewModal.querySelector('.right-btn');
      this.closeBtn = previewModal.querySelector('.close-btn');

      this.addModalEventListeners();
  }

  addModalEventListeners() {
      this.closeBtn.addEventListener('click', () => {
          const previewModal = document.querySelector(this.IMAGE_MODAL_SELECTOR);
          this.hide(previewModal);
          this.isModalOpen = false;
      });

      this.leftBtn.addEventListener('click', () => {
          if (this.currentImageIndex > 0) {
              this.currentImageIndex--;
              const image = this.currentImageList[this.currentImageIndex];
              this.updateModalContent(image);
              this.updateNavigationButtons();
          }
      });

      this.rightBtn.addEventListener('click', () => {
          if (this.currentImageIndex < this.currentImageList.length - 1) {
              this.currentImageIndex++;
              const image = this.currentImageList[this.currentImageIndex];
              this.updateModalContent(image);
              this.updateNavigationButtons();
          }
      });
  }

  setActionListerToAllImages() {
      document.querySelectorAll(this.IMAGE_CONTAINER_SELECTOR).forEach(container => {
          const imageList = Array.from(container.querySelectorAll('img'));
          imageList.forEach(image => this.setActionListenerToImage(image, container));
      });
  }

  setActionListenerToImage(image, container) {
      if (image.hasAttribute('data-listener-added')) return;

      const previewModal = document.querySelector(this.IMAGE_MODAL_SELECTOR);
      if (!previewModal) return;

      const previewImage = previewModal.querySelector("img");
      const imageTitle = previewModal.querySelector(".image-title");
      if (!previewImage || !imageTitle) return;

      image.addEventListener('click', () => {
          if (!container) return;

          this.currentContainer = container;
          this.currentImageList = Array.from(this.currentContainer.querySelectorAll('img'));
          if (this.currentImageList.length === 0) return;

          this.currentImageIndex = this.currentImageList.indexOf(image);
          if (this.currentImageIndex === -1) return;

          this.updateModalContent(image);
          this.updateNavigationButtons();
          this.show(previewModal);
          this.isModalOpen = true;
      });

      image.setAttribute('data-listener-added', 'true');
  }

  updateModalContent(image) {
      const previewModal = document.querySelector(this.IMAGE_MODAL_SELECTOR);
      const previewImage = previewModal.querySelector("img");
      const imageTitle = previewModal.querySelector(".image-title");

      previewImage.src = image.src;
      const title = image.getAttribute('data-title');
      if (title) {
          imageTitle.textContent = title;
          imageTitle.classList.remove('hide');
      } else {
          imageTitle.classList.add('hide');
      }
  }

  updateNavigationButtons() {
      this.leftBtn.classList.toggle('disabled', this.currentImageIndex === 0);
      this.rightBtn.classList.toggle('disabled', this.currentImageIndex === this.currentImageList.length - 1);
  }

  hide(container) {
      container.classList.add('zoom-out');
      container.classList.remove('zoom-in');
      container.addEventListener('animationend', () => {
          container.classList.add('hide');
      }, { once: true });
  }

  show(container) {
      container.classList.remove('hide', 'zoom-out');
      container.classList.add('zoom-in');
  }

  createPreviewModal() {
      const previewModal = document.createElement('div');
      previewModal.className = 'oranbyte-img-preview preview-modal full-screen-container hide blackish';

      const imageWithTitle = document.createElement('div');
      imageWithTitle.className = 'image-with-title';

      const imageBox = document.createElement('div');
      imageBox.className = 'image-box';

      const img = document.createElement('img');
      img.src = '';
      img.alt = 'Preview-image';
      imageBox.appendChild(img);

      const imageTitle = document.createElement('div');
      imageTitle.className = 'image-title';

      imageWithTitle.appendChild(imageBox);
      imageWithTitle.appendChild(imageTitle);

      const actionButtons = document.createElement('div');
      actionButtons.className = 'action-buttons';

      const leftBtn = document.createElement('div');
      leftBtn.className = 'lib-btn left-btn';
      leftBtn.innerHTML = '&leftarrow;';

      const rightBtn = document.createElement('div');
      rightBtn.className = 'lib-btn right-btn';
      rightBtn.innerHTML = '&rightarrow;';

      const closeBtn = document.createElement('div');
      closeBtn.className = 'lib-btn close-btn';
      closeBtn.id = 'close-btn';
      closeBtn.innerHTML = '&times;';

      actionButtons.appendChild(leftBtn);
      actionButtons.appendChild(rightBtn);
      actionButtons.appendChild(closeBtn);

      previewModal.appendChild(imageWithTitle);
      previewModal.appendChild(actionButtons);

      document.body.appendChild(previewModal);
  }
}
