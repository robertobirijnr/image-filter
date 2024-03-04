import {ref} from 'vue';

export default function useCanvas(){
    const convasEl = ref<HTMLCanvasElement | null>(null)

    let canvasCtx: CanvasRenderingContext2D | null = null;

    function loadImage(){
        if(!convasEl.value) return;

        canvasCtx = convasEl.value.getContext('2d');
    }
}