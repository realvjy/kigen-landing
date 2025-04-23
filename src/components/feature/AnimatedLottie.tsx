import Lottie from "lottie-react";

type AnimatedLottieProps = {
    animationData: object;
    loop?: boolean;
    className?: string;
    style?: React.CSSProperties;
};

const AnimatedLottie: React.FC<AnimatedLottieProps> = ({
    animationData,
    loop = true,
    className,
    style,
}) => (
    <Lottie
        animationData={animationData}
        loop={loop}
        className={className}
        style={style}
    />
);

export default AnimatedLottie;