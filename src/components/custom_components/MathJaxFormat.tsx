import { MathJax, MathJaxContext } from "better-react-mathjax";

const mathJaxConfig = {
    tex: {
        inlineMath: [["\\(", "\\)"]],
        displayMath: [["\\[", "\\]"]],
    },
};

export function MathJaxFormat({ statement }: { statement: string }) {
    return (
        <MathJaxContext config={mathJaxConfig}>
            <MathJax>{statement}</MathJax>
        </MathJaxContext>
    );
}
