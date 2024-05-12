import React, {useState, useRef, useMemo} from 'react';
import './styles.css';

const colors = ['red', 'green', 'blue'];

const Carousel: React.FC = () => {
    const [index, setIndex] = useState<number>(1);

    const runAnimate = useRef<boolean>(true);

    const colorsEle = useMemo(() => {
        const modifyColors = [colors[colors.length - 1], ...colors, colors[0]];
        const eles = modifyColors.map((color, idx) => (
            <div key={idx} className="carousel-item"
                style={{backgroundColor: color}}></div>
        ));
        return eles;
    }, [colors]);

    const nextSlide = () => {
        runAnimate.current = true;
        if (index === colorsEle.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    };

    const prevSlide = () => {
        runAnimate.current = true;
        if (index === 0) {
            setIndex(colorsEle.length - 1);
        } else {
            setIndex(index - 1);
        }
    };

    const handleTransitionEnd = () => {
        if (index === colorsEle.length - 1) {
            runAnimate.current = false;
            setIndex(1);
        } else if (index === 0) {
            runAnimate.current = false;
            setIndex(colorsEle.length - 2);
        }
    };

    return (
        <div className="carousel-container">
            <div
                className="carousel-slide"
                style={{
                    transform: `translateX(-${index * 100}%)`,
                    transition: !runAnimate.current ? 'none' : 'transform 500ms ease-in-out'
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {colorsEle}
            </div>
            <button className="prev-btn" onClick={prevSlide}>Prev</button>
            <button className="next-btn" onClick={nextSlide}>Next</button>
        </div>
    );
};

export default Carousel;