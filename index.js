'use-strict'

const getImage = async () => {
    const key_public = "kGqdbWWIRih3vrlHlfwGRRTATkoC_8h4Hdre14kLIn8"
    const images = await fetch(`https://api.unsplash.com/photos/?client_id=${key_public}&per_page=30`)
    if (!images.ok) throw new Error('Failed to fetch image')
    return images.json()
}

const printImages = async () => {
    const _IMGS = await getImage();
    const contIMG=document.querySelector('#galleryLightbox')
    let imgHTML = "";
    _IMGS.map(({ color, likes, description, alt_description, urls }) => {
        const { raw, thumb } = urls
        imgHTML+=`<div class="__item-gallery" style="background-color:${color}">
                    <img class="__img-gallery" data-src-lightbox="${raw}" src="${thumb}" alt="${alt_description}" title="${description}">
                </div>`
    })
    contIMG.innerHTML = ""
    contIMG.innerHTML = imgHTML;

    lightbox(document.getElementById('galleryLightbox'));
}

document.addEventListener('DOMContentLoaded', e=>{
    printImages();
    
});

function lightbox(container){
    const getImages = container=>[...container.querySelectorAll(".__img-gallery")]//gallery images
    const getLargeImages = gallery => gallery.map(el=>el.getAttribute('data-src-lightbox'))//gallery large images
    
    const openLightBoxEvent = (container,gallery,larges) => {
        container.addEventListener('click', e => {
            let el = e.target, i=gallery.indexOf(el)
            if (e.target.classList.contains('__img-gallery')) {
                openLightBox(gallery,i,larges)
            }
        })
    }

    const openLightBox=(gallery,i,larges)=>{
        document.body.classList.add('open-lightbox')
        const lightboxElement = document.createElement('div')
        lightboxElement.id = 'lightbox'
        lightboxElement.innerHTML = `
            <div class="lightbox-overlay">
                <figure class="lightbox-container">
                    <div class="cont-close-lightbox"><div class="close-lightbox">&times;</div></div>
                    <img class="lightbox-content" src="${larges[i]}" alt="${gallery[i].alt}">
                    <figcaption class="lightbox-caption">${gallery[i].title}</figcaption>
                </figure>
            </div>
        `
        document.body.appendChild(lightboxElement)
        const closeLightbox = () => {
            document.body.classList.remove('open-lightbox')
            document.body.removeChild(lightboxElement)
        }
        document.querySelector('.close-lightbox').addEventListener('click', closeLightbox)
    }
    

    let images=getImages(container), larges =getLargeImages(images);
    openLightBoxEvent(container,images,larges)
}
/*TODO
Navigation lightbox
*/