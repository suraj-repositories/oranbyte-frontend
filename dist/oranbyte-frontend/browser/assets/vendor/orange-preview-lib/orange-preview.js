(function () {
  function initMediaViewer() {
    const mediaContainers = document.querySelectorAll('[data-media-preview="true"]');
    if (mediaContainers.length === 0) return;

    const mediaViewer = new OB_MediaViewer();

    mediaViewer.init();

    const observer = new MutationObserver(function (mutationsList) {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.tagName === 'IMG') {
              mediaViewer.setActionListenerToMedia(node, node.closest('[data-media-preview="true"]'));
            }
            if (node.nodeType === 1) {
              const medias = node.querySelectorAll && node.querySelectorAll('img');
              medias && medias.forEach(media => {
                if (node.nodeType === 1 && (node.matches('img, [data-video-url]'))) {
                  mediaViewer.setActionListenerToMedia(node, node.closest('[data-media-preview="true"]'));
                }

                if (node.nodeType === 1) {
                  const medias = node.querySelectorAll && node.querySelectorAll('img, [data-video-url]');
                  medias && medias.forEach(media => {
                    mediaViewer.setActionListenerToMedia(media, node.closest('[data-media-preview="true"]'));
                  });
                }


                // mediaViewer.setActionListenerToMedia(media, node.closest('[data-media-preview="true"]'));
              });
            }
          });
        }
      }
    });

    const config = { childList: true, subtree: true };
    mediaContainers.forEach(container => observer.observe(container, config));
  }

  function waitForAngularContent() {
    let lastUrl = location.href;
    const checkInterval = 500;

    setInterval(() => {
      const currentUrl = location.href;
      if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        setTimeout(initMediaViewer, 200);
      }
    }, checkInterval);

    setTimeout(initMediaViewer, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForAngularContent);
  } else {
    waitForAngularContent();
  }
})();

class OB_MediaViewer {
  constructor() {
    this.MEDIA_CONTAINER_SELECTOR = '[data-media-preview="true"]';
    this.MEDIA_MODAL_SELECTOR = '.preview-modal';
    this.currentMediaIndex = 0;
    this.currentMediaList = [];
    this.currentContainer = null;
    this.isModalOpen = false;
    this.leftBtn = null;
    this.rightBtn = null;
    this.closeBtn = null;
    this.downloadBtn = null;
  }

  init() {
    this.enablePreview();
    this.setActionListerToAllMedia();
    this.enableLeftRightKeys();
    this.enableEscapeKey();
  }

  enablePreview() {
    const modal = document.querySelector('.oranbyte-media-preview');
    if (!modal) this.createPreviewModal();

    const previewModal = document.querySelector(this.MEDIA_MODAL_SELECTOR);
    this.leftBtn = previewModal.querySelector('.left-btn');
    this.rightBtn = previewModal.querySelector('.right-btn');
    this.closeBtn = previewModal.querySelector('.close-btn');
    this.downloadBtn = previewModal.querySelector('.download-btn');


    this.addModalEventListeners();
  }

  addModalEventListeners() {


    this.closeBtn.addEventListener('click', () => {
      const previewModal = document.querySelector(this.MEDIA_MODAL_SELECTOR);
      this.hide(previewModal);
      this.toggleDownloadButton(null, this.currentContainer);
      this.isModalOpen = false;
    });

    this.leftBtn.addEventListener('click', () => {
      if (this.currentMediaIndex > 0) {
        this.currentMediaIndex--;
        const media = this.currentMediaList[this.currentMediaIndex];
        this.toggleDownloadButton(media, this.currentContainer);
        this.updateModalContent(media);
        this.updateNavigationButtons();
      }
    });

    this.rightBtn.addEventListener('click', () => {
      if (this.currentMediaIndex < this.currentMediaList.length - 1) {
        this.currentMediaIndex++;
        const media = this.currentMediaList[this.currentMediaIndex];
        this.toggleDownloadButton(media, this.currentContainer);
        this.updateModalContent(media);
        this.updateNavigationButtons();
      }
    });

    this.enableDownloadButton();

  }

  setActionListerToAllMedia() {
    document.querySelectorAll(this.MEDIA_CONTAINER_SELECTOR).forEach(container => {
      const mediaList = Array.from(container.querySelectorAll('img, [data-video-url]'));
      mediaList.forEach(media => this.setActionListenerToMedia(media, container));
    });
  }



  setActionListenerToMedia(media, container) {
    if (media.hasAttribute('data-listener-added')) return;
    const previewModal = document.querySelector(this.MEDIA_MODAL_SELECTOR);
    if (!previewModal) return;

    const openPreview = () => {
      if (!container) return;

      this.toggleDownloadButton(media, container);

      this.currentContainer = container;
      this.currentMediaList = Array.from(container.querySelectorAll('img, [data-video-url]'));
      if (this.currentMediaList.length === 0) return;

      this.currentMediaIndex = this.currentMediaList.indexOf(media);
      if (this.currentMediaIndex === -1) return;

      this.updateModalContent(media);
      this.updateNavigationButtons();
      this.show(previewModal);
      this.isModalOpen = true;
    };

    media.addEventListener('click', openPreview);
    this.enableClickSource(media, openPreview);
    this.enableClickSources(media, openPreview);

    media.setAttribute('data-listener-added', 'true');
  }



