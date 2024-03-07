import {ref} from 'vue';
import {open_image, filter, putImageData} from '@silvia-odwyer/photon'

export default function useCanvas(){
    const convasEl = ref<HTMLCanvasElement | null>(null)
    let canvasCtx: CanvasRenderingContext2D | null = null;
    const imgEl = new Image();
    const canvasImgURL = ref("");
    const fileName = ref("")


    function calculateAspectRation(srcWidth:number, srcHeight:number, maxWidth: number, maxHeight: number){
        const ratio = Math.min(maxWidth / srcWidth, maxHeight, maxHeight)

        return { width: srcWidth * ratio,height: srcHeight * ratio }
    }

    function loadImage(url: string){
        if(!convasEl.value) return;

        canvasCtx = convasEl.value.getContext('2d');

        imgEl.addEventListener("load",drawOriginalImage)

        imgEl.src = url
    }

    function drawOriginalImage(){
        if(!canvasCtx || !convasEl.value) return;

        const newImageDimension = calculateAspectRation(imgEl.naturalWidth, imgEl.naturalHeight, 448,448)

        convasEl.value.width = newImageDimension.width;
        convasEl.value.height = newImageDimension.height

        canvasCtx.drawImage(imgEl,0,0,newImageDimension.width,newImageDimension.height );

        canvasImgURL.value = convasEl.value.toDataURL();
    }

    function filterImage(filterName: string){
        if(!canvasCtx || !convasEl.value) return;

        const photonImage = open_image(convasEl.value,canvasCtx)

        if(filterName.length){
            filter(photonImage,filterName)
        }

        putImageData(convasEl.value, canvasCtx, photonImage)
        canvasImgURL.value = convasEl.value.toDataURL();
    }

    return {
        convasEl,
        loadImage,
        drawOriginalImage,
        filterImage,
        canvasImgURL
    }
}