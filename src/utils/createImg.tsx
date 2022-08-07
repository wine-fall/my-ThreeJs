export const createImage = (src: string) => {
    const instance = new Image();
    instance.src = src;
    return instance;
};