  updateModalContent(media) {
    const previewModal = document.querySelector(this.MEDIA_MODAL_SELECTOR);
    const mediaBox = previewModal.querySelector('.media-box');
    const mediaTitle = previewModal.querySelector(".media-title");

    mediaBox.innerHTML = '';

    let previewElement;

    if (media.hasAttribute('data-video-url')) {

      previewElement = document.createElement('video');
      previewElement.src = media.getAttribute('data-video-url');
      previewElement.controls = true;
      previewElement.autoplay = true;
      previewElement.focusable = false;
      previewElement.classList.add('preview-video');
    } else {

      previewElement = document.createElement('img');
      previewElement.src = media.src;
      previewElement.alt = media.getAttribute('data-title') || 'Preview-media';
      previewElement.classList.add('preview-image');
    }

    mediaBox.appendChild(previewElement);

    const title = media.getAttribute('data-title');
    if (title) {
      mediaTitle.textContent = title;
      mediaTitle.classList.remove('hide');
    } else {
      mediaTitle.classList.add('hide');
    }
  }



  updateNavigationButtons() {
    this.leftBtn.classList.toggle('disabled', this.currentMediaIndex === 0);
    this.rightBtn.classList.toggle('disabled', this.currentMediaIndex === this.currentMediaList.length - 1);
  }

  hide(container) {
    const videos = container.querySelectorAll('video');
    videos.forEach(video => {
      video.pause();
      video.currentTime = 0;
    });

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
    previewModal.className = 'oranbyte-media-preview preview-modal full-screen-container hide blackish';

    const mediaWithTitle = document.createElement('div');
    mediaWithTitle.className = 'media-with-title';

    const mediaBox = document.createElement('div');
    mediaBox.className = 'media-box';

    const media = document.createElement('img');
    media.src = '';
    media.alt = 'Preview-media';
    mediaBox.appendChild(media);

    const mediaTitle = document.createElement('div');
    mediaTitle.className = 'media-title';

    mediaWithTitle.appendChild(mediaBox);
    mediaWithTitle.appendChild(mediaTitle);

    const actionButtons = document.createElement('div');
    actionButtons.className = 'action-buttons';

    const leftBtn = document.createElement('div');
    leftBtn.className = 'lib-btn left-btn';

    const rightBtn = document.createElement('div');
    rightBtn.className = 'lib-btn right-btn';

    const closeBtn = document.createElement('div');
    closeBtn.className = 'lib-btn close-btn';
    closeBtn.id = 'close-btn';

    const downloadBtn = document.createElement('div');
    downloadBtn.className = 'lib-btn download-btn';
    downloadBtn.id = 'download-btn';

    actionButtons.appendChild(leftBtn);
    actionButtons.appendChild(rightBtn);
    actionButtons.appendChild(closeBtn);
    actionButtons.appendChild(downloadBtn);

    previewModal.appendChild(mediaWithTitle);
    previewModal.appendChild(actionButtons);

    document.body.appendChild(previewModal);
  }
enableLeftRightKeys() {
  document.addEventListener('keydown', (event) => {
    if (!this.isModalOpen) return;

    const active = document.activeElement;
    const isTypingElement =
      active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'VIDEO');

    if (event.key === 'ArrowLeft') {
      this.leftBtn.click();
    } else if (event.key === 'ArrowRight') {
      this.rightBtn.click();
    } else if (event.key === ' ' && !isTypingElement) {
      event.preventDefault();
      const video = document.querySelector('.oranbyte-media-preview.preview-modal .media-box video');
      if (video) {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }
    }
  });
}


  enableEscapeKey() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isModalOpen) {
        this.closeBtn.click();
      }
    });
  }

  enableClickSource(media, openPreview) {
    if (!media) return;
    const anotherClickSource = media.getAttribute('data-click-source');
    if (anotherClickSource) {
      const source = document.querySelector(anotherClickSource);
      if (source) {
        source.addEventListener('click', openPreview);
      }
    }
  }

  enableClickSources(media, openPreview) {
    if (!media) return;
    const anotherClickSource = media.getAttribute('data-click-sources');
    if (anotherClickSource) {
      const sources = document.querySelectorAll(anotherClickSource);
      sources.forEach(source => {
        source.addEventListener('click', openPreview);
      });
    }
  }

  toggleDownloadButton(media, container) {
    if (!media || !container) return;
    const previewModal = document.querySelector(this.MEDIA_MODAL_SELECTOR);

    if (media.getAttribute('data-media-downloadable') === 'true'
      || container.getAttribute('data-media-downloadable') === 'true') {
      previewModal.classList.add('downloadable');
    } else {
      previewModal.classList.remove('downloadable');
    }
  }

  enableDownloadButton() {
    this.downloadBtn.addEventListener('click', () => {
      if (this.currentMediaList.length <= 0) return;

      const media = this.currentMediaList[this.currentMediaIndex];
      const mediaUrl = media.getAttribute('data-video-url') || media.src;
      const fileName = media.getAttribute('data-video-url') ? 'video-media' : 'image-media';

      this.downloadMedia(mediaUrl, fileName);
    });
  }

  downloadMedia(mediaUrl, fileName) {

    fetch(mediaUrl, { mode: 'cors' })
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Download failed:', error);
        alert("Download failed : ", error.message | 'Server may block the download!');
      });



  }

}
