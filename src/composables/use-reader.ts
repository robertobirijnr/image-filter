export default function useReader(file: File | null, handleLoad?: EventListener) {
    const reader = new FileReader();

    if (handleLoad) reader.addEventListener("load", handleLoad);

    if (file) reader.readAsDataURL(file);

    return { reader };
}
