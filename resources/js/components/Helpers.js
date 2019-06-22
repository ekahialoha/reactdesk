export const handleScroll = (reference, timeout = 305, behavior = 'smooth', block = 'center') => {
    setTimeout(() => {
        reference.current.scrollIntoView({
            behavior: behavior,
            block: block,
        });
    }, timeout);
};
