export const setCanvasSize = (canvasRef: React.RefObject<HTMLCanvasElement>, w: number, h: number) => {
    const canvas = canvasRef.current;
    if (!canvas) {
        return;
    }
    canvas.width = 600;
    canvas.height = 600;
};
