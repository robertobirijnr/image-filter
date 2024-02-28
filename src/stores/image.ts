import {defineStore} from 'pinia'

interface ImageState{
    file: File | null;
    filter:string;
}

export const useImageStore = defineStore("image",{
    state: (): ImageState =>({
        file: null,
        filter:""
    }),

    actions:{
        upload(e:DragEvent){
            //check if there no file return
            if(!e.dataTransfer) return;

            const tempFile = e.dataTransfer.files[0];

            //check if the file type is an image
            if(!tempFile.type.match('image.*')) return

            this.file = tempFile
        }
    }
})