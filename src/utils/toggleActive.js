export const toggleActive = ({ev, el}) => {
    if (el) {
        const {children} = el.parentNode;
        for (let i = 0; i < children.length; i++) {
            children[i].classList.remove("active");
        }
        el.classList.add("active");
    }
    if (ev) {
        const e = ev.currentTarget;
        const {children} = e.parentNode;
        let index = 0;
        for (let i = 0; i < children.length; i++) {
            children[i].classList.remove("active");
            children[i] === e && (index = i);
        }
        e.classList.add("active");
        return index;
    }
};