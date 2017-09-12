~function () {
    getSize();
    window.addEventListener('resize', getSize);
    function getSize() {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
    }
}()